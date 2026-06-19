import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function requireAdmin(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true;
  return (req.headers.get("x-admin-key") ?? "") === secret;
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return Response.json({
      documents: 0, chunks: 0, sessions: 0, messages: 0, leads: 0,
    });
  }

  const [docs, chunks, sessions, messages, leads] = await Promise.all([
    supabase.from("rag_documents").select("id", { count: "exact", head: true }),
    supabase.from("rag_chunks").select("id", { count: "exact", head: true }),
    supabase.from("chat_sessions").select("id", { count: "exact", head: true }),
    supabase.from("chat_messages").select("id", { count: "exact", head: true }),
    supabase.from("chat_leads").select("id", { count: "exact", head: true }),
  ]);

  return Response.json({
    documents: docs.count ?? 0,
    chunks:    chunks.count ?? 0,
    sessions:  sessions.count ?? 0,
    messages:  messages.count ?? 0,
    leads:     leads.count ?? 0,
  });
}
