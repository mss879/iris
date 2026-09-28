"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { SCROLL_SPRING } from "@/lib/motion";

/**
 * A photograph that fills its (positioned) parent and drifts against the
 * scroll on the shared spring — the same weight as the homepage plates.
 *
 * The frame is only over-scanned vertically, and only by as much as the
 * drift needs. Over-scanning on all sides zooms the whole photograph and
 * crops heads off portraits in wide campaign frames.
 */
export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  position = "center",
  strength = 8,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
  /** Total drift, in % of the frame. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const half = strength / 2;
  const rawY = useTransform(scrollYProgress, [0, 1], [`-${half}%`, `${half}%`]);
  const y = useSpring(rawY, SCROLL_SPRING);
  const overscan = `-${half + 0.5}%`;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y, top: overscan, bottom: overscan }}
        className="absolute inset-x-0 will-change-transform"
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
      </motion.div>
    </div>
  );
}
