import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg font-medium">{profile.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {profile.title} · {profile.subtitle}
            </p>
            <p className="mt-1 text-sm text-subtle">{profile.location}</p>
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
                  className="grid h-10 w-10 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. Built with Next.js, Tailwind CSS &amp; Supabase.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
