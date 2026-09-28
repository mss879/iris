import { brandPages, discoverPages, legalPages, servicePages } from "./nav";
import { categories, collections, products, prints } from "./products";

export type SearchEntry = {
  kind: "product" | "page";
  label: string;
  href: string;
  meta: string;
  /** Lower-cased haystack the query is matched against. */
  text: string;
};

const pages: SearchEntry[] = [
  ...categories
    .filter((c) => c.enabled)
    .map((c) => ({ label: c.label, href: `/shop/${c.slug}`, meta: "Shop", extra: c.blurb })),
  ...collections.map((c) => ({
    label: c.name,
    href: `/collections/${c.slug}`,
    meta: "Collection",
    extra: `${c.tagline} ${c.intro}`,
  })),
  ...prints.map((p) => ({ label: p.name, href: "/our-prints", meta: "Our Prints", extra: p.summary })),
  ...brandPages.map((p) => ({ ...p, meta: "IrisandMe", extra: "" })),
  ...servicePages.map((p) => ({ ...p, meta: "Client Services", extra: "help delivery refund exchange sizing" })),
  ...discoverPages.map((p) => ({ ...p, meta: "Discover", extra: "" })),
  ...legalPages.map((p) => ({ ...p, meta: "Legal", extra: "policy" })),
  { label: "My Account", href: "/account", meta: "Account", extra: "sign in orders addresses" },
  { label: "Wishlist", href: "/wishlist", meta: "Account", extra: "saved favourites" },
].map((p) => ({
  kind: "page" as const,
  label: p.label,
  href: p.href,
  meta: p.meta,
  text: `${p.label} ${p.meta} ${p.extra}`.toLowerCase(),
}));

const productEntries: SearchEntry[] = products.map((p) => ({
  kind: "product",
  label: p.name,
  href: `/products/${p.slug}`,
  meta: `${p.colour} · ${p.fabric}`,
  text: [
    p.name,
    p.colour,
    p.fabric,
    p.composition,
    p.category.replace(/-/g, " "),
    p.print?.replace(/-/g, " ") ?? "",
    p.collections.join(" ").replace(/-/g, " "),
    p.essentials ? "essentials" : "",
    p.isNew ? "new arrivals new in" : "",
  ]
    .join(" ")
    .toLowerCase(),
}));

/** Every word of the query must appear somewhere in the entry. */
export function search(query: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { products: [], pages: [] };
  const match = (e: SearchEntry) => words.every((w) => e.text.includes(w));
  return {
    products: productEntries.filter(match).slice(0, 8),
    pages: pages.filter(match).slice(0, 6),
  };
}
