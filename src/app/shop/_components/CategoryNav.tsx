import Link from "next/link";
import { shopCategories } from "@/lib/products";

/** Every SHOP category as a quiet row of links, the current one underlined. */
export default function CategoryNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Shop categories" className="border-b hairline">
      <ul className="-mb-px flex gap-x-7 gap-y-2 overflow-x-auto pb-px [scrollbar-width:none] md:flex-wrap md:overflow-visible">
        {shopCategories.map((c) => {
          const active = c.slug === current;
          return (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/shop/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`eyebrow block border-b py-4 text-[10px] transition-colors duration-500 ${
                  active
                    ? "border-olive-800 text-olive-800"
                    : "border-transparent text-olive-500 hover:text-olive-800"
                }`}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
