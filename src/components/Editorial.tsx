"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import SplitWords from "./anim/SplitWords";
import { EASE_OUT, DUR, SCROLL_SPRING } from "@/lib/motion";

/**
 * Full-bleed editorial plate. The photograph drifts and breathes on a spring
 * behind copy that settles into place, so the two layers never move together.
 */
export default function Editorial({
  image,
  alt,
  eyebrow,
  index,
  title,
  body,
  cta = "Read More",
  href,
  align = "left",
  position = "center",
}: {
  image: string;
  alt: string;
  eyebrow: string;
  index: string;
  title: string;
  body?: string;
  cta?: string;
  href: string;
  align?: "left" | "center" | "right";
  /** Focal point, so the subject stays in frame on narrow screens. */
  position?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const y = useSpring(rawY, SCROLL_SPRING);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.26, 1.1, 1.26]);
  const scale = useSpring(rawScale, SCROLL_SPRING);

  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : align === "right"
        ? "items-end text-right ml-auto"
        : "items-start text-left";

  const scrim =
    align === "right"
      ? "bg-gradient-to-l from-olive-950/72 via-olive-950/22 to-transparent"
      : align === "center"
        ? "bg-olive-950/38"
        : "bg-gradient-to-r from-olive-950/72 via-olive-950/22 to-transparent";

  return (
    <section
      ref={ref}
      className="on-dark relative flex h-[92vh] min-h-[600px] w-full items-center overflow-hidden bg-olive-900"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>

      <div className="absolute inset-0 bg-olive-950/22" />
      <div className={`absolute inset-0 ${scrim}`} />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-14">
        <div
          className={`flex w-full flex-col ${alignment} ${
            // A right-aligned column runs narrower so the copy clears the
            // subject rather than sitting across them.
            align === "right"
              ? "max-w-[30rem] sm:max-w-[34rem] lg:max-w-[38rem]"
              : "max-w-[34rem] sm:max-w-[42rem] lg:max-w-[48rem]"
          }`}
        >
          <motion.div
            className="mb-7 flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
          >
            <span className="eyebrow text-cream-100/55">{index}</span>
            <span className="block h-px w-10 bg-cream-100/35" />
            <span className="eyebrow text-cream-100/90">{eyebrow}</span>
          </motion.div>

          <SplitWords
            text={title}
            className="display text-[clamp(2.6rem,6.6vw,5.4rem)] leading-[0.94] text-cream-50"
          />

          {body ? (
            <motion.p
              className="mt-7 max-w-[40ch] font-sans text-[14px] leading-[1.95] text-cream-100/75"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3, duration: DUR.base, ease: EASE_OUT }}
            >
              {body}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.42, duration: DUR.base, ease: EASE_OUT }}
          >
            <Link href={href} className="btn btn-light mt-10 px-11">
              <span className="eyebrow">{cta}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
