import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";
import type { Collection } from "@/lib/products";
import PlateImage from "./PlateImage";

/**
 * Full-bleed opening plate for a lookbook chapter: the collection's campaign
 * photograph drifting behind its name and tagline.
 */
export default function ChapterPlate({
  collection,
  index,
  lookCount,
  titleId,
  position,
}: {
  collection: Collection;
  index: string;
  lookCount: number;
  titleId: string;
  position: string;
}) {
  return (
    <div className="on-dark relative flex h-[88svh] min-h-[560px] items-end overflow-hidden bg-olive-900 text-cream-50">
      <PlateImage src={collection.image} alt={collection.imageAlt} position={position} />
      <div className="pointer-events-none absolute inset-0 bg-olive-950/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-950/75 via-olive-950/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-14 md:pb-20">
        <Reveal direction="none">
          <div className="section-index mb-6 text-cream-100/80">
            <span className="eyebrow">Chapter {index}</span>
            <span className="rule" />
            <span className="eyebrow text-olive-200">
              {lookCount} {lookCount === 1 ? "look" : "looks"}
            </span>
          </div>
        </Reveal>

        <div id={titleId}>
          <SplitWords
            as="h2"
            text={collection.name}
            className="display max-w-[14ch] text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.92] text-cream-50"
          />
        </div>

        <Reveal delay={0.2}>
          <p className="serif mt-6 max-w-[34ch] text-[clamp(1.25rem,2vw,1.7rem)] leading-snug text-cream-100/90">
            {collection.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10">
            <ButtonLink href={`/collections/${collection.slug}`} variant="light">
              Explore the collection<span className="sr-only">: {collection.name}</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
