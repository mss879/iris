import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import PullQuote from "@/components/ui/PullQuote";
import CtaBand from "@/components/ui/CtaBand";
import { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Standfirst from "@/components/brand/Standfirst";
import PageIndex from "@/components/brand/PageIndex";
import Points from "@/components/brand/Points";
import Ledger, { type LedgerItem } from "@/components/brand/Ledger";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Considered Design. Natural Beauty. Modern Femininity. The ideas behind IrisandMe, and six principles for clothing made to be worn beyond a single season.",
};

const contents = [
  { href: "#considered-design", label: "Considered Design" },
  { href: "#natural-beauty", label: "Natural Beauty" },
  { href: "#modern-femininity", label: "Modern Femininity" },
  { href: "#six-principles", label: "Six principles" },
  { href: "#beyond-a-single-season", label: "Beyond a single season" },
];

const principles: LedgerItem[] = [
  {
    title: "Timelessness",
    body: "We design away from trends and towards pieces that will look as right in years to come as they do today. Clean lines, natural colour and honest fabrics are slow to date — and a piece that doesn’t date is a piece you keep.",
    href: "/collections",
    linkLabel: "Explore the collections",
  },
  {
    title: "Versatility",
    body: "A shirt worn open over a slip dress, then buttoned and tucked into wide trousers. A set worn together, then apart. Each piece is designed to earn its place in many outfits, not one — and to move from morning to evening, and from home to away.",
    href: "/lookbook",
    linkLabel: "See the lookbook",
  },
  {
    title: "Quality",
    body: "Good cloth, careful cutting and clean finishing, inside and out. Quality is not one decision but many small ones, each made well — and it is what lets a piece be worn, washed and worn again.",
    href: "/craftsmanship",
    linkLabel: "Craftsmanship",
  },
  {
    title: "Comfort",
    body: "Natural fibres that breathe, cuts with room to move, waistbands that don’t pinch. Clothing should feel as good at the end of a long day as it did when you put it on.",
    href: "/our-fabrics",
    linkLabel: "Our fabrics",
  },
  {
    title: "Responsible production",
    body: "Small batches, natural fibres and clear standards for the people who make our clothing. We are open about what we do now, and about what we are still working towards.",
    href: "/consciously-irisandme",
    linkLabel: "Consciously IrisandMe",
  },
  {
    title: "Beyond a single season",
    body: "Nothing we design is meant to be replaced next season. We make pieces to be worn for years, and to become more your own with every wear.",
    href: "#beyond-a-single-season",
    linkLabel: "Read more",
  },
];

