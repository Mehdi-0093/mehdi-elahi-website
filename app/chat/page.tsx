import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Research Assistant",
  description:
    "Ask questions about Dr. Mehdi Elahi's research, publications, and projects. Powered by RAG with citations from published papers.",
};

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero header */}
      <div className="border-b border-[#e8e6dc] bg-[#141413] px-6 py-8 pt-[calc(var(--nav-h)+2rem)] text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#d97757] text-lg font-bold text-white">
          ME
        </div>
        <h1 className="text-xl font-semibold text-white">Research Assistant</h1>
        <p className="mt-1 text-sm text-[#787670]">
          Answers grounded in Dr. Elahi&apos;s published papers and research documents
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {PILLS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-[#b0aea5]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="mx-auto w-full max-w-2xl flex-1 flex flex-col" style={{ height: "calc(100vh - 220px)" }}>
        <ChatInterface className="flex-1" />
      </div>
    </div>
  );
}

const PILLS = [
  "SentinelEdge",
  "Hardware Security",
  "Edge AI",
  "DriverHammer",
  "CREO Testbed",
  "Rowhammer",
  "SoC Performance",
];
