"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Product } from "@/lib/products";
import { conversions, type Size } from "@/lib/sizing";
import { store, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/site";
import { lockScroll } from "@/components/SmoothScroll";
import { HeartIcon } from "@/components/icons";
import SizeGuide from "./SizeGuide";

/** Size choice, add to bag and wishlist for one product. */
export default function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState<Size | null>(null);
  const [guide, setGuide] = useState(false);
  const { wishlist } = useStore();
  const saved = wishlist.includes(product.slug);
  const closeGuide = useCallback(() => setGuide(false), []);

  useEffect(() => {
    if (!guide) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [guide]);

  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    store.addToBag({
      key: `${product.slug}:${size}`,
      kind: "product",
      slug: product.slug,
      name: product.name,
      detail: `${product.colour} · Size ${size}${product.preorder ? " · Pre-order" : ""}`,
      price: product.price,
      image: product.image,
    });
    setAdded(size);
  };

  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <div className="mb-4 flex items-baseline justify-between">
          <legend className="eyebrow text-[10px] text-olive-700">
            Size{size ? <span className="ml-2 text-olive-500">— {size} (AU {conversions[size].au})</span> : null}
          </legend>
          <button
            type="button"
            onClick={() => setGuide(true)}
            aria-haspopup="dialog"
            className="eyebrow link-underline text-[9.5px] text-olive-700"
          >
            Size guide
          </button>
        </div>
        {/* Native radios: arrow keys move between sizes, sold-out sizes are skipped. */}
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((s) => {
            const out = product.soldOut?.includes(s);
            return (
              <label key={s} className={out ? "cursor-not-allowed" : "cursor-pointer"}>
                <input
                  type="radio"
                  name={`size-${product.slug}`}
                  value={s}
                  checked={size === s}
                  disabled={out}
                  aria-describedby="size-error"
                  onChange={() => {
                    setSize(s);
                    setError(false);
                    setAdded(null);
                  }}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="eyebrow flex h-12 items-center justify-center border border-olive-700/25 text-[10.5px] text-olive-800 transition-colors duration-300 hover:border-olive-800 peer-checked:border-olive-800 peer-checked:bg-olive-800 peer-checked:text-cream-50 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive-600 peer-disabled:border-olive-700/10 peer-disabled:text-olive-700/35 peer-disabled:line-through peer-disabled:hover:border-olive-700/10"
                >
                  {s}
                </span>
                <span className="sr-only">
                  {s}, AU {conversions[s].au}
                  {out ? ", sold out" : ""}
                </span>
              </label>
            );
          })}
        </div>
        <p id="size-error" aria-live="polite" className="mt-2 min-h-[1.25rem] font-sans text-[12px] text-alert">
          {error ? "Please choose a size." : ""}
        </p>
      </fieldset>

      <div className="flex gap-3">
        <button type="button" onClick={add} className="btn btn-solid flex-1 py-4">
          <span className="eyebrow text-[10px]">
            {product.preorder ? "Pre-order" : "Add to bag"} — {formatPrice(product.price)}
          </span>
        </button>
        <button
          type="button"
          onClick={() => store.toggleWishlist(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="btn btn-dark w-14 shrink-0 px-0"
        >
          <span>
            <HeartIcon className="h-4 w-4" filled={saved} />
          </span>
        </button>
      </div>

      <div aria-live="polite" className="min-h-[1.25rem] font-sans text-[13px] text-olive-700">
        {added ? (
          <p>
            Added to your bag — size {added}.{" "}
            <button type="button" onClick={() => store.setBagOpen(true)} className="underline underline-offset-2">
              View bag
            </button>
          </p>
        ) : null}
      </div>

      <AnimatePresence>
        {guide ? <SizeGuide slug={product.slug} name={product.name} onClose={closeGuide} /> : null}
      </AnimatePresence>
    </div>
  );
}
