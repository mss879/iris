import Image from "next/image";
import Reveal, { RevealItem } from "./anim/Reveal";

const grid = [
  "/img/ugc-3.jpg",
  "/img/journal-2.jpg",
  "/img/ugc-5.jpg",
  "/img/hero-alt.jpg",
  "/img/ugc-1.jpg",
  "/img/journal-3.jpg",
];

export default function Moments() {
  return (
    <section className="bg-cream-200 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow mb-4 text-olive-400">Follow along</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)] text-olive-700">
              Iris and Me moments
            </h2>
            <a
              href="#top"
              className="eyebrow link-underline mt-4 inline-block text-olive-500"
            >
              @irisandme
            </a>
          </div>
        </Reveal>

        <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {grid.map((src, i) => (
            <RevealItem key={src}>
              <a
                href="#top"
                aria-label={`View Iris and Me community photograph ${i + 1} on Instagram`}
                className="group/tile relative block aspect-square overflow-hidden bg-cream-300"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:scale-110"
                />
                <span className="absolute inset-0 bg-olive-950/0 transition-colors duration-500 group-hover/tile:bg-olive-950/35" />
                <span className="absolute inset-0 grid scale-90 place-items-center opacity-0 transition-all duration-500 group-hover/tile:scale-100 group-hover/tile:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-cream-50" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" className="fill-cream-50 stroke-none" />
                  </svg>
                </span>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
