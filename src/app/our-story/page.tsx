import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";
import Figure from "@/components/ui/Figure";
import PullQuote from "@/components/ui/PullQuote";
import CtaBand from "@/components/ui/CtaBand";
import { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";
import Standfirst from "@/components/brand/Standfirst";
import PageIndex from "@/components/brand/PageIndex";
import Points from "@/components/brand/Points";
import ChapterLinks, { type Chapter } from "./_components/ChapterLinks";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Who IrisandMe is: an Australian label of considered womenswear in linen, cotton and natural fibres, with signature prints drawn by hand and pieces made to last.",
};

const contents = [
  { href: "#who-we-are", label: "Who we are" },
  { href: "#born-in-australia", label: "Born in Australia" },
  { href: "#design-philosophy", label: "Our design philosophy" },
  { href: "#nature-and-heritage", label: "Nature and heritage" },
  { href: "#international-outlook", label: "An international outlook" },
  { href: "#natural-fabrics", label: "Why natural fabrics" },
  { href: "#femininity", label: "Our approach to femininity" },
  { href: "#what-makes-us-different", label: "What makes us different" },
];

const differences: Feature[] = [
  {
    title: "Natural fabrics",
    body: "Our collections are made in linen, cotton and other natural fibres, each chosen for how it feels, how it wears and how it ages.",
    href: "/our-fabrics",
    linkLabel: "Our fabrics",
  },
  {
    title: "Prints drawn by hand",
    body: "The Iris, The Lotus, Botanical Studies and Heritage Inspiration each begin as a drawing, and are printed so they still read like one.",
    href: "/our-prints",
    linkLabel: "Our prints",
  },
  {
    title: "Small batches",
    body: "We make in small quantities, and our Limited Editions in small, numbered runs that are not remade once they are gone.",
    href: "/collections/limited-editions",
    linkLabel: "Limited Editions",
  },
  {
    title: "A wardrobe that works together",
    body: "A considered palette of cream, deep olive and soft botanical colour, so each new piece sits easily with the ones you already own.",
    href: "/collections",
    linkLabel: "The collections",
  },
  {
    title: "Made for more than a season",
    body: "We design pieces to be worn for years, and every one comes with clear care guidance to help it get there.",
    href: "/garment-care",
    linkLabel: "Garment care",
  },
  {
    title: "Honest about the work",
    body: "We tell you what we do, what we intend and what we are still working on. We would rather do that than claim more than we can show.",
    href: "/consciously-irisandme",
    linkLabel: "Consciously IrisandMe",
  },
];

