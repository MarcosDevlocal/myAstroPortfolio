/**
 * Design tokens — single source of truth for colours, spacing, typography,
 * and animation easing curves used across all components.
 */

// ─── Colour palette ───────────────────────────────────────────────────────────

export const colours = {
  /** Deep space background */
  bg: "#0A0A0F",
  bgElevated: "#13131A",

  /** Primary text */
  text: "#F5F5F7",
  textMuted: "#8A8A9A",

  /** Accent trio */
  indigo: "#6366F1",
  teal: "#14B8A6",
  rose: "#F43F5E",

  /** Glass surface */
  glassBorder: "rgba(255,255,255,0.08)",
  glassBg: "rgba(19,19,26,0.72)",

  /** Dark background border */
  border: "rgba(255,255,255,0.08)",
} as const;

// ─── Easing curves ────────────────────────────────────────────────────────────

export const easing = {
  /** Apple spring (bouncy reveals) */
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Apple smooth exit */
  smoothExit: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Standard ease */
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
} as const;

/** Framer Motion spring variant for reveals */
export const springReveal = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

// ─── Spacing ──────────────────────────────────────────────────────────────────

/** 8px base grid */
export const spacing = {
  base: 8,
  section: "clamp(5rem, 10vw, 10rem)",
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  heroSize: "clamp(3.5rem, 8vw, 7rem)",
  heroWeight: 700,
  heroTracking: "-0.04em",
  bodySize: "16px",
  bodyLineHeight: 1.75,
} as const;

// ─── Glow colours per skill category ─────────────────────────────────────────

export const categoryGlow: Record<string, string> = {
  Languages: "#6366F1",       // indigo
  Backend: "#14B8A6",         // teal
  Data: "#F59E0B",            // amber
  Platform: "#3B82F6",        // blue
  "Business systems": "#F43F5E", // rose
  General: "#8B5CF6",         // violet
};
