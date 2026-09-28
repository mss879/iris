"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

/**
 * Disclosure list. Panels stay in the DOM and animate on grid rows rather
 * than being mounted on open, so find-in-page and assistive technology can
 * still reach every answer; closed panels are `inert` so they drop out of the
 * tab order.
 */
export default function Accordion({
  items,
  defaultOpen = [],
  headingLevel = "h3",
  dark = false,
  className = "",
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  headingLevel?: "h2" | "h3" | "h4";
  dark?: boolean;
  className?: string;
}) {
  const uid = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const Heading = headingLevel;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={`border-b ${dark ? "border-cream-100/20" : "hairline"} ${className}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const trigger = `${uid}-${item.id}-trigger`;
        const panel = `${uid}-${item.id}-panel`;
        return (
          <div
            key={item.id}
            id={item.id}
            className={`border-t ${dark ? "border-cream-100/20" : "hairline"}`}
          >
            <Heading>
              <button
                type="button"
                id={trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(item.id)}
                className={`group/acc flex w-full items-center justify-between gap-6 py-6 text-left font-sans text-[15px] tracking-[0.01em] transition-colors duration-500 md:py-7 md:text-[16px] ${
                  dark ? "text-cream-50" : "text-olive-800 hover:text-olive-600"
                }`}
              >
                <span>{item.title}</span>
                <span aria-hidden="true" className="relative block h-3 w-3 shrink-0">
                  <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={panel}
              role="region"
              aria-labelledby={trigger}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`flex max-w-[68ch] flex-col gap-4 pb-8 font-sans text-[14.5px] leading-[1.9] ${
                    dark ? "text-cream-200/85" : "text-olive-600"
                  } [&_a]:underline [&_a]:underline-offset-[3px] [&_strong]:font-medium [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5 [&_ul]:list-[circle]`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
