import type { ReactNode } from "react";

export type Point = { title: string; body: ReactNode };

/**
 * Short titled points for the copy column of a SplitFeature — a principle and
 * a line or two on what it means in practice. Type size and colour inherit
 * from the column, so the same list works on cream and on olive.
 */
export default function Points({ items, dark = false }: { items: Point[]; dark?: boolean }) {
  return (
    <div className="mt-2 flex flex-col">
      {items.map((item) => (
        <div
          key={item.title}
          className={`border-t py-5 ${dark ? "border-cream-100/20" : "hairline"}`}
        >
          <h3 className={`eyebrow text-[10.5px] ${dark ? "text-cream-50" : "text-olive-800"}`}>
            {item.title}
          </h3>
          <p className="mt-2.5 text-[14.5px]">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
