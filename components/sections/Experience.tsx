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
      <ol className="border-t border-white/10">
        {experience.map((item, i) => (
          <li
            key={`${item.role}-${i}`}
            className="border-b border-white/10 py-8"
          >
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/45">
                    {item.period}
                  </p>
                  {item.location ? (
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-white/35">
                      {item.location}
                    </p>
                  ) : null}
                </div>
                <div>
                  <h3 className="font-sans text-[23px] font-light leading-[1.2] tracking-[-0.02em] text-white">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-[14px] text-white/55">{item.org}</p>
                  <ul className="mt-4 space-y-2 pl-4 text-[14px] leading-[1.5] text-white/65">
                    {item.bullets.map((bullet, b) => (
                      <li
                        key={b}
                        className="relative before:absolute before:-left-4 before:text-white/40 before:content-['·']"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-none border border-white/15 px-3 py-1 font-mono text-[12px] tracking-[0.04em] text-white/70"
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
