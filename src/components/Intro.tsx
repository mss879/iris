import SplitWords from "./anim/SplitWords";
import Reveal from "./anim/Reveal";

const marks = [
  { label: "Natural fibres only", value: "01" },
  { label: "Made in small runs", value: "02" },
  { label: "Fairly paid makers", value: "03" },
];

export default function Intro() {
  return (
    <section className="relative bg-cream-100 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-[1180px] text-center">
        <Reveal direction="none">
          <div className="mb-9 flex items-center justify-center gap-4">
            <span className="block h-px w-10 bg-olive-700/25" />
            <span className="eyebrow text-olive-400">Est. 2019 — Byron Bay</span>
            <span className="block h-px w-10 bg-olive-700/25" />
          </div>
        </Reveal>

        <SplitWords
          text="Slow fashion made to be treasured"
          className="display text-[clamp(2.2rem,6.2vw,5rem)] leading-[0.95] text-olive-800"
          stagger={0.06}
        />

        <Reveal delay={0.3}>
          <p className="mx-auto mt-11 max-w-[54ch] font-sans text-[15px] leading-[2.05] text-olive-500">
            We make a small number of pieces each season in cream and deep olive
            — natural fibres, honest cuts, and colours that sit quietly together
            so everything you own keeps working with everything else.
          </p>
        </Reveal>

        <Reveal delay={0.4} stagger={0.1} className="mx-auto mt-20 grid max-w-[820px] grid-cols-1 gap-px border hairline bg-olive-700/10 sm:grid-cols-3">
          {marks.map((m) => (
            <div key={m.value} className="bg-cream-100 px-6 py-9">
              <p className="serif text-[1.6rem] text-olive-300">{m.value}</p>
              <p className="eyebrow mt-3 text-[10px] text-olive-600">{m.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
