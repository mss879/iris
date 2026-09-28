import Reveal from "@/components/anim/Reveal";

export type Step = {
  status: string;
  title: string;
  body: string;
  /** Marks the stage the work is at now. */
  current?: boolean;
};

/**
 * A plain progress line: numbered stages, each with a status, so it is clear
 * what has happened, what is happening and what comes next.
 */
export default function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-5">
      {items.map((step, i) => (
        <li key={step.title} aria-current={step.current ? "step" : undefined}>
          <Reveal delay={i * 0.08} amount={0.4} className="flex h-full flex-col">
            <div aria-hidden="true" className="flex items-center gap-3">
              <span
                className={`block h-2.5 w-2.5 shrink-0 rounded-full border border-olive-700 ${
                  step.current ? "bg-olive-700" : ""
                }`}
              />
              <span className="block h-px flex-1 bg-olive-700/20" />
            </div>
            <p className="eyebrow mt-6 text-[10px] text-olive-500">
              {String(i + 1).padStart(2, "0")} · {step.status}
            </p>
            <h3 className="display mt-3 text-[clamp(1.4rem,2vw,1.7rem)] leading-[1.02] text-olive-800">
              {step.title}
            </h3>
            <p className="mt-3 font-sans text-[14px] leading-[1.85] text-olive-600">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
