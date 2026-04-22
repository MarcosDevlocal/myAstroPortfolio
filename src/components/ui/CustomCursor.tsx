/**
 * CustomCursor — replaces the default cursor with:
 *   • An 8px glass dot that follows the mouse exactly
 *   • A 44px frosted ring that lags behind with lerp(0.15)
 * Hides on touch devices. Expands ring on [data-interactive] hover.
 * Changes to thin bar on text hover.
 */
"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current lerped ring position
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    // Target (mouse) position
    let mx = rx;
    let my = ry;
    // Lerp factor — smaller = more lag
    const LERP = 0.14;
    let raf: number;
    let visible = false;

    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      // Dot follows immediately
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const loop = () => {
      // Lerp ring toward mouse
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      ring.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expand ring on interactive elements
    const onEnterInteractive = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("[data-interactive], a, button, input, textarea, select, [role='button']")) {
        ring.classList.add("is-expanded");
      }
    };
    const onLeaveInteractive = (e: MouseEvent) => {
      const el = e.relatedTarget as Element | null;
      if (!el?.closest("[data-interactive], a, button, input, textarea, select, [role='button']")) {
        ring.classList.remove("is-expanded");
      }
    };

    // Text cursor when hovering text nodes
    const onEnterText = (e: MouseEvent) => {
      const el = e.target as Element;
      const tag = el.tagName?.toLowerCase();
      if (["p","span","h1","h2","h3","h4","li","label"].includes(tag)) {
        ring.classList.add("is-text");
      }
    };
    const onLeaveText = () => {
      ring.classList.remove("is-text");
    };

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mouseover",  onEnterInteractive, { passive: true });
    document.addEventListener("mouseout",   onLeaveInteractive, { passive: true });
    document.addEventListener("mouseover",  onEnterText, { passive: true });
    document.addEventListener("mouseout",   onLeaveText, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onEnterInteractive);
      document.removeEventListener("mouseout",   onLeaveInteractive);
      document.removeEventListener("mouseover",  onEnterText);
      document.removeEventListener("mouseout",   onLeaveText);
    };
  }, []);

  return (
    <>
      {/* Glass dot — exact mouse position */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      {/* Frosted ring — lagged */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
