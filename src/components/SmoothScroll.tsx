"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** The live Lenis instance, so overlays can pause the page behind them. */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Stop page scrolling while an overlay owns the screen, and restore it after. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}

/**
 * Drives the page with Lenis so scroll-linked animations read as weighted
 * rather than snappy. Skipped entirely when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

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
      // Scrollable panels (menus, the bag, wide tables) scroll natively.
      allowNestedScroll: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A route change moves the window underneath Lenis (to the top, or back to
  // a restored position). Adopt wherever the router left it so an unfinished
  // glide from the previous page can't drag the new one.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis.start();
  }, [pathname]);

  return null;
}
