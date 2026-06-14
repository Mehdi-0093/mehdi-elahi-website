import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { publications, highlightedAuthor } from "@/data/publications";

function renderAuthors(authors: string) {
  const parts = authors.split(highlightedAuthor);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <span className="font-semibold text-ink">{highlightedAuthor}</span>
      ) : null}
    </React.Fragment>
  ));
}

export function Publications() {
  return (
    <Section
      id="publications"
      index="06"
      eyebrow="Publications"
      title="Selected Publications"
      intro="Peer-reviewed work in embedded systems, hardware security, and on-chip networks."
    >
      <Reveal>
        <ol className="border-t border-border">
          {publications.map((pub, i) => (
            <li
              key={pub.title}
              className="grid grid-cols-[auto_1fr] gap-4 border-b border-border py-6 sm:gap-6"
            >
              <span className="pt-0.5 font-mono text-sm text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-sans text-base font-medium leading-snug text-ink">
                  {pub.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  {renderAuthors(pub.authors)}
                </p>
                <p className="mt-1 text-sm italic text-subtle">
                  {pub.venue}, {pub.year}
                  {pub.pages ? `, pp. ${pub.pages}` : ""}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Badge tone={pub.status === "Published" ? "accent" : "default"}>
                    {pub.status}
                  </Badge>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:underline"
                    >
                      {pub.doi ?? "DOI"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
