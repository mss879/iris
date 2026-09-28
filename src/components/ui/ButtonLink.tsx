import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "dark" | "light" | "solid";

/**
 * The site's one button recipe (`.btn` in globals.css) rendered as a link.
 * `dark` sits on cream, `light` on olive or photography, `solid` is reserved
 * for the single primary action in a view.
 */
export default function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} px-10 ${className}`}>
      <span className="eyebrow text-[10px]">{children}</span>
    </Link>
  );
}

/** Quiet text link with the drawn underline, for secondary actions. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`eyebrow link-underline text-[10px] ${className}`}>
      {children}
    </Link>
  );
}
