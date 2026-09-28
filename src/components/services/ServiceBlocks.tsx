import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/Section";
import ButtonLink from "@/components/ui/ButtonLink";

/**
 * Building blocks shared by the six Client Services pages — Contact, Size &
 * Fit, Garment Care, Shipping & Delivery, Returns & Exchanges and FAQ — so
 * they keep one rhythm: numbered sections, the same sub-headings, fact lists
 * and closing prompt. They live beside /contact because it is the Client
 * Services landing page (ServiceShell's breadcrumb points there).
 */

/** Links set inside running copy that is not wrapped in `Prose`. */
export const linkStyles =
  "[&_a]:text-olive-800 [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[3px] [&_a]:transition-colors [&_a]:duration-500 [&_a:hover]:text-olive-500 [&_strong]:font-medium [&_strong]:text-olive-800";

/**
 * The column of sections inside ServiceShell. `compact` tightens the rhythm for
 * pages made of many short sections, such as the FAQ.
 */
export function ServiceSections({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col ${compact ? "gap-16 md:gap-20" : "gap-20 md:gap-28"}`}>
      {children}
    </div>
  );
}

/**
 * One titled section. The anchor id sits on the <section> so jump links land
 * on it; html's scroll-padding keeps it clear of the fixed header.
 */
export function ServiceSection({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <SectionHeading
        id={`${id}-title`}
        index={index}
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        size="small"
      />
      {children ? <div className="mt-10 md:mt-12">{children}</div> : null}
    </section>
  );
}

export type JumpLink = { id: string; label: string };

/** "01", "02"… — a section's number, taken from its place in the page index. */
export function sectionIndex(toc: readonly JumpLink[], id: string) {
  const i = toc.findIndex((t) => t.id === id);
  return i < 0 ? undefined : String(i + 1).padStart(2, "0");
}

/** "On this page" index, numbered to match the sections it points to. */
export function JumpNav({
  items,
  label = "On this page",
}: {
  items: readonly JumpLink[];
  label?: string;
}) {
  return (
    <nav aria-label={label} className="border-y hairline py-8">
      <p aria-hidden="true" className="eyebrow text-[10px] text-olive-500">
        {label}
      </p>
      <ol className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-baseline gap-4 font-sans text-[14px] leading-snug text-olive-700 transition-colors duration-500 hover:text-olive-800"
            >
              <span aria-hidden="true" className="w-6 shrink-0 text-[12px] text-olive-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="link-underline">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** h3 inside a section, matching the FeatureGrid headings. */
export function SubHeading({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h3
      id={id}
      className={`display text-[clamp(1.4rem,2.1vw,1.8rem)] leading-[1.02] text-olive-800 ${className}`}
    >
      {children}
    </h3>
  );
}

export type Fact = { term: string; detail: ReactNode; note?: ReactNode };

/** Key facts at a glance: a label, the fact set large, and an optional line. */
export function Facts({
  items,
  columns = 3,
  size = "base",
}: {
  items: Fact[];
  columns?: 2 | 3;
  size?: "base" | "small";
}) {
  return (
    <dl
      className={`grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 ${
        columns === 3 ? "xl:grid-cols-3" : ""
      }`}
    >
      {items.map((f) => (
        <div key={f.term} className="flex min-w-0 flex-col border-t hairline pt-6">
          <dt className="eyebrow text-[10px] text-olive-500">{f.term}</dt>
          <dd
            className={`serif mt-3 break-words text-olive-800 ${
              size === "small" ? "text-[1.3rem] leading-[1.3]" : "text-[1.55rem] leading-[1.22]"
            } ${linkStyles}`}
          >
            {f.detail}
          </dd>
          {f.note ? (
            <dd className={`mt-2.5 font-sans text-[13.5px] leading-[1.8] text-olive-600 ${linkStyles}`}>
              {f.note}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

export type Detail = { term: string; detail: ReactNode };

/** Label-and-answer rows on hairlines — care instructions, delivery terms. */
export function DetailList({ items, className = "" }: { items: Detail[]; className?: string }) {
  return (
    <dl className={`border-b hairline ${className}`}>
      {items.map((d) => (
        <div
          key={d.term}
          className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-t hairline py-4 sm:grid-cols-[9.5rem_1fr]"
        >
          <dt className="eyebrow pt-[4px] text-[10px] text-olive-500">{d.term}</dt>
          <dd className={`max-w-[68ch] font-sans text-[14.5px] leading-[1.8] text-olive-600 ${linkStyles}`}>
            {d.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export type Step = { title: string; body: ReactNode };

/** A numbered sequence, for anything the customer does in order. */
export function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="border-b hairline">
      {items.map((step, i) => (
        <li
          key={step.title}
          className="grid grid-cols-[2.75rem_1fr] gap-x-5 border-t hairline py-8 md:grid-cols-[4rem_1fr] md:gap-x-8 md:py-9"
        >
          <span
            aria-hidden="true"
            className="serif text-[1.6rem] leading-none text-olive-500 md:text-[1.9rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <SubHeading>{step.title}</SubHeading>
            <div
              className={`mt-3.5 flex max-w-[62ch] flex-col gap-3 font-sans text-[14.5px] leading-[1.9] text-olive-600 ${linkStyles}`}
            >
              {step.body}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A quiet panel for the one thing in a section that must not be missed. */
export function Callout({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-cream-200/70 px-7 py-7 md:px-9 md:py-8 ${className}`}>
      {title ? <p className="eyebrow text-[10px] text-olive-700">{title}</p> : null}
      <div
        className={`${title ? "mt-4" : ""} flex max-w-[68ch] flex-col gap-3 font-sans text-[14.5px] leading-[1.85] text-olive-600 ${linkStyles}`}
      >
        {children}
      </div>
    </div>
  );
}

/** Closing prompt that hands the customer to a person. */
export function HelpPrompt({
  id = "help",
  eyebrow = "Client Services",
  title,
  children,
  action = { href: "/contact", label: "Contact us" },
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="bg-cream-200/70 px-7 py-10 md:px-12 md:py-14"
    >
      <p className="eyebrow text-[10px] text-olive-700">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="serif mt-4 max-w-[24ch] text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.1] text-olive-800"
      >
        {title}
      </h2>
      {children ? (
        <div
          className={`mt-5 flex max-w-[58ch] flex-col gap-3 font-sans text-[15px] leading-[1.9] text-olive-600 ${linkStyles}`}
        >
          {children}
        </div>
      ) : null}
      <div className="mt-9">
        <ButtonLink href={action.href}>{action.label}</ButtonLink>
      </div>
    </section>
  );
}

/**
 * An empty table cell or value: a dash on screen, words for screen readers.
 * The wrapper is positioned so the absolutely positioned `sr-only` text stays
 * inside a table's scroll region instead of widening the page on phones.
 */
export function Dash({ label = "Not available" }: { label?: string }) {
  return (
    <span className="relative">
      <span aria-hidden="true">—</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
