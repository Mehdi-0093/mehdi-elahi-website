export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "SystemVerilog RTL Verification",
    org: "Hands-On Verification & Low-Level Testing",
    period: "2025 – Present",
    location: "Greensboro, NC",
    bullets: [
      "Designed SystemVerilog verification environments for foundational RTL components including D Flip-Flop and FIFO, validating reset behavior, timing edge cases, and depth-boundary conditions through directed and randomized test scenarios.",
      "Built protocol-level verification environments for APB, AXI, and AHB bus-memory interfaces, covering read/write transactions, wait-state handling, and back-pressure conditions across multiple master–slave configurations.",
      "Developed object-oriented testbenches leveraging SystemVerilog interfaces, inter-process communication (IPC) via mailboxes and semaphores, and constrained randomization to maximize stimulus coverage while maintaining reproducibility.",
      "Implemented verification environments for SPI, UART, and I2C serial protocols, validating functional correctness across full-duplex, half-duplex, and multi-device configurations under varied clock and baud-rate settings.",
      "Practiced simulation-driven debugging workflows — analyzing waveforms, isolating protocol violations, and iterating on DUT behavior — building hands-on intuition for pre-silicon functional validation across heterogeneous design-under-test environments.",
    ],
    tags: ["SystemVerilog", "APB / AXI / AHB", "SPI / UART / I2C", "Constrained Randomization"],
  },
  {
    role: "Graduate Research Assistant",
    org: "CREO Lab, NC A&T State University",
    period: "Jan. 2024 – Present",
    location: "Greensboro, NC",
    bullets: [
      "Simulation & Evaluation Infrastructure — Built simulation and evaluation infrastructure for multicore and MPSoC systems in C/C++ and Python, including benchmark development, workload analysis, and validation of hardware behavior against expected results, using GEM5, DRAMsim3, and Ramulator on Linux compute nodes.",
      "Low-Latency Edge Inference (SentinelEdge) — Built and deployed an attention-based deep-learning inference runtime for real-time anomaly detection, achieving up to 0.90 F1-score at 0.044 ms average inference latency on NVIDIA Jetson AGX Orin; implemented in Python/PyTorch with latency-critical profiling and optimization. Published in ACM TECS, Jan. 2026.",
    ],
    tags: ["GEM5", "DRAMsim3", "Ramulator", "PyTorch", "Jetson AGX Orin"],
  },
  {
    role: "Edge-Layer Network / Infrastructure Development",
    org: "CREO Lab — NC A&T State University",
    period: "Spring 2026",
    location: "Greensboro, NC",
    bullets: [
      "Architected and deployed the CREO Edge Testbed Network with isolated-subnet infrastructure, providing reproducible, secure Linux compute for experimentation across multiple embedded-AI nodes (NVIDIA Jetson, Xilinx FPGA).",
      "Standardized node provisioning and configuration so researchers could iterate faster and run experiments more reliably.",
    ],
    tags: ["Linux", "Networking", "Provisioning", "Embedded-AI Nodes"],
  },
  {
    role: "Workshop Instructor & Teaching Assistant",
    org: "CREO Lab / VICEROY Scholars; Computer System Security Course",
    period: "Sep. 2025 – Mar. 2026",
    location: "Greensboro, NC",
    bullets: [
      "Designed and delivered a 7-session hardware-verification curriculum (UVM methodology, hands-on FPGA projects), demonstrating strong communication and collaboration with student engineers.",
      "Presented a live adversarial hardware demo at HOST 2026 (IEEE Intl. Symp. on Hardware Oriented Security & Trust), communicating low-level system behavior to a technical audience.",
    ],
    tags: ["Teaching", "UVM", "FPGA", "HOST 2026"],
  },
  {
    role: "Digital Design Engineer",
    org: "Digital Design and Hardware Development",
    period: "Feb. 2022 – Nov. 2023",
    bullets: [
      "Implemented digital-hardware projects (FFT-based frequency estimation, FIR/IIR filters, pipelined architectures) and designed Network-on-Chip router architectures, applying algorithm design and hardware/software co-design.",
    ],
    tags: ["RTL", "DSP", "Network-on-Chip", "Pipelining"],
  },
];
