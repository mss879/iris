import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import EmptyState from "@/components/ui/EmptyState";
import Reveal, { RevealItem } from "@/components/anim/Reveal";
import { ArrowIcon } from "@/components/icons";
import { articles, articlesInTopic, journalTopics } from "@/lib/journal";
import { site } from "@/lib/site";
import FeatureStory from "./_components/FeatureStory";
import StoryCard from "./_components/StoryCard";

const description =
  "The IrisandMe Journal: stories on natural fabrics, styling linen and dressing for the season — notes on cloth, craft and pieces made to last.";

export const metadata: Metadata = {
  title: "Journal",
  description,
  alternates: { canonical: "/journal" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
    url: "/journal",
    title: "The Journal",
    description,
    images: articles[0] ? [{ url: articles[0].image, alt: articles[0].imageAlt }] : undefined,
  },
};

/** Doors from the Journal into the rest of the IrisandMe world. */
const further = [
  {
    title: "Our Fabrics",
    href: "/our-fabrics",
    image: "/img/fabric-natural.jpg",
    alt: "Balls of natural and olive twine resting on soft folds of cream fabric",
    body: "Linen, cotton and natural fibres — why we choose them, and what makes each one worth wearing.",
  },
  {
    title: "Craftsmanship",
    href: "/craftsmanship",
    image: "/img/craft-cutting.jpg",
    alt: "Hands cutting deep olive cloth with shears along a paper pattern",
    body: "The care that goes into every piece, from the first sketch to the finishing touches.",
  },
  {
    title: "Our Prints",
    href: "/our-prints",
    image: "/img/print-botanical.jpg",
    alt: "Botanical drawings of leaves, ferns and wildflowers pegged along a line against a pale wall",
    body: "The Iris, The Lotus, Botanical Studies and Heritage Inspiration — the stories behind our signature prints.",
  },
];

/** THE JOURNAL — an editorial index: the latest story, the rest, topics and the brand world. */
export default function JournalPage() {
  const [feature, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Stories from IrisandMe"
        title="The Journal"
        intro="Notes on cloth, craft and the art of dressing well — how our fabrics are made, how we like to wear them, and the pieces worth keeping from one season to the next."
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      >
        <nav aria-label="Journal topics" className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
          <span className="eyebrow text-[10px] text-olive-500">Browse</span>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {journalTopics.map((topic) => (
              <li key={topic.id}>
                <a href={`#${topic.id}`} className="eyebrow link-underline text-[10px] text-olive-800">
                  {topic.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {feature ? (
        <Section labelledBy="journal-feature-title">
          <FeatureStory article={feature} titleId="journal-feature-title" />
        </Section>
      ) : (
        <Section labelledBy="journal-empty-title">
          <h2 id="journal-empty-title" className="sr-only">
            Stories
          </h2>
          <EmptyState title="New stories are on their way">
            The first stories from the Journal will appear here soon.
          </EmptyState>
        </Section>
      )}

      {rest.length > 0 ? (
        <Section tone="paper" labelledBy="journal-more-title">
          <SectionHeading
            id="journal-more-title"
            eyebrow="Recent stories"
            title="More from the Journal"
            className="mb-16"
          />
          <Reveal
            stagger={0.1}
            className={`grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 ${
              rest.length > 2 ? "xl:grid-cols-3" : ""
            }`}
          >
            {rest.map((article) => (
              <RevealItem key={article.slug} className="h-full">
                <StoryCard
                  article={article}
                  sizes={
                    rest.length > 2
                      ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />
              </RevealItem>
            ))}
          </Reveal>
        </Section>
      ) : null}

      <Section id="topics" tone="sand" labelledBy="journal-topics-title">
        <SectionHeading
          id="journal-topics-title"
          eyebrow="Browse by topic"
          title="Topics"
          intro="Three threads run through the Journal. Each gathers new stories as they are published."
          className="mb-16"
        />
        <Reveal stagger={0.09} className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
          {journalTopics.map((topic) => {
            const list = articlesInTopic(topic.name);
            return (
              <RevealItem key={topic.id} className="h-full">
                <div id={topic.id} className="flex h-full flex-col border-t hairline pt-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-[clamp(1.9rem,3vw,2.5rem)] leading-none text-olive-800">
                      {topic.name}
                    </h3>
                    <span className="eyebrow shrink-0 text-[10px] text-olive-500">
                      {list.length} {list.length === 1 ? "story" : "stories"}
                    </span>
                  </div>
                  <p className="mt-4 max-w-[38ch] font-sans text-[14px] leading-[1.85] text-olive-600">
                    {topic.description}
                  </p>
                  {list.length > 0 ? (
                    <ul className="mt-7 border-t hairline">
                      {list.map((article) => (
                        <li key={article.slug} className="border-b hairline">
                          <Link
                            href={`/journal/${article.slug}`}
                            className="group/topic flex items-baseline justify-between gap-4 py-4"
                          >
                            <span className="serif text-[1.35rem] leading-snug text-olive-800 transition-colors duration-500 group-hover/topic:text-olive-500">
                              {article.title}
                            </span>
                            <time dateTime={article.date} className="eyebrow shrink-0 text-[9.5px] text-olive-500">
                              {article.displayDate}
                            </time>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-7 border-t hairline pt-4 font-sans text-[13px] text-olive-500">
                      New stories coming soon.
                    </p>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </Section>

      <Section labelledBy="journal-further-title">
        <SectionHeading
          id="journal-further-title"
          eyebrow="Further reading"
          title="Where the stories begin"
          intro="The Journal draws on the same ideas as the rest of our world: the fibres we choose, the care in how each piece is made, and the prints at the heart of every collection."
          className="mb-16"
        />
        <Reveal stagger={0.09} className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
          {further.map((item) => (
            <RevealItem key={item.href}>
              <article className="group/further relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/further:scale-[1.04]"
                  />
                </div>
                <h3 className="display mt-6 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none text-olive-800">
                  <Link
                    href={item.href}
                    className="transition-colors duration-500 after:absolute after:inset-0 group-hover/further:text-olive-500"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[40ch] font-sans text-[14px] leading-[1.85] text-olive-600">{item.body}</p>
                <span
                  aria-hidden="true"
                  className="eyebrow mt-5 inline-flex items-center gap-3 text-[10px] text-olive-800"
                >
                  Discover
                  <ArrowIcon className="h-2.5 w-3.5 transition-transform duration-500 group-hover/further:translate-x-1" />
                </span>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <NewsletterSignup />
    </>
  );
}
