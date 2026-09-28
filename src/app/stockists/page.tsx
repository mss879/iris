import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import ButtonLink, { TextLink } from "@/components/ui/ButtonLink";
import EmptyState from "@/components/ui/EmptyState";
import FeatureGrid from "@/components/ui/FeatureGrid";
import Reveal from "@/components/anim/Reveal";
import { site } from "@/lib/site";
import StockistEnquiryForm from "./_components/StockistEnquiryForm";
import StockistList from "./_components/StockistList";
import { stockists } from "./_data/stockists";

export const metadata: Metadata = {
  title: "Stockists",
  description:
    "Where to find IrisandMe. The collection is currently available online, shipping worldwide — and boutiques can enquire here about becoming a stockist.",
};

const domain = new URL(site.url).hostname.replace(/^www\./, "");

/** What IrisandMe looks for in a boutique partner. */
const partnerValues = [
  {
    title: "Natural fabrics",
    body: "A love of linen, cotton and natural fibres, and the knowledge to talk about how they feel, wear and age.",
  },
  {
    title: "Considered retail",
    body: "A thoughtfully edited space where each piece has room to be seen, touched and tried on.",
  },
  {
    title: "Care for customers",
    body: "People who take time over fit and care, and customers who return because of it.",
  },
];

/** STOCKISTS — ready for IrisandMe's first boutiques, honest about today. */
export default function StockistsPage() {
  const hasStockists = stockists.length > 0;

  return (
    <>
      <PageHero
        variant="split"
        image="/img/packaging.jpg"
        imageAlt="A parcel wrapped in cream cloth and tied with ribbon, finished with a deep olive tag"
        eyebrow="Find IrisandMe"
        title="Stockists"
        intro={`IrisandMe is currently available online at ${domain}, shipping worldwide. As boutique partners join us, you will find them listed here.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Stockists" }]}
      >
        <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
          <ButtonLink href="/shop" variant="solid">
            Shop online
          </ButtonLink>
          <TextLink href="#become-a-stockist" className="text-olive-800">
            Become a stockist
          </TextLink>
        </div>
      </PageHero>

      <Section labelledBy="stockists-list-title">
        <SectionHeading
          id="stockists-list-title"
          eyebrow="Boutique partners"
          title="Our stockists"
          intro={hasStockists ? "IrisandMe boutique partners, listed by region." : undefined}
          className="mb-14"
        />
        {hasStockists ? (
          <StockistList stockists={stockists} />
        ) : (
          <Reveal>
            <EmptyState
              title="Our first boutique partners will appear here"
              action={<ButtonLink href="/shop">Shop the collection</ButtonLink>}
            >
              For now, the full collection is available online at {domain}, shipping worldwide. When
              IrisandMe arrives in boutiques, you will find each one listed here by region.
            </EmptyState>
          </Reveal>
        )}
      </Section>

      <Section id="become-a-stockist" tone="sand" labelledBy="become-stockist-title">
        <SectionHeading
          id="become-stockist-title"
          eyebrow="Wholesale"
          title="Become a stockist"
          intro="We would love to hear from boutiques that see things as we do. If your shop is built on natural fabrics, a considered edit and genuine care for the people who walk through its door, we would be glad to talk."
          className="mb-16"
        />

        <FeatureGrid items={partnerValues} columns={3} />

        <div className="mt-20 grid grid-cols-1 gap-14 border-t hairline pt-16 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="display text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.98] text-olive-800">
              Send an enquiry
            </h3>
            <p className="mt-5 max-w-[40ch] font-sans text-[15px] leading-[1.9] text-olive-600">
              Tell us about your boutique and we will be in touch to talk about working together.
            </p>
            <p className="eyebrow mt-10 text-[10px] text-olive-500">Prefer to write?</p>
            <a
              href={`mailto:${site.email.stockists}`}
              className="link-underline mt-3 inline-block font-sans text-[15px] text-olive-800"
            >
              {site.email.stockists}
            </a>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <StockistEnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
