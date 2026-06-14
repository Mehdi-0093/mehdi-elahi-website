import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = skillIcons[group.icon];
          return (
            <Reveal key={group.name} delay={(i % 3) * 80}>
              <Card className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg">{group.name}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
