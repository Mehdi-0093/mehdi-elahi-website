"use client";

import * as React from "react";
import { ChatInterface } from "./ChatInterface";

export function FloatingWidget() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[1px] sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Research assistant chat"
        className={`fixed bottom-[5.5rem] right-4 z-[100] flex flex-col overflow-hidden rounded-[12px] border border-[#d1cfc5] bg-[#faf9f5] shadow-xl transition-all duration-300 ${
          open
            ? "w-[calc(100vw-2rem)] max-w-sm translate-y-0 opacity-100 sm:w-96"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: open ? "520px" : "0px" }}
      >
        {/* Panel header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e8e6dc] bg-[#141413] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#d97757] text-xs font-bold text-white">
              ME
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Research Assistant</p>
              <p className="text-[10px] text-[#787670]">Mehdi Elahi · PhD Researcher</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid h-7 w-7 cursor-pointer place-items-center rounded-[4px] text-[#787670] hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>

        {/* Chat body — only mount when open for performance */}
        {open && (
          <ChatInterface compact />
        )}
      </div>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close research assistant" : "Open research assistant"}
        className="fixed bottom-4 right-4 z-[100] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#141413] text-white shadow-lg ring-1 ring-white/10 transition-all hover:bg-[#d97757] hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 2C6 2 2 5.6 2 10c0 1.8.6 3.5 1.7 4.8L2 20l5.5-1.6C8.8 19 9.9 19.2 11 19.2c5 0 9-3.6 9-8.6S16 2 11 2z"/>
            <circle cx="7.5" cy="10" r="1" fill="currentColor" stroke="none"/>
            <circle cx="11" cy="10" r="1" fill="currentColor" stroke="none"/>
            <circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none"/>
          </svg>
        )}
      </button>
    </>
  );
}
