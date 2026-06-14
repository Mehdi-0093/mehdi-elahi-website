"use client";

import * as React from "react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Navbar() {
  const [active, setActive] = React.useState<string>("");
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // Highlight the section currently in view.
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

  // Add a subtle border/blur once the page is scrolled.
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
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent font-mono text-sm font-semibold text-white">
            {profile.initials}
          </span>
          <span className="whitespace-nowrap font-serif text-base font-medium tracking-tight">
            {profile.name}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors",
                active === id ? "text-accent" : "text-muted hover:text-ink"
              )}
            >
              {label}
              {active === id ? (
                <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />
              ) : null}
            </a>
          ))}
          <a
            href={profile.cvPath}
            download
            className={cn(buttonVariants({ size: "sm" }), "ml-2")}
          >
            <Download className="h-4 w-4" />
            CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-ink hover:bg-surface-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open ? (
        <div className="border-b border-border bg-bg lg:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-5 py-3 sm:px-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm transition-colors",
                  active === id
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-ink"
                )}
              >
                {label}
              </a>
            ))}
            <a
              href={profile.cvPath}
              download
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: "sm" }), "mt-2 w-full")}
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
