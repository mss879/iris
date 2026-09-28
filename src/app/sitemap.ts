import type { MetadataRoute } from "next";
import { articles } from "@/lib/journal";
import { brandPages, discoverPages, legalPages, servicePages } from "@/lib/nav";
import { collections, products, shopCategories } from "@/lib/products";
import { site } from "@/lib/site";

// Account areas are personal and are kept out of search.
const PRIVATE = new Set(["/account", "/wishlist", "/track-order"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  const pages = [
    "/",
    "/shop",
    "/collections",
    "/press",
    ...brandPages.map((p) => p.href),
    ...servicePages.map((p) => p.href),
    ...discoverPages.map((p) => p.href),
    ...legalPages.map((p) => p.href),
  ].filter((p, i, all) => all.indexOf(p) === i && !PRIVATE.has(p));

  return [
    ...pages.map((p) => ({
      url: url(p),
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.6,
    })),
    ...shopCategories.map((c) => ({
      url: url(`/shop/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...collections.map((c) => ({
      url: url(`/collections/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: url(`/products/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: url(`/journal/${a.slug}`),
      lastModified: a.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
