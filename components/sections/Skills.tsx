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
            <Reveal key={group.name} delay={(i % 3) * 60}>
              <div className="h-full rounded-[40px] bg-[#cfdaf5] p-8 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-[#000000] text-[#000000]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-serif text-[18px] font-normal text-[#000000]">
                    {group.name}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-[100px] border border-[#000000] px-3 py-1 font-mono text-[12px] font-medium text-[#000000]"
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
