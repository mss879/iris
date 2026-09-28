import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";
import { ArrowIcon } from "@/components/icons";
import type { Article } from "@/lib/journal";
import ArticleMeta from "./ArticleMeta";

/**
 * The lead story on the Journal: a large photograph beside its headline.
 * As on the cards, one link is stretched across the whole feature.
 */
export default function FeatureStory({ article, titleId }: { article: Article; titleId: string }) {
  return (
    <article className="group/feature relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feature:scale-[1.03]"
            style={{ objectPosition: article.position ?? "center" }}
          />
        </div>
      </div>

      <div className="lg:col-span-4 lg:col-start-9">
        <Reveal direction="none">
          <div className="section-index mb-7 text-olive-500">
            <span className="rule" />
            <span className="eyebrow">Latest story</span>
          </div>
        </Reveal>

        <ArticleMeta article={article} />

        <Link
          id={titleId}
          href={`/journal/${article.slug}`}
          className="mt-6 block after:absolute after:inset-0"
        >
          <SplitWords
            as="h2"
            text={article.title}
            className="display max-w-[12ch] text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[0.94] text-olive-800 transition-colors duration-500 group-hover/feature:text-olive-500"
          />
        </Link>

        <Reveal delay={0.15}>
          <p className="mt-7 max-w-[46ch] font-sans text-[15px] leading-[1.9] text-olive-600">
            {article.excerpt}
          </p>
          <span
            aria-hidden="true"
            className="eyebrow mt-9 inline-flex items-center gap-3 border-b border-olive-800/40 pb-2 text-[10px] text-olive-800"
          >
            Read the story
            <ArrowIcon className="h-2.5 w-3.5 transition-transform duration-500 group-hover/feature:translate-x-1" />
          </span>
        </Reveal>
      </div>
    </article>
  );
}
