/**
 * Shared motion language. Everything on the site pulls its easing and timing
 * from here so the whole page settles with the same weight.
 */

// Expo-out. A fast departure and a very long, soft settle — the curve that
// makes motion read as expensive rather than snappy.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const DUR = {
  quick: 0.7,
  base: 1.2,
  slow: 1.6,
  reveal: 1.9,
} as const;

// Spring used for scroll-linked values: heavy enough to lag the scroll
// slightly, damped enough never to wobble.
export const SCROLL_SPRING = {
  stiffness: 70,
  damping: 26,
  mass: 0.55,
  restDelta: 0.0005,
} as const;
