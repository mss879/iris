import { products } from "@/lib/products";

const NATURAL = ["linen", "cotton", "silk", "alpaca", "wool", "merino", "cashmere", "hemp", "ramie"];

/**
 * The single natural fibres the current collection is made from — but only if
 * every piece is 100% one natural fibre. Returns null otherwise, so copy that
 * depends on the claim is dropped rather than left untrue when the range
 * changes.
 */
export function singleNaturalFibres(): string[] | null {
  const fibres = new Set<string>();
  for (const p of products) {
    const match = /^100%\s+([a-z]+)$/i.exec(p.composition.trim());
    if (!match) return null;
    const fibre = match[1].toLowerCase();
    if (!NATURAL.includes(fibre)) return null;
    fibres.add(fibre);
  }
  return fibres.size > 0 ? Array.from(fibres) : null;
}

/** "linen, cotton, silk or alpaca" */
export function joinList(items: string[], conjunction = "and") {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
}
