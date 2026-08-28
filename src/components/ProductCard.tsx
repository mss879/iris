"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT, DUR } from "@/lib/motion";
import type { Product } from "@/lib/products";

function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 10 10" className="h-[7px] w-[7px]">
          <path
            d="M5 0.4l1.35 3.05 3.3.33-2.47 2.2.72 3.24L5 7.6 2.1 9.22l.72-3.24L.35 3.78l3.3-.33z"
            className={i <= Math.round(rating) ? "fill-olive-500" : "fill-olive-700/20"}
          />
        </svg>
      ))}
    </span>
  );
}

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const stagger = (index % 4) * 0.09;
  const [added, setAdded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

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
        <a href="#shop" data-cursor="view" className="absolute inset-0 z-10" aria-label={product.name} />

        <Image
          src={product.image}
          alt={`${product.name} in ${product.colour}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04] group-hover/card:opacity-0"
        />
        {/* Second look, held underneath and revealed as the first fades out. */}
        <Image
          src={product.hover}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="scale-[1.06] object-cover opacity-0 transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-100 group-hover/card:opacity-100"
        />

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
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center bg-cream-50/92 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/card:opacity-100 focus-visible:opacity-100"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
            <path
              d="M10 16.5S3 12.4 3 7.9A3.4 3.4 0 0 1 10 6a3.4 3.4 0 0 1 7 1.9c0 4.5-7 8.6-7 8.6z"
              className={saved ? "fill-olive-700 stroke-olive-700" : "fill-none stroke-olive-700"}
              strokeWidth="1.2"
            />
          </svg>
        </button>

        {/* Size quick-add. Sits below the frame until the card is hovered. */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-30 translate-y-3 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <div className="flex items-center justify-center gap-1 bg-cream-50/94 px-2 py-2.5 backdrop-blur-sm">
            {added ? (
              <span className="eyebrow py-0.5 text-[9px] text-olive-700">
                Added — size {added}
              </span>
            ) : (
              product.sizes.map((size) => {
                const out = product.soldOut?.includes(size);
                return (
                  <button
                    key={size}
                    disabled={out}
                    onClick={() => setAdded(size)}
                    aria-label={out ? `${size} sold out` : `Add size ${size}`}
                    className={`eyebrow min-w-7 px-1.5 py-0.5 text-[9px] transition-colors duration-300 ${
                      out
                        ? "cursor-not-allowed text-olive-700/25 line-through"
                        : "text-olive-700 hover:bg-olive-800 hover:text-cream-50"
                    }`}
                  >
                    {size}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans text-[12px] uppercase tracking-[0.17em] text-olive-800">
            <a href="#shop" className="link-underline">{product.name}</a>
          </h3>
          <p className="shrink-0 font-sans text-[12.5px] tracking-[0.04em] text-olive-600">
            ${product.price}
          </p>
        </div>

        <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-olive-400">
          {product.fabric}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {product.swatches.map((s) => (
              <span
                key={s.name}
                title={s.name}
                style={{ backgroundColor: s.hex }}
                className="block h-2.5 w-2.5 rounded-full ring-1 ring-olive-700/20 ring-offset-1 ring-offset-cream-100"
              />
            ))}
          </div>

          {product.rating ? (
            <div className="flex items-center gap-1.5">
              <Stars rating={product.rating} />
              <span className="font-sans text-[10px] tracking-[0.08em] text-olive-400">
                ({product.reviews})
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
