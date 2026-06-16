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
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <div className="space-y-8">
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex cursor-pointer items-center gap-3 text-[#141413] transition-colors duration-200 hover:text-[#c6613f]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#f0eee6] text-[#141413]">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[#87867f]">
                    Email
                  </span>
                  <span className="truncate text-[14px] text-[#141413]">
                    {profile.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-3 text-[#141413]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#f0eee6] text-[#141413]">
                  <MapPin className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[#87867f]">
                    Location
                  </span>
                  <span className="text-[14px] text-[#141413]">
                    {profile.location}
                  </span>
                </span>
              </div>
            </div>

            <p className="text-[14px] leading-[1.6] text-[#5e5d59]">
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
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-none border border-[#d1cfc5] text-[#5e5d59] transition-colors duration-200 hover:border-[#141413] hover:bg-[#141413] hover:text-[#faf9f5]"
                  >
                    <Icon className="h-[16px] w-[16px]" />
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
