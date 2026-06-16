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
          <div className="space-y-5 text-[16px] leading-[1.6] text-[#3a4444]">
            {profile.summary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="h-fit rounded-lg border border-[#333333] bg-white p-6">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-[#808080]">
              • At a glance
            </p>
            <dl className="mt-5 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-[#e5e6e1] pb-3 last:border-0 last:pb-0">
                  <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#808080]">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[14px] text-[#151515]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
