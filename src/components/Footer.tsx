"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./anim/Reveal";
import Logo from "./Logo";
import { EASE_OUT } from "@/lib/motion";

const columns = [
  { title: "Shop", links: ["New In", "Dresses", "Tops", "Bottoms", "Gift Cards"] },
  { title: "Help", links: ["Shipping", "Returns", "Size Guide", "Garment Care", "Contact"] },
  { title: "About", links: ["Our Promise", "Our Makers", "Journal", "Stockists"] },
];

const assurances = [
  { title: "Complimentary shipping", body: "On every order over $250, Australia-wide." },
  { title: "30 days to decide", body: "Free returns on unworn pieces, no questions." },
  { title: "Repairs for life", body: "We mend anything we made, for as long as you own it." },
];

export default function Footer() {
  const [joined, setJoined] = useState(false);

  return (
    <footer className="on-dark bg-olive-800 text-cream-100">
      {/* Assurance row reads as part of the footer rather than a floating band. */}
      <div className="border-b border-cream-100/12 px-5 py-14 md:px-10">
        <Reveal stagger={0.1} className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 sm:grid-cols-3">
          {assurances.map((a) => (
            <div key={a.title} className="flex flex-col gap-2.5">
              <p className="eyebrow text-[10px] text-olive-200">{a.title}</p>
              <p className="max-w-[34ch] font-sans text-[13px] leading-relaxed text-cream-200/70">
                {a.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="px-5 pb-10 pt-24 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <h2 className="display max-w-[13ch] text-[clamp(2.4rem,8vw,6.5rem)] text-cream-50">
              Handmade pieces for every chapter
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-12 border-t border-cream-100/15 pt-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
            <Reveal>
              <div>
                <p className="eyebrow mb-4 text-olive-200">Join the letter</p>
                <p className="mb-6 max-w-[36ch] font-sans text-[14px] leading-relaxed text-cream-200/80">
                  New pieces, restocks and the occasional story from the workshop.
                  No noise.
                </p>

                <form
                  className="relative flex max-w-[420px] items-center gap-3 border-b border-cream-100/35 pb-3 transition-colors duration-500 focus-within:border-cream-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setJoined(true);
                  }}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Your email"
                    className="w-full bg-transparent font-sans text-[14px] text-cream-50 placeholder:text-cream-200/50 focus:outline-none"
                  />
                  <button type="submit" className="eyebrow link-underline shrink-0 text-cream-50">
                    Join
                  </button>
                </form>

                {/* Reserve the line so confirming the sign-up never shifts the column. */}
                <div className="mt-3 h-5">
                  <AnimatePresence>
                    {joined && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                        className="font-sans text-[12px] tracking-[0.08em] text-olive-200"
                        role="status"
                      >
                        Thank you — welcome to the letter.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>

            {columns.map((col, i) => (
              <Reveal key={col.title} delay={0.08 * (i + 1)}>
                <div>
                  <p className="eyebrow mb-5 text-olive-200">{col.title}</p>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#top"
                          className="link-underline font-sans text-[14px] text-cream-200/85 hover:text-cream-50"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-24 flex justify-center border-t border-cream-100/15 pt-16">
              <div className="w-[min(70vw,620px)] opacity-90">
                <Logo tone="cream" />
              </div>
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mt-16 flex flex-col gap-4 border-t border-cream-100/15 pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-sans text-[12px] text-cream-200/60">
              © {new Date().getFullYear()} Iris and Me. Made slowly.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Instagram", "Pinterest", "Privacy", "Terms"].map((l) => (
                <a
                  key={l}
                  href="#top"
                  className="eyebrow text-[10px] text-cream-200/70 hover:text-cream-50"
                >
                  {l}
                </a>
              ))}
            </div>
            <p className="eyebrow text-[10px] text-cream-200/60">
              Australia — AUD $
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
