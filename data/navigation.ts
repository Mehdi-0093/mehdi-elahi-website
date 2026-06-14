/** In-page section navigation (ids must match each <section id="...">). */
export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
] as const;

export type NavItem = (typeof navItems)[number];
