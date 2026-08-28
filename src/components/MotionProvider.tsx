"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";

/**
 * `reducedMotion="user"` makes Motion honour the OS setting: transform and
 * layout animations are skipped while opacity fades still play, so nothing
 * is left invisible for people who ask for less movement.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  );
}
