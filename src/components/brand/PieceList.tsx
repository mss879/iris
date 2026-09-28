import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/site";
import type { Product } from "@/lib/products";

/**
 * A compact list of pieces — thumbnail, name, colour and fabric, price — for
 * "where to find it" moments inside a story, where a full product grid would
 * overwhelm the copy. Works for one piece or several.
 */
export default function PieceList({
  products,
  className = "",
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) return null;

  return (
    <ul className={`flex flex-col ${className}`}>
      {products.map((p) => (
        <li key={p.slug} className="border-b hairline first:border-t">
          <Link href={`/products/${p.slug}`} className="group/piece flex items-center gap-5 py-4">
            <span className="relative block aspect-[3/4] w-14 shrink-0 overflow-hidden bg-cream-300">
              {/* The name beside it says what this is; the thumbnail is a visual cue only. */}
              <Image
                src={p.image}
                alt=""
                fill
                sizes="56px"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/piece:scale-[1.06]"
              />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="font-sans text-[12px] uppercase tracking-[0.17em] text-olive-800 transition-colors duration-500 group-hover/piece:text-olive-500">
                {p.name}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-olive-500">
                {p.colour} · {p.fabric}
                {p.badge ? ` · ${p.badge}` : ""}
              </span>
            </span>
            <span className="shrink-0 font-sans text-[12.5px] tracking-[0.04em] text-olive-700">
              {formatPrice(p.price)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
