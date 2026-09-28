"use client";

import { createContext, use, useId, useState, type ReactNode } from "react";
import { toInches } from "@/lib/sizing";

type Unit = "cm" | "in";

const UNITS: { id: Unit; label: string; name: string }[] = [
  { id: "cm", label: "Centimetres", name: "centimetres" },
  { id: "in", label: "Inches", name: "inches" },
];

const UnitContext = createContext<{ unit: Unit; setUnit: (unit: Unit) => void }>({
  unit: "cm",
  setUnit: () => {},
});

/**
 * One measurement unit for the whole Size & Fit page. Every toggle on the page
 * shares it, so switching to inches in one chart switches them all and the
 * tables can never disagree about units. Centimetres render on the server.
 */
export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<Unit>("cm");
  const [announcement, setAnnouncement] = useState("");

  const choose = (next: Unit) => {
    setUnit(next);
    const name = UNITS.find((u) => u.id === next)?.name;
    setAnnouncement(`Measurements are now shown in ${name}.`);
  };

  return (
    <UnitContext value={{ unit, setUnit: choose }}>
      {children}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </UnitContext>
  );
}

/** A measurement held in centimetres, shown in the chosen unit. */
export function Measure({ cm }: { cm: number }) {
  const { unit } = use(UnitContext);
  return <>{unit === "cm" ? cm : toInches(cm).toFixed(1)}</>;
}

/** The short unit name for column headings: "cm" or "in". */
export function UnitLabel() {
  const { unit } = use(UnitContext);
  return <>{unit}</>;
}

export function UnitToggle({ className = "" }: { className?: string }) {
  const { unit, setUnit } = use(UnitContext);
  const labelId = useId();

  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
      <span id={labelId} className="eyebrow text-[10px] text-olive-500">
        Show measurements in
      </span>
      <div role="group" aria-labelledby={labelId} className="inline-flex border border-olive-700/30">
        {UNITS.map((u) => {
          const on = unit === u.id;
          return (
            <button
              key={u.id}
              type="button"
              aria-pressed={on}
              onClick={() => setUnit(u.id)}
              className={`min-h-11 px-5 transition-colors duration-500 ${
                on ? "bg-olive-800 text-cream-50" : "text-olive-600 hover:text-olive-800"
              }`}
            >
              <span className="eyebrow text-[10px]">{u.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
