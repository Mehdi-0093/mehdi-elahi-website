import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={(i % 2) * 80} className="h-full">
            <div className="h-full rounded-[8px] bg-[#f0eee6] p-8">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#87867f]">
                  {item.period}
                </p>
                {item.gpa ? (
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#d97757]">
                    GPA {item.gpa}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-sans text-[22px] font-semibold leading-[1.2] text-[#141413]">
                {item.school}
              </h3>
              <p className="mt-1.5 text-[14px] font-medium text-[#3d3d3a]">
                {item.degree}
              </p>
              <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-[#87867f]">
                {item.location}
              </p>

              {item.specialization ? (
                <p className="mt-4 text-[14px] leading-[1.6] text-[#5e5d59]">
                  <span className="text-[#141413]">Specialization: </span>
                  {item.specialization}
                </p>
              ) : null}
              {item.lab ? (
                <p className="mt-2 text-[14px] leading-[1.6] text-[#5e5d59]">
                  <span className="text-[#141413]">Lab: </span>
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
