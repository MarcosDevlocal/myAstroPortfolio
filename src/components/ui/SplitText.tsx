/**
 * SplitText — animates each character with a staggered spring.
 * Each char slides up from translateY(40px) + opacity(0).
 * Wraps a heading element; preserves words for line-break sanity.
 */
"use client";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number; // overall start delay in seconds
}

const charVariants = {
  hidden: {
    y: 40,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      delay: i * 0.03,
    },
  }),
};

export default function SplitText({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: SplitTextProps) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          style={{ marginRight: "0.28em" }}
        >
          {word.split("").map((char) => {
            const idx = charIndex++;
            return (
              <motion.span
                key={idx}
                custom={idx}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                style={{ display: "inline-block" }}
                // respect prefers-reduced-motion
                transition={{ delay: delay + idx * 0.03 }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
