import { createAdminClient } from "@/lib/supabase/admin";
import { embed } from "@/lib/openai";

export interface RetrievedChunk {
  id: string;
  documentId: string;
  content: string;
  sectionTitle: string | null;
  pageNumber: number | null;
  similarity: number;
  docTitle: string;
  docYear: number | null;
  docAuthors: string[];
}

export interface RAGContext {
  chunks: RetrievedChunk[];
  systemBlock: string;
}

const MATCH_THRESHOLD = 0.35;
const MATCH_COUNT = 8;

export async function retrieveContext(
  query: string
): Promise<RAGContext> {
  const supabase = createAdminClient();
  if (!supabase) return { chunks: [], systemBlock: "" };

  const queryEmbedding = await embed(query);

  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: MATCH_THRESHOLD,
    match_count: MATCH_COUNT,
  });

  if (error || !data?.length) {
    return { chunks: [], systemBlock: "" };
  }

  const chunks: RetrievedChunk[] = (data as Record<string, unknown>[]).map((row) => ({
    id:           row.id           as string,
    documentId:   row.document_id  as string,
    content:      row.content      as string,
    sectionTitle: (row.section_title as string | null) ?? null,
    pageNumber:   (row.page_number  as number | null) ?? null,
    similarity:   row.similarity    as number,
    docTitle:     row.doc_title     as string,
    docYear:      (row.doc_year     as number | null) ?? null,
    docAuthors:   (row.doc_authors  as string[]) ?? [],
  }));

  const systemBlock = buildContextBlock(chunks);
  return { chunks, systemBlock };
}

function buildContextBlock(chunks: RetrievedChunk[]): string {
  if (!chunks.length) return "";

  const lines: string[] = [
    "=== RETRIEVED RESEARCH CONTEXT ===",
    "The following passages are from Dr. Mehdi Elahi's published papers and research documents.",
    "Use these passages to answer the user's question. Cite the source using the format shown.",
    "",
  ];

  for (const c of chunks) {
    const year = c.docYear ? ` (${c.docYear})` : "";
    const section = c.sectionTitle ? `, §${c.sectionTitle}` : "";
    lines.push(`[Source: "${c.docTitle}"${year}${section}]`);
    lines.push(c.content);
    lines.push("");
  }

  lines.push("=== END RESEARCH CONTEXT ===");
  return lines.join("\n");
}

export function buildSystemPrompt(contextBlock: string): string {
  return `You are an AI research assistant for Dr. Mehdi Elahi, a Ph.D. researcher in Computer Engineering specializing in hardware/software co-design, SoC performance, edge-AI, and hardware security.

Your role:
• Answer questions about Dr. Elahi's research accurately and clearly
• Help visitors understand his work (papers, projects, methodologies, results)
• Capture contact information from interested visitors (collaborators, recruiters, students)
• Check registration or inquiry status when asked

Citation rules:
• When using information from the research context below, ALWAYS cite the source inline using this exact format: According to "[Paper Title]" (Year, Section X.X), ...
• If multiple sources support a point, cite all of them
• Clearly distinguish between research-backed facts and general knowledge
• If the answer is NOT in the research context, say: "This specific detail isn't available in Dr. Elahi's published research, but based on general knowledge..."

Tool use:
• If a visitor provides their contact info OR expresses interest in collaborating, recruiting, or connecting → call capture_lead
• If a visitor asks about the status of a registration or application → call check_registration_status
• Confirm lead captures warmly: "I've noted your information — Dr. Elahi will be in touch."

Tone: Professional, knowledgeable, friendly. Responses should be concise but complete.

${contextBlock || "No research documents have been indexed yet. Answer from general knowledge about Dr. Elahi's public profile."}`;
}
