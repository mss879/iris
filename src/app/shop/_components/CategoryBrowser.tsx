"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { collections, products as all, type Product } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type Sort = (typeof sorts)[number]["value"];

/**
 * The product list for a category, with sorting and a collection filter.
 * Everything is already on the page, so both work instantly on the client.
 */
export default function CategoryBrowser({ slugs }: { slugs: string[] }) {
  const items = useMemo(
    () => slugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p)),
    [slugs]
  );
  const [sort, setSort] = useState<Sort>("featured");
  const [collection, setCollection] = useState<string>("all");

  const available = collections.filter((c) => items.some((p) => p.collections.includes(c.slug)));

  const shown = useMemo(() => {
    const filtered =
      collection === "all" ? items : items.filter((p) => p.collections.includes(collection as Product["collections"][number]));
    const sorted = [...filtered];
    if (sort === "newest") sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [items, sort, collection]);

  return (
    <div>
      <div className="mb-12 flex flex-col gap-6 border-b hairline pb-6 md:flex-row md:items-end md:justify-between">
        {available.length > 1 ? (
          <fieldset>
            <legend className="eyebrow mb-3 text-[10px] text-olive-500">Collection</legend>
            <div className="flex flex-wrap gap-2">
              {[{ slug: "all", name: "All" }, ...available].map((c) => {
                const active = collection === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setCollection(c.slug)}
                    aria-pressed={active}
                    className={`eyebrow border px-3.5 py-2 text-[9.5px] transition-colors duration-500 ${
                      active
                        ? "border-olive-800 bg-olive-800 text-cream-50"
                        : "border-olive-700/20 text-olive-700 hover:border-olive-700/60"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-6">
          <p className="font-sans text-[12px] tracking-[0.08em] text-olive-600" aria-live="polite">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="flex items-center gap-3">
            <span className="eyebrow text-[10px] text-olive-500">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="field-input w-auto min-w-[11rem] py-2 text-[13px]"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {shown.length > 0 ? (
        <ProductGrid products={shown} />
      ) : (
        <EmptyState
          title="Nothing here just yet"
          action={
            <Link href="/shop/all" className="btn btn-dark px-10">
              <span className="eyebrow text-[10px]">Shop All</span>
            </Link>
          }
        >
          New pieces arrive in small batches. Join the IrisandMe letter to hear about them first.
        </EmptyState>
      )}
    </div>
  );
}
