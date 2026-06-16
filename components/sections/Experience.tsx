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
      <ol className="border-t border-[#000000]">
        {experience.map((item, i) => (
          <li
            key={`${item.role}-${i}`}
            className="border-b border-[#000000] py-8"
          >
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-mono text-[12px] text-[#797776]">
                    {item.period}
                  </p>
                  {item.location ? (
                    <p className="mt-0.5 font-mono text-[12px] text-[#797776]">
                      {item.location}
                    </p>
                  ) : null}
                </div>
                <div>
                  <h3 className="font-serif text-[20px] font-normal leading-[1.3] tracking-[-0.02em] text-[#000000]">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-[14px] tracking-[-0.28px] text-[#797776]">{item.org}</p>
                  <ul className="mt-4 space-y-2 pl-4 text-[14px] leading-[1.35] tracking-[-0.28px] text-[#4e4d4d]">
                    {item.bullets.map((bullet, b) => (
                      <li key={b} className="relative before:absolute before:-left-4 before:text-[#000000] before:content-['·']">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-[100px] border border-[#000000] px-3 py-1 font-mono text-[12px] font-medium text-[#000000]"
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
