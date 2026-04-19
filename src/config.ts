/**
 * Portfolio content — edit this file to update the site.
 *
 * Skills: add `{ name: "…", category: "…" }` entries (category groups them on the page).
 * You can still use plain strings; they appear under "General".
 *
 * Projects / experience / education: append new objects to the arrays.
 */

export type SkillEntry = string | { name: string; category?: string };

export type Project = {
  name: string;
  description: string;
  link?: string;
  skills?: string[];
};

export type Experience = {
  company: string;
  title: string;
  dateRange: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  dateRange: string;
  achievements: string[];
};

export type KonariConfig = {
  /** Set to empty string to hide the external link button */
  url: string;
  tagline: string;
  mission: string;
  highlights: string[];
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  accentColor: string;
  social: {
    email?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  aboutMe: string;
  skills: SkillEntry[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  konari: KonariConfig;
};

export function normalizeSkill(s: SkillEntry): { name: string; category: string } {
  if (typeof s === "string") return { name: s, category: "General" };
  return { name: s.name, category: s.category?.trim() || "General" };
}

export const siteConfig: SiteConfig = {
  name: "Marcos Lopez Ortego",
  title: "Junior Software Developer",
  description:
    "Backend-focused developer building reliable systems, APIs, and meaningful products — including work with my nonprofit, Konari.",

  accentColor: "#0A84FF",

  social: {
    email: "marcosloport@gmail.com",
    linkedin: "https://www.linkedin.com/in/marcos-l%C3%B3pez-ortego-537736218/",
    github: "https://github.com/MarcosDevLocal",
  },

  aboutMe:
    "I'm a junior software developer from Burgos, Spain, focused on backends that feel calm under pressure: clear APIs, solid data models, and deployments you can trust.\n\nMy path started with curiosity about how systems actually work — Linux, networks, and infrastructure — before moving deeper into engineering. Today I build with Java, Spring Boot, and .NET, and I keep a home lab running so ideas turn into working software, not just slides.\n\nOutside client and coursework projects, I channel energy into Konari, a nonprofit I run to put technology to work for people who need it most.",

  skills: [
    { name: "Java", category: "Languages" },
    { name: "C#", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "Spring Boot", category: "Backend" },
    { name: ".NET", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "SQL", category: "Data" },
    { name: "Power BI", category: "Data" },
    { name: "Docker", category: "Platform" },
    { name: "Linux", category: "Platform" },
    { name: "Git", category: "Platform" },
    { name: "SAP ERP", category: "Business systems" },
    { name: "Odoo ERP", category: "Business systems" },
  ],

  projects: [
    {
      name: "Tourism Observatory Platform",
      description:
        "Data-driven web platform for the University of Burgos to analyze and visualize tourism metrics — interactive dashboards and analytics for stakeholders.",
      link: "https://siotb.powerappsportals.com/",
      skills: ["JavaScript", "Power BI", "REST APIs"],
    },
    {
      name: "ERP integration tooling",
      description:
        "Backend utilities to connect SAP and Odoo workflows — automation and synchronization focused on operational efficiency.",
      skills: ["Python", "Odoo", "SQL"],
    },
    {
      name: "Linux infrastructure lab",
      description:
        "Personal lab for servers, networking, containers, and deployments — where backend services and DevOps ideas get battle-tested.",
      skills: ["Linux", "Docker", "Networking"],
    },
  ],

  experience: [
    {
      company: "HISZPANIA DE LUXE — Warsaw, Poland",
      title: "Software Developer",
      dateRange: "Mar 2026 — Present",
      bullets: [
        "Shipping internal tools that support operations and data workflows.",
        "Maintaining backend APIs that power integrations across teams.",
        "Partnering with stakeholders to turn messy problems into maintainable software.",
      ],
    },
    {
      company: "University of Burgos — Burgos, Spain",
      title: "Web Developer / Data Analyst",
      dateRange: "May 2025 — Jun 2025",
      bullets: [
        "Built the Tourism Observatory experience with Power BI embedded analytics.",
        "Translated research needs into practical tools for exploration and reporting.",
        "Improved data structure and visualization quality for decision-makers.",
      ],
    },
    {
      company: "IP365 — Burgos, Spain",
      title: "IT Technician",
      dateRange: "Mar 2024 — Jun 2024",
      bullets: [
        "Supported networking, hardware, and enterprise software environments.",
        "Helped maintain internal infrastructure and services.",
        "Owned troubleshooting cycles from triage to resolution.",
      ],
    },
  ],

  education: [
    {
      school: "CE Santamaría La Nueva y San José Artesano — Burgos, Spain",
      degree: "Higher Technician in Multiplatform Application Development (DAM)",
      dateRange: "2024 — 2026",
      achievements: [
        "Backend specialization with Java and Spring Boot",
        "Multiple full-stack and backend projects delivered end-to-end",
        "Databases, enterprise patterns, and system architecture coursework",
      ],
    },
    {
      school: "CE Colegio Círculo Católico de Obreros — Burgos, Spain",
      degree: "Technician in Microcomputer Systems and Networks (SMR)",
      dateRange: "2022 — 2024",
      achievements: [
        "Networking, administration, and infrastructure fundamentals",
        "Hands-on Linux and network configuration",
        "Strong troubleshooting and systems mindset",
      ],
    },
  ],

  konari: {
    url: "",
    tagline: "Technology with a heartbeat",
    mission:
      "Konari is the nonprofit I lead — a space where we aim technology at real human needs: access, education, and practical support for communities that are often left behind by default product roadmaps.",
    highlights: [
      "Volunteer-driven initiatives with clear outcomes",
      "Open, ethical use of software and data",
      "Partnerships that prioritize dignity over optics",
    ],
  },
};
