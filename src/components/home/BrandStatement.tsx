import Link from "next/link";
import SplitWords from "../anim/SplitWords";
import Reveal from "../anim/Reveal";

/** The short IrisandMe brand statement that follows the collection image. */
export default function BrandStatement() {
  return (
    <section aria-labelledby="statement-title" className="bg-cream-100 px-6 py-28 md:py-44">
      <div className="mx-auto max-w-[1180px] text-center">
        <Reveal direction="none">
          <div className="mb-9 flex items-center justify-center gap-4">
            <span className="block h-px w-10 bg-olive-700/25" />
            <span className="eyebrow text-olive-500">IrisandMe</span>
            <span className="block h-px w-10 bg-olive-700/25" />
          </div>
        </Reveal>

        <div id="statement-title">
          <SplitWords
            text="Considered design. Natural beauty. Modern femininity."
            className="display mx-auto max-w-[17ch] text-[clamp(2.2rem,6vw,4.9rem)] leading-[0.96] text-olive-800"
            stagger={0.06}
          />
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-11 max-w-[54ch] font-sans text-[15px] leading-[2.05] text-olive-600">
            IrisandMe makes womenswear in linen, cotton and natural fibres — designed in
            Australia, finished with artisan detail, and made to be worn and loved well
            beyond a single season.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Link
            href="/our-philosophy"
            className="eyebrow link-underline mt-10 inline-block text-[10px] text-olive-700"
          >
            Our Philosophy
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
