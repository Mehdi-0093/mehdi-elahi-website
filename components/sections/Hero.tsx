import Image from "next/image";
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
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 xl:gap-24">

          {/* Left column — text content */}
          <div>
            {/* Availability badge */}
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-none border border-white/20 px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Open to 2026–2027 internships
              </span>
            </Reveal>

            {/* Display headline — Helvetica thin, cinematic compressed block */}
            <Reveal delay={60}>
              <h1 className="mt-8 font-sans text-[56px] font-light leading-[0.92] tracking-[-0.05em] text-white sm:text-[80px] lg:text-[92px]">
                {profile.name}
              </h1>
            </Reveal>

            {/* Role — Courier slate marking */}
            <Reveal delay={120}>
              <p className="mt-6 font-mono text-[12px] uppercase leading-[1.6] tracking-[0.1em] text-white/55">
                {profile.title}
                <span className="mx-2 text-white/30">/</span>
                {profile.subtitle}
              </p>
            </Reveal>

            {/* Tagline — Times New Roman editorial statement */}
            <Reveal delay={180}>
              <p className="mt-6 max-w-[520px] font-serif text-[22px] font-normal leading-[1.3] text-white/85 sm:text-[26px]">
                {profile.tagline}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-none bg-white px-6 py-3 font-mono text-[13px] uppercase tracking-[0.08em] text-black transition-colors duration-200 hover:bg-white/85"
                >
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
                <a
                  href={profile.cvPath}
                  download
                  className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-white/30 px-6 py-3 font-mono text-[13px] uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:border-white hover:bg-white/5"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
                <a
                  href="#projects"
                  className="group inline-flex cursor-pointer items-center gap-2 px-1 py-3 font-mono text-[13px] uppercase tracking-[0.08em] text-white/60 transition-colors duration-200 hover:text-white"
                >
                  View projects
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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
                      className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-white/15 px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-white/55 transition-colors duration-200 hover:border-white hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right column — headshot photo, full-bleed cinematic still */}
          <Reveal delay={80} className="order-first lg:order-last">
            <div className="mx-auto w-[240px] sm:w-[300px] lg:mx-0 lg:w-full">
              <div className="overflow-hidden rounded-none border border-white/15">
                <Image
                  src="/photo.jpg"
                  alt={`${profile.name} — portrait`}
                  width={400}
                  height={500}
                  priority
                  className="block w-full object-cover grayscale contrast-[1.05]"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 400px"
                />
              </div>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 lg:text-left">
                {profile.name}
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
