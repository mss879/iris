"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { getProduct } from "@/lib/products";
import { search } from "@/lib/search";
import { formatPrice } from "@/lib/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { CloseIcon } from "../icons";

const suggestions = ["Linen", "The Lotus", "Dresses", "Essentials", "Sets", "Returns"];

/** Site search over products, collections and every page, as you type. */
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const results = useMemo(() => search(query), [query]);
  const empty = query.trim() !== "" && results.products.length + results.pages.length === 0;
  useFocusTrap(ref, true, onClose);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-cream-100"
      data-lenis-prevent
    >
      <div className="mx-auto max-w-[960px] px-6 pb-20 pt-12 md:pt-16">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-olive-500">Search</p>
          <button
            type="button"
            onClick={onClose}
            className="eyebrow flex items-center gap-2.5 text-[10px] text-olive-700"
            aria-label="Close search"
          >
            Close <CloseIcon />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
        >
          <label htmlFor="site-search" className="sr-only">
            Search IrisandMe
          </label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Linen, the Lotus print, size guide…"
            autoComplete="off"
            className="mt-8 w-full rounded-none border-b border-olive-700/25 bg-transparent pb-5 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-light text-olive-800 placeholder:text-olive-500/50 focus:border-olive-700 focus:outline-none"
          />
        </motion.div>

        <div className="mt-10" aria-live="polite">
          {query.trim() === "" ? (
            <>
              <p className="eyebrow mb-5 text-[10px] text-olive-500">Try searching for</p>
              <div className="flex flex-wrap gap-3">
                {suggestions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setQuery(s)}
                    className="eyebrow border hairline px-4 py-2.5 text-[10px] text-olive-700 transition-colors duration-500 hover:bg-olive-800 hover:text-cream-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          ) : empty ? (
            <p className="font-sans text-[14px] text-olive-600">
              Nothing matches “{query}”. Try linen, cotton, dresses or a print name — or{" "}
              <Link href="/contact" onClick={onClose} className="underline underline-offset-2">
                ask our team
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
              {results.products.length > 0 ? (
                <section aria-label="Products">
                  <p className="eyebrow mb-4 text-[10px] text-olive-500">
                    Pieces ({results.products.length})
                  </p>
                  <ul className="divide-y divide-olive-700/10 border-y hairline">
                    {results.products.map((r) => {
                      const p = getProduct(r.href.split("/").pop() ?? "");
                      return (
                        <li key={r.href}>
                          <Link href={r.href} onClick={onClose} className="group/sr flex items-center gap-4 py-3">
                            {p ? (
                              <span className="relative block h-16 w-12 shrink-0 overflow-hidden bg-cream-200">
                                <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                              </span>
                            ) : null}
                            <span className="flex-1">
                              <span className="block font-sans text-[12.5px] uppercase tracking-[0.15em] text-olive-800 group-hover/sr:text-olive-500">
                                {r.label}
                              </span>
                              <span className="mt-1 block font-sans text-[12px] text-olive-500">{r.meta}</span>
                            </span>
                            {p ? (
                              <span className="font-sans text-[13px] text-olive-700">{formatPrice(p.price)}</span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}

              {results.pages.length > 0 ? (
                <section aria-label="Pages">
                  <p className="eyebrow mb-4 text-[10px] text-olive-500">Pages</p>
                  <ul className="divide-y divide-olive-700/10 border-y hairline">
                    {results.pages.map((r) => (
                      <li key={r.href + r.label}>
                        <Link href={r.href} onClick={onClose} className="group/sp flex items-baseline justify-between gap-4 py-3.5">
                          <span className="font-sans text-[14px] text-olive-800 group-hover/sp:text-olive-500">{r.label}</span>
                          <span className="eyebrow text-[9px] text-olive-500">{r.meta}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
