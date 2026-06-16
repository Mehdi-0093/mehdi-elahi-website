import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-[8px] border border-[#d1cfc5] bg-[#faf9f5] px-3.5 text-sm text-[#141413] placeholder:text-[#87867f] transition-colors duration-200 focus-visible:border-[#141413] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97757]/30 disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
