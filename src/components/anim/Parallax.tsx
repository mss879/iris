"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { SCROLL_SPRING } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * Moves its children against the scroll direction as the wrapper travels
 * through the viewport. `speed` is the total drift in viewport-relative %.
 */
export default function Parallax({
  children,
  speed = 12,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `${-speed}%`]);
  const y = useSpring(raw, SCROLL_SPRING);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
