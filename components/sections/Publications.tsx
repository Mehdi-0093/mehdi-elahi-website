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
        <span className="text-[#141413] underline decoration-2 underline-offset-2">
          {highlightedAuthor}
        </span>
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
        <ol className="border-t border-[#d1cfc5]">
          {publications.map((pub, i) => (
            <li
              key={pub.title}
              className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#d1cfc5] py-6 sm:gap-6"
            >
              <span className="pt-1 font-mono text-[12px] tracking-[0.06em] text-[#d97757]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-sans text-[18px] font-semibold leading-snug text-[#141413]">
                  {pub.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5e5d59]">
                  {renderAuthors(pub.authors)}
                </p>
                <p className="mt-1 text-[13px] italic text-[#87867f]">
                  {pub.venue}, {pub.year}
                  {pub.pages ? `, pp. ${pub.pages}` : ""}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#5e5d59]">
                    {pub.status}
                  </span>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[#141413] underline-offset-4 transition-colors duration-200 hover:text-[#c6613f] hover:underline"
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
