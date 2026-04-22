/**
 * GlowCard — glass card that emits a coloured glow on hover.
 * Border and box-shadow animate to the provided glowColor.
 */
"use client";
import { type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  glowColor?: string; // e.g. "rgba(99,102,241,0.5)"
  className?: string;
}

export default function GlowCard({
  children,
  glowColor = "rgba(99,102,241,0.4)",
  className = "",
}: GlowCardProps) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.boxShadow = `0 0 0 1px ${glowColor.replace(/[\d.]+\)$/, "0.6)")}, 0 0 40px -8px ${glowColor}, 0 20px 40px -24px rgba(0,0,0,0.5)`;
    el.style.borderColor = glowColor.replace(/[\d.]+\)$/, "0.5)");
    el.style.transform = "translateY(-3px)";
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.boxShadow = "";
    el.style.borderColor = "";
    el.style.transform = "";
  };

  return (
    <div
      className={`glass-panel rounded-[var(--radius-card)] glow-card ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-interactive
    >
      {children}
    </div>
  );
}
