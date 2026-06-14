import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

const facts = [
  { label: "Degree", value: "Ph.D., Computer Engineering (in progress)" },
  { label: "Lab", value: "CREO — NC A&T State University" },
  { label: "Based in", value: profile.location },
  { label: "Open to", value: "2026–2027 internships" },
];

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="About">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
            {profile.summary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="h-fit rounded-xl border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">
              At a glance
            </p>
            <dl className="mt-4 space-y-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs text-subtle">{f.label}</dt>
                  <dd className="mt-0.5 text-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
