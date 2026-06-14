export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  venue?: string;
  status?: "Published" | "Submitted" | "Deployed";
  link?: ProjectLink;
  metrics?: ProjectMetric[];
}

export const projects: Project[] = [
  {
    name: "SentinelEdge",
    tagline: "Real-time adversarial-thermal defense for SoCs",
    description:
      "An attention-based deep-learning runtime that detects and mitigates adversarial thermal manipulations in System-on-Chips in real time, deployed on NVIDIA Jetson AGX Orin with latency-critical profiling and optimization.",
    tags: ["PyTorch", "Jetson AGX Orin", "Edge AI", "Anomaly Detection", "Attention"],
    year: "2026",
    venue: "ACM TECS",
    status: "Published",
    link: { label: "DOI: 10.1145/3802543", href: "https://doi.org/10.1145/3802543" },
    metrics: [
      { value: "0.044 ms", label: "Avg. latency" },
      { value: "0.90", label: "F1-score" },
    ],
  },
  {
    name: "DriverHammer",
    tagline: "Hardware-assisted RowHammer in DRAM",
    description:
      "A novel RowHammer mechanism that covertly amplifies DRAM wordline drivers to induce bit flips, exposing a new hardware-assisted reliability and security threat in modern memory.",
    tags: ["DRAM", "Hardware Security", "RowHammer", "Circuit Design"],
    year: "2026",
    venue: "IEEE/ACM ICCAD",
    status: "Submitted",
  },
  {
    name: "CREO Edge Testbed Network",
    tagline: "Multi-node isolated-subnet edge-AI testbed",
    description:
      "Architected and deployed a reproducible, secure isolated-subnet testbed providing Linux compute across multiple embedded-AI nodes (NVIDIA Jetson, Xilinx FPGA), with standardized node provisioning for reliable experimentation.",
    tags: ["Linux", "Networking", "Infrastructure", "Jetson", "FPGA"],
    year: "2026",
    venue: "CREO Lab, NC A&T",
    status: "Deployed",
  },
  {
    name: "iThermTroj",
    tagline: "Intermittent thermal trojans in MPSoCs",
    description:
      "Demonstrated intermittent thermal-trojan attacks that exploit on-chip thermal behavior in multi-processor SoCs, characterizing their stealthy, intermittent activation across workloads.",
    tags: ["Hardware Security", "Thermal", "MPSoC"],
    year: "2025",
    venue: "IEEE MWSCAS",
    status: "Published",
    link: {
      label: "DOI: 10.1109/MWSCAS53549.2025.11244435",
      href: "https://doi.org/10.1109/MWSCAS53549.2025.11244435",
    },
  },
  {
    name: "LTD-Router",
    tagline: "Low-latency FPGA Network-on-Chip router",
    description:
      "A low-latency, traffic-distributed FPGA-based Network-on-Chip router architecture that uses dedicated paths to reduce congestion and improve on-chip communication throughput.",
    tags: ["NoC", "FPGA", "Router Architecture", "RTL"],
    year: "2018",
    venue: "IEEE ICEE",
    status: "Published",
    link: {
      label: "DOI: 10.1109/ICEE.2018.8472707",
      href: "https://doi.org/10.1109/ICEE.2018.8472707",
    },
  },
];
