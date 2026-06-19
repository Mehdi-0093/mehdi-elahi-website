import type { NextRequest } from "next/server";
import { retrieveContext, buildSystemPrompt } from "@/lib/rag";
import { TOOLS, executeTool, type ToolName } from "@/lib/chat-tools";
import { getOpenAI, MODEL } from "@/lib/openai";
import { createAdminClient } from "@/lib/supabase/admin";
import type OpenAI from "openai";

export const runtime = "nodejs";

// ── CORS helper ───────────────────────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

// ── POST /api/chat ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const startMs = Date.now();

  let body: {
    message: string;
    sessionId: string;
    history?: { role: "user" | "assistant"; content: string }[];
    pageUrl?: string;
  };

  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json", ...CORS } }
    );
  }

  const { message, sessionId, history = [], pageUrl } = body;

  if (!message?.trim() || !sessionId) {
    return new Response(
      JSON.stringify({ error: "message and sessionId are required" }),
      { status: 422, headers: { "Content-Type": "application/json", ...CORS } }
    );
  }

  // ── Upsert session ──────────────────────────────────────────────────────────
  const supabase = createAdminClient();
  let dbSessionId: string | null = null;

  if (supabase) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const ua = req.headers.get("user-agent") ?? null;

    const { data: session } = await supabase
      .from("chat_sessions")
      .upsert(
        { session_key: sessionId, user_ip: ip, user_agent: ua, page_url: pageUrl ?? null, updated_at: new Date().toISOString() },
        { onConflict: "session_key" }
      )
      .select("id")
      .single();

    dbSessionId = session?.id ?? null;
  }

  // ── RAG retrieval ───────────────────────────────────────────────────────────
  const { chunks, systemBlock } = await retrieveContext(message);
  const systemPrompt = buildSystemPrompt(systemBlock);

  // ── Build message array ─────────────────────────────────────────────────────
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history.slice(-12).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: message },
  ];

  // ── Streaming SSE response ──────────────────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

      try {
        // Send sources immediately so the client can display them
        if (chunks.length) {
          send({
            type: "sources",
            sources: chunks.map((c) => ({
              docTitle: c.docTitle,
              docYear: c.docYear,
              sectionTitle: c.sectionTitle,
              similarity: Math.round(c.similarity * 100),
            })),
          });
        }

        const ai = getOpenAI();

        // ── First call with tool support ────────────────────────────────────
        const completion = await ai.chat.completions.create({
          model: MODEL,
          messages,
          tools: TOOLS,
          tool_choice: "auto",
          stream: true,
          max_tokens: 1200,
          temperature: 0.3,
        });

        let accContent = "";
        const toolCallBuffers: Record<
          number,
          { id: string; name: string; argsJson: string }
        > = {};
        let finishReason: string | null = null;

        for await (const chunk of completion) {
          const choice = chunk.choices[0];
          if (!choice) continue;

          finishReason = choice.finish_reason ?? finishReason;
          const delta = choice.delta;

          // Stream text
          if (delta.content) {
            accContent += delta.content;
            send({ type: "delta", content: delta.content });
          }

          // Accumulate tool call fragments
          if (delta.tool_calls) {
            for (const tc of delta.tool_calls) {
              const idx = tc.index ?? 0;
              if (!toolCallBuffers[idx]) {
                toolCallBuffers[idx] = {
                  id: tc.id ?? "",
                  name: tc.function?.name ?? "",
                  argsJson: "",
                };
              }
              if (tc.id) toolCallBuffers[idx].id = tc.id;
              if (tc.function?.name) toolCallBuffers[idx].name = tc.function.name;
              if (tc.function?.arguments)
                toolCallBuffers[idx].argsJson += tc.function.arguments;
            }
          }
        }

        // ── Handle tool calls ───────────────────────────────────────────────
        if (finishReason === "tool_calls" && Object.keys(toolCallBuffers).length) {
          const toolMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

          // assistant message that initiated the tool calls
          toolMessages.push({
            role: "assistant",
            content: accContent || null,
            tool_calls: Object.values(toolCallBuffers).map((tc) => ({
              id: tc.id,
              type: "function" as const,
              function: { name: tc.name, arguments: tc.argsJson },
            })),
          });

          // Execute each tool
          for (const tc of Object.values(toolCallBuffers)) {
            send({ type: "tool_call", tool: tc.name });

            let args: Record<string, unknown> = {};
            try { args = JSON.parse(tc.argsJson); } catch { /* ignore */ }

            const result = await executeTool(
              tc.name as ToolName,
              args,
              dbSessionId ?? sessionId
            );

            toolMessages.push({
              role: "tool",
              tool_call_id: tc.id,
              content: result,
            });
          }

          // Second LLM call with tool results
          const followUp = await ai.chat.completions.create({
            model: MODEL,
            messages: [...messages, ...toolMessages],
            stream: true,
            max_tokens: 600,
            temperature: 0.3,
          });

          for await (const chunk of followUp) {
            const delta = chunk.choices[0]?.delta;
            if (delta?.content) {
              accContent += delta.content;
              send({ type: "delta", content: delta.content });
            }
          }
        }

        send({ type: "done" });

        // ── Persist to DB (best-effort) ─────────────────────────────────────
        if (supabase && dbSessionId) {
          const latencyMs = Date.now() - startMs;
          await Promise.all([
            supabase.from("chat_messages").insert({
              session_id: dbSessionId,
              role: "user",
              content: message,
              metadata: {},
            }),
            supabase.from("chat_messages").insert({
              session_id: dbSessionId,
              role: "assistant",
              content: accContent,
              sources: chunks.length
                ? chunks.map((c) => ({ docTitle: c.docTitle, docYear: c.docYear, sectionTitle: c.sectionTitle }))
                : null,
              latency_ms: latencyMs,
              metadata: {},
            }),
          ]);
        }
      } catch (err) {
        console.error("[chat] Error:", err);
        send({ type: "error", error: "Something went wrong. Please try again." });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      ...CORS,
    },
  });
}
