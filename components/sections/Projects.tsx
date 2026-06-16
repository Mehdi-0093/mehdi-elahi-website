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
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => {
          const label = fallbackLabels[i % fallbackLabels.length];
          return (
            <Reveal key={project.name} delay={(i % 2) * 80}>
              <div className="flex h-full flex-col rounded-[40px] bg-[#cfdaf5] p-8 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
                {/* Status label */}
                <p className="font-mono text-[12px] font-medium uppercase tracking-[-0.24px] text-[#4e4d4d]">
                  {project.status ? project.status.toUpperCase() : label}
                </p>

                <h3 className="mt-2 font-serif text-[24px] font-normal leading-[1.2] tracking-[-0.48px] text-[#000000]">
                  {project.name}
                </h3>

                <p className="mt-1 font-mono text-[12px] font-medium text-[#4e4d4d]">
                  {project.tagline}
                </p>

                <p className="mt-3 text-[14px] leading-[1.35] tracking-[-0.28px] text-[#4e4d4d]">
                  {project.description}
                </p>

                {project.metrics ? (
                  <div className="mt-5 flex gap-8">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-mono text-[20px] font-medium leading-none tracking-[-0.4px] text-[#000000]">
                          {m.value}
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-[#797776]">
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
                      className="inline-flex items-center rounded-[100px] border border-[#000000] px-3 py-1 font-mono text-[12px] font-medium text-[#000000]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="font-mono text-[11px] text-[#797776]">
                    {project.venue ? `${project.venue} · ` : ""}
                    {project.year}
                  </span>
                  {project.link ? (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-[100px] border border-[#000000] bg-[#f6f3f1]/80 px-3.5 py-1.5 font-mono text-[12px] font-medium text-[#000000] transition-colors duration-200 hover:bg-[#f6f3f1]"
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
