import { Download, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-20 sm:pt-[calc(var(--nav-h)+4.5rem)] sm:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 0%, #000 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 0%, #000 35%, transparent 78%)",
          opacity: 0.6,
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to 2026–2027 internships
          </span>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 text-lg text-muted sm:text-xl">
            {profile.title} <span className="text-subtle">·</span>{" "}
            {profile.subtitle}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className={cn(buttonVariants({ size: "lg" }))}>
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href={profile.cvPath}
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#projects"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{s.handle}</span>
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={360}>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {profile.highlights.map((h) => (
              <div key={h.label} className="bg-surface p-5">
                <dt className="font-serif text-2xl text-ink sm:text-3xl">
                  {h.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">
                  {h.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
