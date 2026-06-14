import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={(i % 2) * 90}>
            <Card className="h-full p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-accent">{item.period}</p>
                {item.gpa ? <Badge tone="accent">GPA {item.gpa}</Badge> : null}
              </div>
              <h3 className="mt-3 text-xl">{item.school}</h3>
              <p className="mt-1 text-sm text-muted">{item.degree}</p>
              <p className="text-sm text-subtle">{item.location}</p>

              {item.specialization ? (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-ink">Specialization: </span>
                  {item.specialization}
                </p>
              ) : null}
              {item.lab ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-ink">Lab: </span>
                  {item.lab}
                </p>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
