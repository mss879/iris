import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";
import CtaBand from "@/components/ui/CtaBand";
import { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";
import { site } from "@/lib/site";
import Standfirst from "@/components/brand/Standfirst";
import PageIndex from "@/components/brand/PageIndex";
import Checklist, { type ChecklistItem } from "@/components/brand/Checklist";
import Ledger, { type LedgerItem } from "@/components/brand/Ledger";
import { joinList, singleNaturalFibres } from "./_components/fibres";

export const metadata: Metadata = {
  title: "Consciously IrisandMe",
  description:
    "How IrisandMe approaches responsibility: natural fibres, small batches, waste, packaging, garment longevity, ethical manufacturing and our future commitments.",
};

const contents = [
  { href: "#natural-fibres", label: "Natural fibres" },
  { href: "#material-choices", label: "Responsible material choices" },
  { href: "#recycled-materials", label: "Recycled materials", note: "In development" },
  { href: "#small-batch-production", label: "Small-batch production" },
  { href: "#waste-reduction", label: "Waste reduction" },
  { href: "#packaging", label: "Packaging" },
  { href: "#garment-longevity", label: "Garment longevity" },
  { href: "#ethical-manufacturing", label: "Ethical manufacturing" },
  { href: "#future-commitments", label: "Our future commitments" },
];

const fibres = singleNaturalFibres();

const materialQuestions: Feature[] = [
  {
    title: "Will it last?",
    body: "Durability comes first. A cloth that wears out quickly is never the responsible choice, however it was made.",
  },
  {
    title: "Is it the right fibre for the piece?",
    body: "Linen for heat, cotton for prints, silk for drape, alpaca for warmth. The right fibre in the right place means a piece is worn more, and for longer.",
  },
  {
    title: "Where does it come from?",
    body: "We want to know where our fibres are grown and processed, and we are working to trace them further back than we can today.",
  },
  {
    title: "Does it need to be dyed?",
    body: "Where natural colour suits a piece, we leave it undyed. Our alpaca knit, for one, is made in the natural colour of the fibre.",
  },
  {
    title: "Can it be cared for simply?",
    body: "We favour fabrics that can be washed cool at home and dried on a line, over a lifetime of dry cleaning.",
  },
  {
    title: "Is it a single fibre?",
    body: "Blended fibres are much harder to recycle. We favour single-fibre cloth wherever the piece allows.",
  },
];

const wasteApproach: Feature[] = [
  {
    title: "At the design stage",
    body: "Pieces designed to work together mean a wardrobe needs fewer of them — the simplest saving of all.",
  },
  {
    title: "At the cutting table",
    body: "Pattern pieces are laid out to use as much of each length of cloth as we can.",
  },
  {
    title: "With offcuts",
    body: "We are looking for good uses for the offcuts that remain, and for responsible textile recycling for the rest.",
  },
  {
    title: "After you buy",
    body: "Clear size guidance helps you choose well the first time, so fewer parcels travel back and forth.",
    href: "/size-and-fit",
    linkLabel: "Size and fit",
  },
];

const longevity: Feature[] = [
  {
    title: "Designed for years",
    body: "Shapes that don’t depend on a trend, in colours that sit together easily from one year to the next.",
    href: "/our-philosophy",
    linkLabel: "Our philosophy",
  },
  {
    title: "Made to last",
    body: "Careful cutting, clean seams and reinforced stress points, held to clear quality standards.",
    href: "/craftsmanship#quality-standards",
    linkLabel: "Quality standards",
  },
  {
    title: "Cared for at home",
    body: "Care instructions on every product page, and fuller guidance in our garment care guide.",
    href: "/garment-care",
    linkLabel: "Garment care",
  },
  {
    title: "Passed on",
    body: "When a piece no longer suits you, give it a second life — with a friend, a sister, a daughter or an op shop — so it keeps being worn.",
  },
];

const workshopStandards: ChecklistItem[] = [
  {
    title: "Fair pay",
    body: "Wages paid in full and on time, meeting at least the legal minimum — with a living wage as the standard we work towards.",
  },
  {
    title: "Safe conditions",
    body: "Safe, clean, well-lit and ventilated workplaces, with fire safety, first aid and clean drinking water.",
  },
  {
    title: "Reasonable hours",
    body: "Working hours within legal limits, overtime that is voluntary and properly paid, and regular days of rest.",
  },
  {
    title: "No child labour",
    body: "No one employed under the legal working age, and no young worker in hazardous work.",
  },
  {
    title: "No forced labour",
    body: "All work freely chosen. No withheld wages or identity documents, no recruitment fees, no debt bondage.",
  },
  {
    title: "Respect",
    body: "Freedom from harassment, abuse and discrimination, and the right to speak up — and to organise — without fear.",
  },
];

const commitments: LedgerItem[] = [
  {
    eyebrow: "Materials",
    title: "Introduce recycled materials",
    body: "Bring recycled natural fibres, surplus mill cloth and our own offcuts into the collection — only where they meet our standards, and always with the exact composition stated.",
  },
  {
    eyebrow: "Traceability",
    title: "Trace our cloth further",
    body: "Follow our fabrics beyond the workshops that sew them, to the mills that weave them and, where we can, the farms where the fibres are grown.",
  },
  {
    eyebrow: "Waste",
    title: "Measure, then reduce",
    body: "Measure our offcuts and unsold stock properly, share what we find, and reduce both year on year.",
  },
  {
    eyebrow: "Packaging",
    title: "Packaging with a second life",
    body: "Make every part of our packaging reusable, recyclable or compostable at home.",
  },
  {
    eyebrow: "Longevity",
    title: "Help pieces last longer",
    body: "Expand our care guidance, and make it easier to mend and pass on what you own.",
  },
  {
    eyebrow: "Reporting",
    title: "Report honestly",
    body: "Share what we have done, not only what we intend — including where we have fallen short.",
  },
];

export default function ConsciouslyIrisandMePage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Our approach to responsibility"
        title="Consciously IrisandMe"
        intro="What we do, what we are working towards, and what we have not yet solved. We would rather be clear about all three than claim more than we can show."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Consciously IrisandMe" },
        ]}
        image="/img/ugc-5.jpg"
        imageAlt="A woman in deep olive linen trousers and a cream top seated on a wooden bench, holding a bunch of dried flowers"
      />

      <Standfirst
        id="where-we-stand"
        title="Where we stand"
        lede="Making clothing uses resources — cloth, water, energy, and the time and skill of the people who sew it. We can’t make that cost disappear. We can make fewer things, make them well, and make them to last."
        aside={<PageIndex items={contents} />}
      >
        <p>
          This page sets out how we approach each part of that, in plain terms: the materials we
          choose, how much we make, what happens to the waste, how your order is packed, and the
          standards we ask of the people who make our clothing.
        </p>
        <p>
          Where something is an intention rather than a practice, we say so. You will find those
          gathered together at the end, as our future commitments.
        </p>
      </Standfirst>

      {/* 01 */}
      <Section id="natural-fibres" tone="cream">
        <SplitFeature
          image="/img/journal-2.jpg"
          imageAlt="Lengths of cream linen hanging to dry on lines above old stone basins"
          index="01"
          eyebrow="What our clothes are made of"
          title="Natural fibres"
          actions={<TextLink href="/our-fabrics">Our fabrics</TextLink>}
        >
          <p>
            Our collections are made from linen, cotton and a small number of other natural fibres.
            We choose them for comfort and for longevity: they breathe, they soften with wear, and
            they last.
          </p>
          {fibres ? (
            <p>
              Every piece in our current collection is made from a single fibre —{" "}
              {joinList(
                fibres.map((f) => `100% ${f}`),
                "or",
              )}
              . Single-fibre cloth is simpler to care for, and simpler to recycle at the end of its
              life.
            </p>
          ) : null}
          <p>
            Natural does not automatically mean low-impact. How a fibre is grown, spun, woven and
            dyed matters as much as what it is — which is why the choices below matter to us.
          </p>
        </SplitFeature>
      </Section>

      {/* 02 */}
      <Section id="material-choices" tone="sand" labelledBy="material-choices-heading">
        <SectionHeading
          id="material-choices-heading"
          index="02"
          eyebrow="How we choose"
          title="Responsible material choices"
          intro="A fabric has to earn its place in our collection. These are the questions we ask of it."
        />
        <div className="mt-14 md:mt-20">
          <FeatureGrid items={materialQuestions} columns={3} />
        </div>
      </Section>

      {/* 03 */}
      <Section id="recycled-materials" tone="cream">
        <SplitFeature
          reverse
          image="/img/fabric-recycled.jpg"
          imageAlt="Bundles of cream and olive linen offcuts tied with twine and stacked on a wooden table by a window"
          index="03"
          eyebrow="In development"
          title="Recycled materials"
          actions={
            <TextLink href="/our-fabrics#recycled-materials">Recycled materials in Our Fabrics</TextLink>
          }
        >
          <p>
            We don’t yet use recycled materials in our collection. We are exploring three routes:
            recycled natural fibres, surplus cloth left over at mills, and the offcuts from our own
            cutting.
          </p>
          <p>
            We will only introduce them where the finished cloth meets the same standard as
            everything else we make — in feel, in strength and in how it wears. When we do, the
            product page will say exactly what the piece is made of, and how much of it is
            recycled.
          </p>
        </SplitFeature>
      </Section>

      {/* 04 */}
      <Section id="small-batch-production" tone="olive">
        <SplitFeature
          dark
          image="/img/col-limited.jpg"
          imageAlt="A cream jacket hand block printed with olive leaves, hanging against a lime-washed wall"
          position="50% center"
          index="04"
          eyebrow="Making less, and better"
          title="Small-batch production"
          actions={<TextLink href="/collections/limited-editions">Limited Editions</TextLink>}
        >
          <p>
            We make in small batches rather than large runs. It means we make closer to what is
            actually wanted, and that each piece gets more attention along the way.
          </p>
          <p>
            Some pieces are offered to pre-order ahead of their arrival. Our Limited Editions are
            made in small, numbered runs and are not remade once they are gone.
          </p>
          <p>Small batches are slower, and cost more to make. We think the trade is worth it.</p>
        </SplitFeature>
      </Section>

      {/* 05 */}
      <Section id="waste-reduction" tone="cream" labelledBy="waste-reduction-heading">
        <SectionHeading
          id="waste-reduction-heading"
          index="05"
          eyebrow="Designing waste out"
          title="Waste reduction"
          intro="The best way to reduce waste is not to create it. We approach it at every stage we can influence."
        />
        <div className="mt-14 md:mt-20">
          <FeatureGrid items={wasteApproach} columns={4} />
        </div>
        <Reveal className="mt-14 md:mt-16">
          <p className="max-w-[62ch] border-l hairline pl-6 font-sans text-[14.5px] leading-[1.9] text-olive-600">
            We don’t yet measure our waste in a way we would be comfortable publishing. Doing so is
            one of our{" "}
            <a href="#future-commitments" className="underline underline-offset-[3px]">
              future commitments
            </a>
            .
          </p>
        </Reveal>
      </Section>

      {/* 06 */}
      <Section id="packaging" tone="sand">
        <SplitFeature
          reverse
          image="/img/packaging.jpg"
          imageAlt="A kraft box holding a folded cream garment, tied with cream cotton ribbon and an olive card tag"
          index="06"
          eyebrow="Only what is needed"
          title="Packaging"
          actions={<TextLink href="/shipping-and-delivery">Shipping and delivery</TextLink>}
        >
          <p>We keep packaging to what protects your piece on its way to you, and no more.</p>
          <p>
            We choose paper and card over plastic wherever we can, and materials that can be
            reused, recycled or composted at home.
          </p>
          <p>
            However your order arrives, we hope its packaging has a second life — as storage, or
            wrapped around a gift — before it is recycled.
          </p>
        </SplitFeature>
      </Section>

      {/* 07 */}
      <Section id="garment-longevity" tone="cream" labelledBy="garment-longevity-heading">
        <SectionHeading
          id="garment-longevity-heading"
          index="07"
          eyebrow="The longest life"
          title="Garment longevity"
          intro="The most responsible piece of clothing is the one you keep wearing. Everything else on this page is in service of that."
        />
        <div className="mt-14 md:mt-20">
          <FeatureGrid items={longevity} columns={4} />
        </div>
      </Section>

      {/* 08 */}
      <Section id="ethical-manufacturing" tone="olive" labelledBy="ethical-manufacturing-heading">
        <SectionHeading
          dark
          id="ethical-manufacturing-heading"
          index="08"
          eyebrow="The people who make our clothing"
          title="Ethical manufacturing"
          intro="Our clothing is made by skilled people, and how they are treated matters as much as how the clothing is made. These are the standards we ask of every workshop we work with."
        />
        <div className="mt-14 md:mt-20">
          <Checklist items={workshopStandards} dark titleAs="h3" />
        </div>
        <Reveal className="mt-12">
          <p className="max-w-[64ch] border-t border-cream-100/20 pt-8 font-sans text-[15px] leading-[1.9] text-cream-200/85">
            Our commitment is to work with a small number of workshops over the long term, to know
            them well, and to hear when something falls short so that it can be put right. As we
            are able to share more about where and by whom our pieces are made, we will publish it
            here.
          </p>
        </Reveal>
      </Section>

      {/* 09 */}
      <Section id="future-commitments" tone="cream" labelledBy="future-commitments-heading">
        <SectionHeading
          id="future-commitments-heading"
          index="09"
          eyebrow="What we are working towards"
          title="Our future commitments"
          intro="These are intentions, not achievements. We will update this page as each one moves forward."
        />
        <div className="mt-14 md:mt-20">
          <Ledger items={commitments} />
        </div>
      </Section>

      <CtaBand
        tone="sand"
        eyebrow="Questions"
        title="Ask us about how we work"
        body={
          <>
            Write to us at{" "}
            <a href={`mailto:${site.email.care}`} className="underline underline-offset-[3px]">
              {site.email.care}
            </a>
            . We reply {site.responseTime}, and we will answer as fully as we can.
          </>
        }
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "People & Purpose", href: "/people-and-purpose" }}
      />

      <ContinueExploring current="/consciously-irisandme" />
    </>
  );
}
