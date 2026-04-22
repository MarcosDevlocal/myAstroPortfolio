/**
 * AuroraBackground — 4 large blurred colour orbs drifting at different speeds.
 * Pure CSS keyframes, no Three.js. Positioned fixed behind all content.
 * Uses CSS custom properties from global.css for orb colours.
 */
"use client";
import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After mount, fade in smoothly
    if (containerRef.current) {
      containerRef.current.style.opacity = "1";
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0, transition: "opacity 1.5s ease" }}
    >
      {/* Orb A — indigo, top-left, 15s */}
      <div
        className="aurora-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "-10%",
          left: "-8%",
          background: "var(--orb-a)",
          animationName: "orb-drift-a",
          animationDuration: "15s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* Orb B — teal, top-right, 22s */}
      <div
        className="aurora-orb"
        style={{
          width: "420px",
          height: "420px",
          top: "5%",
          right: "-5%",
          background: "var(--orb-b)",
          animationName: "orb-drift-b",
          animationDuration: "22s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* Orb C — rose, bottom-center, 28s */}
      <div
        className="aurora-orb"
        style={{
          width: "380px",
          height: "380px",
          bottom: "10%",
          left: "30%",
          background: "var(--orb-c)",
          animationName: "orb-drift-c",
          animationDuration: "28s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* Orb D — violet, mid-left, 19s */}
      <div
        className="aurora-orb"
        style={{
          width: "320px",
          height: "320px",
          top: "45%",
          left: "5%",
          background: "var(--orb-d)",
          animationName: "orb-drift-d",
          animationDuration: "19s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* Subtle radial darkening overlay to prevent orbs washing out text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--bg) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
