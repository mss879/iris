import type { ReactNode } from "react";
import Section, { SectionHeading, type Tone } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Reveal from "@/components/anim/Reveal";

export type StandfirstImage = {
  src: string;
  alt: string;
  position?: string;
  caption?: ReactNode;
};

/**
 * A chapter of a brand page told in plain paragraphs: a heading, the argument
 * set large in the mixed-case serif, then the copy in one readable column.
 * The copy is set with `.prose-iris`, so paragraphs, h3s, lists and links
 * inside it need no classes of their own.
 *
 * An optional photograph holds its place beside the copy on wide screens
 * while it scrolls; `reverse` puts it on the left. On phones it follows the
 * copy, so two photographs never meet across a section break.
 *
 * `heading="label"` sets the h2 as a quiet eyebrow; `heading="display"` gives
 * it the full display treatment where the section is a chapter in its own
 * right.
 */
export default function Standfirst({
  id,
  title,
  eyebrow,
  heading = "label",
  lede,
  children,
  image,
  reverse = false,
  tone = "paper",
}: {
  id: string;
  title: string;
  eyebrow?: string;
  heading?: "label" | "display";
  lede: ReactNode;
  children?: ReactNode;
  image?: StandfirstImage;
  reverse?: boolean;
  tone?: Tone;
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div
          className={
            image
              ? `lg:col-span-6 ${reverse ? "lg:order-2 lg:col-start-7" : ""}`
              : "lg:col-span-10"
          }
        >
          {heading === "display" ? (
            <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
          ) : (
            <Reveal direction="none">
              <div className="section-index text-olive-500">
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
            // A long column is taller than the screen, so it reveals as soon as
            // its top edge arrives rather than waiting for a share of it.
            <Reveal delay={0.2} amount={0.02}>
              <div className="prose-iris mt-10 max-w-[62ch]">{children}</div>
            </Reveal>
          ) : null}
        </div>

        {image ? (
          <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : "lg:col-start-8"}`}>
            {/* Capped so the held photograph still fits a short laptop screen. */}
            <div
              className={`lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:max-w-[30rem] ${
                reverse ? "" : "lg:ml-auto"
              }`}
            >
              <Figure
                src={image.src}
                alt={image.alt}
                ratio="4/5"
                position={image.position}
                caption={image.caption}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
