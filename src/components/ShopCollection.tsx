"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products, filters, type FilterKey } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./anim/Reveal";
import SplitWords from "./anim/SplitWords";
import { EASE_OUT, DUR } from "@/lib/motion";

const COLS = 4;

export default function ShopCollection() {
  const [active, setActive] = useState<FilterKey>("new");
  const shown = products.filter((p) => p.tags.includes(active));

  /*
    A filter that returns 5 pieces into a 4-up grid leaves three dead cells.
    Rather than let the row trail off, an editorial panel stretches across
    exactly the remainder so every row closes flush.
  */
  const remainder = shown.length % COLS;
  const fillLg = remainder === 0 ? 0 : COLS - remainder;

  return (
    <section id="shop" className="bg-cream-100 px-6 py-28 md:px-14 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col gap-10 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal direction="none">
              <div className="section-index mb-6 text-olive-400">
                <span className="eyebrow text-olive-300">02</span>
                <span className="rule" />
                <span className="eyebrow">The Edit</span>
              </div>
            </Reveal>
            <SplitWords
              text="The Collection"
              className="display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.94] text-olive-800"
            />
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-wrap gap-x-9 gap-y-4">
              {filters.map((f, i) => (
                <motion.button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.06 * i, duration: DUR.base, ease: EASE_OUT }}
                  className={`eyebrow relative pb-1.5 text-[10px] transition-colors duration-500 ${
                    active === f.key ? "text-olive-800" : "text-olive-300 hover:text-olive-600"
                  }`}
                >
                  {f.label}
                  {active === f.key && (
                    <motion.span
                      layoutId="shop-filter-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-olive-800"
                      transition={{ duration: 0.7, ease: EASE_OUT }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.p
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-sans text-[11px] tracking-[0.14em] text-olive-400"
            >
              {shown.length} {shown.length === 1 ? "piece" : "pieces"}
            </motion.p>
          </div>
        </div>

        <motion.div
          layout
          transition={{ duration: DUR.base, ease: EASE_OUT }}
          className="grid grid-cols-2 gap-x-5 gap-y-16 md:gap-x-7 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </AnimatePresence>

          {fillLg > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.base, ease: EASE_OUT }}
              style={{ "--fill-lg": fillLg } as React.CSSProperties}
              className="hidden lg:block lg:[grid-column:span_var(--fill-lg)/span_var(--fill-lg)]"
            >
              <div className="flex h-full flex-col justify-center border hairline bg-cream-200/60 px-8 py-14 text-center">
                <p className="serif text-[clamp(1.3rem,2.2vw,1.9rem)] leading-snug text-olive-700">
                  Twelve pieces a season.<br />Nothing made to be replaced.
                </p>
                <p className="mx-auto mt-5 max-w-[38ch] font-sans text-[13px] leading-relaxed text-olive-400">
                  We repeat what works and retire what does not, so the edit
                  stays small on purpose.
                </p>
                <a href="#promise" className="eyebrow link-underline mx-auto mt-7 text-[10px] text-olive-600">
                  Read our promise
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>

        <Reveal delay={0.15}>
          <div className="mt-20 flex justify-center">
            <a href="#shop" className="btn btn-dark px-14">
              <span className="eyebrow text-[10px]">Shop All</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
