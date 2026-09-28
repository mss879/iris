import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import ProductGrid from "@/components/ProductGrid";
import Reveal, { RevealItem } from "@/components/anim/Reveal";
import { collections, getCollection, productsInCollection } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.tagline} ${c.intro}`,
    openGraph: { images: [c.image] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = productsInCollection(collection.slug);
  const worn = items.filter((p) => p.hover).slice(0, 3);
  const others = collections.filter((c) => c.slug !== collection.slug);

  return (
    <>
      <PageHero
        variant="image"
        image={collection.image}
        imageAlt={collection.imageAlt}
        position="center 28%"
        eyebrow={collection.note ?? "Collection"}
        title={collection.name}
        intro={collection.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
      />

      <Section labelledBy="collection-story">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHeading id="collection-story" eyebrow="The collection" title={collection.tagline} size="small" />
            <Reveal delay={0.15}>
              <p className="serif mt-8 max-w-[34ch] text-[clamp(1.35rem,2.2vw,1.7rem)] leading-[1.45] text-olive-700">
                {collection.intro}
              </p>
              <div className="mt-8 flex max-w-[52ch] flex-col gap-5 font-sans text-[15px] leading-[1.95] text-olive-600">
                {collection.story.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Figure src={collection.portrait} alt={`A piece from ${collection.name}`} ratio="3/4" sizes="(max-width: 1024px) 100vw, 33vw" />
          </div>
        </div>
      </Section>

      <Section tone="sand" labelledBy="collection-pieces">
        <SectionHeading
          id="collection-pieces"
          eyebrow={`${items.length} ${items.length === 1 ? "piece" : "pieces"}`}
          title={`Shop ${collection.name}`}
          size="small"
          className="mb-14"
        />
        <ProductGrid products={items} columns={items.length === 3 ? 3 : 4} />
      </Section>

      {worn.length > 0 ? (
        <Section labelledBy="collection-worn">
          <SectionHeading id="collection-worn" eyebrow="As worn" title="In the collection" size="small" className="mb-14" />
          <Reveal stagger={0.12} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {worn.map((p, i) => (
              <RevealItem key={p.slug} className={i === 1 ? "sm:mt-20" : ""}>
                <Link href={`/products/${p.slug}`} className="group/w block" data-cursor="view">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
                    <Image
                      src={p.hover!}
                      alt={`${p.name}, worn`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/w:scale-[1.04]"
                    />
                  </div>
                  <p className="eyebrow mt-4 text-[10px] text-olive-700 group-hover/w:text-olive-500">{p.name}</p>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </Section>
      ) : null}

      <Section tone="paper" pad="tight" labelledBy="other-collections">
        <h2 id="other-collections" className="eyebrow mb-8 text-[10px] text-olive-500">
          More collections
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {others.map((c) => (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} className="group/o block">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/o:scale-[1.04]"
                  />
                </div>
                <p className="display mt-4 text-[1.3rem] leading-tight text-olive-800 group-hover/o:text-olive-500">{c.name}</p>
                <p className="mt-1 font-sans text-[12.5px] text-olive-600">{c.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
