import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const cols = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
} as const;

/** Product cards on the shop's shared grid. */
export default function ProductGrid({
  products,
  columns = 4,
  className = "",
}: {
  products: Product[];
  columns?: keyof typeof cols;
  className?: string;
}) {
  const sizes =
    columns === 4
      ? "(max-width: 1024px) 50vw, 25vw"
      : columns === 3
        ? "(max-width: 1024px) 50vw, 33vw"
        : "50vw";

  return (
    <div className={`grid ${cols[columns]} gap-x-4 gap-y-14 md:gap-x-7 md:gap-y-16 ${className}`}>
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} sizes={sizes} />
      ))}
    </div>
  );
}
