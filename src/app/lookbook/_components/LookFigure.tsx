import Link from "next/link";
import Figure from "@/components/ui/Figure";
import { getProduct, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/site";
import type { Look } from "../_data/looks";

/**
 * One look: the photograph, its number, and the pieces worn — each linked to
 * its product page. Detail photographs (no pieces) carry a short note instead.
 */
export default function LookFigure({ look, number }: { look: Look; number?: number }) {
  const pieces = look.products
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
  const label = number ? `Look ${String(number).padStart(2, "0")}` : null;

  const caption =
    pieces.length > 0 ? (
      <div className="border-t hairline pt-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-[10px] text-olive-500">{label}</span>
          <span className="eyebrow text-[10px] text-olive-700">Shop the look</span>
        </div>
        <ul aria-label={label ? `Shop ${label}` : "Shop the look"} className="mt-3 flex flex-col gap-2">
          {pieces.map((piece) => (
            <li key={piece.slug}>
              <Link
                href={`/products/${piece.slug}`}
                className="group/piece flex items-baseline justify-between gap-4"
              >
                <span className="font-sans text-[11.5px] uppercase tracking-[0.16em] text-olive-800 transition-colors duration-500 group-hover/piece:text-olive-500">
                  <span className="link-underline">{piece.name}</span>
                </span>
                <span className="shrink-0 font-sans text-[12px] tracking-[0.04em] text-olive-600">
                  {formatPrice(piece.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : look.note ? (
      <div className="border-t hairline pt-3.5 font-sans text-[12.5px] leading-relaxed text-olive-600">
        {look.note}
      </div>
    ) : undefined;

  return (
    <Figure
      src={look.image}
      alt={look.alt}
      ratio={look.ratio ?? "3/4"}
      position={look.position}
      sizes={look.sizes ?? "(max-width: 768px) 100vw, 45vw"}
      caption={caption}
      className={look.className}
    />
  );
}
