"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials } from "@/lib/products";
import { EASE_OUT } from "@/lib/motion";
import Reveal from "./anim/Reveal";

const INTERVAL = 7000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[i];

  return (
    <section
      className="bg-cream-200 px-6 py-28 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1000px] text-center">
        <Reveal direction="none">
          <div className="section-index mb-12 justify-center text-olive-400">
            <span className="eyebrow">06</span>
            <span className="rule" />
            <span className="eyebrow">In their words</span>
          </div>
        </Reveal>

        {/* Fixed minimum height so the dots never jump between quote lengths. */}
        <div className="relative flex min-h-[16rem] items-center justify-center sm:min-h-[14rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <blockquote className="serif text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.32] text-olive-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-9">
                <p className="eyebrow text-olive-600">{t.name}</p>
                <p className="mt-2 font-sans text-[12px] tracking-[0.1em] text-olive-400">
                  {t.detail}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              onClick={() => setI(index)}
              aria-label={`Show review ${index + 1} of ${testimonials.length}`}
              aria-current={index === i}
              className="group/dot p-2"
            >
              <span
                className={`block h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  index === i
                    ? "w-12 bg-olive-700"
                    : "w-6 bg-olive-700/25 group-hover/dot:bg-olive-700/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
