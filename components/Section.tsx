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
      className={cn("border-t border-border/70 py-20 sm:py-28", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-5xl px-5 sm:px-8",
          containerClassName
        )}
      >
        <Reveal>
          <header className="mb-10 sm:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {index} <span className="text-subtle">/</span> {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
            {intro ? (
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{intro}</p>
            ) : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
