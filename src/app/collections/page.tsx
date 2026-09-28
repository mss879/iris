import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";
import CtaBand from "@/components/ui/CtaBand";
import { collections, productsInCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The IrisandMe collections: The Linen Edit, We Love Cotton, The Resort Collection, The Lotus Collection and Limited Editions.",
};

/**
 * The collections as a house would present them: one chapter each, the
 * campaign image leading and the story beside it.
 */
export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="The Collections"
        intro="Five stories, each told through fabric, print and shape. Together they make a wardrobe that belongs to no single season."
        crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />

      <div className="bg-cream-100">
        {collections.map((c, i) => {
          const count = productsInCollection(c.slug).length;
          const reverse = i % 2 === 1;
          return (
            <section
              key={c.slug}
              aria-labelledby={`${c.slug}-title`}
              className={`px-6 py-20 md:px-14 md:py-28 ${i % 2 === 1 ? "bg-cream-200" : ""}`}
            >
              <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={`/collections/${c.slug}`}
                  className={`group/c block lg:col-span-7 ${reverse ? "lg:order-2 lg:col-start-6" : ""}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream-300">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority={i === 0}
                      className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/c:scale-[1.035]"
                    />
                  </div>
                </Link>

                <div className={`lg:col-span-4 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                  <Reveal direction="none">
                    <div className="section-index mb-6 text-olive-500">
                      <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                      <span className="rule" />
                      <span className="eyebrow">
                        {count} {count === 1 ? "piece" : "pieces"}
                      </span>
                    </div>
                  </Reveal>
                  <div id={`${c.slug}-title`}>
                    <SplitWords
                      text={c.name}
                      className="display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[0.95] text-olive-800"
                    />
                  </div>
                  <Reveal delay={0.15}>
                    <p className="serif mt-5 text-[1.35rem] leading-snug text-olive-700">{c.tagline}</p>
                    <p className="mt-5 max-w-[46ch] font-sans text-[15px] leading-[1.9] text-olive-600">{c.intro}</p>
                    {c.note ? (
                      <p className="eyebrow mt-5 text-[10px] text-olive-500">{c.note}</p>
                    ) : null}
                    <Link
                      href={`/collections/${c.slug}`}
                      aria-label={`Explore ${c.name}`}
                      className="btn btn-dark mt-9 px-10"
                    >
                      <span className="eyebrow text-[10px]">Explore the collection</span>
                    </Link>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand
        eyebrow="Lookbook"
        title="See the collections together"
        body="The pieces as they are meant to be worn — layered, mixed and carried from one season into the next."
        primary={{ label: "View the Lookbook", href: "/lookbook" }}
        secondary={{ label: "Shop All", href: "/shop/all" }}
        image="/img/hero-wide.jpg"
        imageAlt="A woman in a floor-length deep olive gown in a sunlit travertine hall"
      />
    </>
  );
}
