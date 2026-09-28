import ProductGrid from "@/components/ProductGrid";
import { getProduct, type Product } from "@/lib/products";

/**
 * The pieces a story mentions, set wider than the text so they read as a
 * pause in the article rather than an advertisement inside it.
 */
export default function ArticleProducts({ slugs, title }: { slugs: string[]; title?: string }) {
  const items = slugs.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));
  if (items.length === 0) return null;

  const columns = items.length >= 4 ? 4 : items.length === 3 ? 3 : 2;

  return (
    <aside
      aria-label={title ? `Shop the story: ${title}` : "Shop the story"}
      className={`mx-auto my-16 md:my-24 ${columns === 2 ? "max-w-[760px]" : "max-w-[1100px]"}`}
    >
      <div className="mb-10 flex items-center justify-between gap-6 border-t hairline pt-6">
        <p className="section-index flex-wrap gap-y-2 text-olive-700">
          <span className="eyebrow whitespace-nowrap text-[10px]">Shop the story</span>
          {title ? (
            <>
              <span className="rule" />
              <span className="eyebrow whitespace-nowrap text-[10px] text-olive-500">{title}</span>
            </>
          ) : null}
        </p>
        <p className="eyebrow hidden shrink-0 text-[10px] text-olive-500 sm:block">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </p>
      </div>
      <ProductGrid products={items} columns={columns} />
    </aside>
  );
}
