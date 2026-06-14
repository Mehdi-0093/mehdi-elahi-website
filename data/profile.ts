export type SocialIcon = "linkedin" | "github" | "scholar" | "mail" | "phone";

export interface Social {
  label: string;
  href: string;
  handle: string;
  icon: SocialIcon;
}

export const profile = {
  name: "Mehdi Elahi",
  firstName: "Mehdi",
  lastName: "Elahi",
  initials: "ME",
  title: "SoC Performance Researcher",
  subtitle: "Hardware Verification & System Optimization",
  tagline:
    "Ph.D. researcher in Computer Engineering focused on hardware/software co-design, low-level systems, and latency-critical edge-AI.",
  location: "Greensboro, NC",
  email: "melahi@aggies.ncat.edu",
  phone: "+1 336-253-3440",
  phoneHref: "tel:+13362533440",
  availability:
    "Seeking a 2026–2027 internship in hardware/software co-design or design verification roles.",
  cvPath: "/Mehdi_Elahi__CV.pdf",
  summary: [
    "Ph.D. researcher in Computer Engineering and Information Technology specializing in hardware/software co-design, low-level software engineering, and latency-critical edge-AI systems.",
    "Hands-on C, C++, and Python developer across the full stack — from RTL and microarchitectural simulation of multicore and MPSoC systems to deployed production runtimes. Architected the multi-node CREO Edge Testbed Network and shipped SentinelEdge, a real-time inference system on NVIDIA Jetson AGX Orin at 0.044 ms latency, published in ACM TECS 2026.",
    "Fluent in Linux, hardware diagnostics, and building systems-level tools.",
  ],
  highlights: [
    { value: "0.044 ms", label: "Edge inference latency on Jetson AGX Orin" },
    { value: "0.90", label: "F1-score, real-time anomaly detection" },
    { value: "4.0 / 4.0", label: "Ph.D. GPA" },
    { value: "5", label: "Conferences & symposia" },
  ],
  socials: [
    {
      label: "Email",
      href: "mailto:melahi@aggies.ncat.edu",
      handle: "melahi@aggies.ncat.edu",
      icon: "mail",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/mehdi-elahi",
      handle: "in/mehdi-elahi",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/Mehdi-0093",
      handle: "Mehdi-0093",
      icon: "github",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=2lzsdf0AAAAJ&hl=en",
      handle: "Google Scholar",
      icon: "scholar",
    },
  ] satisfies Social[],
} as const;
