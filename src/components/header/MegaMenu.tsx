"use client";

import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { brandPages, type MenuKey } from "@/lib/nav";
import { collections, shopCategories } from "@/lib/products";

type Card = { label: string; caption: string; href: string; image: string; alt: string };

const menus: Record<
  MenuKey,
  { title: string; landing: { label: string; href: string }; links: { label: string; href: string; note?: string }[]; cards: Card[] }
> = {
  shop: {
    title: "Shop",
    landing: { label: "Visit the Shop", href: "/shop" },
    links: shopCategories.map((c) => ({ label: c.label, href: `/shop/${c.slug}` })),
    cards: [
      {
        label: "New Arrivals",
        caption: "Just in from the studio",
        href: "/shop/new-arrivals",
        image: "/img/l-iris-maxi.jpg",
        alt: "A woman walking through golden grasses in the Iris Print Maxi Dress",
      },
      {
        label: "Essentials",
        caption: "The foundations, on repeat",
        href: "/shop/essentials",
        image: "/img/l-cotton-tee.jpg",
        alt: "A woman in a cream cotton tee and olive linen trousers pouring coffee",
      },
    ],
  },
  collections: {
    title: "Collections",
    landing: { label: "All Collections", href: "/collections" },
    links: collections.map((c) => ({ label: c.name, href: `/collections/${c.slug}`, note: c.tagline })),
    cards: [
      {
        label: "The Lotus Collection",
        caption: "Our signature print",
        href: "/collections/the-lotus-collection",
        image: "/img/l-lotus-dress.jpg",
        alt: "A woman in the Lotus Midi Dress beside a stone basin of lotus leaves",
      },
      {
        label: "Limited Editions",
        caption: "Made once, in small numbers",
        href: "/collections/limited-editions",
        image: "/img/l-heritage-jacket.jpg",
        alt: "Detail of a hand block-printed cotton jacket",
      },
    ],
  },
  story: {
    title: "Our Story",
    landing: { label: "Read Our Story", href: "/our-story" },
    links: brandPages.filter((p) => p.href !== "/journal"),
    cards: [
      {
        label: "Craftsmanship",
        caption: "How each piece is made",
        href: "/craftsmanship",
        image: "/img/craft-print.jpg",
        alt: "An artisan pressing a carved wooden block onto cream cotton",
      },
      {
        label: "Our Prints",
        caption: "The stories behind them",
        href: "/our-prints",
        image: "/img/print-lotus.jpg",
        alt: "Cream cotton printed with deep olive lotus flowers",
      },
    ],
  },
};

/**
 * Desktop dropdown for SHOP, COLLECTIONS and OUR STORY: an index of links on
 * the left and two editorial cards on the right, dropping from the bar.
 */
export default function MegaMenu({
  menu,
  onNavigate,
  ref,
}: {
  menu: MenuKey;
  onNavigate: () => void;
  ref?: Ref<HTMLDivElement>;
}) {
  const m = menus[menu];
  return (
    <motion.div
      ref={ref}
      id={`mega-${menu}`}
      role="region"
      aria-label={`${m.title} menu`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="absolute inset-x-0 top-full hidden border-b hairline bg-cream-50 text-olive-700 shadow-[0_30px_60px_-40px_rgba(25,29,18,0.35)] xl:block"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10 px-10 pb-12 pt-10">
        <div className="col-span-5 xl:col-span-4">
          <p className="eyebrow mb-6 text-[10px] text-olive-500">{m.title}</p>
          <ul className={`grid gap-x-10 gap-y-1 ${m.links.length > 6 ? "grid-cols-2" : "grid-cols-1"}`}>
            {m.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="group/ml flex flex-col py-2"
                >
                  <span className="display text-[1.55rem] leading-tight text-olive-800 transition-colors duration-500 group-hover/ml:text-olive-500">
                    {l.label}
                  </span>
                  {l.note ? (
                    <span className="mt-0.5 font-sans text-[12px] text-olive-500">{l.note}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={m.landing.href}
            onClick={onNavigate}
            className="eyebrow link-underline mt-8 inline-block text-[10px] text-olive-700"
          >
            {m.landing.label}
          </Link>
        </div>

        <div className="col-span-7 col-start-6 grid grid-cols-2 gap-6 xl:col-span-6 xl:col-start-7">
          {m.cards.map((c) => (
            <Link key={c.href} href={c.href} onClick={onNavigate} className="group/mc block">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 1280px) 30vw, 24vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mc:scale-[1.05]"
                />
              </div>
              <p className="eyebrow mt-4 text-[10px] text-olive-800">{c.label}</p>
              <p className="mt-1 font-sans text-[12.5px] text-olive-500">{c.caption}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
