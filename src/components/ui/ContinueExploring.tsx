import Link from "next/link";
import { brandPages, type NavLink } from "@/lib/nav";
import Reveal from "../anim/Reveal";

/**
 * Pager for a family of pages — by default the IrisandMe world, so the brand
 * pages read like chapters: previous, next, and every chapter listed beneath.
 */
export default function ContinueExploring({
  current,
  pages = brandPages,
  title = "Continue exploring",
}: {
  current: string;
  pages?: NavLink[];
  title?: string;
}) {
  const i = pages.findIndex((p) => p.href === current);
  const prev = i > 0 ? pages[i - 1] : pages[pages.length - 1];
  const next = pages[(i + 1) % pages.length];

  return (
    <nav aria-label={title} className="border-t hairline bg-cream-100 px-6 py-20 md:px-14 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow mb-12 text-[10px] text-olive-500">{title}</p>

        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Link href={prev.href} className="group/pn flex flex-col gap-3 border-t hairline pt-7">
            <span className="eyebrow text-[10px] text-olive-500">Previous</span>
            <span className="display text-[clamp(1.8rem,4vw,3.2rem)] leading-none text-olive-800 transition-colors duration-500 group-hover/pn:text-olive-500">
              {prev.label}
            </span>
          </Link>
          <Link
            href={next.href}
            className="group/pn flex flex-col gap-3 border-t hairline pt-7 md:items-end md:text-right"
          >
            <span className="eyebrow text-[10px] text-olive-500">Next</span>
            <span className="display text-[clamp(1.8rem,4vw,3.2rem)] leading-none text-olive-800 transition-colors duration-500 group-hover/pn:text-olive-500">
              {next.label}
            </span>
          </Link>
        </Reveal>

        <ul className="mt-14 flex flex-wrap gap-x-7 gap-y-3">
          {pages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                aria-current={p.href === current ? "page" : undefined}
                className={`eyebrow link-underline text-[10px] ${
                  p.href === current ? "text-olive-800" : "text-olive-500 hover:text-olive-800"
                }`}
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
