import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e6e1] bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-sans text-[15px] font-medium tracking-[-0.03em] text-[#151515]">
              {profile.name.toUpperCase()}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#3a4444]">
              {profile.title} · {profile.subtitle}
            </p>
            <p className="mt-1 text-[13px] text-[#808080]">{profile.location}</p>
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
                  className="grid h-9 w-9 place-items-center rounded-[100px] border border-[#333333] text-[#3a4444] transition-colors hover:bg-[#151515] hover:text-white hover:border-[#151515]"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#e5e6e1] pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-[#808080]">
            © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#808080] transition-colors hover:text-[#151515]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
