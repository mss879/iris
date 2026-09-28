import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Trail back to the landing page. The final crumb is the current page. */
export default function Breadcrumbs({
  items,
  dark = false,
  className = "",
}: {
  items: Crumb[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] ${
          dark ? "text-cream-100/75" : "text-olive-500"
        }`}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={`link-underline ${dark ? "hover:text-cream-50" : "hover:text-olive-800"}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>{item.label}</span>
              )}
              {!last ? (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
