import Image from "next/image";
import { Download, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="relative bg-[#141413] text-[#faf9f5]">
      <div className="mx-auto flex min-h-[82vh] w-full max-w-[1200px] flex-col justify-center px-6 pb-16 pt-[calc(var(--nav-h)+3rem)] sm:px-8 sm:pt-[calc(var(--nav-h)+4rem)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-20">

          {/* Left column — text content */}
          <div>
            {/* Availability — mono metadata label, pure text */}
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-[#d1cfc5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d97757]" />
                Open to 2026–2027 internships
              </span>
            </Reveal>

            {/* Display headline — serif on dark surface */}
            <Reveal delay={60}>
              <h1 className="mt-6 font-serif text-[52px] font-normal leading-[1.04] text-[#faf9f5] sm:text-[72px] lg:text-[88px]">
                {profile.name}
              </h1>
            </Reveal>

            {/* Role — mono metadata */}
            <Reveal delay={120}>
              <p className="mt-6 font-mono text-[12px] uppercase leading-[1.6] tracking-[0.1em] text-[#b0aea5]">
                {profile.title}
                <span className="mx-2 text-[#5e5d59]">/</span>
                {profile.subtitle}
              </p>
            </Reveal>

            {/* Tagline — body text on dark */}
            <Reveal delay={180}>
              <p className="mt-6 max-w-[540px] text-[18px] leading-[1.5] text-[#e8e6dc]">
                {profile.tagline}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-none rounded-b-[8px] bg-[#d97757] px-6 py-3 font-sans text-[14px] font-medium text-[#faf9f5] transition-colors duration-200 hover:bg-[#c6613f]"
                >
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
                <a
                  href={profile.cvPath}
                  download
                  className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-[#faf9f5]/40 px-6 py-3 font-sans text-[14px] font-medium text-[#faf9f5] transition-colors duration-200 hover:bg-[#faf9f5] hover:text-[#141413]"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
                <a
                  href="#projects"
                  className="group inline-flex cursor-pointer items-center gap-2 px-1 py-3 font-sans text-[14px] text-[#e8e6dc] underline-offset-4 transition-colors duration-200 hover:text-[#faf9f5] hover:underline"
                >
                  View projects
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>

            {/* Social links — text links */}
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
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
                      className="inline-flex cursor-pointer items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-[#b0aea5] underline-offset-4 transition-colors duration-200 hover:text-[#faf9f5] hover:underline"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right column — cutout portrait on the dark surface */}
          <Reveal delay={80} className="order-first lg:order-last">
            <div className="mx-auto w-[240px] sm:w-[300px] lg:mx-0 lg:w-full">
              <Image
                src="/photo-cutout.png"
                alt={`${profile.name} — portrait`}
                width={1114}
                height={1383}
                priority
                className="block w-full grayscale"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 380px"
              />
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#87867f] lg:text-left">
                {profile.name}
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
