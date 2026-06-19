import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function requireAdmin(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true;
  return (req.headers.get("x-admin-key") ?? "") === secret;
}

// GET /api/documents — list all documents
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) return Response.json({ documents: [] });

  const { data, error } = await supabase
    .from("rag_documents")
    .select("id, title, authors, year, venue, status, chunk_count, page_count, created_at, error_msg")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ documents: data ?? [] });
}

// DELETE /api/documents?id=<uuid>
export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "id is required" }, { status: 422 });

  const supabase = createAdminClient();
  if (!supabase) return Response.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await supabase.from("rag_documents").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true });
}
