import type { ReactNode } from "react";
import Reveal from "@/components/anim/Reveal";

export type ChecklistItem = { title: string; body?: ReactNode };

/**
 * A list of standards, each marked with a fine drawn tick. Used for the
 * quality checks a piece must pass and the standards we ask of workshops.
 * `titleAs="h3"` makes each standard a heading when it is a topic in its own
 * right; the default keeps them as plain list text.
 */
export default function Checklist({
  items,
  dark = false,
  columns = 2,
  titleAs = "p",
}: {
  items: ChecklistItem[];
  dark?: boolean;
  columns?: 1 | 2;
  titleAs?: "p" | "h3";
}) {
  const Title = titleAs;
  const perRow = columns === 2 ? 2 : 1;

  return (
    <ul className={`grid grid-cols-1 gap-x-12 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((item, i) => (
        <li key={item.title} className={`border-t ${dark ? "border-cream-100/20" : "hairline"}`}>
          <Reveal delay={(i % perRow) * 0.08} amount={0.4} className="flex gap-5 py-6">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className={`mt-[3px] h-[18px] w-[18px] shrink-0 ${dark ? "text-olive-200" : "text-olive-500"}`}
            >
              <circle cx="10" cy="10" r="9.25" fill="none" stroke="currentColor" strokeWidth="1" />
              <path
                d="M6.2 10.3l2.5 2.5 5.1-5.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <Title
                className={`font-sans text-[14.5px] font-medium tracking-[0.01em] ${
                  dark ? "text-cream-50" : "text-olive-800"
                }`}
              >
                {item.title}
              </Title>
              {item.body ? (
                <p
                  className={`mt-1.5 font-sans text-[14px] leading-[1.85] ${
                    dark ? "text-cream-200/80" : "text-olive-600"
                  }`}
                >
                  {item.body}
                </p>
              ) : null}
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
