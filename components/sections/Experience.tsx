import * as React from "react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Experience"
      intro="Research, verification, and teaching across hardware and low-level systems."
    >
      <ol className="border-t border-[#d1cfc5]">
        {experience.map((item, i) => (
          <li
            key={`${item.role}-${i}`}
            className="border-b border-[#d1cfc5] py-8"
          >
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#87867f]">
                    {item.period}
                  </p>
                  {item.location ? (
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-[#b0aea5]">
                      {item.location}
                    </p>
                  ) : null}
                </div>
                <div>
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[#141413]">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-[14px] text-[#5e5d59]">{item.org}</p>
                  <ul className="mt-4 space-y-2 pl-4 text-[14px] leading-[1.6] text-[#3d3d3a]">
                    {item.bullets.map((bullet, b) => (
                      <li
                        key={b}
                        className="relative before:absolute before:-left-4 before:text-[#d97757] before:content-['—']"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    {item.tags.map((tag, t) => (
                      <React.Fragment key={tag}>
                        {t > 0 ? (
                          <span className="text-[#b0aea5]" aria-hidden="true">
                            ·
                          </span>
                        ) : null}
                        <span className="font-mono text-[12px] tracking-[0.01em] text-[#5e5d59]">
                          {tag}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
