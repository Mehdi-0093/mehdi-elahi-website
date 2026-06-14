import { ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projects"
      title="Selected Projects"
      intro="Research and engineering work spanning edge-AI, hardware security, and on-chip systems."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={(i % 2) * 90}>
            <Card className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl">{project.name}</h3>
                {project.status ? (
                  <Badge
                    tone={project.status === "Submitted" ? "default" : "accent"}
                    className="shrink-0"
                  >
                    {project.status}
                  </Badge>
                ) : null}
              </div>

              <p className="mt-1 text-sm font-medium text-accent">
                {project.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              {project.metrics ? (
                <div className="mt-5 flex gap-8">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-serif text-2xl text-ink">
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-xs text-subtle">{m.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <span className="text-xs text-subtle">
                  {project.venue ? `${project.venue} · ` : ""}
                  {project.year}
                </span>
                {project.link ? (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:underline"
                  >
                    Paper
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
