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
          <div className="space-y-5">
            {profile.summary.map((paragraph, i) =>
              i === 0 ? (
                <p
                  key={i}
                  className="text-[19px] leading-[1.55] text-[#141413]"
                >
                  {paragraph}
                </p>
              ) : (
                <p key={i} className="text-[16px] leading-[1.6] text-[#5e5d59]">
                  {paragraph}
                </p>
              )
            )}
          </div>

          <div className="h-fit rounded-[16px] bg-[#f0eee6] p-8">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#87867f]">
              At a glance
            </p>
            <dl className="mt-5 space-y-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="border-b border-[#d1cfc5] pb-3 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#87867f]">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] text-[#141413]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
