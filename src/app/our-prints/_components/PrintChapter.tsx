import type { ReactNode } from "react";
import Section, { type Tone } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import { TextLink } from "@/components/ui/ButtonLink";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";
import type { Product } from "@/lib/products";
import PieceList from "@/components/brand/PieceList";

export type PrintPart = { title: string; body: ReactNode };

/**
 * One signature print, told as a chapter: the cloth itself large, the print
 * worn set into its corner like a mounted photograph, and beside them the
 * story — inspiration, drawing and printing, colour — ending with the pieces
 * that carry it. `reverse` mirrors the plate for a zig-zag down the page.
 */
export default function PrintChapter({
  id,
  index,
  name,
  summary,
  swatch,
  swatchAlt,
  photo,
  photoAlt,
  photoCaption,
  parts,
  pieces,
  links = [],
  reverse = false,
  tone = "cream",
}: {
  id: string;
  index: string;
  name: string;
  summary: string;
  swatch: string;
  swatchAlt: string;
  photo: string;
  photoAlt: string;
  photoCaption?: ReactNode;
  parts: PrintPart[];
  pieces: Product[];
  links?: { label: string; href: string }[];
  reverse?: boolean;
  tone?: Extract<Tone, "cream" | "sand" | "paper">;
}) {
  const headingId = `${id}-heading`;
  // The inset photograph sits in a mat the colour of the band behind it.
  const mat =
    tone === "sand" ? "ring-cream-200" : tone === "paper" ? "ring-cream-50" : "ring-cream-100";

  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-7 ${reverse ? "lg:order-2 lg:col-start-6" : ""}`}>
          <Figure
            src={swatch}
            alt={swatchAlt}
            ratio="4/3"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`w-full md:w-[86%] ${reverse ? "md:ml-auto" : ""}`}
          />
          <Figure
            src={photo}
            alt={photoAlt}
            ratio="3/4"
            caption={photoCaption}
            sizes="(max-width: 768px) 56vw, 25vw"
            className={`relative z-10 -mt-20 w-[56%] md:-mt-44 md:w-[40%] ${
              reverse ? "mr-auto" : "ml-auto"
            }`}
            frameClassName={`ring-[10px] ${mat}`}
          />
        </div>

        <div
          className={`lg:col-span-4 lg:pt-4 ${
            reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"
          }`}
        >
          <Reveal direction="none">
            <div className="section-index mb-6 text-olive-500">
              <span className="eyebrow">{index}</span>
              <span className="rule" />
              <span className="eyebrow">Signature print</span>
            </div>
          </Reveal>
          <div id={headingId}>
            <SplitWords
              as="h2"
              text={name}
              className="display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.95] text-olive-800"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="serif mt-6 text-[clamp(1.3rem,2vw,1.6rem)] leading-[1.4] text-olive-700">
              {summary}
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col">
            {parts.map((part) => (
              <Reveal key={part.title} amount={0.4} className="border-t hairline py-6">
                <h3 className="eyebrow text-[10.5px] text-olive-800">{part.title}</h3>
                <div className="mt-3 flex flex-col gap-3 font-sans text-[14.5px] leading-[1.9] text-olive-600">
                  {part.body}
                </div>
              </Reveal>
            ))}

            <Reveal amount={0.3} className="border-t hairline pt-6">
              <h3 className="eyebrow text-[10.5px] text-olive-800">Where to find it</h3>
              <PieceList products={pieces} className="mt-5" />
              {links.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-olive-800">
                  {links.map((link) => (
                    <TextLink key={link.href} href={link.href}>
                      {link.label}
                    </TextLink>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
