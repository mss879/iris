import type { ReactNode } from "react";
import Section, { SectionHeading, type Tone } from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";

/**
 * The opening band of a brand page, straight after the hero: a section label,
 * the page's argument set large in the mixed-case serif, optional supporting
 * paragraphs, and an optional aside (usually the in-page index).
 *
 * `heading="label"` sets the h2 as a quiet eyebrow; `heading="display"` gives
 * it the full display treatment where the opening is a chapter in its own
 * right. `after` spans the full measure beneath everything else.
 */
export default function Standfirst({
  id,
  title,
  index,
  eyebrow,
  heading = "label",
  lede,
  children,
  aside,
  after,
  tone = "paper",
}: {
  id: string;
  title: string;
  index?: string;
  eyebrow?: string;
  heading?: "label" | "display";
  lede: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  after?: ReactNode;
  tone?: Tone;
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          {heading === "display" ? (
            <SectionHeading id={headingId} index={index} eyebrow={eyebrow} title={title} />
          ) : (
            <Reveal direction="none">
              <div className="section-index text-olive-500">
                {index ? <span className="eyebrow">{index}</span> : null}
                <span className="rule" />
                <h2 id={headingId} className="eyebrow">
                  {title}
                </h2>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <p className="serif mt-10 max-w-[32ch] text-[clamp(1.6rem,3.1vw,2.5rem)] leading-[1.3] text-olive-700">
              {lede}
            </p>
          </Reveal>

          {children ? (
            <Reveal delay={0.2}>
              <div className="mt-10 grid max-w-[60rem] grid-cols-1 gap-6 font-sans text-[15px] leading-[1.9] text-olive-600 md:grid-cols-2 md:gap-10">
                {children}
              </div>
            </Reveal>
          ) : null}
        </div>

        {aside ? <div className="lg:col-span-4 lg:col-start-9 lg:pt-1">{aside}</div> : null}
      </div>

      {after ? <div className="mt-20 md:mt-28">{after}</div> : null}
    </Section>
  );
}
