export interface TextChunk {
  content: string;
  chunkIndex: number;
  sectionTitle: string;
  pageNumber: number | null;
  tokenCount: number;
}

const CHUNK_CHARS = 1400;
const OVERLAP_CHARS = 200;

const HEADING_RE =
  /^(\d+\.?\d*\.?\s+[A-Z]|[IVX]+\.\s+|[A-Z][A-Z\s]{3,}$|#+\s|Abstract|Introduction|Conclusion|References|Related Work|Background|Methodology|Experiments?|Results?|Discussion|Evaluation)/;

function isHeading(text: string): boolean {
  const t = text.trim();
  return t.length < 120 && HEADING_RE.test(t);
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function chunkText(text: string): TextChunk[] {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p.length > 30);

  const chunks: TextChunk[] = [];
  let buffer = "";
  let currentSection = "Document";
  let chunkIndex = 0;

  const flush = () => {
    const content = buffer.trim();
    if (content.length < 60) return;
    chunks.push({
      content,
      chunkIndex: chunkIndex++,
      sectionTitle: currentSection,
      pageNumber: null,
      tokenCount: estimateTokens(content),
    });
    // carry overlap into next chunk
    buffer = content.slice(-OVERLAP_CHARS);
  };

  for (const para of paragraphs) {
    if (isHeading(para)) {
      currentSection = para.trim();
    }

    if (buffer.length + para.length > CHUNK_CHARS) {
      flush();
    }
    buffer += (buffer ? "\n\n" : "") + para;
  }

  flush();
  return chunks;
}
