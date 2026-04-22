/**
 * KonamiEasterEgg — listens for ↑↑↓↓←→←→BA.
 * Triggers a full-screen "ball pit" of coloured circles with CSS animations.
 * Auto-dismisses after 4 seconds.
 */
"use client";
import { useEffect, useState, useCallback, useRef } from "react";

const SEQUENCE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

const COLOURS = [
  "#6366F1","#14B8A6","#F43F5E","#F59E0B",
  "#8B5CF6","#3B82F6","#EC4899","#10B981",
];

interface Ball {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  spin: number;
}

function makeBalls(n = 55): Ball[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 16 + Math.random() * 40,
    color: COLOURS[i % COLOURS.length],
    delay: Math.random() * 0.8,
    duration: 1.8 + Math.random() * 1.2,
    spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360),
  }));
}

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [balls, setBalls] = useState<Ball[]>([]);
  const bufRef = useRef<string[]>([]);

  const trigger = useCallback(() => {
    setBalls(makeBalls());
    setActive(true);
    setTimeout(() => setActive(false), 4500);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      bufRef.current = [...bufRef.current, e.key].slice(-SEQUENCE.length);
      if (bufRef.current.join(",") === SEQUENCE.join(",")) {
        bufRef.current = [];
        trigger();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9000] overflow-hidden"
      aria-hidden="true"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <p className="font-mono-label text-white/60 tracking-widest">↑↑↓↓←→←→BA</p>
        <p className="text-2xl font-bold text-white drop-shadow-lg">Easter egg unlocked 🎉</p>
      </div>

      {/* CSS ball pit */}
      {balls.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: "-70px",
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            boxShadow: `0 0 ${b.size * 0.5}px ${b.color}99`,
            animation: `ball-fall ${b.duration}s ${b.delay}s cubic-bezier(0.4,0,1,1) both`,
          }}
        />
      ))}

      <style>{`
        @keyframes ball-fall {
          from { transform: translateY(0) rotate(0deg); opacity:1; }
          to   { transform: translateY(115vh) rotate(${720}deg); opacity:0.15; }
        }
      `}</style>
    </div>
  );
}
