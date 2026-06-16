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
      className={cn("border-t border-white/10 py-20 sm:py-28", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px] px-6 sm:px-8",
          containerClassName
        )}
      >
        <Reveal>
          <header className="mb-12 sm:mb-16">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/50">
              {index} &nbsp;/&nbsp; {eyebrow}
            </p>
            <h2 className="mt-5 font-sans text-[34px] font-light leading-[0.95] tracking-[-0.04em] text-white sm:text-[52px]">
              {title}
            </h2>
            {intro ? (
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.4] text-white/60">
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
