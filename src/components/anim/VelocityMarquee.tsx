"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "motion/react";

/**
 * Infinite horizontal marquee whose speed and direction respond to scroll
 * velocity — it drifts when the page is still and surges while scrolling.
 */
export default function VelocityMarquee({
  text,
  baseVelocity = 2.2,
  className = "",
}: {
  text: string;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smooth = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Scroll speed maps onto a multiplier; clamping keeps it from going wild.
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 4], {
    clamp: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);

  // Four copies means the -25% wrap point always lands on identical content.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div className="inline-flex whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block shrink-0 pr-[3vw]" aria-hidden={i > 0}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
