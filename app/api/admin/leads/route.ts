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
  if (!supabase) return Response.json({ leads: [] });

  const { data, error } = await supabase
    .from("chat_leads")
    .select("id, created_at, name, email, organization, message, research_interests, status")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ leads: data ?? [] });
}

// PATCH /api/admin/leads?id=<uuid>&status=<status>
export async function PATCH(req: NextRequest) {
  if (!requireAdmin(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  const status = req.nextUrl.searchParams.get("status");

  if (!id || !status) {
    return Response.json({ error: "id and status are required" }, { status: 422 });
  }

  const supabase = createAdminClient();
  if (!supabase) return Response.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await supabase
    .from("chat_leads")
    .update({ status })
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
