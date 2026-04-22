/**
 * ScrollToTop — FAB that appears after 300px scroll.
 * Arrow morphs to smaller dot on hover. Spring scale animation.
 */
"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      data-interactive
      className={`scroll-top-btn group flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--text-muted)] shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-[var(--indigo)] hover:text-[var(--indigo)] hover:shadow-[0_0_20px_-6px_var(--glow-indigo)] ${visible ? "is-visible" : ""}`}
    >
      {/* Arrow up */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
