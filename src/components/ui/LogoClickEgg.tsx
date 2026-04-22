/**
 * LogoClickEgg — click the logo 5 times to trigger an ASCII art terminal popup.
 * Each click adds a visible "+" badge. Popup uses Framer Motion AnimatePresence.
 * Click outside or press Escape to dismiss.
 */
"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ASCII_FRAMES = [
  `
  ███╗   ███╗ █████╗ ██████╗  ██████╗ ██████╗ ███████╗
  ████╗ ████║██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔════╝
  ██╔████╔██║███████║██████╔╝██║     ██║   ██║███████╗
  ██║╚██╔╝██║██╔══██║██╔══██╗██║     ██║   ██║╚════██║
  ██║ ╚═╝ ██║██║  ██║██║  ██║╚██████╗╚██████╔╝███████║
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
  `,
];

const LINES = [
  "$ whoami",
  "> Marcos Lopez Ortego",
  "$ cat mission.txt",
  "> Building calm systems that work.",
  "> Running Konari — tech for people.",
  "$ ls easter-eggs/",
  "> konami.egg  logo-click.egg  [???].egg",
  "$ echo 'You found the secret 🔐'",
  "> You found the secret 🔐",
  "$ _",
];

interface LogoClickEggProps {
  logoId?: string;
}

export default function LogoClickEgg({ logoId = "site-logo" }: LogoClickEggProps) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Listen to click events on the logo element
  useEffect(() => {
    const logo = document.getElementById(logoId);
    if (!logo) return;

    const onClick = () => {
      setCount((c) => {
        const next = c + 1;
        if (next >= 5) {
          setOpen(true);
          setVisibleLines(0);
          return 0;
        }
        return next;
      });
    };

    logo.addEventListener("click", onClick);
    return () => logo.removeEventListener("click", onClick);
  }, [logoId]);

  // Type-out lines one by one when open
  useEffect(() => {
    if (!open) return;
    if (visibleLines >= LINES.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 220);
    return () => clearTimeout(timer);
  }, [open, visibleLines]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  return (
    <>
      {/* Click counter badge — shows near logo */}
      {count > 0 && count < 5 && (
        <span
          aria-hidden="true"
          className="pointer-events-none fixed left-4 top-[4.5rem] z-[8000] rounded-full bg-[var(--indigo)] px-2 py-0.5 font-mono-label text-white shadow-lg"
          style={{ animation: "reveal-up 0.3s ease forwards" }}
        >
          {count}/5
        </span>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[8500] flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <motion.div
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[#0D0D0D] shadow-2xl"
              initial={{ scale: 0.88, y: 20, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.92, y: 10, opacity: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 font-mono-label text-white/40">marcos@portfolio ~ bash</span>
                <button
                  className="ml-auto text-white/40 hover:text-white/80"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  data-interactive
                >
                  ✕
                </button>
              </div>

              {/* ASCII art */}
              <pre className="overflow-x-auto px-4 pt-4 pb-0 font-mono text-[0.55rem] leading-tight text-[var(--indigo)] opacity-80">
                {ASCII_FRAMES[0]}
              </pre>

              {/* Type-out lines */}
              <div className="space-y-1.5 px-4 pb-6 pt-2">
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <p
                    key={i}
                    className={`font-mono text-sm leading-relaxed ${
                      line.startsWith("$")
                        ? "text-[var(--teal)]"
                        : line.startsWith(">")
                        ? "text-white/75"
                        : "text-white/40"
                    }`}
                    style={{ animation: "reveal-soft 0.25s ease forwards" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
