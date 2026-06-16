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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-colors",
        scrolled
          ? "border-b border-[#000000] bg-[#f6f3f1]/90 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-6 sm:px-8">
        {/* Wordmark */}
        <a
          href="#top"
          className="shrink-0 cursor-pointer whitespace-nowrap font-serif text-[18px] font-normal tracking-[-0.02em] text-[#000000]"
          aria-label={`${profile.name} — back to top`}
        >
          {profile.name}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "cursor-pointer rounded-[100px] px-3.5 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.04em] transition-colors duration-200",
                active === id
                  ? "bg-[#242424] text-[#f6f3f1]"
                  : "text-[#797776] hover:text-[#000000]"
              )}
            >
              {label}
            </a>
          ))}
          <a
            href={profile.cvPath}
            download
            className="ml-3 inline-flex cursor-pointer items-center gap-1.5 rounded-[100px] border border-[#000000] px-4 py-1.5 font-mono text-[12px] font-medium text-[#000000] transition-colors duration-200 hover:bg-[#000000] hover:text-[#f6f3f1]"
          >
            <Download className="h-3.5 w-3.5" />
            CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-[100px] text-[#000000] hover:bg-[#cfdaf5] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open ? (
        <div className="border-b border-[#000000] bg-[#f6f3f1] lg:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4 sm:px-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "cursor-pointer rounded-[100px] px-4 py-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.04em] transition-colors duration-200",
                  active === id
                    ? "bg-[#242424] text-[#f6f3f1]"
                    : "text-[#797776] hover:text-[#000000]"
                )}
              >
                {label}
              </a>
            ))}
            <a
              href={profile.cvPath}
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[100px] border border-[#000000] px-4 py-2.5 font-mono text-[12px] font-medium text-[#000000] hover:bg-[#000000] hover:text-[#f6f3f1]"
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
