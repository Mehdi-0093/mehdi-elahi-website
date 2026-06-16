import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[140px] w-full resize-y rounded-[8px] border border-[#d1cfc5] bg-[#faf9f5] px-3.5 py-3 text-sm text-[#141413] placeholder:text-[#87867f] transition-colors duration-200 focus-visible:border-[#141413] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97757]/30 disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
