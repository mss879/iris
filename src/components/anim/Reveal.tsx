"use client";

import { motion, type Variants } from "motion/react";
import { EASE_OUT, DUR } from "@/lib/motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 56 },
  down: { x: 0, y: -56 },
  left: { x: 64, y: 0 },
  right: { x: -64, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fades + slides its children in the first time they scroll into view.
 * `stagger` turns direct children into a sequenced group.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = DUR.slow,
  stagger,
  className,
  amount = 0.25,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  amount?: number;
}) {
  const { x, y } = offset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EASE_OUT,
        ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** A single item inside a <Reveal stagger={...}> group. */
export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const { x, y } = offset[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x, y },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: DUR.slow, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
