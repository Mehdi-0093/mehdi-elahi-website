import { ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

const fallbackLabels = ["RESEARCH", "BUILDING", "PUBLISHED", "RESEARCH", "BUILDING"];

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projects"
      title="Selected Projects"
      intro="Research and engineering work spanning edge-AI, hardware security, and on-chip systems."
    >
      <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
        {projects.map((project, i) => {
          const label = fallbackLabels[i % fallbackLabels.length];
          return (
            <Reveal key={project.name} delay={(i % 2) * 80} className="h-full">
              <div className="flex h-full flex-col bg-[#050505] p-8 transition-colors duration-200 hover:bg-[#0c0c0c]">
                {/* Status label — Ember Coral accent, reserved for the work */}
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#e1695e]">
                  {project.status ? project.status.toUpperCase() : label}
                </p>

                <h3 className="mt-3 font-sans text-[24px] font-light leading-[1.15] tracking-[-0.02em] text-white">
                  {project.name}
                </h3>

                <p className="mt-1.5 font-mono text-[12px] tracking-[0.04em] text-white/55">
                  {project.tagline}
                </p>

                <p className="mt-3 text-[14px] leading-[1.5] text-white/65">
                  {project.description}
                </p>

                {project.metrics ? (
                  <div className="mt-5 flex gap-8">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-sans text-[24px] font-light leading-none tracking-[-0.02em] text-white">
                          {m.value}
                        </div>
                        <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-white/45">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-none border border-white/15 px-3 py-1 font-mono text-[12px] tracking-[0.04em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/40">
                    {project.venue ? `${project.venue} · ` : ""}
                    {project.year}
                  </span>
                  {project.link ? (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-none border border-white/20 px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:border-[#e1695e] hover:text-[#e1695e]"
                    >
                      Paper
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
