import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";
import DataTable from "@/components/ui/DataTable";
import CtaBand from "@/components/ui/CtaBand";
import ButtonLink, { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";
import { products, type Product } from "@/lib/products";
import Standfirst from "@/components/brand/Standfirst";
import PageIndex from "@/components/brand/PageIndex";
import PieceList from "@/components/brand/PieceList";
import MaterialChapter from "./_components/MaterialChapter";

export const metadata: Metadata = {
  title: "Our Fabrics",
  description:
    "Linen, cotton and natural fibres: why IrisandMe chooses each one, how it feels, how it wears and how to care for it — and our work towards recycled materials.",
};

const contents = [
  { href: "#linen", label: "Linen" },
  { href: "#cotton", label: "Cotton" },
  { href: "#natural-fibres", label: "Natural fibres" },
  { href: "#recycled-materials", label: "Recycled materials", note: "In development" },
  { href: "#every-fabric", label: "Every fabric, at a glance" },
  { href: "#care", label: "Caring for natural fabrics" },
];

/* Pieces in natural fibres other than linen and cotton — currently silk and alpaca. */
const otherNaturalFibres = products.filter(
  (p) =>
    !/linen|cotton/i.test(p.composition) &&
    /silk|alpaca|wool|merino|cashmere|hemp/i.test(p.composition),
);

/* The fabric table is built from the product data so it never drifts from the shop. */
const fibreOrder = ["linen", "cotton", "silk", "alpaca"];
const fibreRank = (composition: string) => {
  const i = fibreOrder.findIndex((f) => composition.toLowerCase().includes(f));
  return i === -1 ? fibreOrder.length : i;
};

const byFabric = new Map<string, Product[]>();
for (const p of products) {
  const list = byFabric.get(p.fabric);
  if (list) list.push(p);
  else byFabric.set(p.fabric, [p]);
}

const fabricRows = Array.from(byFabric.entries())
  .sort(([, a], [, b]) => fibreRank(a[0].composition) - fibreRank(b[0].composition))
  .map(([fabric, pieces]) => [
    fabric,
    pieces[0].composition,
    <Fragment key={fabric}>
      {pieces.map((p, i) => (
        <Fragment key={p.slug}>
          {i > 0 ? ", " : null}
          <Link
            href={`/products/${p.slug}`}
            className="underline decoration-olive-700/30 underline-offset-[3px] transition-colors duration-500 hover:decoration-olive-700"
          >
            {p.name}
          </Link>
        </Fragment>
      ))}
    </Fragment>,
  ]);

const careHabits: Feature[] = [
  {
    title: "Wash less, and cool",
    body: "Natural fibres rarely need a hot wash. Air a piece between wears, and wash it cool when it needs it — colour and fibre both last longer.",
  },
  {
    title: "Dry in the shade",
    body: "Sunlight fades colour over time. Line dry out of direct sun, and leave the tumble dryer for other things.",
  },
  {
    title: "Steam rather than press",
    body: "A little steam releases creases gently. If you iron, use a warm iron while the cloth is slightly damp, on the reverse for prints.",
  },
  {
    title: "Store with room",
    body: "Hang woven pieces with space around them so they can breathe, and fold knits so they keep their shape.",
  },
];

export default function OurFabricsPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Linen, cotton & natural fibres"
        title="Our Fabrics"
        intro="We choose every fabric for how it feels, how it wears and how it ages. Here is what we work with, why we choose it, and how to care for each one so it lasts."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Our Fabrics" },
        ]}
        image="/img/fabric-flax.jpg"
        imageAlt="A field of blue flowering flax, the plant linen is spun from, fading into soft morning mist"
      />

      <Standfirst
        id="the-cloth-comes-first"
        title="The cloth comes first"
        lede="The fabric decides how a piece moves, breathes and lives. So we choose it first, and carefully, before a sketch becomes a garment."
        aside={<PageIndex title="The fabrics" items={contents} />}
      >
        <p>
          We work almost entirely in linen and cotton, with a small number of other natural fibres
          where they are the right choice for a piece. Each one is here for a reason.
        </p>
        <p>
          For every fabric below: why we choose it, how it feels, how it wears, and how to look
          after it. Full care instructions are on every product page, too.
        </p>
      </Standfirst>

      <MaterialChapter
        id="linen"
        index="01"
        eyebrow="The fabric we return to most"
        name="Linen"
        lede="Spun from the fibres of the flax plant, linen is one of the oldest cloths there is — and still, to us, one of the best."
        image="/img/ugc-2.jpg"
        imageAlt="A woman in a cream linen shirt and trousers sitting barefoot on grey stone steps"
        caption="Washed linen, worn in."
        parts={[
          {
            title: "Why we choose it",
            body: (
              <p>
                Linen breathes, it is strong, and it carries the small irregularities of the flax
                it is spun from — a texture no synthetic can imitate. We use washed linen for
                softness from the first wear, and a heavier linen twill where a piece needs to
                hold its line.
              </p>
            ),
          },
          {
            title: "How it feels",
            body: (
              <p>
                Cool and dry against the skin, with a gentle, natural texture. Linen draws
                moisture away from the body and dries quickly, which is why it feels so easy in
                the heat.
              </p>
            ),
          },
          {
            title: "How it wears",
            body: (
              <p>
                Linen creases softly — we think of it as part of its character. It grows softer and
                more supple with every wash, and deeper colours mellow gently over time. Looked
                after well, it lasts for years.
              </p>
            ),
          },
          {
            title: "How to care for it",
            body: (
              <p>
                Cool machine wash on a gentle cycle, or hand wash. Line dry in the shade, then
                steam, or warm iron while slightly damp. Avoid the tumble dryer, which can shrink
                and stiffen the fibres.
              </p>
            ),
          },
        ]}
        footer={
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href="/collections/the-linen-edit">Shop The Linen Edit</TextLink>
            <TextLink href="/garment-care">Linen care</TextLink>
          </div>
        }
      />

      <MaterialChapter
        id="cotton"
        index="02"
        tone="sand"
        reverse
        eyebrow="Soft, breathable, endlessly wearable"
        name="Cotton"
        lede="Cotton is honest and generous: soft against the skin, easy to care for, and the cloth our signature prints are printed on."
        image="/img/fabric-cotton.jpg"
        imageAlt="Cream cotton cloth on a pale wooden table beside a stem of open cotton bolls"
        position="60% center"
        parts={[
          {
            title: "Why we choose it",
            body: (
              <p>
                Cotton is comfortable from morning until night, and it takes a print beautifully —
                which is why The Iris, The Lotus, Botanical Studies and Heritage Inspiration are
                all printed on it. We use it in several weaves, each chosen for the piece it
                becomes.
              </p>
            ),
          },
          {
            title: "How it feels",
            body: (
              <p>
                That depends on the weave. Voile is fine and airy and floats away from the body.
                Lawn is smooth and light. Poplin is crisp and cool. Jersey is soft, with a little
                natural give.
              </p>
            ),
          },
          {
            title: "How it wears",
            body: (
              <p>
                Cotton softens with every wash and relaxes into the shape of the woman wearing it.
                Printed cotton keeps its colour best when it is washed cool and inside out, and
                dried out of direct sun.
              </p>
            ),
          },
          {
            title: "How to care for it",
            body: (
              <p>
                Cool machine wash on a gentle cycle with like colours. Line dry in the shade and
                warm iron on the reverse. For printed pieces, turn them inside out and use a mild
                detergent to protect the print.
              </p>
            ),
          },
        ]}
        footer={
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href="/collections/we-love-cotton">Shop We Love Cotton</TextLink>
            <TextLink href="/collections/the-lotus-collection">The Lotus Collection</TextLink>
            <TextLink href="/garment-care">Cotton care</TextLink>
          </div>
        }
      />

      <MaterialChapter
        id="natural-fibres"
        index="03"
        eyebrow="Silk and alpaca"
        name="Natural fibres"
        lede="Beyond linen and cotton, we work with a small number of other natural fibres — only where they are the best choice for a piece."
        image="/img/fabric-natural.jpg"
        imageAlt="Balls of undyed and olive yarn resting on a fold of cream silk"
        parts={[
          {
            title: "Why we choose them",
            body: (
              <p>
                Sand-washed silk for its fluid drape and soft, matte handle. Undyed alpaca for
                warmth without weight, knitted in the natural colour of the fibre so no dye is
                needed at all.
              </p>
            ),
          },
          {
            title: "How they feel",
            body: (
              <p>
                Silk is cool and fluid; cut on the bias, it skims rather than clings. Alpaca is
                soft, light and quietly textured — warm on a cool evening without ever feeling
                heavy.
              </p>
            ),
          },
          {
            title: "How they wear",
            body: (
              <p>
                Silk grows gently softer over time; keep perfume and deodorant away from it, as both
                can mark the fibre. Like all natural knits, alpaca may pill a little where it rubs —
                a fabric comb lifts it away.
              </p>
            ),
          },
          {
            title: "How to care for them",
            body: (
              <>
                <p>
                  Silk: hand wash cold with a gentle silk detergent, or dry clean. Dry flat in the
                  shade and cool iron on the reverse.
                </p>
                <p>
                  Alpaca: hand wash cold with a wool detergent and dry flat, away from heat and
                  sunlight. Fold — never hang — to store.
                </p>
              </>
            ),
          },
        ]}
        footer={
          otherNaturalFibres.length > 0 ? (
            <>
              <p className="eyebrow text-[10px] text-olive-500">Where to find them</p>
              <PieceList products={otherNaturalFibres} className="mt-5 max-w-[34rem]" />
            </>
          ) : undefined
        }
      />

      <MaterialChapter
        id="recycled-materials"
        index="04"
        tone="olive"
        reverse
        eyebrow="A future direction"
        name="Recycled materials"
        status="In development"
        lede="We don’t yet make pieces from recycled materials. It is something we are working towards, and we want to be clear about where we are."
        image="/img/fabric-recycled.jpg"
        imageAlt="Bundles of cream and olive linen offcuts tied with twine and stacked on a wooden table by a window"
        parts={[
          {
            title: "Why we’re exploring it",
            body: (
              <p>
                The most responsible fibre is often one that already exists. Recycled natural
                fibres, surplus cloth left over at mills and the offcuts from our own cutting could
                all extend what we make without asking for new resources.
              </p>
            ),
          },
          {
            title: "How it should feel",
            body: (
              <p>
                No different in quality from anything else we make. Recycled fibres can be shorter
                and a little less smooth, so we will only use them where the finished cloth meets
                the same standard for handle and softness.
              </p>
            ),
          },
          {
            title: "How it should wear",
            body: (
              <p>
                As long as the rest of our pieces. We will test recycled cloth for strength and
                wear before it goes into a collection — a recycled piece that wears out quickly is
                not a responsible one.
              </p>
            ),
          },
          {
            title: "How to care for it",
            body: (
              <p>
                Care will follow the fibre: recycled cotton is looked after like cotton, recycled
                linen like linen. When we introduce a recycled material, its exact composition and
                care will be on every product page.
              </p>
            ),
          },
        ]}
        footer={
          <TextLink href="/consciously-irisandme#recycled-materials">
            Read more in Consciously IrisandMe
          </TextLink>
        }
      />

      <Section id="every-fabric" tone="sand" labelledBy="every-fabric-heading">
        <SectionHeading
          id="every-fabric-heading"
          eyebrow="At a glance"
          title="Every fabric in the collection"
          intro="Where each of our current fabrics appears, so you can find the feel you like."
        />
        <Reveal className="mt-14 md:mt-20">
          <DataTable
            caption="Fabrics in the current collection"
            hideCaption
            head={["Fabric", "Composition", "Pieces"]}
            rows={fabricRows}
            minWidth={640}
            note="The composition of every piece is listed on its product page, with full care instructions."
          />
        </Reveal>
      </Section>

      <Section id="care" tone="cream" labelledBy="care-heading">
        <SectionHeading
          id="care-heading"
          eyebrow="Care"
          title="Four habits that help natural fabrics last"
          intro="Natural fibres reward a little attention. These habits apply to almost everything we make."
        />
        <div className="mt-14 md:mt-20">
          <FeatureGrid items={careHabits} columns={4} />
        </div>
        <Reveal className="mt-14">
          <ButtonLink href="/garment-care">Read the garment care guide</ButtonLink>
        </Reveal>
      </Section>

      <CtaBand
        tone="sand"
        eyebrow="Find your fabric"
        title="Begin with the cloth"
        body="Every collection starts with a fabric. Explore the pieces in the one that suits you."
        primary={{ label: "The Linen Edit", href: "/collections/the-linen-edit" }}
        secondary={{ label: "We Love Cotton", href: "/collections/we-love-cotton" }}
      />

      <ContinueExploring current="/our-fabrics" />
    </>
  );
}
