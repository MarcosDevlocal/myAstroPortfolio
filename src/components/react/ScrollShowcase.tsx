"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ScrollShowcase() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            How I build
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Quiet backends. <br />
            <span className="text-balance text-3xl font-bold tracking-tight text-blue-600 md:text-[4.25rem] md:leading-[1.05] dark:text-blue-400">
              Loud impact.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-zinc-600 md:text-base dark:text-zinc-300">
            Scroll this section — a small nod to depth and motion, without stealing attention from the work itself.
          </p>
        </>
      }
    >
      <img
        src="/images/kanso.png"
        alt="Laptop on a desk with code on screen"
        width={1400}
        height={900}
        className="mx-auto h-full w-full rounded-2xl object-cover object-left-top"
        draggable={false}
        loading="lazy"
      />
    </ContainerScroll>
  );
}
