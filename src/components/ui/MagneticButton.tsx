/**
 * MagneticButton — wraps children in a button/anchor that:
 *  1. Magnetically follows the cursor within a 40px radius (GSAP quickTo)
 *  2. Emits a radial gradient pulse from cursor position on primary variant
 *  3. Has a subtle scale + glow on hover
 */
"use client";
import { useRef, useEffect, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
  id?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
  "aria-label": ariaLabel,
  id,
}: MagneticButtonProps) {
  const btnRef   = useRef<HTMLElement>(null);
  const xTo      = useRef<ReturnType<typeof gsap.quickTo>>();
  const yTo      = useRef<ReturnType<typeof gsap.quickTo>>();

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    // GSAP quickTo for butter-smooth magnetic follow
    xTo.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    return () => {
      gsap.set(el, { x: 0, y: 0 });
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect   = el.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dist   = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (dist < 80) {
      // Apply magnetic pull (max ±14px)
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      xTo.current?.(dx);
      yTo.current?.(dy);

      // Radial gradient pulse from cursor position (primary only)
      if (variant === "primary") {
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        el.style.setProperty("--mx", `${localX}px`);
        el.style.setProperty("--my", `${localY}px`);
      }
    }
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  const baseStyle: React.CSSProperties =
    variant === "primary"
      ? {
          position: "relative",
          overflow: "hidden",
        }
      : {};

  // Primary variant CSS uses ::before with CSS custom props for glow spot
  const variantClasses: Record<string, string> = {
    primary:
      "inline-flex items-center justify-center rounded-full bg-[var(--indigo)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--glow-indigo)] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "inline-flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-6 py-3 text-sm font-semibold text-[var(--text)] backdrop-blur-md shadow-sm transition-all duration-200 hover:border-[var(--indigo)] hover:scale-[1.02] active:scale-[0.98]",
    ghost:
      "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-[var(--indigo)] transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--indigo)_10%,transparent)] hover:scale-[1.02] active:scale-[0.98]",
  };

  const commonProps = {
    ref: btnRef as React.Ref<HTMLAnchorElement>,
    "data-interactive": true,
    className: `${variantClasses[variant]} ${className}`,
    style: baseStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    "aria-label": ariaLabel,
    id,
  };

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        {...commonProps}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type="button"
    >
      {children}
    </button>
  );
}
