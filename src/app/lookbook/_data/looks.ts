import type { CollectionKey } from "@/lib/products";

/**
 * The lookbook, chapter by chapter. Each chapter opens on its collection's
 * campaign photograph (from `collections` in lib/products) and is followed by
 * its looks.
 *
 * `className` places a look on the 12-column lookbook grid. Keep these as
 * whole class names — Tailwind only generates classes it can read in full.
 */

export type Look = {
  image: string;
  alt: string;
  /** The pieces worn, by product slug. Listed and linked under the photograph. */
  products: string[];
  /** Grid placement, mobile first. */
  className: string;
  /** CSS aspect ratio of the frame. Defaults to "3/4". */
  ratio?: string;
  position?: string;
  sizes?: string;
  /** Caption for a detail photograph that is not a look (no products). */
  note?: string;
};

export type Chapter = {
  collection: CollectionKey;
  /** Focal point of the campaign photograph (CSS object-position), so narrow screens keep the subject. */
  platePosition: string;
  looks: Look[];
};

export const chapters: Chapter[] = [
  {
    collection: "the-linen-edit",
    platePosition: "61% top",
    looks: [
      {
        image: "/img/ugc-3.jpg",
        alt: "A woman walking along a coastal dune path in a deep olive linen wrap dress",
        products: ["iris-wrap-dress"],
        className: "col-span-12 md:col-span-6",
      },
      {
        image: "/img/l-linen-cami.jpg",
        alt: "A woman standing in tall grasses in a deep olive linen camisole and wide cream linen trousers",
        products: ["sienna-linen-camisole", "noor-wide-trousers"],
        className: "col-span-10 col-start-3 md:col-span-4 md:col-start-9 md:mt-48",
      },
      {
        image: "/img/ugc-2.jpg",
        alt: "A woman seated on stone steps in a cream linen shirt and matching cream linen trousers",
        products: ["maya-linen-shirt", "noor-wide-trousers"],
        className: "col-span-10 md:col-span-4 md:col-start-2 md:mt-10",
      },
      {
        image: "/img/l-clara-skirt.jpg",
        alt: "A woman perched on a timber bench by a window in a cream camisole and a deep olive bias-cut skirt",
        products: ["clara-bias-skirt"],
        className: "col-span-12 md:col-span-6 md:col-start-7 md:mt-40",
      },
    ],
  },
  {
    collection: "we-love-cotton",
    platePosition: "54% top",
    looks: [
      {
        image: "/img/l-iris-maxi.jpg",
        alt: "A woman walking through a summer meadow in a cream maxi dress printed with irises",
        products: ["iris-print-maxi-dress"],
        className: "col-span-10 md:col-span-4 md:col-start-1 md:mt-40",
      },
      {
        image: "/img/l-elara.jpg",
        alt: "A woman walking down a sunlit whitewashed lane in a deep olive tiered midi dress with full gathered sleeves",
        products: ["elara-midi-dress"],
        className: "col-span-12 md:col-span-6 md:col-start-6",
      },
      {
        image: "/img/l-botanical-blouse.jpg",
        alt: "A woman reading in an armchair in a cream blouse printed with fine olive leaves",
        products: ["botanical-print-blouse"],
        className: "col-span-12 md:col-span-5 md:col-start-2",
      },
      {
        image: "/img/l-cotton-tee.jpg",
        alt: "A woman pouring coffee in a pale kitchen, wearing a cream cotton tee with deep olive trousers",
        products: ["everyday-cotton-tee"],
        className: "col-span-10 col-start-3 md:col-span-4 md:col-start-8 md:mt-56",
      },
    ],
  },
  {
    collection: "the-resort-collection",
    platePosition: "57% top",
    looks: [
      {
        image: "/img/l-resort-set.jpg",
        alt: "A woman seated at the edge of a pool in a deep olive linen shirt and shorts, straw hats beside her",
        products: ["riva-linen-set"],
        className: "col-span-12 md:col-span-5 md:col-start-2",
      },
      {
        image: "/img/l-tessa-shorts.jpg",
        alt: "A woman walking barefoot down a sandy dune path in an olive shirt and cream linen shorts",
        products: ["tessa-linen-shorts"],
        className: "col-span-10 col-start-3 md:col-span-4 md:col-start-8 md:mt-40",
      },
      {
        image: "/img/l-lena.jpg",
        alt: "A woman walking through a sunlit stone courtyard in a sleeveless deep olive linen maxi dress",
        products: ["lena-maxi-dress"],
        className: "col-span-12 md:col-span-4 md:col-start-2 md:mt-10",
      },
      {
        image: "/img/l-vera.jpg",
        alt: "A woman on a terrace above the sea at dusk in a sage silk slip dress",
        products: ["vera-slip-dress"],
        className: "col-span-10 col-start-3 md:col-span-5 md:col-start-7 md:mt-32",
      },
      {
        image: "/img/editorial-courtyard.jpg",
        alt: "A woman in a flowing deep olive dress crossing a sunlit stone courtyard",
        products: [],
        note: "Late light in the courtyard. The resort pieces are cut for long, warm evenings.",
        className: "col-span-12 md:col-span-10 md:col-start-2 md:mt-10",
        ratio: "16/9",
        position: "60% center",
        sizes: "(max-width: 768px) 100vw, 84vw",
      },
    ],
  },
  {
    collection: "the-lotus-collection",
    platePosition: "55% top",
    looks: [
      {
        image: "/img/l-lotus-set.jpg",
        alt: "A woman seated on a stone block between potted olive trees in a cream lotus-print shirt and matching wide trousers",
        products: ["lotus-shirt-and-trouser-set"],
        className: "col-span-12 md:col-span-4",
      },
      {
        image: "/img/l-lotus-dress.jpg",
        alt: "A woman standing beside a stone fountain of lotus leaves in a cream lotus-print midi dress",
        products: ["lotus-midi-dress"],
        className: "col-span-10 col-start-3 md:col-span-4 md:col-start-5 md:mt-32",
      },
      {
        image: "/img/l-lotus-skirt.jpg",
        alt: "A woman walking across a stone terrace in a cream lotus-print maxi skirt, a sleeveless cream top and tan sandals",
        products: ["lotus-maxi-skirt"],
        className: "col-span-10 md:col-span-4 md:col-start-9 md:mt-14",
      },
    ],
  },
  {
    collection: "limited-editions",
    platePosition: "37% top",
    looks: [
      {
        image: "/img/l-heritage-jacket.jpg",
        alt: "A woman in a cream kimono-shaped jacket block printed with deep olive florals, standing in a bright studio",
        products: ["heritage-block-print-jacket"],
        className: "col-span-12 md:col-span-5 md:col-start-2",
      },
      {
        image: "/img/craft-print.jpg",
        alt: "Hands pressing a carved wooden block onto cream cloth beside a freshly printed sprig of deep olive leaves",
        products: [],
        note: "Hand block printed, so no two pieces are exactly alike.",
        className: "col-span-10 col-start-3 md:col-span-5 md:col-start-8 md:mt-48",
        ratio: "4/3",
      },
    ],
  },
];
