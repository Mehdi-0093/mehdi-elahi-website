import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "accent";
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[100px] px-3 py-1 font-sans text-[13px] font-medium leading-none tracking-tight transition-colors",
        tone === "accent"
          ? "border border-[#453b60] text-[#453b60]"
          : "border border-[#65451d] text-[#65451d]",
        className
      )}
      {...props}
    />
  );
}
