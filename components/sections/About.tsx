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
          <div className="space-y-5 text-[16px] leading-[1.35] tracking-[-0.32px] text-[#4e4d4d]">
            {profile.summary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="h-fit rounded-[40px] bg-[#cfdaf5] p-10 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <p className="font-mono text-[12px] font-medium uppercase tracking-[-0.24px] text-[#4e4d4d]">
              • At a glance
            </p>
            <dl className="mt-5 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-[#000000]/15 pb-3 last:border-0 last:pb-0">
                  <dt className="font-mono text-[11px] font-medium uppercase tracking-[-0.22px] text-[#4e4d4d]">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[14px] tracking-[-0.28px] text-[#000000]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
