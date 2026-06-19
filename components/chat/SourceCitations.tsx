"use client";

import * as React from "react";
import type { Source } from "./types";

interface Props {
  sources: Source[];
}

export function SourceCitations({ sources }: Props) {
  const [open, setOpen] = React.useState(false);

  if (!sources.length) return null;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] font-medium text-[#787670] hover:text-[#d97757] transition-colors"
      >
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M1 3h10M1 6h6M1 9h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          {sources.length} source{sources.length !== 1 ? "s" : ""}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5L5 6.5L8 3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 space-y-1.5">
          {sources.map((s, i) => (
            <div
              key={i}
              className="rounded-[6px] border border-[#e3dacc] bg-[#f5f3ee] px-3 py-2 text-[11px] text-[#5e5d59]"
            >
              <span className="font-medium text-[#3d3d3a]">
                &ldquo;{s.docTitle}&rdquo;
              </span>
              {s.docYear && <span className="ml-1">({s.docYear})</span>}
              {s.sectionTitle && (
                <span className="ml-1 text-[#787670]">· {s.sectionTitle}</span>
              )}
              <span className="ml-2 rounded-full bg-[#e8e6dc] px-1.5 py-0.5 text-[10px] text-[#787670]">
                {s.similarity}% match
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
