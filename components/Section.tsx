import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("border-t border-[#000000] py-20 sm:py-28", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px] px-6 sm:px-8",
          containerClassName
        )}
      >
        <Reveal>
          <header className="mb-12 sm:mb-16">
            <p className="font-mono text-[12px] font-medium uppercase tracking-[-0.24px] text-[#797776]">
              • {index} &nbsp; {eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[29px] font-normal leading-[1.2] tracking-[-0.58px] text-[#000000] sm:text-[40px] sm:tracking-[-0.8px]">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.35] tracking-[-0.32px] text-[#4e4d4d]">
                {intro}
              </p>
            ) : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
