"use client";

import { useEffect, useState } from "react";

import { Globe } from "@/components/ui/cobe-globe";

/** Burgos, Spain — city center approx. */
const BURGOS: [number, number] = [42.3439, -3.6969];
/** Warsaw, Poland — city center approx. */
const WARSAW: [number, number] = [52.2297, 21.0122];

export default function PortfolioGlobe() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setIsDark(root.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <Globe
      className="mx-auto w-full max-w-[260px] sm:max-w-[300px]"
      markers={[
        { id: "burgos", location: BURGOS, label: "Burgos, ES" },
        { id: "warsaw", location: WARSAW, label: "Warsaw, PL" },
      ]}
      arcs={[{ id: "burgos-warsaw", from: BURGOS, to: WARSAW, label: "Burgos → Warsaw" }]}
      dark={isDark ? 1 : 0}
      baseColor={isDark ? [0.07, 0.07, 0.09] : [1, 1, 1]}
      mapBrightness={isDark ? 5.5 : 10}
      markerColor={[0.04, 0.52, 1]}
      arcColor={[0.04, 0.52, 1]}
      glowColor={isDark ? [0.18, 0.2, 0.26] : [0.94, 0.93, 0.91]}
      speed={0.0025}
    />
  );
}
