import Image from "next/image";
import Reveal, { RevealItem } from "../anim/Reveal";
import { site } from "@/lib/site";
import { InstagramIcon } from "../icons";

const tiles = [
  { src: "/img/l-lotus-dress.jpg", alt: "The Lotus Midi Dress beside a stone basin of lotus leaves" },
  { src: "/img/craft-print.jpg", alt: "An artisan pressing a carved printing block onto cream cotton" },
  { src: "/img/l-tessa-shorts.jpg", alt: "Cream linen shorts on a coastal dune path" },
  { src: "/img/hero-alt.jpg", alt: "A deep olive gown in a sunlit stone hall" },
  { src: "/img/print-iris.jpg", alt: "The Iris print on cream cotton" },
];

/** Instagram and editorial imagery — a mosaic that opens on @irisandme. */
export default function InstagramGrid() {
  return (
    <section aria-labelledby="instagram-title" className="bg-cream-100 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="eyebrow mb-4 text-olive-500">06 — Follow along</p>
            <h2 id="instagram-title" className="display text-[clamp(1.8rem,4.5vw,3.2rem)] text-olive-800">
              IrisandMe on Instagram
            </h2>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow link-underline mt-5 inline-flex items-center gap-2 text-olive-700"
            >
              {site.handle}
              <span className="sr-only">(opens Instagram in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {tiles.map((t, i) => (
            <RevealItem key={t.src} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/tile relative block aspect-square overflow-hidden bg-cream-300"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:scale-110"
                />
                <span className="absolute inset-0 bg-olive-950/0 transition-colors duration-500 group-hover/tile:bg-olive-950/35" />
                <span className="absolute inset-0 grid scale-90 place-items-center text-cream-50 opacity-0 transition-all duration-500 group-hover/tile:scale-100 group-hover/tile:opacity-100">
                  <InstagramIcon className="h-5 w-5" />
                </span>
                <span className="sr-only">View on Instagram (opens in a new tab)</span>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
