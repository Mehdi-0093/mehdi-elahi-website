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
      className={cn("border-t border-[#e5e6e1] py-20 sm:py-28", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px] px-6 sm:px-8",
          containerClassName
        )}
      >
        <Reveal>
          <header className="mb-12 sm:mb-16">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-[#808080]">
              • {index} &nbsp; {eyebrow}
            </p>
            <h2 className="mt-4 text-[29px] font-medium leading-[1.3] tracking-[-0.32px] text-[#151515] sm:text-[40px] sm:leading-[1.22] sm:tracking-[-0.48px]">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-[#3a4444]">
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
