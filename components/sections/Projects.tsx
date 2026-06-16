import { ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

const cardColors = [
  { bg: "#d3e5e9", label: "RESEARCH" },
  { bg: "#bbb2ce", label: "BUILDING" },
  { bg: "#cb9da2", label: "PUBLISHED" },
  { bg: "#d3e5e9", label: "RESEARCH" },
  { bg: "#bbb2ce", label: "BUILDING" },
];

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
          const { bg, label } = cardColors[i % cardColors.length];
          return (
            <Reveal key={project.name} delay={(i % 2) * 80}>
              <div
                className="flex h-full flex-col rounded-lg border border-[#333333] p-6"
                style={{ backgroundColor: bg }}
              >
                {/* Status label */}
                <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-[#3a4444]">
                  {project.status ? project.status.toUpperCase() : label}
                </p>

                <h3 className="mt-2 text-[22px] font-medium leading-[1.32] tracking-[-0.22px] text-[#151515]">
                  {project.name}
                </h3>

                <p className="mt-1 text-[13px] font-medium text-[#453b60]">
                  {project.tagline}
                </p>

                <p className="mt-3 text-[14px] leading-[1.6] text-[#3a4444]">
                  {project.description}
                </p>

                {project.metrics ? (
                  <div className="mt-5 flex gap-8">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-[22px] font-medium leading-none tracking-[-0.22px] text-[#151515]">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[12px] text-[#808080]">
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
                      className="inline-flex items-center rounded-[100px] border border-[#65451d] px-3 py-1 font-sans text-[12px] font-medium text-[#65451d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="text-[12px] text-[#808080]">
                    {project.venue ? `${project.venue} · ` : ""}
                    {project.year}
                  </span>
                  {project.link ? (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[100px] border border-[#333333] bg-white/60 px-3.5 py-1.5 text-[12px] font-medium text-[#151515] transition-colors hover:bg-white"
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
