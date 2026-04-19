"use client";

import { BarChart3, Building2, GraduationCap, Heart, School } from "lucide-react";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "SMR — Burgos",
    date: "2022 — 2024",
    content: "Microcomputer systems & networks: Linux, infrastructure, and the discipline of keeping services online.",
    category: "Education",
    icon: School,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "DAM — Burgos",
    date: "2024 — 2026",
    content: "Multiplatform development with a backend spine — Java, Spring Boot, databases, and shipping real projects.",
    category: "Education",
    icon: GraduationCap,
    relatedIds: [1, 3, 5],
    status: "in-progress" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "University of Burgos",
    date: "May — Jun 2025",
    content: "Tourism Observatory platform — dashboards, data modeling, and turning research into usable software.",
    category: "Internship",
    icon: BarChart3,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 72,
  },
  {
    id: 4,
    title: "Warsaw — Developer",
    date: "Mar 2026 — Present",
    content: "Internal tools and APIs at HISZPANIA DE LUXE — shipping software that supports real operations across teams.",
    category: "Work",
    icon: Building2,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 64,
  },
  {
    id: 5,
    title: "Konari nonprofit",
    date: "Ongoing",
    content: "Leading Konari — technology aimed at access, education, and dignity for communities often left behind.",
    category: "Mission",
    icon: Heart,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 92,
  },
];

export default function CareerJourney() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
