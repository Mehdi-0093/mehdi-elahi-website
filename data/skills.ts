export type SkillIcon =
  | "systems"
  | "languages"
  | "infrastructure"
  | "ml"
  | "simulation"
  | "hardware"
  | "os";

export interface SkillGroup {
  name: string;
  icon: SkillIcon;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    name: "Systems",
    icon: "systems",
    items: [
      "Low-Level Software Engineering",
      "Hardware/Software Co-Design",
      "Computer Architecture",
      "Data Structures & Algorithms",
      "Performance Optimization",
      "Embedded Systems",
      "Multicore & MPSoC",
      "Memory Systems (DRAM)",
    ],
  },
  {
    name: "Languages",
    icon: "languages",
    items: ["SystemVerilog", "Verilog", "VHDL", "Python", "C", "C++", "Bash"],
  },
  {
    name: "Infrastructure",
    icon: "infrastructure",
    items: [
      "Linux",
      "Git",
      "HPC Simulation Workflows",
      "Isolated-Subnet Testbed Networks",
      "Benchmark / Workload Development",
      "Hardware Diagnostics & Log Analysis",
    ],
  },
  {
    name: "ML / AI",
    icon: "ml",
    items: ["PyTorch", "scikit-learn", "NumPy", "Matplotlib"],
  },
  {
    name: "Simulation",
    icon: "simulation",
    items: [
      "Aldec Riviera Pro",
      "Xilinx ISE",
      "Vivado",
      "GEM5",
      "DRAMsim3",
      "Ramulator",
      "HSpice",
      "Xyce",
    ],
  },
  {
    name: "Hardware",
    icon: "hardware",
    items: [
      "NVIDIA Jetson AGX Orin",
      "NVIDIA Jetson Orin Nano",
      "Xilinx FPGA",
      "SPI / UART / I2C",
    ],
  },
  {
    name: "Operating Systems",
    icon: "os",
    items: ["Ubuntu", "Debian", "CentOS", "Windows"],
  },
];
