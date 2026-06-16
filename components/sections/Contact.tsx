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
                className="flex items-center gap-3 text-[#151515] transition-colors hover:text-[#65451d]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-[#333333] text-[#65451d]">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#808080]">
                    Email
                  </span>
                  <span className="truncate text-[14px] text-[#151515]">
                    {profile.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-3 text-[#151515]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-[#333333] text-[#65451d]">
                  <MapPin className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[#808080]">
                    Location
                  </span>
                  <span className="text-[14px] text-[#151515]">
                    {profile.location}
                  </span>
                </span>
              </div>
            </div>

            <p className="text-[14px] leading-[1.6] text-[#3a4444]">
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
                    className="grid h-9 w-9 place-items-center rounded-[100px] border border-[#333333] text-[#3a4444] transition-colors hover:bg-[#151515] hover:text-white hover:border-[#151515]"
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
