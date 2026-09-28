import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/ButtonLink";
import ProductGrid from "@/components/ProductGrid";
import Reveal, { RevealItem } from "@/components/anim/Reveal";
import { collections, productsIn, shopCategories } from "@/lib/products";
import { returns } from "@/lib/site";
import CategoryNav from "./_components/CategoryNav";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop IrisandMe: dresses, tops and shirts, skirts, trousers and shorts, sets and essentials in linen, cotton and natural fibres.",
};

const help = [
  { label: "Size & Fit", href: "/size-and-fit", note: "Find your size in AU, UK, US and EU" },
  { label: "Shipping & Delivery", href: "/shipping-and-delivery", note: "Delivering to Australia and worldwide" },
  { label: "Returns & Exchanges", href: "/returns-and-exchanges", note: `${returns.windowDays} days to change your mind` },
  { label: "Gift Cards", href: "/gift-cards", note: "Digital, delivered on the day you choose" },
];

/** The main shopping landing page: every category, the newest pieces, and the collections. */
export default function ShopPage() {
  const newest = productsIn("new-arrivals").slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="The IrisandMe Shop"
        intro="Considered pieces in linen, cotton and natural fibres — designed to work together, and to be worn for many seasons to come."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      >
        <CategoryNav />
      </PageHero>

      <Section pad="tight" labelledBy="categories-title">
        <h2 id="categories-title" className="sr-only">
          Shop by category
        </h2>
        <Reveal stagger={0.07} className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {shopCategories.map((c) => {
            const count = productsIn(c.slug).length;
            return (
              <RevealItem key={c.slug}>
                <Link href={`/shop/${c.slug}`} className="group/cat block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cat:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="display text-[clamp(1.35rem,2.2vw,1.8rem)] leading-none text-olive-800 transition-colors duration-500 group-hover/cat:text-olive-500">
                      {c.label}
                    </h3>
                    <span className="eyebrow shrink-0 text-[9.5px] text-olive-500">
                      {count} {count === 1 ? "piece" : "pieces"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[34ch] font-sans text-[13px] leading-relaxed text-olive-600">{c.blurb}</p>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </Section>

      <Section tone="sand" labelledBy="shop-new-title">
        <SectionHeading
          id="shop-new-title"
          eyebrow="Just arrived"
          title="New Arrivals"
          action={
            <TextLink href="/shop/new-arrivals" className="text-olive-700">
              View all new arrivals
            </TextLink>
          }
          className="mb-16"
        />
        <ProductGrid products={newest} />
      </Section>

      <Section labelledBy="shop-collections-title">
        <SectionHeading
          id="shop-collections-title"
          eyebrow="Collections"
          title="Shop by collection"
          intro="Each collection tells its own story — of a fabric, a print or a way of dressing."
          action={
            <TextLink href="/collections" className="text-olive-700">
              All collections
            </TextLink>
          }
          className="mb-16"
        />
        <Reveal stagger={0.08} className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
          {collections.map((c) => (
            <RevealItem key={c.slug}>
              <Link href={`/collections/${c.slug}`} className="group/col block">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
                  <Image
                    src={c.portrait}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/col:scale-[1.04]"
                  />
                </div>
                <h3 className="display mt-4 text-[1.3rem] leading-tight text-olive-800 group-hover/col:text-olive-500">
                  {c.name}
                </h3>
                <p className="mt-1.5 font-sans text-[12.5px] leading-snug text-olive-600">{c.tagline}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section tone="paper" pad="tight" labelledBy="shop-help-title">
        <h2 id="shop-help-title" className="eyebrow mb-8 text-[10px] text-olive-500">
          Shopping with IrisandMe
        </h2>
        <ul className="grid grid-cols-1 gap-px border hairline bg-olive-700/10 sm:grid-cols-2 lg:grid-cols-4">
          {help.map((h) => (
            <li key={h.href} className="bg-cream-50">
              <Link href={h.href} className="group/h flex h-full flex-col gap-2 p-7">
                <span className="eyebrow text-[10.5px] text-olive-800 group-hover/h:text-olive-500">{h.label}</span>
                <span className="font-sans text-[13px] leading-relaxed text-olive-600">{h.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