const chapters: Chapter[] = [
  {
    href: "/our-philosophy",
    title: "Our Philosophy",
    body: "Considered Design, Natural Beauty and Modern Femininity — and the six principles beneath them.",
    image: "/img/hero-alt.jpg",
    imageAlt: "A woman in a floor-length deep olive gown standing in a sunlit stone hall",
    position: "72% center",
  },
  {
    href: "/craftsmanship",
    title: "Craftsmanship",
    body: "How each piece is designed, cut, sewn, finished and checked before it reaches you.",
    image: "/img/editorial-craft.jpg",
    imageAlt: "Bolts of olive silk and cream linen unrolled across a wooden atelier table",
    position: "62% center",
  },
  {
    href: "/our-fabrics",
    title: "Our Fabrics",
    body: "Linen, cotton and natural fibres: why we choose them, and how to care for each one.",
    image: "/img/fabric-flax.jpg",
    imageAlt: "A field of blue flowering flax fading into soft morning mist",
  },
  {
    href: "/our-prints",
    title: "Our Prints",
    body: "The stories behind The Iris, The Lotus, Botanical Studies and Heritage Inspiration.",
    image: "/img/l-lotus-set.jpg",
    imageAlt:
      "A woman in a cream lotus-print shirt and trousers seated on a stone terrace between potted olive trees",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="The IrisandMe World"
        title="Our Story"
        intro="IrisandMe is an Australian womenswear label. We design considered clothing in linen, cotton and natural fibres, print it with flowers drawn by hand, and make it to be worn well beyond a single season."
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
        image="/img/editorial-courtyard.jpg"
        imageAlt="A woman in a flowing deep olive dress walking through a sunlit cream stone courtyard"
        position="68% center"
      />

      {/* 01 — Who we are */}
      <Standfirst
        id="who-we-are"
        heading="display"
        index="01"
        eyebrow="The label"
        title="Who we are"
        lede="IrisandMe makes clothing for women who choose carefully and wear things often."
        aside={<PageIndex title="In this story" items={contents} />}
      >
        <p>
          We design dresses, shirts, skirts, trousers and sets in linen, cotton and other natural
          fibres, in a palette of cream and deep olive softened by the colours of our signature
          prints. Each piece is designed to sit easily with the others, so a few of them go a long
          way.
        </p>
        <p>
          Our name begins with a flower. The iris — slender, upright, quietly striking — is the
          spirit we design in: nothing forced, nothing added for its own sake. We make in small
          batches, and some pieces only once.
        </p>
      </Standfirst>

      {/* 02 — Where the brand was born */}
      <Section id="born-in-australia" tone="sand" labelledBy="born-in-australia-heading">
        <SectionHeading
          id="born-in-australia-heading"
          index="02"
          eyebrow="Where we began"
          title="Born in Australia"
          intro="IrisandMe was born in Australia — a place of strong light, long summers and wide horizons, and one that asks a lot of what you wear."
        />
        <Figure
          src="/img/col-linen.jpg"
          alt="A woman in a cream linen shirt dress walking through tall coastal grasses under a pale sky"
          ratio="16/9"
          position="65% center"
          sizes="(max-width: 1600px) 100vw, 1600px"
          caption="Washed linen in coastal light."
          className="mt-14 md:mt-20"
        />
        <Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 font-sans text-[15px] leading-[1.9] text-olive-600 md:mt-16 md:grid-cols-12 md:gap-10">
            <p className="md:col-span-5">
              Cloth has to breathe in the heat and move easily through a long day. Colour has to
              keep its calm in bright sun. A piece has to look as considered at dusk as it did in
              the morning. We design for those conditions — which is why we reach for natural
              fabrics, relaxed shapes and a palette taken from the landscape.
            </p>
            <div className="flex flex-col gap-6 md:col-span-5 md:col-start-7">
              <p>
                Australia is where we began, not where we stop. We design for women everywhere,
                and send our pieces to them — across Australia and around the world.
              </p>
              <TextLink href="/shipping-and-delivery" className="self-start text-olive-800">
                Where we deliver
              </TextLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 03 — Design philosophy */}
      <Section id="design-philosophy" tone="cream">
        <SplitFeature
          image="/img/story-studio.jpg"
          imageAlt="A calm design studio with sketches and fabric swatches on a long wooden table, and a dress form wearing a deep olive dress between tall windows"
          position="50% center"
          index="03"
          eyebrow="How we design"
          title="Our design philosophy"
          actions={<TextLink href="/our-philosophy">Read our philosophy</TextLink>}
        >
          <p>Three ideas guide everything we make. They are simple to say, and take care to keep.</p>
          <Points
            items={[
              {
                title: "Considered Design",
                body: "Every line, seam and button has a reason to be there. We design fewer pieces, more carefully, so each one earns its place.",
              },
              {
                title: "Natural Beauty",
                body: "Natural fibres, the gentle irregularity of linen, flowers drawn by hand. We look for the beauty that is already there.",
              },
              {
                title: "Modern Femininity",
                body: "Clothing that moves with a woman and makes room for her life — soft in line, clear in purpose.",
              },
            ]}
          />
        </SplitFeature>
      </Section>

      {/* 04 — Connecting nature with heritage */}
      <Section id="nature-and-heritage" tone="sand" labelledBy="nature-and-heritage-heading">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="nature-and-heritage-heading"
              index="04"
              eyebrow="What inspires us"
              title="Connecting nature with heritage"
              intro="Our prints and techniques begin in two places: the natural world, and the textile traditions that have celebrated it for centuries."
            />
            <Reveal delay={0.2}>
              <div className="mt-7 flex max-w-[52ch] flex-col gap-5 font-sans text-[15px] leading-[1.95] text-olive-600">
                <p>
                  We draw what we love to look at — the iris, the lotus, leaves, ferns and
                  wildflowers — and print those drawings on natural cloth, so they still read like
                  drawings when you wear them.
                </p>
                <p>
                  Heritage, for us, is technique as much as pattern. For our Limited Editions we
                  use hand block printing: each impression is pressed by hand from a carved wooden
                  block, so no two pieces are exactly alike.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-olive-800">
                <TextLink href="/our-prints">Discover our prints</TextLink>
                <TextLink href="/craftsmanship">Craftsmanship</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-6 lg:col-start-7">
            <Figure
              src="/img/print-botanical.jpg"
              alt="Botanical study drawings of leaves, ferns and wildflowers pinned in rows on a studio wall"
              ratio="3/4"
              position="35% center"
              sizes="(max-width: 1024px) 50vw, 25vw"
              caption="Botanical Studies begin in the sketchbook."
            />
            <Figure
              src="/img/print-heritage.jpg"
              alt="Carved wooden printing blocks resting on cream linen beside a length of deep olive cloth"
              ratio="3/4"
              position="40% center"
              sizes="(max-width: 1024px) 50vw, 25vw"
              caption="Carved blocks for printing by hand."
              className="mt-16 md:mt-28"
            />
          </div>
        </div>
      </Section>

      {/* 05 — Contemporary international outlook */}
      <Section id="international-outlook" tone="olive">
        <SplitFeature
          dark
          reverse
          image="/img/col-resort.jpg"
          imageAlt="A woman in a flowing deep olive maxi dress standing on a stone terrace above a calm sea"
          position="70% center"
          index="05"
          eyebrow="Where we look"
          title="A contemporary, international outlook"
          actions={
            <TextLink href="/collections/the-resort-collection">The Resort Collection</TextLink>
          }
        >
          <p>
            We are rooted in Australia and curious about everywhere else. We look to how women
            dress in different cities and climates, to textile traditions from many cultures, and
            to travel — the slow kind, where a few good pieces carry you a long way.
          </p>
          <p>
            What comes back is clothing that is contemporary rather than fashionable. A linen dress
            as at home on a terrace above the sea as in a city in spring. A shirt that works as
            well at a desk as at a long lunch.
          </p>
          <p>We design for women everywhere, and hope our pieces feel at home wherever you take them.</p>
        </SplitFeature>
      </Section>

      {/* 06 — Why natural fabrics */}
      <Section id="natural-fabrics" tone="cream">
        <SplitFeature
          image="/img/ugc-1.jpg"
          imageAlt="A woman in a deep olive linen dress holding a cup beside a sunlit kitchen window"
          index="06"
          eyebrow="What we make with"
          title="Why natural fabrics"
          actions={
            <>
              <TextLink href="/our-fabrics">Our fabrics</TextLink>
              <TextLink href="/garment-care">Garment care</TextLink>
            </>
          }
        >
          <p>We work in linen, cotton and other natural fibres because of how they feel, and how they live.</p>
          <p>
            They breathe in the heat and layer easily when the weather cools. They grow softer with
            washing and wear in rather than out, taking on the shape of the life around them.
            Linen creases, cotton relaxes, and both look better for it.
          </p>
          <p>
            Natural fibres ask for a little care — cool washes, drying in the shade — and repay it
            by lasting.
          </p>
        </SplitFeature>
      </Section>

      {/* 07 — Our approach to femininity */}
      <Section id="femininity" tone="sand">
        <SplitFeature
          reverse
          image="/img/j-style-linen.jpg"
          imageAlt="A woman seated on pale stone steps in an oversized cream linen shirt and deep olive trousers, a woven basket beside her"
          index="07"
          eyebrow="Who we design for"
          title="Our approach to femininity"
          actions={<TextLink href="/lookbook">View the lookbook</TextLink>}
        >
          <p>
            Modern femininity, to us, is ease rather than effort — the confidence of a woman who
            dresses for herself.
          </p>
          <p>
            So we design clothing that moves with the body instead of asking it to hold still:
            relaxed and bias-cut shapes, waists that tie or fall loose, sleeves with room to reach.
            Soft does not mean fragile. A gathered skirt can walk all day; a linen shirt can go from
            a meeting to the sea.
          </p>
          <p>
            Femininity is something a woman brings to her clothes, not something her clothes should
            impose on her.
          </p>
        </SplitFeature>
      </Section>

      {/* 08 — What makes IrisandMe different */}
      <Section id="what-makes-us-different" tone="cream" labelledBy="what-makes-us-different-heading">
        <SectionHeading
          id="what-makes-us-different-heading"
          index="08"
          eyebrow="What sets us apart"
          title="What makes IrisandMe different"
          intro="Many labels make beautiful clothes. These are the things we hold ourselves to."
        />
        <div className="mt-16 md:mt-20">
          <FeatureGrid items={differences} columns={3} />
        </div>
      </Section>

      <Section tone="paper" pad="tight">
        <PullQuote>Fewer pieces, chosen well and worn often.</PullQuote>
      </Section>

      <Section id="read-further" tone="sand" labelledBy="read-further-heading">
        <SectionHeading
          id="read-further-heading"
          eyebrow="Read further"
          title="The IrisandMe world"
          intro="Our story continues in the detail — in what we believe, how we make, and what we make with."
        />
        <div className="mt-14 md:mt-20">
          <ChapterLinks items={chapters} />
        </div>
      </Section>

      <CtaBand
        eyebrow="The collections"
        title="Discover the collections"
        body="From The Linen Edit to our Limited Editions — pieces made to be worn together, and for years."
        primary={{ label: "Explore the collections", href: "/collections" }}
        secondary={{ label: "New arrivals", href: "/shop/new-arrivals" }}
        image="/img/col-cotton.jpg"
        imageAlt="Two women in cream and deep olive cotton dresses walking along a whitewashed village lane"
      />

      <ContinueExploring current="/our-story" />
    </>
  );
}
