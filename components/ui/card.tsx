import * as React from "react";
import { cn } from "@/lib/utils";

// Light surface card — depth via warm background contrast, no shadow.
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-[8px] bg-[#f0eee6]", className)}
      {...props}
    />
  );
}
