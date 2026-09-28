import type { ReactNode } from "react";
import Reveal from "../anim/Reveal";

/** A single line set large in the mixed-case serif, to slow a page down. */
export default function PullQuote({
  children,
  cite,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  cite?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <figure className="mx-auto text-center">
        {/* The measure lives on the quote so `ch` counts at the quote's own size. */}
        <blockquote
          className={`serif mx-auto max-w-[28ch] text-[clamp(1.7rem,3.8vw,3rem)] leading-[1.25] ${
            dark ? "text-cream-50" : "text-olive-700"
          }`}
        >
          {children}
        </blockquote>
        {cite ? (
          <figcaption className={`eyebrow mt-8 text-[10px] ${dark ? "text-olive-200" : "text-olive-500"}`}>
            {cite}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}
