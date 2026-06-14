import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactNotification } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const data = parsed.data;

  // 1) Persist to Supabase (if configured).
  const supabase = createAdminClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }
  } else {
    console.warn("Supabase not configured; contact message not persisted.");
  }

  // 2) Email notification (best-effort — never block the user on email).
  try {
    await sendContactNotification(data);
  } catch (err) {
    console.error("Contact email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
