"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Trailing ring cursor. It lags the pointer on a spring, opens up over links,
 * and turns into a labelled disc over anything marked `data-cursor="view"`.
 *
 * The native cursor is hidden from JS rather than CSS on purpose: if this
 * component never mounts, the page is still left with a usable pointer.
 */
const FINE = "(pointer: fine)";

export default function Cursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "view">("idle");

  /*
    Pointer capability is external state, so it is read through a store rather
    than assigned in an effect. The server snapshot is `false`, which keeps the
    ring out of the SSR output and lets hydration add it only where it belongs.
  */
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(FINE);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const fine = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE).matches,
    () => false
  );

  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 380, damping: 34, mass: 0.42 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    // Touch and coarse pointers get nothing — a trailing ring there is noise.
    if (!enabled) return;
    document.documentElement.style.cursor = "none";

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, input, [data-cursor]"
      ) as HTMLElement | null;

      if (!el) return setMode("idle");
      setMode(el.dataset.cursor === "view" ? "view" : "link");
    };

    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 86 : mode === "link" ? 54 : 26;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full will-change-transform"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor:
          mode === "view" ? "rgba(44,51,31,0.92)" : "rgba(44,51,31,0)",
        borderColor:
          mode === "idle" ? "rgba(44,51,31,0.55)" : "rgba(44,51,31,0.75)",
      }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute inset-0 rounded-full border border-[inherit]" style={{ borderColor: "inherit" }} />
      <motion.span
        className="eyebrow text-[9px] text-cream-50"
        animate={{ opacity: mode === "view" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
