"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Drives the page with Lenis so scroll-linked animations read as weighted
 * rather than snappy. Skipped entirely when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      // lerp gives a more even glide than a fixed duration, which is what
      // makes long scrolls feel weighted rather than elastic.
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
