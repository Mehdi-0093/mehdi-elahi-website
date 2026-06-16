import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#000000] bg-[#f6f3f1]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-[18px] font-normal tracking-[-0.02em] text-[#000000]">
              {profile.name}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed tracking-[-0.28px] text-[#4e4d4d]">
              {profile.title} · {profile.subtitle}
            </p>
            <p className="mt-1 font-mono text-[12px] text-[#797776]">{profile.location}</p>
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
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-[100px] border border-[#000000] text-[#4e4d4d] transition-colors duration-200 hover:bg-[#242424] hover:text-[#f6f3f1] hover:border-[#242424]"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#000000] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[12px] text-[#797776]">
            © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[12px] text-[#797776] transition-colors duration-200 hover:text-[#000000]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
