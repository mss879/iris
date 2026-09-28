import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/anim/Reveal";

export type LedgerItem = {
  title: string;
  body: ReactNode;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
};

/**
 * Numbered rows on hairlines: the title on the left, the argument on the
 * right. Reads more slowly than a grid, for principles and commitments that
 * each deserve a paragraph.
 */
export default function Ledger({ items }: { items: LedgerItem[] }) {
  return (
    <ol className="border-b hairline">
      {items.map((item, i) => (
        <li key={item.title} className="border-t hairline">
          <Reveal
            amount={0.3}
            className="grid grid-cols-1 gap-x-10 gap-y-5 py-10 md:grid-cols-12 md:py-12"
          >
            <div className="flex items-baseline gap-5 md:col-span-5">
              <span className="serif shrink-0 text-[1.35rem] text-olive-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {item.eyebrow ? (
                  <p className="eyebrow mb-3 text-[10px] text-olive-500">{item.eyebrow}</p>
                ) : null}
                <h3 className="display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1] text-olive-800">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 font-sans text-[15px] leading-[1.9] text-olive-600 md:col-span-6 md:col-start-7">
              {typeof item.body === "string" ? <p>{item.body}</p> : item.body}
              {item.href ? (
                <Link
                  href={item.href}
                  className="eyebrow link-underline mt-1 self-start text-[10px] text-olive-800"
                >
                  {item.linkLabel ?? "Read more"}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
