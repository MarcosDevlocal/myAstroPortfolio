/**
 * TiltCard — 3D perspective tilt card that follows the cursor.
 * Uses Framer Motion useMotionValue + useSpring for rotateX/Y.
 * Includes a radial "spotlight" gradient that chases the cursor.
 */
"use client";
import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 8
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glowColor = "rgba(99,102,241,0.18)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw motion values (−1 to 1 normalised)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-damped rotation
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 22,
  });

  // Spotlight position (percent)
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1; // -1..1
    const ny = ((e.clientY - rect.top ) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
    spotX.set(((e.clientX - rect.left) / rect.width)  * 100);
    spotY.set(((e.clientY - rect.top ) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    spotX.set(50);
    spotY.set(50);
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        className={`relative will-change-transform ${className}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Spotlight overlay */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle 240px at ${spotX}% ${spotY}%, ${glowColor}, transparent 70%)`,
            opacity: 0.8,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}
