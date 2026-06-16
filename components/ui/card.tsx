import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[40px] bg-[#cfdaf5] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]",
        className
      )}
      {...props}
    />
  );
}
