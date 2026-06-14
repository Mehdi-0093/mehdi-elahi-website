import {
  Mail,
  Phone,
  GraduationCap,
  Cpu,
  Code2,
  Server,
  BrainCircuit,
  Activity,
  CircuitBoard,
  Monitor,
} from "lucide-react";
import type { ElementType } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import type { SocialIcon } from "@/data/profile";
import type { SkillIcon } from "@/data/skills";

export const socialIcons: Record<SocialIcon, ElementType> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  scholar: GraduationCap,
  mail: Mail,
  phone: Phone,
};

export const skillIcons: Record<SkillIcon, ElementType> = {
  systems: Cpu,
  languages: Code2,
  infrastructure: Server,
  ml: BrainCircuit,
  simulation: Activity,
  hardware: CircuitBoard,
  os: Monitor,
};
