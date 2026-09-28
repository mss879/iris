import Image from "next/image";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Reveal, { RevealItem } from "@/components/anim/Reveal";
import { ArrowIcon } from "@/components/icons";
import { products } from "@/lib/products";
import type { EditorialShoot, Placement, PressFeature, Publication } from "../_data/press";

/*
 * The four kinds of coverage, each its own band. The Press page renders a
 * band only once its list has something in it.
 */

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

export function AsSeenIn({ items }: { items: Publication[] }) {
  return (
    <Section pad="tight" labelledBy="press-as-seen-in-title">
      <SectionHeading id="press-as-seen-in-title" eyebrow="Coverage" title="As seen in" className="mb-12" />
      <ul className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 border-y hairline px-4 py-14">
        {items.map((publication) => {
          const mark = publication.logo ? (
            <Image
              src={publication.logo}
              alt={publication.name}
              width={220}
              height={64}
              unoptimized
              className="h-9 w-auto object-contain opacity-85"
            />
          ) : (
            <span className="display text-[1.5rem] leading-tight text-olive-800">{publication.name}</span>
          );
          return (
            <li key={publication.name} className="text-center">
              {publication.href ? (
                <a
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-500 hover:opacity-70"
                >
                  {mark}
                  <NewTab />
                </a>
              ) : (
                mark
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function PressFeatures({ items }: { items: PressFeature[] }) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Section tone="paper" labelledBy="press-features-title">
      <SectionHeading id="press-features-title" eyebrow="Coverage" title="Press features" className="mb-12" />
      <ul className="border-t hairline">
        {sorted.map((feature) => (
          <li key={`${feature.publication}-${feature.title}`} className="border-b hairline">
            <a
              href={feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/press grid grid-cols-1 gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <time dateTime={feature.date} className="eyebrow text-[10px] text-olive-500 md:col-span-2">
                {formatDate(feature.date)}
              </time>
              <span className="eyebrow text-[10px] text-olive-700 md:col-span-3">{feature.publication}</span>
              <span className="serif text-[1.5rem] leading-snug text-olive-800 transition-colors duration-500 group-hover/press:text-olive-500 md:col-span-6">
                {feature.title}
                <NewTab />
              </span>
              <span aria-hidden="true" className="hidden text-olive-700 md:col-span-1 md:block md:justify-self-end">
                <ArrowIcon className="h-2.5 w-3.5 transition-transform duration-500 group-hover/press:translate-x-1" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function EditorialShoots({ items }: { items: EditorialShoot[] }) {
  return (
    <Section labelledBy="press-shoots-title">
      <SectionHeading id="press-shoots-title" eyebrow="Editorial" title="Editorial shoots" className="mb-14" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {items.map((shoot) => (
          <Figure
            key={`${shoot.publication}-${shoot.title}`}
            src={shoot.image}
            alt={shoot.imageAlt}
            ratio="4/5"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            caption={
              <>
                <span className="eyebrow block text-[10px] text-olive-700">{shoot.publication}</span>
                <span className="serif mt-2 block text-[1.35rem] leading-snug tracking-normal text-olive-800">
                  {shoot.href ? (
                    <a href={shoot.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {shoot.title}
                      <NewTab />
                    </a>
                  ) : (
                    shoot.title
                  )}
                </span>
                <span className="mt-2 block">{shoot.credits}</span>
              </>
            }
          />
        ))}
      </div>
    </Section>
  );
}

export function Placements({ items }: { items: Placement[] }) {
  return (
    <Section tone="paper" labelledBy="press-placements-title">
      <SectionHeading id="press-placements-title" eyebrow="Placements" title="Worn by" className="mb-14" />
      <Reveal stagger={0.08} className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {items.map((placement) => {
          // Link the piece to its product page when it is one we still sell.
          const product = products.find((p) => p.name === placement.piece);
          return (
            <RevealItem key={`${placement.name}-${placement.piece}`} className="flex flex-col">
              {placement.image ? (
                <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-cream-200">
                  <Image
                    src={placement.image}
                    alt={placement.imageAlt ?? `${placement.name} wearing the IrisandMe ${placement.piece}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <p className="serif text-[1.4rem] leading-snug text-olive-800">{placement.name}</p>
              <p className="eyebrow mt-1.5 text-[10px] text-olive-500">
                Wearing the{" "}
                {product ? (
                  <Link href={`/products/${product.slug}`} className="link-underline text-olive-800">
                    {placement.piece}
                  </Link>
                ) : (
                  placement.piece
                )}
              </p>
              {placement.href ? (
                <a
                  href={placement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow link-underline mt-3 self-start text-[10px] text-olive-800"
                >
                  View
                  <span className="sr-only">
                    {" "}
                    {placement.name} wearing the {placement.piece} (opens in a new tab)
                  </span>
                </a>
              ) : null}
            </RevealItem>
          );
        })}
      </Reveal>
    </Section>
  );
}
