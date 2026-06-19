import type OpenAI from "openai";
import { createAdminClient } from "@/lib/supabase/admin";

export type ToolName = "capture_lead" | "check_registration_status";

export const TOOLS: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "capture_lead",
      description:
        "Collect visitor contact information and research interests. Call this when a visitor provides their name and/or email, or expresses interest in collaborating, recruiting, or connecting with Dr. Elahi.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Visitor's full name",
          },
          email: {
            type: "string",
            description: "Visitor's email address",
          },
          organization: {
            type: "string",
            description: "Visitor's organization, company, or university",
          },
          message: {
            type: "string",
            description: "Purpose of contact or message from the visitor",
          },
          research_interests: {
            type: "array",
            items: { type: "string" },
            description:
              "Topics the visitor is interested in (e.g., 'edge AI', 'hardware security')",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_registration_status",
      description:
        "Check the status of a registration, application, event signup, or inquiry by email address or reference number.",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email address used during registration",
          },
          reference_number: {
            type: "string",
            description: "Reference or confirmation number",
          },
        },
        required: [],
      },
    },
  },
];

interface LeadArgs {
  name?: string;
  email?: string;
  organization?: string;
  message?: string;
  research_interests?: string[];
}

interface StatusArgs {
  email?: string;
  reference_number?: string;
}

export async function executeTool(
  name: ToolName,
  args: Record<string, unknown>,
  sessionId: string
): Promise<string> {
  if (name === "capture_lead") {
    return executeCaptureLeadTool(args as LeadArgs, sessionId);
  }
  if (name === "check_registration_status") {
    return executeStatusTool(args as StatusArgs);
  }
  return "Unknown tool.";
}

async function executeCaptureLeadTool(
  args: LeadArgs,
  sessionId: string
): Promise<string> {
  const supabase = createAdminClient();
  if (!supabase) {
    return "Lead recorded (database not configured — please contact Dr. Elahi directly at melahi@aggies.ncat.edu).";
  }

  const { error } = await supabase.from("chat_leads").insert({
    session_id: sessionId || null,
    name: args.name ?? null,
    email: args.email ?? null,
    organization: args.organization ?? null,
    message: args.message ?? null,
    research_interests: args.research_interests ?? [],
  });

  if (error) {
    console.error("Lead insert error:", error.message);
    return "There was an issue saving your information. Please contact Dr. Elahi directly at melahi@aggies.ncat.edu.";
  }

  const parts = ["Lead captured successfully."];
  if (args.name) parts.push(`Name: ${args.name}`);
  if (args.email) parts.push(`Email: ${args.email}`);
  if (args.organization) parts.push(`Organization: ${args.organization}`);
  return parts.join(" | ");
}

async function executeStatusTool(args: StatusArgs): Promise<string> {
  const supabase = createAdminClient();
  if (!supabase) {
    return "Status lookup unavailable — database not configured.";
  }

  if (!args.email && !args.reference_number) {
    return "Please provide an email address or reference number to check status.";
  }

  let query = supabase
    .from("contact_messages")
    .select("id, name, status, created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (args.email) query = query.ilike("email", args.email);

  const { data, error } = await query;

  if (error || !data?.length) {
    return `No registration found for ${args.email ?? args.reference_number}. Please double-check the email or reference number, or contact Dr. Elahi directly.`;
  }

  const record = data[0] as { id: string; name: string; status: string; created_at: string };
  const date = new Date(record.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `Found a record for ${record.name ?? args.email}. Status: "${record.status}". Submitted: ${date}. Reference ID: ${record.id.slice(0, 8).toUpperCase()}.`;
}