export default function OurPhilosophyPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="What we believe"
        title="Our Philosophy"
        intro="Three ideas shape everything IrisandMe makes: Considered Design, Natural Beauty and Modern Femininity. Beneath them sit six principles that decide whether a piece is ready to be made."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Our Philosophy" },
        ]}
        image="/img/hero-alt.jpg"
        imageAlt="A woman in a floor-length deep olive gown standing in a sunlit stone hall"
        position="72% center"
      />

      <Standfirst
        id="in-brief"
        title="Our philosophy, in brief"
        lede="We believe clothing should be chosen slowly, worn often and kept for years. It is a simple idea that asks a great deal of design, of cloth and of making — and it is the measure we hold every piece to."
        aside={<PageIndex items={contents} />}
      >
        <p>
          Our three pillars — Considered Design, Natural Beauty and Modern Femininity — describe
          what we hope you feel when you wear IrisandMe. The six principles that follow describe
          how we get there.
        </p>
        <p>
          None of this is new. Good clothing has always been made this way. We simply think it is
          worth holding to, especially now.
        </p>
      </Standfirst>

      {/* Pillar I */}
      <Section id="considered-design" tone="cream">
        <SplitFeature
          image="/img/j-seasonal.jpg"
          imageAlt="A flat lay of cream linen shirts, an olive shirt and olive trousers with a woven bag, leather sandals and sunglasses"
          caption="A few pieces, chosen to work together."
          index="I"
          eyebrow="The first pillar"
          title="Considered Design"
        >
          <p>
            Considered design means every decision has a reason — and that we make none for the
            sake of novelty.
          </p>
          <Points
            items={[
              {
                title: "Every detail earns its place",
                body: "Pockets where hands naturally fall. Buttons that are easy to use. Hems that work with flat sandals and with heels. If a detail doesn’t make a piece better to wear, we leave it out.",
              },
              {
                title: "Designed as a wardrobe",
                body: "We design in a palette of cream, deep olive and soft botanical colour, so each new piece works with the ones you already own.",
              },
              {
                title: "Fewer, better",
                body: "We would rather make fewer pieces well than many pieces quickly, so our attention goes into each one.",
              },
            ]}
          />
        </SplitFeature>
      </Section>

      {/* Pillar II */}
      <Section id="natural-beauty" tone="sand">
        <SplitFeature
          reverse
          image="/img/l-linen-cami.jpg"
          imageAlt="A woman in a deep olive linen camisole and cream trousers standing among tall summer grasses"
          index="II"
          eyebrow="The second pillar"
          title="Natural Beauty"
        >
          <p>
            We look for the beauty that is already there — in natural fibres, in the natural world,
            and in the woman wearing the clothes.
          </p>
          <Points
            items={[
              {
                title: "In the cloth",
                body: "The slubs of linen, the soft handle of cotton, the matte glow of sand-washed silk. We choose fabrics whose character improves with wear.",
              },
              {
                title: "In the natural world",
                body: "Our prints begin as drawings of flowers and leaves, and our palette takes its cue from the landscape: cream, olive, sage and lavender-grey.",
              },
              {
                title: "In the woman herself",
                body: "Our clothes are designed to frame rather than disguise. We cut for ease and movement, never to reshape.",
              },
            ]}
          />
        </SplitFeature>
      </Section>

      {/* Pillar III */}
      <Section id="modern-femininity" tone="olive">
        <SplitFeature
          dark
          image="/img/ugc-3.jpg"
          imageAlt="A woman in a deep olive wrap dress walking along a sandy path through dry coastal grass"
          index="III"
          eyebrow="The third pillar"
          title="Modern Femininity"
        >
          <p>
            Femininity, to us, is ease, confidence and a sense of self — not a silhouette, and not a
            set of rules.
          </p>
          <Points
            dark
            items={[
              {
                title: "Made to move",
                body: "Relaxed cuts, bias-cut skirts and softly gathered shapes that follow the body as it walks, reaches and sits.",
              },
              {
                title: "Soft, not fragile",
                body: "Fluid lines and gentle detail, in fabrics made for real days — work, travel, long lunches and late evenings.",
              },
              {
                title: "Her way",
                body: "Tied or loose, tucked or not, together or apart. The pieces adapt; the woman decides.",
              },
            ]}
          />
        </SplitFeature>
      </Section>

      <Section id="six-principles" tone="cream" labelledBy="six-principles-heading">
        <SectionHeading
          id="six-principles-heading"
          eyebrow="What guides every piece"
          title="Six principles"
          intro="Beneath the three pillars sit six principles. Together they decide what we make, and how we make it."
        />
        <div className="mt-14 md:mt-20">
          <Ledger items={principles} />
        </div>
      </Section>

      <Section id="beyond-a-single-season" tone="sand">
        <SplitFeature
          image="/img/journal-3.jpg"
          imageAlt="Folded cream linen shirts and deep olive knits stacked on a wooden shelf"
          position="50% center"
          eyebrow="The long view"
          title="Designed beyond a single season"
          actions={
            <>
              <TextLink href="/garment-care">Garment care</TextLink>
              <TextLink href="/collections/the-linen-edit">The Linen Edit</TextLink>
            </>
          }
        >
          <p>Fashion moves in seasons. We would rather design in years.</p>
          <p>
            That means choosing fabrics that improve with wear, shapes that don’t depend on a
            trend, and colours that sit together easily from one year to the next. It means pieces
            that layer — a linen dress over knitwear when the light turns, a camisole beneath a
            shirt all year.
          </p>
          <p>
            And it means helping you look after them. Every piece comes with care guidance, and our
            garment care guide goes further.
          </p>
        </SplitFeature>
      </Section>

      <Section tone="paper" pad="tight">
        <PullQuote>Designed in years, not seasons.</PullQuote>
      </Section>

      <CtaBand
        eyebrow="In practice"
        title="See the philosophy in the making"
        body="From the first sketch to the final check, this is how our principles become clothing."
        primary={{ label: "Craftsmanship", href: "/craftsmanship" }}
        secondary={{ label: "Our fabrics", href: "/our-fabrics" }}
      />

      <ContinueExploring current="/our-philosophy" />
    </>
  );
}
