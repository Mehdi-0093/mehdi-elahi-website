import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
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
      <ol className="relative space-y-12 border-l border-border pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <li key={`${item.role}-${i}`} className="relative">
            <span className="absolute -left-[29px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-accent ring-4 ring-bg sm:-left-[37px]" />
            <Reveal>
              <p className="font-mono text-xs text-accent">
                {item.period}
                {item.location ? (
                  <span className="text-subtle"> · {item.location}</span>
                ) : null}
              </p>
              <h3 className="mt-1.5 text-xl">{item.role}</h3>
              <p className="mt-0.5 text-sm text-muted">{item.org}</p>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-muted marker:text-accent/40">
                {item.bullets.map((bullet, b) => (
                  <li key={b}>{bullet}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} tone="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
