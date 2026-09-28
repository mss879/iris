import type { ReactNode } from "react";
import Reveal from "../anim/Reveal";
import SplitWords from "../anim/SplitWords";
import Figure from "./Figure";

/**
 * Photograph beside a block of copy. `reverse` puts the image on the right;
 * alternating it down a page gives long stories their zig-zag rhythm.
 */
export default function SplitFeature({
  image,
  imageAlt,
  ratio = "4/5",
  position,
  caption,
  index,
  eyebrow,
  title,
  children,
  actions,
  reverse = false,
  dark = false,
  headingLevel = "h2",
}: {
  image: string;
  imageAlt: string;
  ratio?: string;
  position?: string;
  caption?: ReactNode;
  index?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  reverse?: boolean;
  dark?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div
        className={`lg:col-span-6 ${reverse ? "lg:order-2 lg:col-start-7" : ""}`}
      >
        <Figure
          src={image}
          alt={imageAlt}
          ratio={ratio}
          position={position}
          caption={caption}
          dark={dark}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div
        className={`lg:col-span-5 ${
          reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"
        }`}
      >
        {index || eyebrow ? (
          <Reveal direction="none">
            <div className={`section-index mb-6 ${dark ? "text-cream-100/70" : "text-olive-500"}`}>
              {index ? <span className="eyebrow">{index}</span> : null}
              <span className="rule" />
              {eyebrow ? <span className={`eyebrow ${dark ? "text-olive-200" : ""}`}>{eyebrow}</span> : null}
            </div>
          </Reveal>
        ) : null}

        <SplitWords
          as={headingLevel}
          text={title}
          className={`display max-w-[16ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.96] ${
            dark ? "text-cream-50" : "text-olive-800"
          }`}
        />

        {children ? (
          <Reveal delay={0.15}>
            <div
              className={`mt-7 flex max-w-[48ch] flex-col gap-5 font-sans text-[15px] leading-[1.95] ${
                dark ? "text-cream-200/85" : "text-olive-600"
              }`}
            >
              {children}
            </div>
          </Reveal>
        ) : null}

        {actions ? (
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">{actions}</div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
