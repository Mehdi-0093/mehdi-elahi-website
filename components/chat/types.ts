export interface Source {
  docTitle: string;
  docYear: number | null;
  sectionTitle: string | null;
  similarity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  toolCall?: string;
  isStreaming?: boolean;
}
