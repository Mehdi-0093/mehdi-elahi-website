import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[140px] w-full resize-y rounded-md border border-border bg-surface px-3.5 py-3 text-sm text-ink placeholder:text-subtle transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
