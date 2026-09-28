"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, DUR } from "@/lib/motion";

/**
 * Framed photograph with the house reveal: a cream panel scales away from the
 * frame rather than clipping the image, because a clip-path reveal that never
 * fires leaves the photograph hidden for good. Above-the-fold frames
 * (`priority`) skip the panel so they paint immediately.
 */
export default function Figure({
  src,
  alt,
  ratio = "4/5",
  caption,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  position = "center",
  className = "",
  frameClassName = "",
  dark = false,
}: {
  src: string;
  alt: string;
  /** CSS aspect ratio, e.g. "4/5", "3/4", "16/9". */
  ratio?: string;
  caption?: ReactNode;
  priority?: boolean;
  sizes?: string;
  position?: string;
  className?: string;
  frameClassName?: string;
  /** Light caption, for frames set on an olive band. */
  dark?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden bg-cream-200 ${frameClassName}`}
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
        {!priority ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-top bg-cream-200"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: DUR.reveal, ease: EASE_OUT }}
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption
          className={`mt-3.5 font-sans text-[12px] leading-relaxed tracking-[0.04em] ${
            dark ? "text-cream-200/80" : "text-olive-500"
          }`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
