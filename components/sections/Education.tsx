import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education">
      <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={(i % 2) * 80} className="h-full">
            <div className="h-full bg-[#050505] p-8 transition-colors duration-200 hover:bg-[#0c0c0c]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/45">
                  {item.period}
                </p>
                {item.gpa ? (
                  <span className="inline-flex items-center rounded-none border border-white/20 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.06em] text-white">
                    GPA {item.gpa}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-sans text-[24px] font-light leading-[1.15] tracking-[-0.02em] text-white">
                {item.school}
              </h3>
              <p className="mt-1.5 text-[14px] font-normal text-white/70">
                {item.degree}
              </p>
              <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-white/40">
                {item.location}
              </p>

              {item.specialization ? (
                <p className="mt-4 text-[14px] leading-[1.5] text-white/65">
                  <span className="text-white">Specialization: </span>
                  {item.specialization}
                </p>
              ) : null}
              {item.lab ? (
                <p className="mt-2 text-[14px] leading-[1.5] text-white/65">
                  <span className="text-white">Lab: </span>
                  {item.lab}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
