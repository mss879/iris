import type { ReactNode } from "react";

/** A quiet placeholder for lists that have nothing in them yet. */
export default function EmptyState({
  title,
  children,
  action,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center border hairline bg-cream-50/60 px-8 py-16 text-center md:py-20 ${className}`}
    >
      <p className="serif text-[clamp(1.5rem,2.6vw,2rem)] leading-snug text-olive-700">{title}</p>
      {children ? (
        <div className="mx-auto mt-4 max-w-[46ch] font-sans text-[14px] leading-[1.85] text-olive-600">
          {children}
        </div>
      ) : null}
      {action ? <div className="mt-9">{action}</div> : null}
    </div>
  );
}
