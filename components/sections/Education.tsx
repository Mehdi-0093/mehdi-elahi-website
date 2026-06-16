import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={(i % 2) * 80}>
            <div className="h-full rounded-[40px] bg-[#cfdaf5] p-8 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[12px] text-[#797776]">
                  {item.period}
                </p>
                {item.gpa ? (
                  <span className="inline-flex items-center rounded-[100px] border border-[#000000] px-3 py-1 font-mono text-[12px] font-medium text-[#000000]">
                    GPA {item.gpa}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-serif text-[24px] font-normal leading-[1.2] tracking-[-0.48px] text-[#000000]">
                {item.school}
              </h3>
              <p className="mt-1 text-[14px] font-medium tracking-[-0.28px] text-[#4e4d4d]">
                {item.degree}
              </p>
              <p className="font-mono text-[12px] text-[#797776]">{item.location}</p>

              {item.specialization ? (
                <p className="mt-4 text-[14px] leading-[1.35] tracking-[-0.28px] text-[#4e4d4d]">
                  <span className="font-medium text-[#000000]">Specialization: </span>
                  {item.specialization}
                </p>
              ) : null}
              {item.lab ? (
                <p className="mt-2 text-[14px] leading-[1.35] tracking-[-0.28px] text-[#4e4d4d]">
                  <span className="font-medium text-[#000000]">Lab: </span>
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
