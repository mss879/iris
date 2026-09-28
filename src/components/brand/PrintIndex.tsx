import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/anim/Reveal";
import { prints, type PrintKey } from "@/lib/products";

/** What each print swatch photograph shows, shared wherever a swatch appears. */
export const swatchAlt: Record<PrintKey, string> = {
  "the-iris":
    "Cream cotton printed with hand-drawn irises in soft lavender-grey on slender sage stems",
  "the-lotus": "Cream cotton printed with olive lotus flowers, buds and round lily pads",
  "botanical-studies":
    "Botanical study drawings of leaves, ferns and wildflowers pinned in rows on a studio wall",
  "heritage-inspiration":
    "Carved wooden printing blocks resting on cream linen beside a length of deep olive cloth",
};

/**
 * The four signature prints as swatch cards. Pass `base="/our-prints"` to
 * link into the prints page from elsewhere; leave it empty on the prints page
 * itself, where the cards jump to each story. `navLabel` wraps the cards in a
 * labelled nav (for in-page use); otherwise each name is an h3.
 */
export default function PrintIndex({
  base = "",
  navLabel,
}: {
  base?: string;
  navLabel?: string;
}) {
  const Title = navLabel ? "p" : "h3";

  const list = (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-7 lg:grid-cols-4">
      {prints.map((print, i) => {
        const href = `${base}#${print.slug}`;
        const label = (
          <span className="after:absolute after:inset-0">{print.name}</span>
        );
        return (
          <li key={print.slug}>
            <Reveal delay={i * 0.08} className="group/print relative flex h-full flex-col">
              <div className="relative aspect-square w-full overflow-hidden bg-cream-300">
                <Image
                  src={print.image}
                  alt={swatchAlt[print.slug]}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/print:scale-[1.05]"
                />
              </div>
              <span className="serif mt-5 text-[1.15rem] text-olive-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Title className="display mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.02] text-olive-800">
                {base ? (
                  <Link href={href}>{label}</Link>
                ) : (
                  <a href={href}>{label}</a>
                )}
              </Title>
              <p className="mt-3 font-sans text-[13.5px] leading-[1.85] text-olive-600">
                {print.summary}
              </p>
              <span
                aria-hidden="true"
                className="eyebrow mt-5 text-[10px] text-olive-700 transition-colors duration-500 group-hover/print:text-olive-500"
              >
                Read the story
              </span>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );

  return navLabel ? <nav aria-label={navLabel}>{list}</nav> : list;
}
