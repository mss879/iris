import Reveal, { RevealItem } from "../anim/Reveal";
import Figure from "../ui/Figure";
import { SectionHeading } from "../ui/Section";
import { TextLink } from "../ui/ButtonLink";

const details = [
  {
    src: "/img/craft-linen.jpg",
    alt: "Close-up of the slubbed weave of natural cream linen",
    caption: "Washed linen",
  },
  {
    src: "/img/craft-stitching.jpg",
    alt: "Close-up of a fine deep olive hand-stitched seam on cream linen",
    caption: "Hand-finished seams",
  },
  {
    src: "/img/craft-buttons.jpg",
    alt: "Natural corozo and mother-of-pearl buttons on a cream linen placket",
    caption: "Natural buttons",
  },
];

/** The natural fabrics and craftsmanship message, told in close-up. */
export default function CraftMessage() {
  return (
    <section aria-labelledby="craft-title" className="bg-cream-100 px-6 py-24 md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            id="craft-title"
            index="03"
            eyebrow="Natural fabrics & craftsmanship"
            title="Made with care, from the fibre up"
            intro={
              <>
                <p>
                  We begin with natural fabrics — linen, cotton and natural fibres chosen
                  for how they feel against the skin and how beautifully they wear with time.
                </p>
                <p className="mt-5">
                  Then come the details you notice only up close: seams finished by hand,
                  natural buttons, prints applied with patience.
                </p>
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <TextLink href="/craftsmanship" className="text-olive-700">
                Discover Craftsmanship
              </TextLink>
              <TextLink href="/our-fabrics" className="text-olive-700">
                Our Fabrics
              </TextLink>
            </div>
          </Reveal>
        </div>

        <Reveal stagger={0.14} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:col-span-7 lg:col-start-6">
          {details.map((d, i) => (
            <RevealItem key={d.src} className={i === 0 ? "col-span-2 md:col-span-1" : i === 1 ? "md:mt-16" : "md:mt-32"}>
              <Figure
                src={d.src}
                alt={d.alt}
                ratio={i === 0 ? "4/5" : "3/4"}
                caption={d.caption}
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
