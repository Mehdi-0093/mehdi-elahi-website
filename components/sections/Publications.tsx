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
        <span className="font-semibold text-[#151515]">{highlightedAuthor}</span>
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
        <ol className="border-t border-[#e5e6e1]">
          {publications.map((pub, i) => (
            <li
              key={pub.title}
              className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#e5e6e1] py-6 sm:gap-6"
            >
              <span className="pt-0.5 font-mono text-[12px] text-[#808080]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[15px] font-medium leading-snug text-[#151515]">
                  {pub.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#3a4444]">
                  {renderAuthors(pub.authors)}
                </p>
                <p className="mt-1 text-[13px] italic text-[#808080]">
                  {pub.venue}, {pub.year}
                  {pub.pages ? `, pp. ${pub.pages}` : ""}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-[100px] border px-3 py-1 font-sans text-[12px] font-medium ${
                      pub.status === "Published"
                        ? "border-[#453b60] text-[#453b60]"
                        : "border-[#65451d] text-[#65451d]"
                    }`}
                  >
                    {pub.status}
                  </span>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] text-[#65451d] transition-colors hover:underline"
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
