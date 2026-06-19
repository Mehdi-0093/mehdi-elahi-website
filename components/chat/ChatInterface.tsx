"use client";

import * as React from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatMessage as ChatMessageType, Source } from "./types";

function generateId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getOrCreateSessionId(): string {
  const KEY = "mehdi_chat_session";
  if (typeof window === "undefined") return generateId();
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(KEY, id);
  }
  return id;
}

interface Props {
  apiUrl?: string;
  className?: string;
  compact?: boolean;
}

export function ChatInterface({ apiUrl = "/api/chat", className = "", compact = false }: Props) {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const sessionId = React.useRef<string>("");

  React.useEffect(() => {
    sessionId.current = getOrCreateSessionId();
  }, []);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const userMsg: ChatMessageType = { id: generateId(), role: "user", content: text };
    const assistantId = generateId();

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "", isStreaming: true },
    ]);
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.content)
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId.current,
          history,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let pendingSources: Source[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") continue;

          let event: Record<string, unknown>;
          try { event = JSON.parse(raw); } catch { continue; }

          if (event.type === "sources") {
            pendingSources = event.sources as Source[];
          } else if (event.type === "delta") {
            const delta = event.content as string;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + delta, sources: pendingSources }
                  : m
              )
            );
          } else if (event.type === "tool_call") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, toolCall: event.tool as string }
                  : m
              )
            );
          } else if (event.type === "done") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, isStreaming: false, toolCall: undefined }
                  : m
              )
            );
          } else if (event.type === "error") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: event.error as string, isStreaming: false }
                  : m
              )
            );
          }
        }
      }
    } catch (err) {
      console.error("[chat]", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.role === "assistant" && m.isStreaming
            ? { ...m, content: "Sorry, something went wrong. Please try again.", isStreaming: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#d97757] text-white text-xl font-bold">
              ME
            </div>
            <h2 className={`font-semibold text-[#141413] ${compact ? "text-base" : "text-lg"}`}>
              Research Assistant
            </h2>
            <p className="mt-1 text-sm text-[#787670]">
              Ask me anything about Dr. Elahi&apos;s research
            </p>
            {!compact && (
              <div className="mt-6 grid gap-2 text-left">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="cursor-pointer rounded-[8px] border border-[#e3dacc] bg-white px-4 py-2.5 text-left text-sm text-[#3d3d3a] transition-colors hover:border-[#d97757] hover:text-[#d97757]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-[#e8e6dc] p-3">
        <ChatInput onSend={send} disabled={isLoading} />
        <p className="mt-1.5 text-center text-[10px] text-[#b0aea5]">
          Powered by RAG · Answers grounded in published research
        </p>
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "What is SentinelEdge?",
  "What are your contributions to hardware security?",
  "Explain the CREO Edge Testbed.",
  "Which papers have you published on Rowhammer attacks?",
];
