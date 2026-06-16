import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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
      <ol className="border-t border-[#e5e6e1]">
        {experience.map((item, i) => (
          <li
            key={`${item.role}-${i}`}
            className="border-b border-[#e5e6e1] py-8"
          >
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-mono text-[12px] text-[#808080]">
                    {item.period}
                  </p>
                  {item.location ? (
                    <p className="mt-0.5 font-mono text-[12px] text-[#808080]">
                      {item.location}
                    </p>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-[18px] font-medium leading-[1.3] tracking-[-0.014em] text-[#151515]">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-[14px] text-[#808080]">{item.org}</p>
                  <ul className="mt-4 space-y-2 pl-4 text-[14px] leading-[1.6] text-[#3a4444]">
                    {item.bullets.map((bullet, b) => (
                      <li key={b} className="relative before:absolute before:-left-4 before:text-[#65451d] before:content-['·']">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-[100px] border border-[#453b60] px-3 py-1 font-sans text-[12px] font-medium text-[#453b60]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
