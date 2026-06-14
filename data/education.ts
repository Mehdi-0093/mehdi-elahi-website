export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  specialization?: string;
  lab?: string;
}

export const education: EducationItem[] = [
  {
    school: "North Carolina A&T State University",
    degree: "Ph.D. in Information Technology (Computer Engineering focus)",
    period: "Jan. 2024 – Present",
    location: "Greensboro, NC",
    gpa: "4.0 / 4.0",
    specialization: "Computer Architecture, Hardware Security, Multiprocessor SoC",
    lab: "Center of Excellence in Cybersecurity Research, Education and Outreach (CREO)",
  },
  {
    school: "Iran University of Science and Technology",
    degree: "M.Sc. in Electrical Engineering (Digital Design)",
    period: "2015 – 2018",
    location: "Tehran, Iran",
    gpa: "4.0 / 4.0",
    specialization: "Network-on-Chip, Digital RTL Design, FPGA Architecture",
  },
];
