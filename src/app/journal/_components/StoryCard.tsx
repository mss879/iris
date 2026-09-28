import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import type { Article } from "@/lib/journal";
import ArticleMeta from "./ArticleMeta";

/**
 * A story in a list. The title carries the only link; it is stretched over the
 * whole card so the photograph and the "Read the story" cue are clickable too,
 * without giving screen readers three links to the same place.
 */
export default function StoryCard({
  article,
  headingLevel = "h3",
  ratio = "4/3",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  article: Article;
  headingLevel?: "h2" | "h3";
  ratio?: string;
  sizes?: string;
}) {
  const Heading = headingLevel;

  return (
    <article className="group/story relative flex h-full flex-col">
      <div
        className="relative w-full overflow-hidden bg-cream-200"
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/story:scale-[1.04]"
          style={{ objectPosition: article.position ?? "center" }}
        />
      </div>

      <ArticleMeta article={article} className="mt-6" />

      <Heading className="display mt-4 text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1] text-olive-800">
        <Link
          href={`/journal/${article.slug}`}
          className="transition-colors duration-500 after:absolute after:inset-0 group-hover/story:text-olive-500"
        >
          {article.title}
        </Link>
      </Heading>

      <p className="mt-4 max-w-[48ch] font-sans text-[14.5px] leading-[1.85] text-olive-600">
        {article.excerpt}
      </p>

      <span
        aria-hidden="true"
        className="eyebrow mt-6 inline-flex items-center gap-3 self-start text-[10px] text-olive-800"
      >
        Read the story
        <ArrowIcon className="h-2.5 w-3.5 transition-transform duration-500 group-hover/story:translate-x-1" />
      </span>
    </article>
  );
}
