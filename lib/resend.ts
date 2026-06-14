import { Resend } from "resend";
import type { ContactInput } from "@/lib/validations";

/**
 * Send a contact-form notification email via Resend.
 * No-ops (with a warning) if Resend isn't configured yet, so the contact
 * form keeps working before the API key is set.
 */
export async function sendContactNotification(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.warn("Resend not configured (RESEND_API_KEY / CONTACT_NOTIFICATION_EMAIL); skipping email.");
    return;
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Website Contact <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New website message: ${data.subject || "Portfolio contact"}`,
    text: [
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Subject: ${data.subject || "(none)"}`,
      "",
      data.message,
    ].join("\n"),
  });
}
