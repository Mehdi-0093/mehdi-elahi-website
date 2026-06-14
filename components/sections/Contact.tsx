import { Mail, MapPin } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/data/profile";
import { socialIcons } from "@/components/icons";

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="Contact"
      title="Get in touch"
      intro="Open to internship opportunities, research collaborations, and conversations about hardware/software co-design, verification, and edge-AI systems."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <div className="space-y-8">
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-ink transition-colors hover:text-accent"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-subtle">Email</span>
                  <span className="truncate text-sm">{profile.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-3 text-ink">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-subtle">Location</span>
                  <span className="text-sm">{profile.location}</span>
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted">
              {profile.availability}
            </p>

            <div className="flex flex-wrap gap-2">
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
                    title={s.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
