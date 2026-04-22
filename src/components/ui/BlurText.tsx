/**
 * BlurText — animates each word with a staggered blur-in effect.
 * blur(8px) → blur(0) + opacity 0 → 1, per word, staggered by 0.06s.
 */
"use client";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  as?: "p" | "span" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
}

const wordVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 12,
  },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.06,
    },
  }),
};

export default function BlurText({
  text,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.06,
}: BlurTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block", marginRight: "0.28em" }}
          transition={{ delay: delay + i * stagger }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
