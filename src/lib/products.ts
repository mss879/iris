import type { FitKey, Size } from "./sizing";

/* -------------------------------------------------------------------------- */
/*  Shop categories                                                           */
/* -------------------------------------------------------------------------- */

export type CategoryKey =
  | "dresses"
  | "tops-and-shirts"
  | "skirts"
  | "trousers-and-shorts"
  | "sets-and-co-ords";

export type Category = {
  slug: string;
  label: string;
  blurb: string;
  image: string;
  /** Categories switched off until they are ready to launch. */
  enabled: boolean;
};

/** The SHOP menu, in the order briefed. */
export const categories: Category[] = [
  {
    slug: "new-arrivals",
    label: "New Arrivals",
    blurb: "The latest pieces from the studio, released in small batches.",
    image: "/img/p-iris-maxi.jpg",
    enabled: true,
  },
  {
    slug: "all",
    label: "Shop All",
    blurb: "Every IrisandMe piece currently available, in one place.",
    image: "/img/p-maya.jpg",
    enabled: true,
  },
  {
    slug: "dresses",
    label: "Dresses",
    blurb: "Wrap, midi and maxi dresses in linen, cotton and silk.",
    image: "/img/p-lena.jpg",
    enabled: true,
  },
  {
    slug: "tops-and-shirts",
    label: "Tops & Shirts",
    blurb: "Linen shirts, cotton blouses and the tops everything else is built around.",
    image: "/img/p-odette.jpg",
    enabled: true,
  },
  {
    slug: "skirts",
    label: "Skirts",
    blurb: "Bias-cut and gathered skirts that move as you do.",
    image: "/img/p-lotus-skirt.jpg",
    enabled: true,
  },
  {
    slug: "trousers-and-shorts",
    label: "Trousers & Shorts",
    blurb: "Wide-leg trousers and pleated shorts in weighty, breathable linen.",
    image: "/img/p-noor.jpg",
    enabled: true,
  },
  {
    slug: "sets-and-co-ords",
    label: "Sets / Co-ords",
    blurb: "Matching pieces designed to be worn together — and apart.",
    image: "/img/p-lotus-set.jpg",
    enabled: true,
  },
  {
    slug: "essentials",
    label: "Essentials",
    blurb: "The quiet foundations of a considered wardrobe, made to be worn on repeat.",
    image: "/img/p-cotton-tee.jpg",
    enabled: true,
  },
  {
    slug: "sale",
    label: "Sale",
    blurb: "Selected pieces at reduced prices.",
    image: "/img/p-vera.jpg",
    // To be added later, per the brief. Flip to true to publish /shop/sale.
    enabled: false,
  },
];

export const shopCategories = categories.filter((c) => c.enabled);

/* -------------------------------------------------------------------------- */
/*  Collections                                                               */
/* -------------------------------------------------------------------------- */

export type CollectionKey =
  | "the-linen-edit"
  | "we-love-cotton"
  | "the-resort-collection"
  | "the-lotus-collection"
  | "limited-editions";

export type Collection = {
  slug: CollectionKey;
  name: string;
  tagline: string;
  /** Wide campaign frame for the collection hero. */
  image: string;
  imageAlt: string;
  /** Portrait frame for index cards and menus. */
  portrait: string;
  intro: string;
  story: string[];
  note?: string;
};

