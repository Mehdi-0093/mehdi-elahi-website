import type { ChatMessage as ChatMessageType } from "./types";
import { SourceCitations } from "./SourceCitations";

interface Props {
  message: ChatMessageType;
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-[8px] bg-[#d97757] px-4 py-2.5 text-sm text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] space-y-1">
        {/* Tool call indicator */}
        {message.toolCall && (
          <div className="mb-1 flex items-center gap-1.5 text-[11px] text-[#787670]">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#788c5d]" />
            {message.toolCall === "capture_lead"
              ? "Saving your contact information…"
              : "Checking registration status…"}
          </div>
        )}

        {/* Message bubble */}
        <div className="rounded-[8px] border border-[#e3dacc] bg-white px-4 py-3 text-sm text-[#141413] leading-relaxed">
          {message.content ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[#b0aea5]">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:300ms]" />
            </span>
          )}
          {message.isStreaming && message.content && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#d97757]" />
          )}
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && !message.isStreaming && (
          <SourceCitations sources={message.sources} />
        )}
      </div>
    </div>
  );
}
