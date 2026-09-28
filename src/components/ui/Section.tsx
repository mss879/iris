import type { ReactNode } from "react";
import Reveal from "../anim/Reveal";
import SplitWords from "../anim/SplitWords";

const tones = {
  cream: "bg-cream-100 text-olive-700",
  sand: "bg-cream-200 text-olive-700",
  paper: "bg-cream-50 text-olive-700",
  olive: "on-dark bg-olive-800 text-cream-100",
} as const;

const widths = {
  wide: "max-w-[1600px]",
  base: "max-w-[1280px]",
  narrow: "max-w-[960px]",
  prose: "max-w-[760px]",
} as const;

const pads = {
  base: "py-24 md:py-36",
  tight: "py-16 md:py-24",
  none: "",
} as const;

export type Tone = keyof typeof tones;

/**
 * Page band with the site's gutters and a centred measure. Every inner page is
 * built from these so spacing stays on one rhythm across thirty-odd pages.
 */
export default function Section({
  id,
  tone = "cream",
  width = "wide",
  pad = "base",
  className = "",
  innerClassName = "",
  labelledBy,
  children,
}: {
  id?: string;
  tone?: Tone;
  width?: keyof typeof widths;
  pad?: keyof typeof pads;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} px-6 md:px-14 ${pads[pad]} ${className}`}
    >
      <div className={`mx-auto ${widths[width]} ${innerClassName}`}>{children}</div>
    </section>
  );
}

/**
 * Numeral, rule and label, then the heading rising word by word, then an
 * optional standfirst. `action` sits opposite the heading on wide screens.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  id,
  as = "h2",
  align = "left",
  dark = false,
  action,
  className = "",
  size = "base",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  dark?: boolean;
  action?: ReactNode;
  className?: string;
  size?: "base" | "small";
}) {
  const centred = align === "center";
  // Phones scale with the viewport so a long single word never overflows.
  const titleSize =
    size === "small"
      ? "text-[clamp(1.7rem,8vw,2.4rem)] md:text-[clamp(2rem,3.6vw,2.8rem)] leading-[0.98]"
      : "text-[clamp(2rem,8.6vw,2.6rem)] md:text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[0.95]";

  return (
    <div
      className={`flex flex-col gap-8 ${
        action && !centred ? "lg:flex-row lg:items-end lg:justify-between" : ""
      } ${centred ? "items-center text-center" : ""} ${className}`}
    >
      <div className={centred ? "flex flex-col items-center" : ""}>
        {eyebrow || index ? (
          <Reveal direction="none">
            <div
              className={`section-index mb-6 ${centred ? "justify-center" : ""} ${
                dark ? "text-cream-100/70" : "text-olive-500"
              }`}
            >
              {index ? <span className="eyebrow">{index}</span> : null}
              <span className="rule" />
              {eyebrow ? (
                <span className={`eyebrow ${dark ? "text-olive-200" : ""}`}>{eyebrow}</span>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        <div id={id}>
          <SplitWords
            as={as}
            text={title}
            className={`display ${titleSize} ${dark ? "text-cream-50" : "text-olive-800"} ${
              centred ? "mx-auto max-w-[18ch]" : "max-w-[20ch]"
            }`}
          />
        </div>

        {intro ? (
          <Reveal delay={0.15}>
            <div
              className={`mt-7 max-w-[58ch] font-sans text-[15px] leading-[1.95] ${
                dark ? "text-cream-200/85" : "text-olive-600"
              } ${centred ? "mx-auto" : ""}`}
            >
              {intro}
            </div>
          </Reveal>
        ) : null}
      </div>

      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  );
}
