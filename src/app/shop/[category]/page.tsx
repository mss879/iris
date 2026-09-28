import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { productsIn, shopCategories } from "@/lib/products";
import CategoryNav from "../_components/CategoryNav";
import CategoryBrowser from "../_components/CategoryBrowser";

// Only the published categories exist; anything else (including the Sale
// category until it is switched on) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.slug }));
}

const getCategory = (slug: string) => shopCategories.find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.label,
    description: `${c.blurb} Shop ${c.label.toLowerCase()} at IrisandMe.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const items = productsIn(c.slug);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title={c.label}
        intro={c.blurb}
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: c.label }]}
      >
        <CategoryNav current={c.slug} />
      </PageHero>

      <Section pad="tight">
        <CategoryBrowser slugs={items.map((p) => p.slug)} />
      </Section>

      <Section tone="paper" pad="tight">
        <div className="flex flex-col gap-4 text-center">
          <p className="font-sans text-[13.5px] leading-relaxed text-olive-600">
            Unsure of your size?{" "}
            <Link href="/size-and-fit" className="underline underline-offset-4 hover:text-olive-800">
              Read our Size &amp; Fit guide
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-olive-800">
              ask our Client Services team
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
