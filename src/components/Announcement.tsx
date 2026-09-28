"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FREE_SHIPPING_AU, formatPrice } from "@/lib/site";

const messages = [
  `Complimentary AU shipping over ${formatPrice(FREE_SHIPPING_AU)}`,
  "The Linen Edit — new collection",
  "Now delivering worldwide",
];

/**
 * Utility strip above the main bar. Client Services and order tracking sit
 * at either end so they can be found from any page, immediately. The message
 * rotation can be paused (WCAG 2.2.2), and never auto-advances for people who
 * ask for reduced motion.
 */
export default function Announcement() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const running = !paused && !hovered && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setI((v) => (v + 1) % messages.length), 4600);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div
      className="relative z-[55] bg-olive-800 text-cream-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between gap-4 px-5 md:px-10">
        <Link
          href="/contact"
          className="eyebrow link-underline hidden w-44 shrink-0 text-[9.5px] text-cream-100/85 hover:text-cream-50 md:block"
        >
          Client Services
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
          <div className="relative flex h-9 min-w-0 items-center overflow-hidden" aria-live="off">
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow truncate text-[9.5px] text-cream-100/90"
              >
                {messages[i]}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play announcements" : "Pause announcements"}
            aria-pressed={paused}
            className="grid h-6 w-6 shrink-0 place-items-center text-cream-100/70 transition-colors hover:text-cream-50"
          >
            {paused ? (
              <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden="true" fill="currentColor">
                <path d="M2 1l7 4-7 4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden="true" fill="currentColor">
                <path d="M2 1h2v8H2zM6 1h2v8H6z" />
              </svg>
            )}
          </button>
        </div>

        <Link
          href="/track-order"
          className="eyebrow link-underline hidden w-44 shrink-0 text-right text-[9.5px] text-cream-100/85 hover:text-cream-50 md:block"
        >
          Track My Order
        </Link>
      </div>
    </div>
  );
}
