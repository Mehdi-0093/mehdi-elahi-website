import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border border-white/15 px-3 py-1 font-mono text-[13px] uppercase leading-none tracking-[0.1em] text-white/70 transition-colors",
        className
      )}
      {...props}
    />
  );
}
