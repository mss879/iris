import type { Article } from "@/lib/journal";

/** Topic, publication date and reading time, set as one quiet line. */
export default function ArticleMeta({
  article,
  showTag = true,
  dark = false,
  className = "",
}: {
  article: Article;
  showTag?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] ${
        dark ? "text-cream-100/85" : "text-olive-500"
      } ${className}`}
    >
      {showTag ? (
        <>
          <span className={dark ? "text-cream-50" : "text-olive-700"}>{article.tag}</span>
          <span aria-hidden="true">·</span>
        </>
      ) : null}
      <time dateTime={article.date}>{article.displayDate}</time>
      <span aria-hidden="true">·</span>
      <span>{article.readTime}</span>
    </p>
  );
}
