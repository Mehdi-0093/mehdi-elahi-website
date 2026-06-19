import type { NextRequest } from "next/server";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { createAdminClient } from "@/lib/supabase/admin";
import { chunkText } from "@/lib/chunker";
import { embedBatch } from "@/lib/openai";

export const runtime = "nodejs";

function requireAdmin(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true; // not configured → open (dev only)
  const auth = req.headers.get("x-admin-key") ?? "";
  return auth === secret;
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return Response.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string | null)?.trim();
  const year = formData.get("year") ? Number(formData.get("year")) : null;
  const authors = formData.get("authors")
    ? String(formData.get("authors"))
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    : [];
  const venue = (formData.get("venue") as string | null)?.trim() ?? null;
  const doi = (formData.get("doi") as string | null)?.trim() ?? null;
  const abstract = (formData.get("abstract") as string | null)?.trim() ?? null;

  if (!file || !title) {
    return Response.json(
      { error: "file and title are required" },
      { status: 422 }
    );
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return Response.json({ error: "Only PDF files are supported" }, { status: 422 });
  }

  // ── Upload PDF to Supabase Storage ────────────────────────────────────────
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const storagePath = `papers/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

  const { error: uploadError } = await supabase.storage
    .from("rag-documents")
    .upload(storagePath, buffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError.message);
    // Non-fatal — we can still index without storage
  }

  // ── Insert document record ────────────────────────────────────────────────
  const { data: doc, error: docError } = await supabase
    .from("rag_documents")
    .insert({
      title,
      authors,
      year,
      venue,
      doi,
      abstract,
      file_path: uploadError ? null : storagePath,
      file_size: buffer.byteLength,
      status: "processing",
    })
    .select("id")
    .single();

  if (docError || !doc) {
    return Response.json({ error: "Failed to create document record" }, { status: 500 });
  }

  // ── Extract text and embed ────────────────────────────────────────────────
  const tmpPath = join(tmpdir(), `rag-upload-${Date.now()}.pdf`);
  try {
    // pdf-parse v2 requires a file:// URL; write to a temp file
    await writeFile(tmpPath, buffer);
    const { PDFParse } = await import("pdf-parse");
    const fileUrl = `file://${tmpPath.replace(/\\/g, "/")}`;
    const parser = new PDFParse({ url: fileUrl });
    const parsed = await parser.getText();
    const rawText = parsed.text as string;
    const pageCount = (parsed.total as number) ?? 0;

    const chunks = chunkText(rawText);

    if (!chunks.length) {
      await supabase
        .from("rag_documents")
        .update({ status: "error", error_msg: "No text extracted from PDF" })
        .eq("id", doc.id);
      return Response.json({ error: "No text extracted" }, { status: 422 });
    }

    // Batch embed (OpenAI allows up to 2048 inputs per call)
    const BATCH = 50;
    const allEmbeddings: number[][] = [];
    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH).map((c) => c.content);
      const embeddings = await embedBatch(batch);
      allEmbeddings.push(...embeddings);
    }

    // Insert chunks
    const rows = chunks.map((c, i) => ({
      document_id: doc.id,
      chunk_index: c.chunkIndex,
      content: c.content,
      token_count: c.tokenCount,
      section_title: c.sectionTitle,
      page_number: c.pageNumber,
      embedding: JSON.stringify(allEmbeddings[i]),
    }));

    const { error: chunkError } = await supabase.from("rag_chunks").insert(rows);
    if (chunkError) throw chunkError;

    // Mark ready
    await supabase
      .from("rag_documents")
      .update({ status: "ready", chunk_count: chunks.length, page_count: pageCount })
      .eq("id", doc.id);

    return Response.json({
      ok: true,
      documentId: doc.id,
      chunks: chunks.length,
      pages: pageCount,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[ingest] error:", msg);
    await supabase
      .from("rag_documents")
      .update({ status: "error", error_msg: msg })
      .eq("id", doc.id);
    return Response.json({ error: `Ingestion failed: ${msg}` }, { status: 500 });
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}
