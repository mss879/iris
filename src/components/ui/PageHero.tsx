import type { ReactNode } from "react";
import Reveal from "../anim/Reveal";
import SplitWords from "../anim/SplitWords";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Figure from "./Figure";
import ParallaxImage from "./ParallaxImage";

/*
  Title sizes. The longest single word on the site ("Craftsmanship") sets at
  8.2× its font size, and a word can't wrap, so on phones the title scales
  with the viewport (10vw fits it inside a 320px screen) and only takes its
  editorial size from tablet up. Beside a photograph the column is half as
  wide, so the split plate scales more gently there.
*/
const TITLE_PLAIN = "text-[clamp(2rem,10vw,3.6rem)] md:text-[clamp(3.6rem,6.6vw,5.6rem)]";
const TITLE_SPLIT =
  "text-[clamp(2rem,10vw,3.6rem)] md:text-[clamp(3.6rem,7vw,5rem)] lg:text-[clamp(3rem,5vw,6rem)]";
const TITLE_IMAGE = "text-[clamp(2rem,10vw,3.8rem)] md:text-[clamp(3.8rem,7.4vw,6.4rem)]";

/**
 * Opening band for every inner page. Three plates:
 *
 * - `plain`  — type on cream, for service and legal pages.
 * - `split`  — type beside a portrait frame, for the brand pages.
 * - `image`  — a full-bleed photograph with the title set in it, for
 *              collections and the lookbook.
 *
 * All three clear the fixed header themselves, so pages never pad for it.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  variant = "plain",
  image,
  imageAlt = "",
  position = "center",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  variant?: "plain" | "split" | "image";
  image?: string;
  imageAlt?: string;
  position?: string;
  children?: ReactNode;
}) {
  if (variant === "image" && image) {
    return (
      <section className="on-dark relative mt-[var(--header-h)] flex h-[76svh] min-h-[540px] items-end overflow-hidden bg-olive-900 text-cream-50">
        <ParallaxImage src={image} alt={imageAlt} priority position={position} />
        <div className="pointer-events-none absolute inset-0 bg-olive-950/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-950/75 via-olive-950/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-14 md:pb-20">
          {crumbs ? <Breadcrumbs items={crumbs} dark className="mb-8" /> : null}
          {eyebrow ? (
            <Reveal direction="none">
              <div className="section-index mb-6 text-cream-100/80">
                <span className="rule" />
                <span className="eyebrow">{eyebrow}</span>
              </div>
            </Reveal>
          ) : null}
          <SplitWords
            as="h1"
            text={title}
            className={`display max-w-[16ch] leading-[0.92] text-cream-50 ${TITLE_IMAGE}`}
          />
          {intro ? (
            <Reveal delay={0.2}>
              <div className="mt-7 max-w-[52ch] font-sans text-[15px] leading-[1.9] text-cream-100/85">
                {intro}
              </div>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.3}><div className="mt-10">{children}</div></Reveal> : null}
        </div>
      </section>
    );
  }

  if (variant === "split" && image) {
    return (
      <section className="bg-cream-100 px-6 pb-20 pt-[calc(var(--header-h)+2.5rem)] md:px-14 md:pb-28 md:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:pb-6">
            {crumbs ? <Breadcrumbs items={crumbs} className="mb-10" /> : null}
            {eyebrow ? (
              <Reveal direction="none">
                <div className="section-index mb-6 text-olive-500">
                  <span className="rule" />
                  <span className="eyebrow">{eyebrow}</span>
                </div>
              </Reveal>
            ) : null}
            <SplitWords
              as="h1"
              text={title}
              className={`display max-w-[16ch] leading-[0.92] text-olive-800 ${TITLE_SPLIT}`}
            />
            {intro ? (
              <Reveal delay={0.2}>
                <div className="mt-8 max-w-[50ch] font-sans text-[15px] leading-[1.95] text-olive-600">
                  {intro}
                </div>
              </Reveal>
            ) : null}
            {children ? <Reveal delay={0.3}><div className="mt-10">{children}</div></Reveal> : null}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Figure
              src={image}
              alt={imageAlt}
              ratio="4/5"
              priority
              position={position}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b hairline bg-cream-100 px-6 pb-16 pt-[calc(var(--header-h)+3rem)] md:px-14 md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
      <div className="mx-auto max-w-[1600px]">
        {crumbs ? <Breadcrumbs items={crumbs} className="mb-10" /> : null}
        {eyebrow ? (
          <Reveal direction="none">
            <div className="section-index mb-6 text-olive-500">
              <span className="rule" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </Reveal>
        ) : null}
        <SplitWords
          as="h1"
          text={title}
          className={`display max-w-[18ch] leading-[0.93] text-olive-800 ${TITLE_PLAIN}`}
        />
        {intro ? (
          <Reveal delay={0.2}>
            <div className="mt-8 max-w-[62ch] font-sans text-[15px] leading-[1.95] text-olive-600">
              {intro}
            </div>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={0.3}><div className="mt-10">{children}</div></Reveal> : null}
      </div>
    </section>
  );
}
