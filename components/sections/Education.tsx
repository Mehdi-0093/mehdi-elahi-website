import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/education";

const cardColors = ["#d3e5e9", "#bbb2ce"];

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={(i % 2) * 80}>
            <div
              className="h-full rounded-lg border border-[#333333] p-6"
              style={{ backgroundColor: cardColors[i % cardColors.length] }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[12px] text-[#808080]">
                  {item.period}
                </p>
                {item.gpa ? (
                  <span className="inline-flex items-center rounded-[100px] border border-[#453b60] px-3 py-1 font-sans text-[12px] font-medium text-[#453b60]">
                    GPA {item.gpa}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-[22px] font-medium leading-[1.3] tracking-[-0.22px] text-[#151515]">
                {item.school}
              </h3>
              <p className="mt-1 text-[14px] font-medium text-[#3a4444]">
                {item.degree}
              </p>
              <p className="text-[13px] text-[#808080]">{item.location}</p>

              {item.specialization ? (
                <p className="mt-4 text-[14px] leading-[1.6] text-[#3a4444]">
                  <span className="font-medium text-[#151515]">Specialization: </span>
                  {item.specialization}
                </p>
              ) : null}
              {item.lab ? (
                <p className="mt-2 text-[14px] leading-[1.6] text-[#3a4444]">
                  <span className="font-medium text-[#151515]">Lab: </span>
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
