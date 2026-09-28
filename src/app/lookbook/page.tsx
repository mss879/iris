import type { Metadata } from "next";
import { Fragment } from "react";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/anim/Reveal";
import { getCollection, type Collection } from "@/lib/products";
import { site } from "@/lib/site";
import ChapterPlate from "./_components/ChapterPlate";
import LookFigure from "./_components/LookFigure";
import { chapters, type Look } from "./_data/looks";

const description =
  "The IrisandMe lookbook: The Linen Edit, We Love Cotton, The Resort Collection, The Lotus Collection and Limited Editions — pieces in natural fabrics, photographed as they are meant to be worn.";

export const metadata: Metadata = {
  title: "Lookbook",
  description,
  alternates: { canonical: "/lookbook" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
    url: "/lookbook",
    title: "The Lookbook",
    description,
    images: [
      {
        url: "/img/hero-wide.jpg",
        alt: "A woman in a floor-length deep olive gown standing in a sunlit travertine hall",
      },
    ],
  },
};

type NumberedLook = { look: Look; number?: number };
type ChapterView = {
  collection: Collection;
  platePosition: string;
  looks: NumberedLook[];
  lookCount: number;
};

/**
 * Looks are numbered straight through the book, as on a runway card; detail
 * photographs without pieces are left unnumbered.
 */
const book: ChapterView[] = (() => {
  let count = 0;
  const views: ChapterView[] = [];
  for (const chapter of chapters) {
    const collection = getCollection(chapter.collection);
    if (!collection) continue;
    const looks = chapter.looks.map((look) => ({
      look,
      number: look.products.length > 0 ? ++count : undefined,
    }));
    views.push({
      collection,
      platePosition: chapter.platePosition,
      looks,
      lookCount: looks.filter((l) => l.number).length,
    });
  }
  return views;
})();

const pad = (n: number) => String(n).padStart(2, "0");

/** LOOKBOOK — an image-led editorial, one chapter per collection. */
export default function LookbookPage() {
  return (
    <>
      <PageHero
        variant="image"
        image="/img/hero-wide.jpg"
        imageAlt="A woman in a floor-length deep olive gown standing in a sunlit travertine hall"
        position="70% center"
        eyebrow="Five collections"
        title="The Lookbook"
        intro="Linen in coastal light, cotton on whitewashed lanes, prints beside still water. Five collections, worn as they were made to be."
        crumbs={[{ label: "Home", href: "/" }, { label: "Lookbook" }]}
      >
        <nav aria-label="Lookbook chapters">
          <ol className="flex flex-wrap gap-x-7 gap-y-3">
            {book.map((chapter, i) => (
              <li key={chapter.collection.slug}>
                <a
                  href={`#${chapter.collection.slug}`}
                  className="eyebrow link-underline text-[10px] text-cream-100/90 transition-colors duration-500 hover:text-cream-50"
                >
                  <span className="mr-2 text-cream-100/60">{pad(i + 1)}</span>
                  {chapter.collection.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <div className="bg-cream-100 px-6 py-20 md:px-14 md:py-28">
        <Reveal>
          <p className="serif mx-auto max-w-[36ch] text-center text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.35] text-olive-700">
            Five collections, one way of dressing: natural cloth, easy shapes and prints drawn by hand —
            pieces made to be worn together, season after season.
          </p>
        </Reveal>
      </div>

      {book.map((chapter, i) => {
        const slug = chapter.collection.slug;
        return (
          <Fragment key={slug}>
            <section id={slug} aria-labelledby={`${slug}-title`}>
              <ChapterPlate
                collection={chapter.collection}
                index={pad(i + 1)}
                lookCount={chapter.lookCount}
                titleId={`${slug}-title`}
                position={chapter.platePosition}
              />
              <div className="bg-cream-100 px-6 py-24 md:px-14 md:py-36">
                <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-start gap-x-4 gap-y-16 md:gap-x-8 md:gap-y-24">
                  {chapter.looks.map(({ look, number }) => (
                    <LookFigure key={look.image} look={look} number={number} />
                  ))}
                </div>
              </div>
            </section>

            {/*
              A breath between the everyday chapters and the travelling ones,
              set inside the page rather than full bleed so it never meets the
              next chapter's plate edge to edge.
            */}
            {i === 1 ? (
              <div className="bg-cream-100 px-6 pb-24 md:px-14 md:pb-36">
                <div className="mx-auto max-w-[1440px]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-olive-900 sm:aspect-[16/9]">
                    <ParallaxImage
                      src="/img/hero-alt.jpg"
                      alt="A woman in a long deep olive gown standing beside a stone archway in a sunlit hall"
                      position="70% center"
                      sizes="(max-width: 1440px) 100vw, 1440px"
                    />
                  </div>
                  <Reveal>
                    <p className="serif mx-auto mt-12 max-w-[24ch] text-center text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.25] text-olive-700 md:mt-16">
                      Nothing here is designed for a single season.
                    </p>
                  </Reveal>
                </div>
              </div>
            ) : null}
          </Fragment>
        );
      })}

      <CtaBand
        eyebrow="Continue"
        title="Explore the collections"
        body="Every look belongs to one of five collections, each with its own story — and every piece is made to be worn well beyond a single season."
        primary={{ label: "View the collections", href: "/collections" }}
        secondary={{ label: "Shop new arrivals", href: "/shop/new-arrivals" }}
      />
    </>
  );
}
