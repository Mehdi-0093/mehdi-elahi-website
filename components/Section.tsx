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
      className={cn("border-t border-[#e8e6dc] py-20 sm:py-24", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px] px-6 sm:px-8",
          containerClassName
        )}
      >
        <Reveal>
          <header className="mb-12 sm:mb-16">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#87867f]">
              <span className="text-[#d97757]">{index}</span> &nbsp;/&nbsp;{" "}
              {eyebrow}
            </p>
            <h2 className="mt-4 font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413] sm:text-[44px]">
              {title}
            </h2>
            {intro ? (
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.5] text-[#5e5d59]">
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
