"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { EASE_OUT, DUR, SCROLL_SPRING } from "@/lib/motion";
import { introPlayed } from "@/lib/intro";

const LINES = [["The", "Linen"], ["Edit"]];

// Curtain lifts at ~1.75s; the hero copy follows it in. When the curtain has
// already played this session, the copy arrives straight away instead.
const AFTER_CURTAIN = 1.5;

/**
 * The collection image: a single full-bleed frame of the new collection. The
 * photograph drifts and scales on a scroll track while the copy sits in the
 * negative space to the left.
 */
export default function Hero() {
  const [enterAt] = useState(() => (introPlayed() ? 0.15 : AFTER_CURTAIN));
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const scale = useSpring(rawScale, SCROLL_SPRING);
  const rawImgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imgY = useSpring(rawImgY, SCROLL_SPRING);

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.34, 0.6]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="on-dark relative h-[100svh] w-full overflow-hidden bg-olive-900"
    >
      <motion.div style={{ scale, y: imgY }} className="absolute inset-0 will-change-transform">
        {/* Slow settle out of over-scale once the curtain clears. */}
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE_OUT, delay: Math.max(0, enterAt - 0.35) }}
        >
          <Image
            src="/img/col-linen.jpg"
            alt="A woman in a cream linen shirt dress walking through tall golden coastal grasses"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] md:object-center"
          />
        </motion.div>
      </motion.div>

      {/* Legibility: a base wash plus a heavier gradient under the copy side. */}
      <motion.div style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-olive-950" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-olive-950/70 via-olive-950/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-olive-950/60 to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 text-cream-50 md:px-14"
      >
        <div className="w-full max-w-[34rem] sm:max-w-[44rem] lg:max-w-[52rem]">
          <div className="mb-7 flex items-center gap-4 overflow-hidden">
            <motion.span
              className="block h-px w-12 bg-cream-50/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DUR.base, ease: EASE_OUT, delay: enterAt + 0.1 }}
              style={{ transformOrigin: "left" }}
            />
            <motion.p
              className="eyebrow whitespace-nowrap text-cream-100/90"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, ease: EASE_OUT, delay: enterAt + 0.15 }}
            >
              The New Collection
            </motion.p>
          </div>

          <h1 id="hero-title" className="display text-[clamp(3rem,8.2vw,7.2rem)] leading-[0.9]">
            {LINES.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.5,
                    ease: EASE_OUT,
                    delay: enterAt + 0.2 + lineIndex * 0.13,
                  }}
                >
                  {line.join(" ")}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-[34ch] font-sans text-[14px] leading-[1.9] text-cream-100/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: enterAt + 0.5 }}
          >
            Washed linen in raw cream and deep olive — relaxed shirts, wrap
            dresses and wide trousers, made to soften with every wear.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: enterAt + 0.62 }}
          >
            <Link href="/collections/the-linen-edit" className="btn btn-light mt-11 px-12">
              <span className="eyebrow">Shop New Collection</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 right-6 z-10 hidden items-center gap-4 text-cream-50/80 md:right-14 md:flex"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <div className="relative h-14 w-px overflow-hidden bg-cream-50/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-cream-50"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.4, repeat: 4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
