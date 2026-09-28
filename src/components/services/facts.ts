import { shipping, type Region } from "@/lib/site";
import { products } from "@/lib/products";

/**
 * Facts derived from the shared modules for the Client Services pages, worked
 * out once so Shipping & Delivery, Returns & Exchanges and the FAQ can never
 * describe the same rule two ways.
 */

/** Every delivery region, typed loosely enough to read optional fields. */
export const regions: readonly Region[] = shipping.regions;

export const domestic = regions.find((r) => r.region === "Australia") ?? regions[0];

export const international = regions.filter((r) => r !== domestic);

/** Named international destinations, without the "Rest of World" catch-all. */
export const namedDestinations = international.filter((r) => r.region !== "Rest of World");

export const internationalCarriers = [...new Set(international.map((r) => r.carrier))];

/** The fibres the collection is made from, e.g. ["linen", "cotton", "silk"]. */
export const fibres = [
  ...new Set(products.map((p) => p.composition.replace(/^\d+%\s*/, "").toLowerCase())),
];

/** A live pre-order dispatch estimate to quote as an example, if there is one. */
export const preorderExample = products.find((p) => p.preorder)?.preorder;

/** "a, b and c" — Australian style, without a serial comma. */
export function listJoin(items: readonly string[], conjunction = "and") {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
}

/** "United States" reads as "the United States" mid-sentence. */
export const withArticle = (name: string) => (/^United /.test(name) ? `the ${name}` : name);

/** A region name as it reads mid-sentence, including the catch-all region. */
export const regionPhrase = (name: string) =>
  name === "Rest of World" ? "the rest of the world" : withArticle(name);

/** Regions that offer express delivery, e.g. ["Australia"]. */
export const expressRegions = regions.filter((r) => r.express).map((r) => r.region);

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Anchor id for a name: "Rest of World" → "rest-of-world". */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