export const collections: Collection[] = [
  {
    slug: "the-linen-edit",
    name: "The Linen Edit",
    tagline: "Washed linen, made to soften with every wear.",
    image: "/img/col-linen.jpg",
    imageAlt: "A woman in a cream linen shirt dress walking through tall coastal grasses",
    portrait: "/img/p-iris.jpg",
    intro:
      "The foundation of IrisandMe. Relaxed shirts, wrap dresses and wide trousers in washed linen — cool in the heat, easy in the everyday, and made to grow softer every time they are worn.",
    story: [
      "Linen is the fabric we return to most. It breathes, it lasts, and it carries the small irregularities of the flax it is spun from — a texture no synthetic can imitate.",
      "The Linen Edit keeps to a quiet palette of raw cream and deep olive so that every piece works with every other. Nothing here is designed for a single season; each piece is meant to be reached for year after year.",
    ],
  },
  {
    slug: "we-love-cotton",
    name: "We Love Cotton",
    tagline: "Soft, breathable, endlessly wearable.",
    image: "/img/col-cotton.jpg",
    imageAlt: "Two women in cream and deep olive cotton dresses walking along a sunlit village lane",
    portrait: "/img/p-elara.jpg",
    intro:
      "A celebration of cotton in its most wearable forms — crisp poplin, airy voile and soft jersey — shaped into dresses, blouses and everyday pieces that breathe with you.",
    story: [
      "Cotton is honest and generous: soft against the skin, easy to care for and comfortable from morning until night.",
      "Here it carries two of our signature prints, The Iris and Botanical Studies, alongside the plain cotton pieces that anchor a wardrobe.",
    ],
  },
  {
    slug: "the-resort-collection",
    name: "The Resort Collection",
    tagline: "For long days in warm light.",
    image: "/img/col-resort.jpg",
    imageAlt: "A woman in a flowing deep olive linen maxi dress on a stone terrace above a calm sea",
    portrait: "/img/p-vera.jpg",
    intro:
      "Pieces for travelling light and staying a while: bias-cut silk, washed linen sets and easy dresses that move from sea air to evening without a second thought.",
    story: [
      "Designed around the rhythm of a slower holiday — a swim before breakfast, a long lunch, a walk as the light turns gold.",
      "Every piece folds small, creases gracefully and pairs with the rest, so a few pieces make a whole trip.",
    ],
  },
  {
    slug: "the-lotus-collection",
    name: "The Lotus Collection",
    tagline: "Our signature lotus, drawn by hand.",
    image: "/img/col-lotus.jpg",
    imageAlt: "A woman in a cream lotus-print dress beside a pond of pale lotus flowers",
    portrait: "/img/p-lotus-set.jpg",
    intro:
      "Built around The Lotus — flowers, buds and leaves drawn by hand and printed on soft cotton. A flower that rises from still water, quietly beautiful, season after season.",
    story: [
      "The lotus connects two things we care about deeply: the natural world, and the heritage of pattern-making that has celebrated it for centuries.",
      "We print it in deep olive on cream so it reads softly, like a drawing, and place it on shapes you can wear for years.",
    ],
  },
  {
    slug: "limited-editions",
    name: "Limited Editions",
    tagline: "Made once, in small numbers.",
    image: "/img/col-limited.jpg",
    imageAlt: "A hand block-printed cream jacket hanging against a lime-washed atelier wall",
    portrait: "/img/p-heritage-jacket.jpg",
    intro:
      "Our most crafted pieces, made in small, numbered runs using artisan techniques such as hand block printing. When an edition is gone, it is not remade.",
    story: [
      "Limited Editions give us room to slow down further — to work with techniques that cannot be rushed and to celebrate the gentle variations of the hand.",
      "Each piece is released in a small quantity and numbered, so it remains as individual as the woman who wears it.",
    ],
    note: "Released in small, numbered runs",
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/* -------------------------------------------------------------------------- */
/*  Signature prints                                                          */
/* -------------------------------------------------------------------------- */

export type PrintKey = "the-iris" | "the-lotus" | "botanical-studies" | "heritage-inspiration";

export const prints: { slug: PrintKey; name: string; image: string; summary: string }[] = [
  {
    slug: "the-iris",
    name: "The Iris",
    image: "/img/print-iris.jpg",
    summary:
      "Slender stems and open petals, drawn by hand in sage and soft lavender-grey — the flower at the heart of our name.",
  },
  {
    slug: "the-lotus",
    name: "The Lotus",
    image: "/img/print-lotus.jpg",
    summary:
      "Lotus flowers, buds and leaves in deep olive on cream, with the soft edges of a hand-printed mark.",
  },
  {
    slug: "botanical-studies",
    name: "Botanical Studies",
    image: "/img/print-botanical.jpg",
    summary:
      "Fine leaf and wildflower drawings taken from our sketchbooks and printed as they were drawn.",
  },
  {
    slug: "heritage-inspiration",
    name: "Heritage Inspiration",
    image: "/img/print-heritage.jpg",
    summary:
      "Patterns that honour traditional textile craft, reinterpreted for a contemporary wardrobe.",
  },
];

export const getPrint = (slug: string) => prints.find((p) => p.slug === slug);

/* -------------------------------------------------------------------------- */
/*  Products                                                                  */
/* -------------------------------------------------------------------------- */

export type Product = {
  slug: string;
  name: string;
  colour: string;
  price: number;
  image: string;
  /** Lifestyle frame that crossfades in on hover — the second look. */
  hover?: string;
  badge?: "New" | "Limited Edition" | "Final Pieces" | "Pre-order";
  category: CategoryKey;
  isNew?: boolean;
  essentials?: boolean;
  collections: CollectionKey[];
  print?: PrintKey;
  fabric: string;
  composition: string;
  fit: FitKey;
  sizes: Size[];
  /** Sizes that are sold out, rendered struck through rather than hidden. */
  soldOut?: Size[];
  /** Estimated dispatch for pieces sold ahead of arrival. */
  preorder?: string;
  description: string;
  details: string[];
  care: string;
};

const ALL: Size[] = ["XS", "S", "M", "L", "XL"];

const CARE_LINEN =
  "Cool machine wash on a gentle cycle or hand wash. Line dry in the shade and steam, or warm iron while slightly damp.";
const CARE_COTTON =
  "Cool machine wash on a gentle cycle with like colours. Line dry in the shade and warm iron on the reverse.";
const CARE_PRINT =
  "Cool gentle wash, inside out, with a mild detergent. Line dry in the shade and warm iron on the reverse to protect the print.";
const CARE_SILK =
  "Hand wash cold with a gentle silk detergent, or dry clean. Dry flat in the shade and cool iron on the reverse.";
const CARE_KNIT =
  "Hand wash cold with a wool detergent. Dry flat away from direct heat and sunlight. Fold — never hang — to store.";

export const products: Product[] = [
  {
    slug: "iris-wrap-dress",
    name: "Iris Wrap Dress",
    colour: "Deep Olive",
    price: 229,
    image: "/img/p-iris.jpg",
    hover: "/img/ugc-3.jpg",
    badge: "New",
    category: "dresses",
    isNew: true,
    collections: ["the-linen-edit"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "regular",
    sizes: ALL,
    soldOut: ["XS"],
    description:
      "A true wrap in washed linen, with softly gathered elbow-length sleeves and a long tie that sits at the natural waist. Easy enough for every day, considered enough for an occasion.",
    details: [
      "Wrap front with an internal tie and long self-tie waist",
      "Elbow-length sleeves with a soft gather",
      "Side-seam pockets",
      "Midi length, falling below the knee",
      "French seams throughout",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "maya-linen-shirt",
    name: "Maya Linen Shirt",
    colour: "Raw Cream",
    price: 149,
    image: "/img/p-maya.jpg",
    hover: "/img/ugc-2.jpg",
    category: "tops-and-shirts",
    isNew: true,
    essentials: true,
    collections: ["the-linen-edit"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "relaxed",
    sizes: ALL,
    description:
      "The shirt we reach for first. Cut generously in washed linen with a softly dropped shoulder and a curved hem that can be worn loose or tucked.",
    details: [
      "Relaxed fit with a dropped shoulder",
      "Natural corozo buttons",
      "Single chest pocket",
      "Curved hem, longer at the back",
      "Pairs with the Noor Wide Trousers",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "iris-print-maxi-dress",
    name: "Iris Print Maxi Dress",
    colour: "Cream Iris",
    price: 269,
    image: "/img/p-iris-maxi.jpg",
    hover: "/img/l-iris-maxi.jpg",
    badge: "New",
    category: "dresses",
    isNew: true,
    collections: ["we-love-cotton"],
    print: "the-iris",
    fabric: "Cotton voile",
    composition: "100% cotton",
    fit: "relaxed",
    sizes: ALL,
    description:
      "The Iris, drawn by hand, on a floating maxi dress in cotton voile with flutter sleeves and a softly gathered skirt.",
    details: [
      "Flutter sleeves",
      "Button-front bodice",
      "Gathered, tiered skirt with a cotton lining",
      "Ankle length",
      "Printed with The Iris",
    ],
    care: CARE_PRINT,
  },
  {
    slug: "lotus-shirt-and-trouser-set",
    name: "Lotus Shirt & Trouser Set",
    colour: "Cream Lotus",
    price: 329,
    image: "/img/p-lotus-set.jpg",
    hover: "/img/l-lotus-set.jpg",
    badge: "New",
    category: "sets-and-co-ords",
    isNew: true,
    collections: ["the-lotus-collection"],
    print: "the-lotus",
    fabric: "Cotton voile",
    composition: "100% cotton",
    fit: "relaxed",
    sizes: ALL,
    soldOut: ["XL"],
    description:
      "A relaxed shirt and wide trouser in soft cotton, both printed with The Lotus. Wear them together for ease, or apart to stretch your wardrobe further.",
    details: [
      "Relaxed long-sleeve shirt with covered buttons",
      "Wide-leg trouser with an elasticated back waist",
      "Side-seam pockets",
      "Printed with The Lotus",
      "Sold as a set",
    ],
    care: CARE_PRINT,
  },
  {
    slug: "lotus-maxi-skirt",
    name: "Lotus Maxi Skirt",
    colour: "Cream Lotus",
    price: 189,
    image: "/img/p-lotus-skirt.jpg",
    hover: "/img/l-lotus-skirt.jpg",
    category: "skirts",
    isNew: true,
    collections: ["the-lotus-collection"],
    print: "the-lotus",
    fabric: "Cotton voile",
    composition: "100% cotton",
    fit: "relaxed",
    sizes: ALL,
    description:
      "A generous gathered skirt printed with our signature Lotus. The elasticated back waist and full hem make it as comfortable as it is graceful.",
    details: [
      "Flat front waistband with an elasticated back",
      "Gathered, ankle-length skirt",
      "Side-seam pockets",
      "Printed with The Lotus",
    ],
    care: CARE_PRINT,
  },
  {
    slug: "lotus-midi-dress",
    name: "Lotus Midi Dress",
    colour: "Cream Lotus",
    price: 259,
    image: "/img/p-lotus-dress.jpg",
    hover: "/img/l-lotus-dress.jpg",
    badge: "Pre-order",
    category: "dresses",
    isNew: true,
    collections: ["the-lotus-collection"],
    print: "the-lotus",
    fabric: "Cotton voile",
    composition: "100% cotton",
    fit: "fitted",
    sizes: ALL,
    preorder: "Estimated dispatch in 4–6 weeks",
    description:
      "A softly fitted bodice and gathered midi skirt in cotton voile, printed with The Lotus. Available to pre-order ahead of its arrival in the studio.",
    details: [
      "Square neckline with short puff sleeves",
      "Fitted bodice, gathered skirt",
      "Concealed back zip",
      "Midi length",
      "Printed with The Lotus",
    ],
    care: CARE_PRINT,
  },
  {
    slug: "elara-midi-dress",
    name: "Elara Midi Dress",
    colour: "Deep Olive",
    price: 239,
    image: "/img/p-elara.jpg",
    hover: "/img/l-elara.jpg",
    category: "dresses",
    isNew: true,
    collections: ["we-love-cotton"],
    fabric: "Cotton poplin",
    composition: "100% cotton",
    fit: "relaxed",
    sizes: ["XS", "S", "M", "L"],
    soldOut: ["L"],
    description:
      "A tiered midi in crisp cotton poplin with full, gathered sleeves. It moves beautifully and softens with every wash.",
    details: [
      "Two-tier gathered skirt",
      "Long sleeves with elasticated cuffs",
      "Button keyhole at the back neck",
      "Side-seam pockets",
      "Midi length",
    ],
    care: CARE_COTTON,
  },
  {
    slug: "sienna-linen-camisole",
    name: "Sienna Linen Camisole",
    colour: "Deep Olive",
    price: 99,
    image: "/img/p-linen-cami.jpg",
    hover: "/img/l-linen-cami.jpg",
    category: "tops-and-shirts",
    isNew: true,
    essentials: true,
    collections: ["the-linen-edit"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "regular",
    sizes: ALL,
    description:
      "A fine-strapped camisole in washed linen with a straight neckline. Worn alone through summer, or layered beneath a shirt all year.",
    details: [
      "Adjustable fine straps",
      "Straight neckline",
      "Relaxed, hip-length body",
      "Pairs with the Clara Bias Skirt",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "odette-blouse",
    name: "Odette Blouse",
    colour: "Raw Cream",
    price: 139,
    image: "/img/p-odette.jpg",
    hover: "/img/l-odette.jpg",
    category: "tops-and-shirts",
    isNew: true,
    collections: ["we-love-cotton"],
    fabric: "Cotton voile",
    composition: "100% cotton",
    fit: "relaxed",
    sizes: ["XS", "S", "M", "L"],
    soldOut: ["XS", "S"],
    description:
      "An airy blouse in fine cotton voile with a gathered split neckline and full sleeves that close at a narrow cuff.",
    details: [
      "Split neckline with a soft gather",
      "Full sleeves with button cuffs",
      "Lightweight, softly sheer voile",
      "Relaxed through the body",
    ],
    care: CARE_COTTON,
  },
  {
    slug: "tessa-linen-shorts",
    name: "Tessa Linen Shorts",
    colour: "Raw Cream",
    price: 119,
    image: "/img/p-tessa-shorts.jpg",
    hover: "/img/l-tessa-shorts.jpg",
    category: "trousers-and-shorts",
    isNew: true,
    collections: ["the-resort-collection", "the-linen-edit"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "relaxed",
    sizes: ALL,
    description:
      "Pleated, high-waisted shorts in washed linen with a relaxed leg — polished enough for lunch, easy enough for the beach.",
    details: [
      "High rise with front pleats",
      "Button and zip fastening",
      "Side-seam pockets",
      "Mid-thigh length",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "lena-maxi-dress",
    name: "Lena Maxi Dress",
    colour: "Deep Olive",
    price: 249,
    image: "/img/p-lena.jpg",
    hover: "/img/l-lena.jpg",
    category: "dresses",
    collections: ["the-resort-collection", "the-linen-edit"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "relaxed",
    sizes: ALL,
    description:
      "A sleeveless column of washed linen that falls from a wide scoop neck to the ankle. Loose and cool through summer; layered over knitwear when the light turns.",
    details: [
      "Sleeveless, with a wide scoop neck",
      "Straight, relaxed column shape",
      "Deep side-seam pockets",
      "Ankle length",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "vera-slip-dress",
    name: "Vera Slip Dress",
    colour: "Soft Sage",
    price: 199,
    image: "/img/p-vera.jpg",
    hover: "/img/l-vera.jpg",
    category: "dresses",
    collections: ["the-resort-collection"],
    fabric: "Sand-washed silk",
    composition: "100% silk",
    fit: "regular",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Cut on the bias so it skims rather than clings, in sand-washed silk with a soft, matte handle. Wear it alone or layered.",
    details: ["Bias cut", "Adjustable straps", "V-neckline", "Midi length"],
    care: CARE_SILK,
  },
  {
    slug: "riva-linen-set",
    name: "Riva Linen Set",
    colour: "Deep Olive",
    price: 279,
    image: "/img/p-resort-set.jpg",
    hover: "/img/l-resort-set.jpg",
    category: "sets-and-co-ords",
    collections: ["the-resort-collection"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "relaxed",
    sizes: ALL,
    description:
      "A camp-collar shirt and relaxed short in washed linen, made for warm days and slow travel. Each piece stands on its own, too.",
    details: [
      "Short-sleeve camp-collar shirt",
      "Relaxed short with an elasticated back waist",
      "Natural corozo buttons",
      "Sold as a set",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "noor-wide-trousers",
    name: "Noor Wide Trousers",
    colour: "Raw Cream",
    price: 169,
    image: "/img/p-noor.jpg",
    hover: "/img/l-noor.jpg",
    category: "trousers-and-shorts",
    essentials: true,
    collections: ["the-linen-edit"],
    fabric: "Linen twill",
    composition: "100% linen",
    fit: "relaxed",
    sizes: ALL,
    description:
      "High-waisted, wide-legged trousers in a weighty linen twill that holds its shape and falls cleanly to the floor.",
    details: [
      "High rise with front pleats",
      "Concealed zip and button fastening",
      "Side-seam and back welt pockets",
      "Wide, full-length leg",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "clara-bias-skirt",
    name: "Clara Bias Skirt",
    colour: "Deep Olive",
    price: 159,
    image: "/img/p-clara-skirt.jpg",
    hover: "/img/l-clara-skirt.jpg",
    category: "skirts",
    essentials: true,
    collections: ["the-linen-edit"],
    fabric: "Washed linen",
    composition: "100% linen",
    fit: "regular",
    sizes: ALL,
    description:
      "A bias-cut midi skirt in washed linen that follows the body and swings as you walk. Wear it with a tee by day or a camisole by night.",
    details: [
      "Bias cut for movement",
      "Elasticated waist",
      "Midi length",
      "Pairs with the Sienna Linen Camisole",
    ],
    care: CARE_LINEN,
  },
  {
    slug: "everyday-cotton-tee",
    name: "Everyday Cotton Tee",
    colour: "Raw Cream",
    price: 69,
    image: "/img/p-cotton-tee.jpg",
    hover: "/img/l-cotton-tee.jpg",
    category: "tops-and-shirts",
    essentials: true,
    collections: ["we-love-cotton"],
    fabric: "Cotton jersey",
    composition: "100% cotton",
    fit: "regular",
    sizes: ALL,
    description:
      "A clean crew-neck tee in soft, substantial cotton jersey. The foundation everything else is built on.",
    details: [
      "Crew neck",
      "Straight, regular fit",
      "Mid-weight jersey that holds its shape",
      "Tucks neatly into skirts and trousers",
    ],
    care: CARE_COTTON,
  },
  {
    slug: "botanical-print-blouse",
    name: "Botanical Print Blouse",
    colour: "Cream Botanical",
    price: 159,
    image: "/img/p-botanical-blouse.jpg",
    hover: "/img/l-botanical-blouse.jpg",
    category: "tops-and-shirts",
    collections: ["we-love-cotton"],
    print: "botanical-studies",
    fabric: "Cotton lawn",
    composition: "100% cotton",
    fit: "relaxed",
    sizes: ALL,
    description:
      "A relaxed blouse with a soft frilled collar, printed with Botanical Studies — fine leaf drawings taken from our sketchbooks.",
    details: [
      "Frilled round collar",
      "Button back",
      "Full sleeves with narrow cuffs",
      "Printed with Botanical Studies",
    ],
    care: CARE_PRINT,
  },
  {
    slug: "heritage-block-print-jacket",
    name: "Heritage Block-Print Jacket",
    colour: "Cream & Olive",
    price: 349,
    image: "/img/p-heritage-jacket.jpg",
    hover: "/img/l-heritage-jacket.jpg",
    badge: "Limited Edition",
    category: "tops-and-shirts",
    collections: ["limited-editions"],
    print: "heritage-inspiration",
    fabric: "Hand block-printed cotton",
    composition: "100% cotton",
    fit: "oversized",
    sizes: ["XS", "S", "M", "L"],
    soldOut: ["M"],
    description:
      "A kimono-shaped jacket in cotton, hand block printed with a pattern drawn from heritage textiles. Made in a small, numbered run, each piece carries the gentle variations of the hand.",
    details: [
      "Relaxed kimono shape with dropped sleeves",
      "Hand block printed — no two exactly alike",
      "Self-tie belt",
      "Made in a small, numbered edition",
    ],
    care: CARE_PRINT,
  },
  {
    slug: "ava-knit-jumper",
    name: "Ava Knit Jumper",
    colour: "Oatmeal",
    price: 179,
    image: "/img/p-ava.jpg",
    hover: "/img/journal-3.jpg",
    badge: "Final Pieces",
    category: "tops-and-shirts",
    essentials: true,
    collections: ["limited-editions"],
    fabric: "Undyed alpaca",
    composition: "100% alpaca",
    fit: "relaxed",
    sizes: ["S", "M", "L"],
    soldOut: ["S"],
    description:
      "A softly structured crew-neck knitted from undyed alpaca in its natural oatmeal shade. Light, warm and quietly textured.",
    details: [
      "Crew neck with ribbed trims",
      "Dropped shoulder",
      "Undyed yarn in its natural colour",
      "Made in a single small run",
    ],
    care: CARE_KNIT,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Products shown on a /shop/[category] page. */
export function productsIn(category: string): Product[] {
  switch (category) {
    case "all":
      return products;
    case "new-arrivals":
      return products.filter((p) => p.isNew);
    case "essentials":
      return products.filter((p) => p.essentials);
    default:
      return products.filter((p) => p.category === category);
  }
}

export const productsInCollection = (slug: CollectionKey) =>
  products.filter((p) => p.collections.includes(slug));

export const categoryLabel = (key: CategoryKey) =>
  categories.find((c) => c.slug === key)?.label ?? key;
