"use client";

import { useEffect, useRef } from "react";

/**
 * Soft accent spotlight that follows the pointer — desktop only, skipped when reduced motion is on.
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--gx", `${e.clientX}px`);
      root.style.setProperty("--gy", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block motion-reduce:hidden"
    >
      <div
        className="absolute h-[min(560px,90vw)] w-[min(560px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.22] blur-[100px] transition-opacity duration-700 dark:opacity-[0.18]"
        style={{
          left: "var(--gx, 18%)",
          top: "var(--gy, 22%)",
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--accent) 42%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
