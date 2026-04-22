/**
 * InfiniteMarquee — two rows of items scrolling in opposite directions.
 * Row 1: left (25s), Row 2: right (35s).
 * Items are glass pill badges; scale on hover pauses marquee.
 */
"use client";

interface MarqueeProps {
  items: string[];
  /** Whether to show both rows or just one */
  rows?: 1 | 2;
}

function Row({ items, dir }: { items: string[]; dir: "left" | "right" }) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track marquee-track--${dir}`}
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="glass-chip inline-flex shrink-0 items-center rounded-full px-4 py-1.5 text-sm font-medium text-[var(--text)] transition-transform duration-300 hover:scale-[1.08]"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function InfiniteMarquee({ items, rows = 2 }: MarqueeProps) {
  return (
    <div className="space-y-3 overflow-hidden" aria-hidden="true">
      <Row items={items} dir="left" />
      {rows === 2 && <Row items={[...items].reverse()} dir="right" />}
    </div>
  );
}
