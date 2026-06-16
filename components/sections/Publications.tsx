import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { publications, highlightedAuthor } from "@/data/publications";

function renderAuthors(authors: string) {
  const parts = authors.split(highlightedAuthor);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <span className="font-medium text-white">{highlightedAuthor}</span>
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
        <ol className="border-t border-white/10">
          {publications.map((pub, i) => (
            <li
              key={pub.title}
              className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/10 py-6 sm:gap-6"
            >
              <span className="pt-1 font-mono text-[12px] tracking-[0.08em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-sans text-[19px] font-light leading-snug text-white">
                  {pub.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                  {renderAuthors(pub.authors)}
                </p>
                <p className="mt-1 font-serif text-[14px] italic text-white/45">
                  {pub.venue}, {pub.year}
                  {pub.pages ? `, pp. ${pub.pages}` : ""}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-none border border-white/15 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.08em] text-white/70">
                    {pub.status}
                  </span>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 border-b border-transparent pb-0.5 font-mono text-[12px] uppercase tracking-[0.08em] text-white/70 transition-colors duration-200 hover:border-white hover:text-white"
                    >
                      {pub.doi ?? "DOI"}
                      <ExternalLink className="h-3 w-3" />
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
