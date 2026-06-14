export interface EventItem {
  name: string;
  full: string;
  year: string;
  location?: string;
  role?: string;
}

export const events: EventItem[] = [
  {
    name: "HOST 2026",
    full: "IEEE Intl. Symposium on Hardware Oriented Security and Trust",
    year: "2026",
    location: "Washington, D.C.",
    role: "Live Hardware Demo Presenter",
  },
  {
    name: "ISQED 2025",
    full: "Intl. Symposium on Quality Electronic Design",
    year: "2025",
    location: "San Francisco, CA",
    role: "Paper Presenter",
  },
  {
    name: "MWSCAS 2025",
    full: "IEEE Midwest Symposium on Circuits and Systems",
    year: "2025",
    location: "Lansing, MI",
    role: "Paper Presenter",
  },
  {
    name: "ESWEEK 2024",
    full: "Embedded Systems Week",
    year: "2024",
    location: "Raleigh, NC",
    role: "Attendee",
  },
  {
    name: "ISVLSI 2024",
    full: "IEEE Computer Society Annual Symposium on VLSI",
    year: "2024",
    role: "Paper Presenter",
  },
];
