"use client";

import Link from "next/link";
import { getProduct, products, type Product } from "@/lib/products";
import { store, useStore } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/Section";

/** The saved pieces, read from the browser's wishlist. */
export default function WishlistItems() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is Product => Boolean(p));
  const suggestions = products.filter((p) => p.isNew && !wishlist.includes(p.slug)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-24">
        <EmptyState
          title="Your wishlist is waiting"
          action={
            <Link href="/shop/new-arrivals" className="btn btn-dark px-10">
              <span className="eyebrow text-[10px]">Discover New Arrivals</span>
            </Link>
          }
        >
          Tap the heart on any piece to keep it here while you decide. Your wishlist is saved on this
          device.
        </EmptyState>

        <div>
          <SectionHeading eyebrow="To begin" title="Recently arrived" size="small" className="mb-12" />
          <ProductGrid products={suggestions} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b hairline pb-6">
        <p className="font-sans text-[13px] text-olive-600" aria-live="polite">
          {items.length} saved {items.length === 1 ? "piece" : "pieces"}
        </p>
        <button
          type="button"
          onClick={() => items.forEach((p) => store.removeFromWishlist(p.slug))}
          className="eyebrow link-underline text-[10px] text-olive-700"
        >
          Clear wishlist
        </button>
      </div>
      <ProductGrid products={items} />
    </div>
  );
}
