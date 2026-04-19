"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function ContainerScroll({ titleComponent, children, className, innerClassName }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.72, 0.92] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex h-[48rem] items-center justify-center p-2 md:h-[64rem] md:p-16", className)}
    >
      <div
        className={cn("relative w-full py-10 md:py-32", innerClassName)}
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-10 h-[26rem] w-full max-w-5xl rounded-[30px] border border-white/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-[10px] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.75)] ring-1 ring-white/10 md:-mt-12 md:h-[36rem] md:p-[14px]"
    >
      <div className="h-full w-full overflow-hidden rounded-[22px] border border-white/10 bg-zinc-100/95 shadow-inner shadow-black/20 backdrop-blur-md md:rounded-[22px] md:p-4 dark:bg-zinc-950/90">
        {children}
      </div>
    </motion.div>
  );
}
