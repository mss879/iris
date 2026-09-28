import type { ReactNode } from "react";
import Section, { type Tone } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";

export type MaterialPart = { title: string; body: ReactNode };

/**
 * One material, told in four parts — why we choose it, how it feels, how it
 * wears, how to care for it — beside a photograph that holds its place on
 * wide screens while the copy scrolls. `status` flags work that is still in
 * development so it can never be read as a present-day claim.
 */
export default function MaterialChapter({
  id,
  index,
  eyebrow,
  name,
  status,
  lede,
  image,
  imageAlt,
  caption,
  position,
  parts,
  footer,
  tone = "cream",
  reverse = false,
}: {
  id: string;
  index: string;
  eyebrow: string;
  name: string;
  status?: string;
  lede: ReactNode;
  image: string;
  imageAlt: string;
  /** Captions use cream-ground type, so leave them off olive bands. */
  caption?: ReactNode;
  position?: string;
  parts: MaterialPart[];
  footer?: ReactNode;
  tone?: Tone;
  reverse?: boolean;
}) {
  const dark = tone === "olive";
  const headingId = `${id}-heading`;
  const rule = dark ? "border-cream-100/20" : "hairline";

  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className={`lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}>
          {/* Capped so the held photograph still fits a short laptop screen. */}
          <div
            className={`lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:max-w-[30rem] ${
              reverse ? "lg:ml-auto" : ""
            }`}
          >
            <Figure
              src={image}
              alt={imageAlt}
              ratio="4/5"
              caption={dark ? undefined : caption}
              position={position}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>

        <div
          className={`lg:col-span-6 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
        >
          <Reveal direction="none">
            <div className={`section-index mb-6 ${dark ? "text-cream-100/70" : "text-olive-500"}`}>
              <span className="eyebrow">{index}</span>
              <span className="rule" />
              <span className={`eyebrow ${dark ? "text-olive-200" : ""}`}>{eyebrow}</span>
            </div>
          </Reveal>

          <div id={headingId} className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <SplitWords
              as="h2"
              text={name}
              className={`display text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[0.94] ${
                dark ? "text-cream-50" : "text-olive-800"
              }`}
            />
            {status ? (
              <span
                className={`eyebrow mb-1.5 border px-3 py-1.5 text-[9.5px] ${
                  dark ? "border-cream-100/40 text-cream-50" : "border-olive-700/35 text-olive-800"
                }`}
              >
                {status}
              </span>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <p
              className={`serif mt-7 max-w-[34ch] text-[clamp(1.3rem,2.1vw,1.65rem)] leading-[1.4] ${
                dark ? "text-cream-100" : "text-olive-700"
              }`}
            >
              {lede}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {parts.map((part, i) => (
              <Reveal key={part.title} delay={(i % 2) * 0.08} amount={0.3} className={`border-t pt-6 ${rule}`}>
                <h3 className={`eyebrow text-[10.5px] ${dark ? "text-cream-50" : "text-olive-800"}`}>
                  {part.title}
                </h3>
                <div
                  className={`mt-3.5 flex flex-col gap-3 font-sans text-[14.5px] leading-[1.9] ${
                    dark ? "text-cream-200/85" : "text-olive-600"
                  }`}
                >
                  {part.body}
                </div>
              </Reveal>
            ))}
          </div>

          {footer ? (
            <Reveal className="mt-12">
              <div className={dark ? "text-cream-50" : "text-olive-800"}>{footer}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
