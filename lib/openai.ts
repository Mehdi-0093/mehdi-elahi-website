import OpenAI from "openai";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";
const EMBEDDING_MODEL =
  process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";
const EMBEDDING_DIMS = 1536;

let _client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!_client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export async function embed(text: string): Promise<number[]> {
  const ai = getOpenAI();
  const res = await ai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.replace(/\n/g, " "),
    dimensions: EMBEDDING_DIMS,
  });
  return res.data[0].embedding;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const ai = getOpenAI();
  const res = await ai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts.map((t) => t.replace(/\n/g, " ")),
    dimensions: EMBEDDING_DIMS,
  });
  return res.data.map((d) => d.embedding);
}

export { MODEL, EMBEDDING_MODEL, EMBEDDING_DIMS };
