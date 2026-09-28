import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/anim/Reveal";

export type Chapter = {
  href: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  position?: string;
};

/**
 * Photographic cards pointing onward to other chapters of the IrisandMe
 * world. The title carries the link; its overlay stretches across the card so
 * the whole card is clickable without repeating the link for screen readers.
 */
export default function ChapterLinks({ items }: { items: Chapter[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <li key={item.href}>
          <Reveal delay={i * 0.08} className="group/chapter relative flex h-full flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-300">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/chapter:scale-[1.04]"
                style={{ objectPosition: item.position ?? "center" }}
              />
            </div>
            <h3 className="display mt-6 text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.02] text-olive-800">
              <Link href={item.href} className="after:absolute after:inset-0">
                {item.title}
              </Link>
            </h3>
            <p className="mt-3 font-sans text-[14px] leading-[1.85] text-olive-600">{item.body}</p>
            <span
              aria-hidden="true"
              className="eyebrow mt-5 text-[10px] text-olive-700 transition-colors duration-500 group-hover/chapter:text-olive-500"
            >
              Read the chapter
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
