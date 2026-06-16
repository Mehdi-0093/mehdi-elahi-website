import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

// Anthropic badges are pure text — no fills, no borders. Mono signals structured data.
export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[12px] uppercase tracking-[0.08em] text-[#5e5d59]",
        className
      )}
      {...props}
    />
  );
}
