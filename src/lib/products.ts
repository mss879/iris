export type Swatch = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  colour: string;
  price: number;
  image: string;
  /** Lifestyle frame that crossfades in on hover — the second look. */
  hover: string;
  reviews?: number;
  rating?: number;
  badge?: "New" | "Best Seller" | "Final Pieces" | "Restocked";
  swatches: Swatch[];
  sizes: string[];
  /** Sizes that are sold out, rendered struck through rather than hidden. */
  soldOut?: string[];
  fabric: string;
  tags: Array<"new" | "best" | "dresses" | "tops" | "bottoms">;
};

const OLIVE: Swatch = { name: "Deep Olive", hex: "#363E28" };
const CREAM: Swatch = { name: "Raw Cream", hex: "#EFE8D9" };
const SAGE: Swatch = { name: "Soft Sage", hex: "#9FA882" };
const OAT: Swatch = { name: "Oatmeal", hex: "#D3C6AB" };

export const products: Product[] = [
  {
    slug: "iris-wrap-dress",
    name: "Iris Wrap Dress",
    colour: "Deep Olive",
    price: 229,
    image: "/img/p-iris.jpg",
    hover: "/img/ugc-3.jpg",
    reviews: 148,
    rating: 4.8,
    badge: "Best Seller",
    swatches: [OLIVE, CREAM, SAGE],
    sizes: ["XS", "S", "M", "L", "XL"],
    soldOut: ["XS"],
    fabric: "Washed linen",
    tags: ["new", "best", "dresses"],
  },
  {
    slug: "maya-linen-shirt",
    name: "Maya Linen Shirt",
    colour: "Raw Cream",
    price: 149,
    image: "/img/p-maya.jpg",
    hover: "/img/ugc-2.jpg",
    reviews: 62,
    rating: 4.6,
    badge: "New",
    swatches: [CREAM, OLIVE],
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "European flax",
    tags: ["new", "tops"],
  },
  {
    slug: "elara-midi-dress",
    name: "Elara Midi Dress",
    colour: "Deep Olive",
    price: 239,
    image: "/img/p-elara.jpg",
    hover: "/img/ugc-1.jpg",
    reviews: 91,
    rating: 4.9,
    badge: "New",
    swatches: [OLIVE, OAT],
    sizes: ["XS", "S", "M", "L"],
    soldOut: ["L"],
    fabric: "Organic cotton poplin",
    tags: ["new", "best", "dresses"],
  },
  {
    slug: "noor-wide-trousers",
    name: "Noor Wide Trousers",
    colour: "Raw Cream",
    price: 169,
    image: "/img/p-noor.jpg",
    hover: "/img/ugc-5.jpg",
    reviews: 37,
    rating: 4.5,
    swatches: [CREAM, OLIVE, OAT],
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Heavy linen twill",
    tags: ["new", "bottoms"],
  },
  {
    slug: "vera-slip-dress",
    name: "Vera Slip Dress",
    colour: "Soft Sage",
    price: 199,
    image: "/img/p-vera.jpg",
    hover: "/img/ugc-4.jpg",
    reviews: 210,
    rating: 4.9,
    badge: "Best Seller",
    swatches: [SAGE, OLIVE, CREAM],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Sand-washed silk",
    tags: ["best", "dresses"],
  },
  {
    slug: "odette-blouse",
    name: "Odette Blouse",
    colour: "Raw Cream",
    price: 139,
    image: "/img/p-odette.jpg",
    hover: "/img/journal-1.jpg",
    reviews: 44,
    rating: 4.4,
    badge: "New",
    swatches: [CREAM, SAGE],
    sizes: ["XS", "S", "M", "L"],
    soldOut: ["XS", "S"],
    fabric: "Cotton voile",
    tags: ["new", "tops"],
  },
  {
    slug: "lena-maxi-dress",
    name: "Lena Maxi Dress",
    colour: "Deep Olive",
    price: 249,
    image: "/img/p-lena.jpg",
    hover: "/img/editorial-courtyard.jpg",
    reviews: 176,
    rating: 4.8,
    badge: "Restocked",
    swatches: [OLIVE, CREAM],
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Sand-washed silk",
    tags: ["best", "dresses"],
  },
  {
    slug: "ava-knit-jumper",
    name: "Ava Knit Jumper",
    colour: "Oatmeal",
    price: 179,
    image: "/img/p-ava.jpg",
    hover: "/img/journal-3.jpg",
    reviews: 88,
    rating: 4.7,
    badge: "Final Pieces",
    swatches: [OAT, OLIVE],
    sizes: ["S", "M", "L"],
    soldOut: ["S"],
    fabric: "Undyed alpaca",
    tags: ["best", "tops"],
  },
];

export const filters = [
  { key: "new", label: "New In" },
  { key: "best", label: "Best Sellers" },
  { key: "dresses", label: "Dresses" },
  { key: "tops", label: "Tops" },
  { key: "bottoms", label: "Bottoms" },
] as const;

export type FilterKey = (typeof filters)[number]["key"];

export const ugc = [
  { handle: "@amaliaroe", image: "/img/ugc-1.jpg", product: "Elara Midi Dress", colour: "Deep Olive", price: 239, location: "Byron Bay" },
  { handle: "@josie.lane", image: "/img/ugc-2.jpg", product: "Maya Linen Shirt", colour: "Raw Cream", price: 149, location: "Melbourne" },
  { handle: "@wildandsalt", image: "/img/ugc-3.jpg", product: "Iris Wrap Dress", colour: "Deep Olive", price: 229, location: "Noosa" },
  { handle: "@motherofmine", image: "/img/ugc-4.jpg", product: "Vera Slip Dress", colour: "Soft Sage", price: 199, location: "Auckland" },
  { handle: "@thequietfold", image: "/img/ugc-5.jpg", product: "Noor Wide Trousers", colour: "Raw Cream", price: 169, location: "Perth" },
];

export const journal = [
  {
    tag: "Meet the Makers",
    title: "The hands behind the Iris Wrap",
    image: "/img/journal-1.jpg",
    date: "12 August 2026",
    readTime: "6 min",
    excerpt:
      "Nadia has cut every Iris Wrap since the first run of forty. We spent a morning at her table.",
  },
  {
    tag: "Process",
    title: "Dyeing with olive leaf and iron",
    image: "/img/journal-2.jpg",
    date: "28 July 2026",
    readTime: "4 min",
    excerpt:
      "How a bucket of fallen leaves and a rusted nail became the deepest colour we make.",
  },
  {
    tag: "Care",
    title: "How to keep linen for a lifetime",
    image: "/img/journal-3.jpg",
    date: "9 July 2026",
    readTime: "5 min",
    excerpt:
      "Cold water, open air, and the case for never ironing anything again.",
  },
];

/** Press mentions — quiet proof, set as a hairline strip under the fold. */
export const press = [
  "Vogue Australia",
  "The Design Files",
  "Kinfolk",
  "Broadsheet",
  "Gourmet Traveller",
];

export const testimonials = [
  {
    quote:
      "The Lena Maxi is the only thing I packed for three weeks in Italy. It never once looked tired.",
    name: "Amalia R.",
    detail: "Lena Maxi Dress — Deep Olive",
  },
  {
    quote:
      "I have washed the Iris Wrap a hundred times. The linen has gone soft and the colour has not moved.",
    name: "Josie L.",
    detail: "Iris Wrap Dress — Deep Olive",
  },
  {
    quote:
      "It is the first label where I have wanted everything and needed almost nothing else.",
    name: "Frances M.",
    detail: "Maya Linen Shirt — Raw Cream",
  },
];
