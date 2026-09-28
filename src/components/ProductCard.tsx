"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { EASE_OUT, DUR } from "@/lib/motion";
import { formatPrice } from "@/lib/site";
import { store, useStore } from "@/lib/store";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
  index = 0,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  quickAdd = true,
}: {
  product: Product;
  index?: number;
  sizes?: string;
  quickAdd?: boolean;
}) {
  const stagger = (index % 4) * 0.09;
  const [added, setAdded] = useState<string | null>(null);
  const { wishlist } = useStore();
  const saved = wishlist.includes(product.slug);
  const href = `/products/${product.slug}`;

  const add = (size: string) => {
    setAdded(size);
    store.addToBag({
      key: `${product.slug}:${size}`,
      kind: "product",
      slug: product.slug,
      name: product.name,
      detail: `${product.colour} · Size ${size}`,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DUR.base, delay: stagger, ease: EASE_OUT }}
      className="group/card"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-200">
        <Link
          href={href}
          data-cursor="view"
          className="absolute inset-0 z-10"
          aria-label={`${product.name}, ${product.colour}, ${formatPrice(product.price)}`}
        />

        <Image
          src={product.image}
          alt={`${product.name} in ${product.colour}`}
          fill
          sizes={sizes}
          className={`object-cover transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04] ${
            product.hover ? "group-hover/card:opacity-0" : ""
          }`}
        />
        {/* Second look, held underneath and revealed as the first fades out. */}
        {product.hover ? (
          <Image
            src={product.hover}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className="scale-[1.06] object-cover opacity-0 transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-100 group-hover/card:opacity-100"
          />
        ) : null}

        {/*
          Wipe panel rather than a clip-path on the image: Motion animates
          transforms reliably here, whereas clipPath silently never ran and
          left every card invisible. Scaling from the bottom edge uncovers
          the photograph top-down for the same effect.
        */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 origin-bottom bg-cream-200"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: DUR.reveal, delay: stagger, ease: EASE_OUT }}
        />

        {product.badge ? (
          <span className="eyebrow pointer-events-none absolute left-3 top-3 z-30 bg-cream-50/92 px-2.5 py-1.5 text-[9px] text-olive-800 backdrop-blur-sm">
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => store.toggleWishlist(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center bg-cream-50/92 backdrop-blur-sm transition-opacity duration-500 focus-visible:opacity-100 ${
            saved ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover/card:opacity-100"
          }`}
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              d="M10 16.5S3 12.4 3 7.9A3.4 3.4 0 0 1 10 6a3.4 3.4 0 0 1 7 1.9c0 4.5-7 8.6-7 8.6z"
              className={saved ? "fill-olive-700 stroke-olive-700" : "fill-none stroke-olive-700"}
              strokeWidth="1.2"
            />
          </svg>
        </button>

        {/* Size quick-add. Sits below the frame until the card is hovered. */}
        {quickAdd ? (
          <div className="absolute inset-x-2.5 bottom-2.5 z-30 hidden translate-y-3 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 md:block">
            <div className="flex items-center justify-center gap-1 bg-cream-50/94 px-2 py-2.5 backdrop-blur-sm">
              {added ? (
                <span role="status" className="eyebrow py-0.5 text-[9px] text-olive-700">
                  Added — size {added}
                </span>
              ) : (
                <>
                  <span className="eyebrow mr-1.5 text-[9px] text-olive-500">
                    {product.preorder ? "Pre-order" : "Add"}
                  </span>
                  {product.sizes.map((size) => {
                    const out = product.soldOut?.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        disabled={out}
                        onClick={() => add(size)}
                        aria-label={out ? `${size} sold out` : `Add ${product.name} in size ${size} to bag`}
                        className={`eyebrow h-7 min-w-7 px-1.5 text-[9px] transition-colors duration-300 ${
                          out
                            ? "cursor-not-allowed text-olive-700/35 line-through"
                            : "text-olive-700 hover:bg-olive-800 hover:text-cream-50"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans text-[12px] uppercase tracking-[0.17em] text-olive-800">
            <Link href={href} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 font-sans text-[12.5px] tracking-[0.04em] text-olive-700">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-olive-500">
          {product.colour} · {product.fabric}
        </p>
      </div>
    </motion.article>
  );
}
