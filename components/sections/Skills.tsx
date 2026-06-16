import * as React from "react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { skills } from "@/data/skills";
import { skillIcons } from "@/components/icons";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="Technical Skills"
      intro="The tools, languages, and systems I work with day to day — from RTL and simulation to edge-AI runtimes."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = skillIcons[group.icon];
          return (
            <Reveal key={group.name} delay={(i % 3) * 60} className="h-full">
              <div className="h-full rounded-[8px] bg-[#f0eee6] p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-[#e3dacc] text-[#141413]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-sans text-[18px] font-semibold text-[#141413]">
                    {group.name}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  {group.items.map((item, idx) => (
                    <React.Fragment key={item}>
                      {idx > 0 ? (
                        <span className="text-[#b0aea5]" aria-hidden="true">
                          ·
                        </span>
                      ) : null}
                      <span className="font-mono text-[12px] tracking-[0.01em] text-[#3d3d3a]">
                        {item}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
