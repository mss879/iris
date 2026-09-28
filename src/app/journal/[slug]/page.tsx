import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/ButtonLink";
import Reveal, { RevealItem } from "@/components/anim/Reveal";
import { articles, getArticle, topicId } from "@/lib/journal";
import { site } from "@/lib/site";
import ArticleBody, { MEASURE } from "../_components/ArticleBody";
import ArticleMeta from "../_components/ArticleMeta";
import StoryCard from "../_components/StoryCard";

/** Only the stories in the Journal exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_AU",
      url: `/journal/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      section: article.tag,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const url = new URL(`/journal/${article.slug}`, site.url).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [new URL(article.image, site.url).toString()],
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.tag,
    wordCount: article.wordCount,
    inLanguage: "en-AU",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: new URL("/img/logo-olive.png", site.url).toString() },
    },
  };

  return (
    <>
      <article>
        <PageHero
          variant="image"
          image={article.image}
          imageAlt={article.imageAlt}
          position={article.position}
          eyebrow={`Journal · ${article.tag}`}
          title={article.title}
          intro={article.excerpt}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: article.title },
          ]}
        >
          <ArticleMeta article={article} showTag={false} dark />
        </PageHero>

        <div className="bg-cream-100 px-6 pb-24 pt-16 md:px-14 md:pb-32 md:pt-24">
          <ArticleBody body={article.body} />

          <footer
            className={`${MEASURE} mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t hairline pt-8 md:mt-24`}
          >
            <p className="eyebrow text-[10px] text-olive-500">
              Filed under{" "}
              <Link href={`/journal#${topicId(article.tag)}`} className="link-underline text-olive-800">
                {article.tag}
              </Link>
              <span aria-hidden="true" className="mx-3">
                ·
              </span>
              <time dateTime={article.date}>{article.displayDate}</time>
            </p>
            <TextLink href="/journal" className="text-olive-800">
              Back to the Journal
            </TextLink>
          </footer>
        </div>
      </article>

      {more.length > 0 ? (
        <Section tone="sand" labelledBy="journal-more-title">
          <SectionHeading
            id="journal-more-title"
            eyebrow="Keep reading"
            title="More from the Journal"
            action={
              <TextLink href="/journal" className="text-olive-700">
                All stories
              </TextLink>
            }
            className="mb-16"
          />
          <Reveal stagger={0.1} className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {more.map((story) => (
              <RevealItem key={story.slug} className="h-full">
                <StoryCard article={story} />
              </RevealItem>
            ))}
          </Reveal>
        </Section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
