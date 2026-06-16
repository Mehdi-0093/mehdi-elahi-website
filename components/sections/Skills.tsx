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
      <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = skillIcons[group.icon];
          return (
            <Reveal key={group.name} delay={(i % 3) * 60} className="h-full">
              <div className="h-full bg-[#050505] p-8 transition-colors duration-200 hover:bg-[#0c0c0c]">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-none border border-white/20 text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-sans text-[19px] font-light text-white">
                    {group.name}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-none border border-white/15 px-3 py-1 font-mono text-[12px] tracking-[0.04em] text-white/70"
                    >
                      {item}
                    </span>
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
