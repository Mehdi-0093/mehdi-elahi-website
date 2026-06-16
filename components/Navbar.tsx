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
          ? "border-b border-[#e5e6e1] bg-white/90 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-6 sm:px-8">
        {/* Wordmark */}
        <a
          href="#top"
          className="shrink-0 whitespace-nowrap font-sans text-[15px] font-medium tracking-[-0.03em] text-[#151515]"
          aria-label={`${profile.name} — back to top`}
        >
          {profile.name.toUpperCase()}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "rounded-[100px] px-3.5 py-1.5 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors",
                active === id
                  ? "bg-[#151515] text-white"
                  : "text-[#808080] hover:text-[#151515]"
              )}
            >
              {label}
            </a>
          ))}
          <a
            href={profile.cvPath}
            download
            className="ml-3 inline-flex items-center gap-1.5 rounded-[1000px] border border-[#333333] px-4 py-1.5 text-[13px] font-medium text-[#151515] transition-colors hover:bg-[#151515] hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
            CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-[100px] text-[#151515] hover:bg-[#e5e6e1] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open ? (
        <div className="border-b border-[#e5e6e1] bg-white lg:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4 sm:px-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[100px] px-4 py-2.5 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors",
                  active === id
                    ? "bg-[#151515] text-white"
                    : "text-[#808080] hover:text-[#151515]"
                )}
              >
                {label}
              </a>
            ))}
            <a
              href={profile.cvPath}
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-[1000px] border border-[#333333] px-4 py-2.5 text-[13px] font-medium text-[#151515] hover:bg-[#151515] hover:text-white"
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
