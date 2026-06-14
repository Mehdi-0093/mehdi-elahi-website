import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { site } from "@/data/site";

/** Structured data (schema.org Person) for researcher/SEO discoverability. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    jobTitle: profile.title,
    description: site.description,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greensboro",
      addressRegion: "NC",
      addressCountry: "US",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "North Carolina A&T State University",
    },
    alumniOf: education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    knowsAbout: [
      "Hardware Verification",
      "Computer Architecture",
      "System-on-Chip",
      "FPGA",
      "Edge AI",
      "Hardware Security",
      "RTL Design",
      "Embedded Systems",
    ],
    sameAs: profile.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
