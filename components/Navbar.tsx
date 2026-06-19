"use client";

import * as React from "react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Navbar() {
  const [active, setActive] = React.useState<string>("");
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the dark hero (not scrolled) the bar is transparent with light text.
  const onDark = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-colors duration-300",
        scrolled
          ? "border-b border-[#d1cfc5] bg-[#f0eee6]/95 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-6 sm:px-8">
        {/* Wordmark */}
        <a
          href="#top"
          className={cn(
            "shrink-0 cursor-pointer whitespace-nowrap font-sans text-[18px] font-semibold tracking-[-0.01em] transition-colors duration-300",
            onDark ? "text-[#faf9f5]" : "text-[#141413]"
          )}
          aria-label={`${profile.name} — back to top`}
        >
          {profile.name}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "cursor-pointer font-sans text-[14px] underline-offset-[6px] transition-colors duration-200 hover:underline hover:decoration-2",
                active === id
                  ? "underline decoration-2"
                  : "no-underline",
                onDark
                  ? "text-[#e8e6dc] hover:text-[#faf9f5]"
                  : "text-[#5e5d59] hover:text-[#141413]",
                active === id && (onDark ? "text-[#faf9f5]" : "text-[#141413]")
              )}
            >
              {label}
            </a>
          ))}
          <a
            href="/chat"
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] border px-3 py-1.5 font-sans text-[13px] font-medium transition-colors duration-200",
              onDark
                ? "border-[#faf9f5]/30 text-[#faf9f5] hover:border-[#d97757] hover:text-[#d97757]"
                : "border-[#d1cfc5] text-[#5e5d59] hover:border-[#d97757] hover:text-[#d97757]"
            )}
            title="Research AI Chat"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 1.3C3.8 1.3 1.3 3.5 1.3 6.3c0 1.1.4 2.2 1.1 3L1.3 12l3.5-1C5.5 11.3 6.2 11.4 7 11.4c3.2 0 5.7-2.2 5.7-5.1S10.2 1.3 7 1.3z"/>
              <circle cx="4.8" cy="6.3" r=".7" fill="currentColor" stroke="none"/>
              <circle cx="7" cy="6.3" r=".7" fill="currentColor" stroke="none"/>
              <circle cx="9.2" cy="6.3" r=".7" fill="currentColor" stroke="none"/>
            </svg>
            Research AI
          </a>

          <a
            href={profile.cvPath}
            download
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-none border px-4 py-1.5 font-sans text-[13px] font-medium transition-colors duration-200",
              onDark
                ? "border-[#faf9f5]/40 text-[#faf9f5] hover:bg-[#faf9f5] hover:text-[#141413]"
                : "border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-[#faf9f5]"
            )}
          >
            <Download className="h-3.5 w-3.5" />
            CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid h-10 w-10 cursor-pointer place-items-center rounded-none transition-colors lg:hidden",
            onDark
              ? "text-[#faf9f5] hover:bg-[#faf9f5]/10"
              : "text-[#141413] hover:bg-[#e3dacc]"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open ? (
        <div className="border-b border-[#d1cfc5] bg-[#f0eee6] lg:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4 sm:px-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "cursor-pointer px-1 py-2.5 font-sans text-[15px] underline-offset-[6px] transition-colors duration-200",
                  active === id
                    ? "text-[#141413] underline decoration-2"
                    : "text-[#5e5d59] hover:text-[#141413]"
                )}
              >
                {label}
              </a>
            ))}
            <a
              href="/chat"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[4px] border border-[#d1cfc5] px-4 py-2.5 font-sans text-[14px] font-medium text-[#5e5d59] transition-colors duration-200 hover:border-[#d97757] hover:text-[#d97757]"
            >
              Research AI Chat
            </a>
            <a
              href={profile.cvPath}
              download
              onClick={() => setOpen(false)}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-none border border-[#141413] px-4 py-2.5 font-sans text-[14px] font-medium text-[#141413] transition-colors duration-200 hover:bg-[#141413] hover:text-[#faf9f5]"
            >
              <Download className="h-3.5 w-3.5" />
              Download CV
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
