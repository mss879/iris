"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE_OUT, EASE_IN_OUT } from "@/lib/motion";
import { introPlayed, markIntroPlayed } from "@/lib/intro";
import Logo from "./Logo";

const HOLD_MS = 1900;

/**
 * Opening curtain. The wordmark settles over a drawing rule, then the panel
 * lifts to hand the page over to the hero.
 *
 * The reduced-motion check deliberately does NOT branch during render:
 * `useReducedMotion` reports false on the server and can flip to true on the
 * client, so returning early here would desync hydration. Instead the panel
 * always renders, and the effect dismisses it instantly for those users.
 */
export default function Curtain() {
  const reduced = useReducedMotion();
  // Already seen this session (a client-side return to the homepage): skip.
  const [done, setDone] = useState(introPlayed);

  useEffect(() => {
    if (done) return;
    markIntroPlayed();

    // One timer drives both paths, so state is only set from a callback
    // rather than synchronously inside the effect body. Reduced-motion users
    // get a zero-length hold, which clears the panel on the next tick.
    if (!reduced) document.body.style.overflow = "hidden";

    const timer = setTimeout(
      () => {
        document.body.style.overflow = "";
        setDone(true);
      },
      reduced ? 0 : HOLD_MS
    );

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
    // `done` is only read on the first run; the timer owns it from there.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <>
      {/* Without JS the panel would never lift, so hide it outright. */}
      <noscript>
        <style>{`.curtain { display: none !important; }`}</style>
      </noscript>

      <AnimatePresence>
        {!done && (
          <motion.div
            className="curtain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-100"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: reduced ? 0 : 1.25, ease: EASE_IN_OUT }}
          >
            <motion.div
              className="w-[240px] md:w-[330px]"
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: reduced ? 0 : 1.4,
                ease: EASE_OUT,
                delay: reduced ? 0 : 0.15,
              }}
            >
              <Logo tone="olive" priority />
            </motion.div>

            <motion.p
              className="eyebrow mt-7 text-[9px] text-olive-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7 }}
            >
              Considered Design · Natural Beauty · Modern Femininity
            </motion.p>

            <motion.div
              className="absolute bottom-0 left-0 h-px bg-olive-700/40"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: reduced ? 0 : 1.7, ease: EASE_IN_OUT }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
