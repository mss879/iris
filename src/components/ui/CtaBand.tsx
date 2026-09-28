import type { ReactNode } from "react";
import Reveal from "../anim/Reveal";
import SplitWords from "../anim/SplitWords";
import ButtonLink from "./ButtonLink";
import ParallaxImage from "./ParallaxImage";

type Action = { label: string; href: string };

/**
 * Closing call to action. On olive by default; pass `image` to set it over a
 * photograph instead. Keep it to one primary action and at most one more.
 */
export default function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  image,
  imageAlt = "",
  tone = "olive",
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  primary: Action;
  secondary?: Action;
  image?: string;
  imageAlt?: string;
  tone?: "olive" | "sand";
}) {
  const dark = tone === "olive" || !!image;

  return (
    <section
      className={`relative overflow-hidden px-6 py-28 md:px-14 md:py-40 ${
        dark ? "on-dark bg-olive-800 text-cream-50" : "bg-cream-200 text-olive-800"
      }`}
    >
      {image ? (
        <>
          <ParallaxImage src={image} alt={imageAlt} strength={14} />
          <div className="pointer-events-none absolute inset-0 bg-olive-950/55" />
        </>
      ) : null}

      <div className="relative mx-auto flex max-w-[900px] flex-col items-center text-center">
        {eyebrow ? (
          <Reveal direction="none">
            <div className={`section-index mb-7 justify-center ${dark ? "text-cream-100/80" : "text-olive-500"}`}>
              <span className="rule" />
              <span className="eyebrow">{eyebrow}</span>
              <span className="rule" />
            </div>
          </Reveal>
        ) : null}
        <SplitWords
          text={title}
          className={`display mx-auto max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[0.95] ${
            dark ? "text-cream-50" : "text-olive-800"
          }`}
        />
        {body ? (
          <Reveal delay={0.15}>
            <div
              className={`mx-auto mt-7 max-w-[50ch] font-sans text-[15px] leading-[1.9] ${
                dark ? "text-cream-100/85" : "text-olive-600"
              }`}
            >
              {body}
            </div>
          </Reveal>
        ) : null}
        <Reveal delay={0.25}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={primary.href} variant={dark ? "light" : "dark"}>
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant={dark ? "light" : "dark"}>
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
