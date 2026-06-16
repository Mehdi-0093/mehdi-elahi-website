import { Download, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Hero() {
  return (
    <section
      id="top"
      className="pt-[calc(var(--nav-h)+4rem)] pb-24 sm:pt-[calc(var(--nav-h)+5rem)] sm:pb-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
        {/* Availability badge */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-[100px] border border-[#333333] px-3.5 py-1.5 font-sans text-[12px] font-medium uppercase tracking-[0.06em] text-[#3a4444]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Open to 2026–2027 internships
          </span>
        </Reveal>

        {/* Display headline */}
        <Reveal delay={60}>
          <h1 className="mt-8 font-sans text-[44px] font-light leading-[1.1] tracking-[-0.92px] text-[#151515] sm:text-[69px] sm:tracking-[-1.45px]">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-4 text-[18px] font-normal leading-[1.42] tracking-[-0.14px] text-[#3a4444]">
            {profile.title}
            <span className="mx-2 text-[#808080]">·</span>
            {profile.subtitle}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.6] text-[#808080]">
            {profile.tagline}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[1000px] bg-[#151515] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#2a2a2a]"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href={profile.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-[100px] border border-[#333333] px-6 py-3 text-[15px] font-medium text-[#151515] transition-colors hover:bg-[#151515] hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-[100px] px-5 py-3 text-[15px] font-medium text-[#808080] transition-colors hover:text-[#151515]"
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Social links */}
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
                  className="inline-flex items-center gap-2 rounded-[100px] border border-[#e5e6e1] px-3.5 py-2 text-[13px] font-medium text-[#3a4444] transition-colors hover:border-[#333333] hover:text-[#151515]"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{s.handle}</span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
