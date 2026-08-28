"use client";

import Image from "next/image";
import Reveal, { RevealItem } from "./anim/Reveal";
import Parallax from "./anim/Parallax";
import Counter from "./anim/Counter";
import SplitWords from "./anim/SplitWords";

const pledges = [
  {
    value: 5000,
    prefix: "$",
    label: "Paid monthly to our makers' cooperative",
    body: "Every piece is cut and sewn by a small team on fair, guaranteed monthly wages — not per-garment piece rates.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Natural and traceable fibres",
    body: "Linen, organic cotton and silk, dyed with olive leaf and iron. No synthetics, no plastic trims, no exceptions.",
  },
  {
    value: 12,
    label: "Pieces in a season, not hundreds",
    body: "We release small runs and repeat what works. Nothing is made to be replaced next quarter.",
  },
];

export default function BrandPromise() {
  return (
    <section id="promise" className="on-dark overflow-hidden bg-olive-700 text-cream-100">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <Parallax speed={7} className="relative min-h-[60vh] lg:min-h-[100vh]">
          <div className="relative h-[118%] w-full">
            <Image
              src="/img/promise-lux.jpg"
              alt="Three women artisans standing together in the Iris and Me atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </Parallax>

        <div className="flex flex-col justify-center px-6 py-28 md:px-16 lg:py-40">
          <Reveal>
            <div className="mb-7 flex items-center gap-4">
              <span className="eyebrow text-cream-100/45">05</span>
              <span className="block h-px w-10 bg-cream-100/25" />
              <span className="eyebrow text-olive-200">Our Promise</span>
            </div>
          </Reveal>

          <SplitWords
            text="Clothing with a conscience"
            className="display mb-8 max-w-[13rem] text-[clamp(2.2rem,5vw,4rem)] leading-[0.96] text-cream-50 sm:max-w-[22rem] lg:max-w-[26rem]"
          />

          <Reveal delay={0.1}>
            <p className="mb-14 max-w-[46ch] font-sans text-[15px] leading-relaxed text-cream-200/85">
              Iris and Me began with a single olive linen dress and a promise: to
              know every hand that touches what we make, and to pay them properly
              for it.
            </p>
          </Reveal>

          <Reveal stagger={0.15} className="flex flex-col gap-11">
            {pledges.map((p) => (
              <RevealItem key={p.label}>
                <div className="border-t border-cream-100/20 pt-6">
                  <p className="display text-[clamp(2.4rem,5vw,3.4rem)] text-cream-50">
                    <Counter value={p.value} prefix={p.prefix} suffix={p.suffix} />
                  </p>
                  <p className="eyebrow mt-2 text-olive-200">{p.label}</p>
                  <p className="mt-3 max-w-[44ch] font-sans text-[14px] leading-relaxed text-cream-200/75">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <a href="#journal" className="btn btn-light mt-14 px-11">
              <span className="eyebrow">Learn More</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
