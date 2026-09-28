"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SCROLL_SPRING } from "@/lib/motion";

/**
 * Full-bleed chapter photograph with a gentle drift on the shared scroll spring.
 *
 * The campaign frames place each model's head within the top few per cent of
 * the picture, so this over-scans by only 3% and travels ±2.5%, anchored to
 * the top edge — enough movement to feel alive without cropping a face.
 */
export default function PlateImage({
  src,
  alt,
  position = "center top",
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  position?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);
  const y = useSpring(rawY, SCROLL_SPRING);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 inset-y-[-3%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
