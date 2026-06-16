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
                className="flex cursor-pointer items-center gap-3 text-[#000000] transition-colors duration-200 hover:text-[#4e4d4d]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-[#000000] text-[#000000]">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] font-medium uppercase tracking-[-0.22px] text-[#797776]">
                    Email
                  </span>
                  <span className="truncate text-[14px] tracking-[-0.28px] text-[#000000]">
                    {profile.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-3 text-[#000000]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-[#000000] text-[#000000]">
                  <MapPin className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block font-mono text-[11px] font-medium uppercase tracking-[-0.22px] text-[#797776]">
                    Location
                  </span>
                  <span className="text-[14px] tracking-[-0.28px] text-[#000000]">
                    {profile.location}
                  </span>
                </span>
              </div>
            </div>

            <p className="text-[14px] leading-[1.35] tracking-[-0.28px] text-[#4e4d4d]">
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
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-[100px] border border-[#000000] text-[#4e4d4d] transition-colors duration-200 hover:bg-[#242424] hover:text-[#f6f3f1] hover:border-[#242424]"
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
