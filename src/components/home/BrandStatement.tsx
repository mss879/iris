"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import Reveal from "../anim/Reveal";
import Figure from "../ui/Figure";
import { ArrowIcon } from "../icons";

/*
  The three pillars, one to a line, each stepping further in so the
  statement reads down and across like a magazine spread rather than
  stacking into a column of capitals. The second word of each carries the
  italic, so the eye lands on design, beauty, femininity.
*/
const PILLARS = [
  { lead: "Considered", accent: "design", indent: "" },
  { lead: "Natural", accent: "beauty", indent: "pl-[6%] md:pl-[13%]" },
  { lead: "Modern", accent: "femininity", indent: "pl-[12%] md:pl-[26%]" },
];

/** The short IrisandMe brand statement that follows the collection image. */
export default function BrandStatement() {
  return (
    <section
      aria-labelledby="statement-title"
      className="relative overflow-hidden bg-cream-100 px-6 py-28 md:px-14 md:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal direction="none">
          <div className="section-index mb-12 text-olive-500 md:mb-16">
            <span className="rule" />
            <span className="eyebrow">The IrisandMe philosophy</span>
          </div>
        </Reveal>

        {/*
          The heading watches the viewport, not the lines: each line starts
          outside its own mask, so it could never register as visible itself.
        */}
        <motion.h2
          id="statement-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
          // Sized so the longest line, indent included, fits a 320px screen.
          className="serif text-[clamp(2.1rem,9.6vw,3.4rem)] leading-[1.04] tracking-[-0.012em] text-olive-800 md:text-[clamp(3.4rem,7.2vw,6.6rem)]"
        >
          {PILLARS.map((p) => (
            // The mask sits a little below the baseline so descenders survive.
            <span key={p.lead} className={`block overflow-hidden pb-[0.12em] ${p.indent}`}>
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "110%" },
                  show: { y: "0%", transition: { duration: 1.5, ease: EASE_OUT } },
                }}
              >
                {p.lead}{" "}
                <em className="font-display-italic font-light italic text-olive-600">
                  {p.accent}
                </em>
                .
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <Reveal className="hidden md:col-span-4 md:block lg:col-span-3">
            <Figure
              src="/img/craft-design.jpg"
              alt="A designer's table with pencil sketches of dresses, olive and cream linen swatches and brass scissors"
              ratio="4/5"
              caption="Every piece begins as a drawing and a length of cloth"
              sizes="(max-width: 1024px) 34vw, 22vw"
            />
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-7 md:col-start-6 md:pt-2 lg:col-span-5 lg:col-start-7">
            <div className="border-t hairline pt-8">
              <p className="max-w-[46ch] font-sans text-[15.5px] leading-[1.95] text-olive-600">
                IrisandMe makes womenswear in linen, cotton and natural fibres — designed in
                Australia, finished with artisan detail, and made to be worn and loved well
                beyond a single season.
              </p>
              <Link
                href="/our-philosophy"
                className="group/ph mt-9 inline-flex items-center gap-4 text-olive-800"
              >
                <span className="eyebrow link-underline text-[10px]">Discover our philosophy</span>
                <ArrowIcon className="h-3 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/ph:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
