import Reveal from "@/components/anim/Reveal";

export type IndexItem = { href: string; label: string; note?: string };

/**
 * In-page contents for the longer brand pages: numbered anchor links on a
 * hairline ledger. Anchors land below the fixed header via the global
 * `scroll-padding-top`.
 */
export default function PageIndex({
  title = "On this page",
  items,
}: {
  title?: string;
  items: IndexItem[];
}) {
  return (
    <Reveal delay={0.15}>
      <nav aria-label={title} className="border-t hairline pt-6">
        <p className="eyebrow text-[10px] text-olive-500">{title}</p>
        <ol className="mt-4">
          {items.map((item, i) => (
            <li key={item.href} className="border-b hairline">
              <a href={item.href} className="group/index flex items-baseline gap-5 py-3.5">
                <span className="serif w-7 shrink-0 text-[1.05rem] text-olive-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-olive-800 transition-colors duration-500 group-hover/index:text-olive-500">
                  {item.label}
                </span>
                {item.note ? (
                  <span className="eyebrow ml-auto shrink-0 pl-3 text-[9.5px] text-olive-500">
                    {item.note}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  );
}
