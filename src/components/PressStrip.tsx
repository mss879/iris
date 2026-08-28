import { press } from "@/lib/products";
import Reveal, { RevealItem } from "./anim/Reveal";

/**
 * Quiet proof line. Set in the display serif at a small size so it reads as a
 * masthead row rather than a logo salad.
 */
export default function PressStrip() {
  return (
    <section className="border-y hairline bg-cream-100 px-6 py-10 md:py-12">
      <Reveal stagger={0.07} className="mx-auto flex max-w-[1600px] flex-col items-center gap-7 lg:flex-row lg:justify-between lg:gap-10">
        <RevealItem>
          <p className="eyebrow whitespace-nowrap text-[10px] text-olive-400">
            As featured in
          </p>
        </RevealItem>

        {press.map((name) => (
          <RevealItem key={name}>
            <span className="display block whitespace-nowrap text-[clamp(0.95rem,1.6vw,1.35rem)] tracking-[0.16em] text-olive-600/70 transition-colors duration-500 hover:text-olive-800">
              {name}
            </span>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
