import type { ReactNode } from "react";

/** Long-form typography — see `.prose-iris` in globals.css. */
export default function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`prose-iris max-w-[68ch] ${className}`}>{children}</div>;
}
