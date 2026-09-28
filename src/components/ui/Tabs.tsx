"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export type Tab = { id: string; label: string; content: ReactNode };

/**
 * WAI-ARIA tabs with roving focus: arrow keys move between tabs, Home/End
 * jump to the ends. Inactive panels stay mounted but hidden.
 */
export default function Tabs({
  label,
  tabs,
  className = "",
  defaultTab,
}: {
  label: string;
  tabs: Tab[];
  className?: string;
  defaultTab?: string;
}) {
  const uid = useId();
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap gap-x-8 gap-y-3 border-b hairline"
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${uid}-${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`eyebrow relative pb-4 text-[10.5px] transition-colors duration-500 ${
                selected ? "text-olive-800" : "text-olive-500 hover:text-olive-800"
              }`}
            >
              {tab.label}
              {selected ? (
                <motion.span
                  layoutId={`${uid}-tab-underline`}
                  className="absolute inset-x-0 -bottom-px h-px bg-olive-800"
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${uid}-${tab.id}-panel`}
          aria-labelledby={`${uid}-${tab.id}-tab`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="pt-10 focus-visible:outline-offset-8"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
