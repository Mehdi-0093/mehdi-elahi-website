import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "accent";
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs leading-none tracking-tight transition-colors",
        tone === "accent"
          ? "bg-accent-soft text-accent"
          : "border border-border bg-surface text-muted",
        className
      )}
      {...props}
    />
  );
}
