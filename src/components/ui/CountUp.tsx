/**
 * CountUp — counts a number from 0 to `target` with easing when in viewport.
 * Uses IntersectionObserver + requestAnimationFrame for performance.
 */
"use client";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number | string;
  /** e.g. "+" suffix */
  suffix?: string;
  duration?: number; // ms, default 1800
  className?: string;
}

export default function CountUp({
  target,
  suffix = "",
  duration = 1800,
  className = "",
}: CountUpProps) {
  const [display, setDisplay] = useState<string>("0");
  const ref = useRef<HTMLSpanElement>(null);
  const numericTarget = typeof target === "number" ? target : parseFloat(target as string);
  const isNumeric = !isNaN(numericTarget);

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(String(target));
      return;
    }
    const el = ref.current;
    if (!el) return;

    let startTime: number | null = null;
    let raf: number;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericTarget);
      setDisplay(String(current));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(String(numericTarget));
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          raf = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [numericTarget, duration, isNumeric, target]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
