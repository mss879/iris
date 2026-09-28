import { getProduct, type Product } from "@/lib/products";
import ProductGrid from "../ProductGrid";
import { SectionHeading } from "../ui/Section";
import { TextLink } from "../ui/ButtonLink";

// A single row. The homepage introduces the newest pieces; the shop lists them.
const PICKS = [
  "iris-print-maxi-dress",
  "lotus-shirt-and-trouser-set",
  "sienna-linen-camisole",
  "tessa-linen-shorts",
];

export default function NewArrivals() {
  const items = PICKS.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <section aria-labelledby="new-arrivals-title" className="border-t hairline bg-cream-100 px-6 py-24 md:px-14 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          id="new-arrivals-title"
          index="01"
          eyebrow="Just arrived"
          title="New Arrivals"
          intro="The latest pieces from the studio, released in small batches."
          action={
            <TextLink href="/shop/new-arrivals" className="text-olive-700">
              Shop New Arrivals
            </TextLink>
          }
          className="mb-16 md:mb-20"
        />
        <ProductGrid products={items} columns={4} />
      </div>
    </section>
  );
}
