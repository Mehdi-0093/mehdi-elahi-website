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
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-24">

          {/* Left column — text content */}
          <div>
            {/* Availability badge */}
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-[100px] border border-[#000000] px-3.5 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[-0.24px] text-[#4e4d4d]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Open to 2026–2027 internships
              </span>
            </Reveal>

            {/* Display headline */}
            <Reveal delay={60}>
              <h1 className="mt-8 font-serif text-[52px] font-normal leading-[1.1] tracking-[-1.04px] text-[#000000] sm:text-[68px] sm:tracking-[-1.36px] lg:text-[80px] lg:leading-[1.05] lg:tracking-[-1.6px]">
                {profile.name}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-4 text-[18px] font-normal leading-[1.35] tracking-[-0.36px] text-[#4e4d4d]">
                {profile.title}
                <span className="mx-2 text-[#797776]">·</span>
                {profile.subtitle}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-[500px] text-[16px] leading-[1.35] tracking-[-0.32px] text-[#797776]">
                {profile.tagline}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-[100px] bg-[#242424] px-6 py-2.5 font-mono text-[14px] font-medium text-[#f6f3f1] transition-colors duration-200 hover:bg-[#000000]"
                >
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
                <a
                  href={profile.cvPath}
                  download
                  className="inline-flex cursor-pointer items-center gap-2 rounded-[100px] border border-[#000000] px-6 py-2.5 font-mono text-[14px] font-medium text-[#000000] transition-colors duration-200 hover:bg-[#000000] hover:text-[#f6f3f1]"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
                <a
                  href="#projects"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-[100px] px-5 py-2.5 font-mono text-[14px] font-medium text-[#797776] transition-colors duration-200 hover:text-[#000000]"
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
                      className="inline-flex cursor-pointer items-center gap-2 rounded-[100px] border border-[#3d3d3d]/30 px-3.5 py-2 font-mono text-[12px] font-medium text-[#4e4d4d] transition-colors duration-200 hover:border-[#000000] hover:text-[#000000]"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right column — headshot photo */}
          <Reveal delay={80} className="order-first lg:order-last">
            <div className="mx-auto w-[220px] sm:w-[280px] lg:mx-0 lg:w-full">
              <div className="overflow-hidden rounded-[8px] border border-[#000000]">
                <Image
                  src="/photo.jpg"
                  alt={`${profile.name} — portrait`}
                  width={380}
                  height={480}
                  priority
                  className="block w-full object-cover grayscale"
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 380px"
                />
              </div>
              <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[-0.2px] text-[#797776] lg:text-left">
                {profile.name}
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
