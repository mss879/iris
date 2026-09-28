import Image from "next/image";
import Reveal, { RevealItem } from "../anim/Reveal";
import Parallax from "../anim/Parallax";
import SplitWords from "../anim/SplitWords";
import ButtonLink, { TextLink } from "../ui/ButtonLink";

const values = [
  {
    title: "Natural fibres",
    body: "Linen, cotton and other natural fibres, chosen for comfort and a long, graceful life.",
  },
  {
    title: "Small batches",
    body: "Pieces made in considered quantities, so we make what is wanted and waste far less.",
  },
  {
    title: "Made to last",
    body: "Designed to be worn beyond a single season, and cared for so they keep their beauty.",
  },
  {
    title: "Thoughtful packaging",
    body: "Orders wrapped simply, in materials chosen to be recycled or reused.",
  },
];

/** The sustainability and values feature — Consciously IrisandMe in brief. */
export default function Values() {
  return (
    <section aria-labelledby="values-title" className="on-dark overflow-hidden bg-olive-700 text-cream-100">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <Parallax speed={7} className="relative min-h-[60vh] lg:min-h-[100vh]">
          <div className="relative h-[118%] w-full">
            <Image
              src="/img/promise-lux.jpg"
              alt="Three women in cream and olive linen standing together in a bright atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </Parallax>

        <div className="flex flex-col justify-center px-6 py-24 md:px-16 lg:py-36">
          <Reveal>
            <div className="mb-7 flex items-center gap-4">
              <span className="eyebrow text-cream-100/70">05</span>
              <span className="block h-px w-10 bg-cream-100/30" />
              <span className="eyebrow text-olive-200">Consciously IrisandMe</span>
            </div>
          </Reveal>

          <div id="values-title">
            <SplitWords
              text="Beauty that lasts beyond a season"
              className="display mb-8 max-w-[14ch] text-[clamp(2.2rem,5vw,4rem)] leading-[0.96] text-cream-50"
            />
          </div>

          <Reveal delay={0.1}>
            <p className="mb-14 max-w-[46ch] font-sans text-[15px] leading-relaxed text-cream-200/85">
              Considered clothing asks something of how it is made. These are the
              principles we design, source and produce by — and the ones we will keep
              working to improve.
            </p>
          </Reveal>

          <Reveal stagger={0.12} className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            {values.map((v, i) => (
              <RevealItem key={v.title}>
                <div className="border-t border-cream-100/20 pt-6">
                  <p className="serif text-[1.3rem] text-olive-200">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-2 text-[1.55rem] leading-none text-cream-50">{v.title}</h3>
                  <p className="mt-3 max-w-[36ch] font-sans text-[13.5px] leading-relaxed text-cream-200/80">
                    {v.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center gap-x-9 gap-y-5">
              <ButtonLink href="/consciously-irisandme" variant="light">
                Consciously IrisandMe
              </ButtonLink>
              <TextLink href="/people-and-purpose" className="text-cream-50">
                People &amp; Purpose
              </TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
