"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/**
 * Renders a heading as words that rise out of an overflow mask, one after
 * the next, when the block scrolls into view.
 */
export default function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.065,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 1.45, ease: EASE_OUT },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
