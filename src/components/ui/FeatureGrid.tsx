import Link from "next/link";
import type { ReactNode } from "react";
import Reveal, { RevealItem } from "../anim/Reveal";

export type Feature = {
  title: string;
  body: ReactNode;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
};

const cols = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Titled points on a hairline grid, numbered by default. Used for values,
 * commitments and process steps — anywhere a list deserves more than bullets.
 */
export default function FeatureGrid({
  items,
  columns = 3,
  numbered = true,
  dark = false,
  headingLevel = "h3",
}: {
  items: Feature[];
  columns?: keyof typeof cols;
  numbered?: boolean;
  dark?: boolean;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <Reveal
      stagger={0.09}
      className={`grid grid-cols-1 gap-x-10 gap-y-14 ${cols[columns]}`}
    >
      {items.map((item, i) => (
        <RevealItem key={item.title}>
          <div className={`flex h-full flex-col border-t pt-7 ${dark ? "border-cream-100/20" : "hairline"}`}>
            <div className="flex items-baseline gap-4">
              {numbered ? (
                <span className={`serif text-[1.35rem] ${dark ? "text-olive-200" : "text-olive-500"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              {item.eyebrow ? (
                <span className={`eyebrow text-[10px] ${dark ? "text-cream-100/70" : "text-olive-500"}`}>
                  {item.eyebrow}
                </span>
              ) : null}
            </div>
            <Heading
              className={`display mt-4 text-[clamp(1.45rem,2.2vw,1.85rem)] leading-[1.02] ${
                dark ? "text-cream-50" : "text-olive-800"
              }`}
            >
              {item.title}
            </Heading>
            <div
              className={`mt-4 flex flex-col gap-3 font-sans text-[14px] leading-[1.9] ${
                dark ? "text-cream-200/80" : "text-olive-600"
              }`}
            >
              {item.body}
            </div>
            {item.href ? (
              <Link
                href={item.href}
                className={`eyebrow link-underline mt-6 self-start text-[10px] ${
                  dark ? "text-cream-50" : "text-olive-700"
                }`}
              >
                {item.linkLabel ?? "Discover more"}
              </Link>
            ) : null}
          </div>
        </RevealItem>
      ))}
    </Reveal>
  );
}
