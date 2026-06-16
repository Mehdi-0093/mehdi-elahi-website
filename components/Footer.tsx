import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e8e6dc] bg-[#f0eee6]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-sans text-[18px] font-semibold tracking-[-0.01em] text-[#141413]">
              {profile.name}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#5e5d59]">
              {profile.title} · {profile.subtitle}
            </p>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[#87867f]">
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
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-none border border-[#d1cfc5] text-[#5e5d59] transition-colors duration-200 hover:border-[#141413] hover:bg-[#141413] hover:text-[#faf9f5]"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#d1cfc5] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#87867f]">
            © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex cursor-pointer items-center gap-1.5 font-sans text-[14px] text-[#5e5d59] underline-offset-4 transition-colors duration-200 hover:text-[#141413] hover:underline"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
