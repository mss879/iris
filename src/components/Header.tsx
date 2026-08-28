"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import Announcement from "./Announcement";
import Logo from "./Logo";
import { EASE_OUT } from "@/lib/motion";
import { products } from "@/lib/products";

const nav = [
  { label: "Shop All", href: "#shop" },
  { label: "New In", href: "#shop" },
  { label: "Dresses", href: "#shop" },
  { label: "Our Story", href: "#promise" },
  { label: "Journal", href: "#journal" },
];

type Panel = "menu" | "search" | "bag" | null;

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");

  // The bar stays put in both directions — it only swaps from transparent to
  // its solid ground once the hero is behind it.
  useMotionValueEvent(scrollY, "change", (latest) => setSolid(latest > 80));

  // An open panel owns the page: lock the scroll behind it and let Escape close.
  useEffect(() => {
    if (!panel) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  const results = query.trim()
    ? products.filter((p) =>
        `${p.name} ${p.colour} ${p.fabric}`.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "bg-cream-100/92 backdrop-blur-md text-olive-700 border-b hairline"
            : "bg-transparent text-cream-50"
        }`}
      >
        <Announcement />

        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="eyebrow link-underline opacity-90 hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setPanel("menu")}
            className="eyebrow flex items-center gap-2.5 lg:hidden"
            aria-label="Open menu"
          >
            <span className="flex w-4 flex-col gap-[3px]">
              <span className="block h-px w-full bg-current" />
              <span className="block h-px w-full bg-current" />
            </span>
            Menu
          </button>

          {/*
            Both plates are always mounted and crossfaded. Swapping the `src`
            on scroll would flash while the second file decoded.
          */}
          <a
            href="#top"
            aria-label="Iris and Me — home"
            className="absolute left-1/2 w-[124px] -translate-x-1/2 md:w-[152px]"
          >
            <span className="relative block">
              <Logo tone="olive" priority className={`transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
              <span className="absolute inset-0">
                <Logo tone="cream" priority className={`transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
              </span>
            </span>
          </a>

          <div className="flex items-center gap-5">
            <button onClick={() => setPanel("search")} className="eyebrow link-underline hidden sm:block">
              Search
            </button>
            <button className="eyebrow link-underline hidden sm:block">Account</button>
            <button onClick={() => setPanel("bag")} className="eyebrow link-underline">
              Bag (0)
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {panel === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="on-dark fixed inset-0 z-[70] bg-olive-800 text-cream-100"
          >
            <div className="flex h-[76px] items-center justify-between px-5">
              <span className="w-[140px]"><Logo tone="cream" /></span>
              <button onClick={() => setPanel(null)} className="eyebrow" aria-label="Close menu">
                Close
              </button>
            </div>
            <nav className="flex flex-col px-5 pt-8">
              {nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setPanel(null)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i + 0.1, duration: 0.6, ease: EASE_OUT }}
                  className="display flex items-baseline justify-between border-b border-cream-100/15 py-5 text-[32px]"
                >
                  {item.label}
                  <span className="eyebrow text-[10px] text-cream-100/40">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="absolute inset-x-5 bottom-8 flex gap-6">
              {["Instagram", "Pinterest", "Contact"].map((l) => (
                <a key={l} href="#top" className="eyebrow text-[10px] text-cream-200/70">
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {panel === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-cream-100"
          >
            <div className="mx-auto max-w-[900px] px-6 pt-16">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-olive-400">Search</p>
                <button onClick={() => setPanel(null)} className="eyebrow text-olive-600" aria-label="Close search">
                  Close
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
              >
                <label htmlFor="site-search" className="sr-only">Search products</label>
                <input
                  id="site-search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Linen, olive, the Lena Maxi…"
                  className="mt-8 w-full border-b border-olive-700/25 bg-transparent pb-5 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-light text-olive-800 placeholder:text-olive-700/25 focus:border-olive-700 focus:outline-none"
                />
              </motion.div>

              <div className="mt-10">
                {query.trim() === "" ? (
                  <>
                    <p className="eyebrow mb-5 text-olive-400">Popular right now</p>
                    <div className="flex flex-wrap gap-3">
                      {["Linen", "Deep Olive", "Dresses", "The Olive Edit", "Silk"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="eyebrow border hairline px-4 py-2.5 text-[10px] text-olive-600 transition-colors duration-500 hover:bg-olive-800 hover:text-cream-50"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                ) : results.length === 0 ? (
                  <p className="font-sans text-[14px] text-olive-400">
                    Nothing matches “{query}” — try linen, olive or dresses.
                  </p>
                ) : (
                  <ul className="divide-y divide-olive-700/10">
                    {results.map((p) => (
                      <li key={p.slug}>
                        <a href="#shop" onClick={() => setPanel(null)} className="flex items-center justify-between gap-5 py-4">
                          <span className="font-sans text-[13px] uppercase tracking-[0.15em] text-olive-800">
                            {p.name}
                          </span>
                          <span className="font-sans text-[13px] text-olive-500">${p.price}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {panel === "bag" && (
          <motion.aside
            key="bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70]"
            aria-label="Shopping bag"
          >
            <button
              onClick={() => setPanel(null)}
              aria-label="Close bag"
              className="absolute inset-0 bg-olive-950/45 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-cream-100"
            >
              <div className="flex items-center justify-between border-b hairline px-7 py-6">
                <p className="eyebrow text-olive-600">Your bag (0)</p>
                <button onClick={() => setPanel(null)} className="eyebrow text-olive-400" aria-label="Close bag">
                  Close
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
                <p className="serif text-[1.7rem] leading-snug text-olive-700">
                  Your bag is empty
                </p>
                <p className="mt-4 max-w-[30ch] font-sans text-[13px] leading-relaxed text-olive-400">
                  Complimentary shipping on orders over $250, and 30 days to
                  change your mind.
                </p>
                <button onClick={() => setPanel(null)} className="btn btn-dark mt-9 px-10 py-3.5">
                  <span className="eyebrow text-[10px]">Start shopping</span>
                </button>
              </div>

              <div className="border-t hairline px-7 py-6">
                <p className="eyebrow mb-4 text-olive-400">You might like</p>
                <ul className="flex flex-col gap-3">
                  {products.slice(0, 3).map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-4">
                      <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-olive-700">
                        {p.name}
                      </span>
                      <span className="font-sans text-[12px] text-olive-500">${p.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
