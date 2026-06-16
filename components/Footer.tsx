import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-sans text-[20px] font-light tracking-[-0.04em] text-white">
              {profile.name}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/55">
              {profile.title} · {profile.subtitle}
            </p>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-white/40">
              {profile.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-none border border-white/15 text-white/55 transition-colors duration-200 hover:border-white hover:text-white"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/40">
            © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex cursor-pointer items-center gap-1.5 border-b border-transparent pb-0.5 font-mono text-[12px] uppercase tracking-[0.1em] text-white/55 transition-colors duration-200 hover:border-white hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
