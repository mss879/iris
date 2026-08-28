"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { ugc } from "@/lib/products";
import { EASE_OUT } from "@/lib/motion";

/**
 * Each card reads its own position on screen every frame and drives its own
 * transforms from it, rather than being handed a value from the track. That
 * makes the effect independent of card count, viewport width and scroll speed:
 * a card rotates toward the viewer as it reaches the middle and turns away
 * again on the far side, while the photograph inside counter-drifts against
 * the frame so the two planes never move together.
 */
function GalleryCard({
  item,
  index,
  reduced,
}: {
  item: (typeof ugc)[number];
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  const rot = useMotionValue(0);
  const scl = useMotionValue(1);
  const imgX = useMotionValue(0);
  const veil = useMotionValue(0);
  const lift = useMotionValue(0);

  const soft = { stiffness: 140, damping: 26, mass: 0.4 };
  const rotate = useSpring(rot, soft);
  const scale = useSpring(scl, soft);
  const parallax = useSpring(imgX, soft);
  const shade = useSpring(veil, soft);
  const y = useSpring(lift, soft);

  useAnimationFrame(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;

    // -1 at the left edge of the viewport, 0 dead centre, +1 at the right.
    const raw = (r.left + r.width / 2 - window.innerWidth / 2) / window.innerWidth;
    const d = Math.max(-1.1, Math.min(1.1, raw * 2));
    const away = Math.abs(d);

    rot.set(d * -17);
    scl.set(1 - away * 0.11);
    imgX.set(d * -13);
    veil.set(Math.min(0.4, away * 0.42));
    lift.set(away * 26);
  });

  return (
    <motion.article
      ref={ref}
      style={{ rotateY: rotate, scale, y, transformStyle: "preserve-3d" }}
      className="group/ugc w-[70vw] shrink-0 will-change-transform sm:w-[42vw] lg:w-[26vw]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-300">
        {/* Over-scaled so the counter-drift never exposes an edge. */}
        <motion.div style={{ x: parallax }} className="absolute inset-0 scale-[1.18] will-change-transform">
          <Image
            src={item.image}
            alt={`${item.product} worn and shared by ${item.handle}`}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 26vw"
            className="object-cover"
          />
        </motion.div>

        {/* Cards away from centre sink back into the ground colour. */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 bg-cream-200"
        />

        <span className="eyebrow absolute left-4 top-4 bg-cream-100/90 px-3 py-1.5 text-[10px] text-olive-700 backdrop-blur-sm">
          {item.handle}
        </span>
        <span className="eyebrow absolute bottom-4 left-4 text-[9px] text-cream-50 drop-shadow-[0_1px_6px_rgba(25,29,18,0.75)]">
          {item.location}
        </span>
        <span className="eyebrow absolute right-4 top-4 text-[9px] text-cream-50 drop-shadow-[0_1px_6px_rgba(25,29,18,0.75)]">
          0{index + 1}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="font-sans text-[13px] uppercase tracking-[0.14em] text-olive-700">
            {item.product}
          </h3>
          <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.12em] text-olive-400">
            {item.colour}
          </p>
        </div>
        <p className="shrink-0 font-sans text-[13px] text-olive-600">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </motion.article>
  );
}

export default function AsSeenOnYou() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
    Travel is measured rather than guessed at in viewport units: the track has
    to stop with its last card flush against the right gutter no matter how
    many cards there are or how wide the window is.
  */
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const gutter = window.innerWidth >= 768 ? 40 : 20;
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth + gutter * 2));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.5 });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(
    () =>
      scrollYProgress.on("change", (v) =>
        setActive(Math.min(ugc.length - 1, Math.max(0, Math.round(v * (ugc.length - 1)))))
      ),
    [scrollYProgress]
  );

  return (
    <section
      ref={ref}
      style={{ height: `calc(100svh + ${Math.round(travel * 1.55)}px)` }}
      className="relative bg-cream-200"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[100px]">
        <div className="mx-auto mb-10 flex w-full max-w-[1600px] items-end justify-between px-5 md:px-10">
          <div>
            <p className="eyebrow mb-3 text-olive-400">#IrisAndMe</p>
            <h2 className="display text-[clamp(2rem,5.5vw,4rem)] text-olive-700">
              As seen on you
            </h2>
          </div>
          <p className="hidden max-w-[26ch] font-sans text-[13px] leading-relaxed text-olive-500 md:block">
            Worn on school runs, long lunches and quiet mornings — tagged by the
            women who wear them.
          </p>
        </div>

        {/* Perspective lives on the pinned frame so every card shares one camera. */}
        <div className="[perspective:1600px] [perspective-origin:50%_50%]">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 pl-5 will-change-transform [transform-style:preserve-3d] md:pl-10"
          >
            {ugc.map((item, i) => (
              <GalleryCard key={item.handle} item={item} index={i} reduced={reduced} />
            ))}
          </motion.div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1600px] px-5 md:px-10">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="eyebrow text-[10px] text-olive-400">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="inline-block text-olive-700"
              >
                0{active + 1}
              </motion.span>
              <span className="mx-2 text-olive-300">/</span>
              <span className="text-olive-300">0{ugc.length}</span>
            </p>
            <p className="eyebrow text-[9px] text-olive-300">Scroll to explore</p>
          </div>

          <div className="h-px w-full bg-olive-700/15">
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full w-full origin-left bg-olive-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
