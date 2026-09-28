import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";
import Figure from "@/components/ui/Figure";
import CtaBand from "@/components/ui/CtaBand";
import { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";
import { SIZES } from "@/lib/sizing";
import { returns } from "@/lib/site";
import Standfirst from "@/components/brand/Standfirst";
import PageIndex from "@/components/brand/PageIndex";
import Points from "@/components/brand/Points";
import Checklist, { type ChecklistItem } from "@/components/brand/Checklist";
import PrintIndex from "@/components/brand/PrintIndex";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description:
    "How IrisandMe pieces are made — design, fabric selection, cutting, construction, finishing and printing — and the quality standards we hold every piece to.",
};

const sizeRange = `${SIZES[0]} to ${SIZES[SIZES.length - 1]}`;

const stages = [
  { href: "#design", label: "The design process" },
  { href: "#fabric-selection", label: "Fabric selection" },
  { href: "#pattern-and-cutting", label: "Pattern and cutting" },
  { href: "#construction", label: "Construction" },
  { href: "#finishing", label: "Finishing" },
  { href: "#printing", label: "Printing" },
  { href: "#artisan-techniques", label: "Artisan techniques" },
  { href: "#signature-prints", label: "Our signature prints" },
  { href: "#quality-standards", label: "Quality standards" },
];

const techniques: Feature[] = [
  {
    title: "Hand block printing",
    body: "Carved wooden blocks, inked and pressed onto the cloth by hand. We reserve it for our Limited Editions, each made in a small, numbered run.",
  },
  {
    title: "Cutting on the bias",
    body: "Cloth cut diagonally across the weave, so it drapes, skims the body and swings as you walk. It asks for patience at every stage, and rewards it.",
  },
  {
    title: "French seams",
    body: "A seam sewn twice and enclosed within itself, so no raw edge is left inside. The quiet mark of a garment finished with care.",
  },
  {
    title: "Gathers and tiers",
    body: "Fullness eased evenly into a seam, so tiered skirts and full sleeves fall softly rather than stiffly.",
  },
  {
    title: "Pleats",
    body: "Folded, pressed and stitched to give shape without stiffness — at the front of a wide trouser, or the waist of a short.",
  },
  {
    title: "Covered buttons",
    body: "Buttons wrapped in the garment’s own cloth, so the fastening becomes part of the design rather than an interruption to it.",
  },
];

const standards: ChecklistItem[] = [
  {
    title: "Cloth inspected before cutting",
    body: "Checked for flaws in the weave, for consistency of colour, and for the right weight and handle.",
  },
  {
    title: "Cut true to the grain",
    body: "So each piece hangs straight and keeps its shape through years of wear.",
  },
  {
    title: "Prints placed with care",
    body: "Motifs arranged to sit well across the body, with particular care at the centre front.",
  },
  {
    title: "Seams enclosed or cleanly finished",
    body: "No raw edges left to fray, no loose threads left behind.",
  },
  {
    title: "Stress points reinforced",
    body: "At pocket openings, plackets, straps and fastenings — wherever a piece is pulled every day.",
  },
  {
    title: "Buttons sewn to last",
    body: "Secure, evenly spaced and matched to cleanly finished buttonholes.",
  },
  {
    title: "Hems level and even",
    body: "Checked so they sit straight and fall evenly, whether cut straight, gathered or on the bias.",
  },
  {
    title: "Measured against specification",
    body: "Each size checked against its intended measurements, so the size you choose fits as it should.",
  },
  {
    title: "Pressed and folded with care",
    body: "Steamed, pressed and folded so it is ready to wear the moment it arrives.",
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="How our pieces are made"
        title="Craftsmanship"
        intro="Every IrisandMe piece passes through many hands before it reaches yours. This is how it is made — from the first sketch to the final check — and the standards we hold it to along the way."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Craftsmanship" },
        ]}
        image="/img/editorial-craft.jpg"
        imageAlt="Hands unrolling cream linen beside a bolt of olive silk on a wooden atelier table"
        position="62% center"
      />

      <Standfirst
        id="the-making"
        title="The making"
        lede="Craft is not a flourish added at the end. It is the sum of many small decisions — which cloth, which seam, which button — each made carefully, and in the right order."
        aside={<PageIndex title="The stages" items={stages} />}
      >
        <p>
          The close-ups on this page follow a piece from the design table to the final check:
          the cloth, the cut, the seam, the button and the print.
        </p>
        <p>
          None of it is hurried. Slowness is not the goal in itself — but good clothing takes the
          time it takes, and we would rather give it that time.
        </p>
      </Standfirst>

      {/* 01 */}
      <Section id="design" tone="cream">
        <SplitFeature
          image="/img/craft-design.jpg"
          imageAlt="Overhead view of a designer’s table with dress sketches, olive and cream fabric swatches, paper pattern pieces and brass scissors"
          ratio="4/3"
          index="01"
          eyebrow="Sketch, swatch, sample"
          title="The design process"
        >
          <p>
            Each piece begins with a drawing and a length of cloth, side by side. We design with
            the fabric in hand, because the way a linen falls or a voile moves decides as much
            about a shape as any sketch.
          </p>
          <p>
            We design as a wardrobe rather than one piece at a time, so a new shirt is considered
            alongside the skirts, trousers and dresses it will be worn with.
          </p>
          <p>
            Samples are fitted, adjusted and fitted again. A design is only approved once we have
            seen how it moves, how it washes and how it wears.
          </p>
        </SplitFeature>
      </Section>

      {/* 02 */}
      <Section id="fabric-selection" tone="sand">
        <SplitFeature
          reverse
          image="/img/craft-linen.jpg"
          imageAlt="Close view of cream linen, its weave showing the small slubs and irregularities of the flax"
          caption="Washed linen, close to."
          index="02"
          eyebrow="Chosen by hand"
          title="Fabric selection"
          actions={<TextLink href="/our-fabrics">Our fabrics</TextLink>}
        >
          <p>
            We choose cloth by hand. Weight, drape, handle and the way a fabric takes colour are
            judged in person, against the piece it is meant for.
          </p>
          <p>
            Almost everything we make is linen or cotton, with a small number of other natural
            fibres where they are the right choice — sand-washed silk for fluid drape, undyed
            alpaca for warmth without weight.
          </p>
          <p>
            Each fabric is chosen for its purpose: washed linen for softness from the first wear, a
            heavier linen twill for trousers that hold their line, fine cotton voile and lawn for
            prints that need to float.
          </p>
        </SplitFeature>
      </Section>

      {/* 03 */}
      <Section id="pattern-and-cutting" tone="cream">
        <SplitFeature
          image="/img/craft-cutting.jpg"
          imageAlt="Hands cutting deep olive linen with tailor’s shears along a paper pattern on a wooden table"
          ratio="4/3"
          index="03"
          eyebrow="Pattern and grain"
          title="Pattern and cutting"
          actions={<TextLink href="/size-and-fit">Size and fit</TextLink>}
        >
          <p>
            Patterns are drafted and refined until the proportions are right, then graded across
            our sizes, {sizeRange}, so the balance of a piece holds in every one.
          </p>
          <p>
            Cutting follows the grain of the cloth, so a piece hangs straight and keeps its shape.
            Some pieces are cut on the bias — diagonally across the weave — so they skim the body
            and swing as you walk.
          </p>
          <p>
            We lay out pattern pieces to use as much of each length of cloth as we can, and place
            prints with care, so a motif sits well across the body.
          </p>
        </SplitFeature>
      </Section>

      {/* 04 */}
      <Section id="construction" tone="sand">
        <SplitFeature
          reverse
          image="/img/craft-stitching.jpg"
          imageAlt="Close view of a fine olive stitched seam running along cream linen"
          caption="A seam, finished to be seen."
          index="04"
          eyebrow="Seam by seam"
          title="Construction"
        >
          <p>Construction is where a garment earns its longevity. Seam by seam, we ask for work that will hold.</p>
          <Points
            items={[
              {
                title: "Clean seams",
                body: "Where the cloth allows, seams are enclosed — French seams on fine linens and voiles — so the inside of a piece is as considered as the outside.",
              },
              {
                title: "Strength where it is needed",
                body: "Pocket openings, plackets and straps are reinforced, because that is where a garment is pulled and pushed every day.",
              },
              {
                title: "Linings where they matter",
                body: "Where a fine cloth needs it, we add a cotton lining, so a floating dress stays light and easy to wear.",
              },
            ]}
          />
        </SplitFeature>
      </Section>

      {/* 05 */}
      <Section id="finishing" tone="cream">
        <SplitFeature
          image="/img/craft-finishing.jpg"
          imageAlt="A seamstress steaming a cream linen dress on a dress form in a softly lit workroom"
          position="38% center"
          index="05"
          eyebrow="The last hands"
          title="Finishing"
        >
          <p>Finishing is the part you notice last, and feel first.</p>
          <Points
            items={[
              {
                title: "Pressed by hand",
                body: "Each piece is steamed and pressed so its seams lie flat and the cloth settles into its intended line.",
              },
              {
                title: "Buttons and fastenings",
                body: "Natural corozo buttons, cut from the nut of the tagua palm, and buttons covered in the garment’s own cloth.",
              },
              {
                title: "Hems and edges",
                body: "Hems finished to sit level and fall evenly, whether a skirt is cut straight, gathered or on the bias.",
              },
            ]}
          />
        </SplitFeature>
      </Section>

      {/* 06 */}
      <Section id="printing" tone="olive">
        <SplitFeature
          dark
          reverse
          image="/img/craft-print.jpg"
          imageAlt="An artisan’s hands pressing a carved wooden block onto cream cotton, leaving an olive botanical print"
          ratio="4/3"
          index="06"
          eyebrow="From drawing to cloth"
          title="Printing"
          actions={<TextLink href="/our-prints">Discover our prints</TextLink>}
        >
          <p>
            Every IrisandMe print begins as a drawing. It is refined, arranged into a repeat with
            room for the cloth to breathe, and printed in a small palette so it sits easily beside
            our plain pieces.
          </p>
          <p>
            For our Limited Editions, printing is done by hand. A carved wooden block is inked and
            pressed onto the cloth, one impression at a time. The pressure of the hand varies a
            little with each one, so every piece carries its own quiet variations — no two are
            exactly alike.
          </p>
        </SplitFeature>
      </Section>

      {/* 07 */}
      <Section id="artisan-techniques" tone="sand" labelledBy="artisan-techniques-heading">
        <SectionHeading
          id="artisan-techniques-heading"
          index="07"
          eyebrow="Techniques we value"
          title="Artisan techniques"
          intro="Some things cannot be hurried. These are the techniques we return to, because they make clothing better to wear and more beautiful to look at."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:gap-7">
          <Figure
            src="/img/craft-buttons.jpg"
            alt="Natural and pearl-toned buttons on the placket of a cream linen shirt, beside folded olive linen"
            ratio="4/3"
            sizes="(max-width: 640px) 100vw, 50vw"
            caption="Natural buttons on washed linen."
          />
          <Figure
            src="/img/craft-detail.jpg"
            alt="Close view of a cream garment showing fine tucks, a row of small buttons and a gathered tier"
            ratio="4/3"
            sizes="(max-width: 640px) 100vw, 50vw"
            caption="Tucks, tiers and small buttons."
            className="sm:mt-16"
          />
        </div>
        <div className="mt-16 md:mt-24">
          <FeatureGrid items={techniques} columns={3} />
        </div>
      </Section>

      {/* 08 */}
      <Section id="signature-prints" tone="cream" labelledBy="signature-prints-heading">
        <SectionHeading
          id="signature-prints-heading"
          index="08"
          eyebrow="Drawn by hand"
          title="Our signature prints"
          intro="Four prints, each with its own story. Every one begins as a drawing, and every one is printed on cotton."
          action={<TextLink href="/our-prints" className="text-olive-800">The stories behind our prints</TextLink>}
        />
        <div className="mt-14 md:mt-20">
          <PrintIndex base="/our-prints" />
        </div>
      </Section>

      {/* 09 */}
      <Section id="quality-standards" tone="paper" labelledBy="quality-standards-heading">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="quality-standards-heading"
              index="09"
              eyebrow="Before it reaches you"
              title="Quality standards"
              intro="These are the standards we hold every piece to. If a piece falls short of them, it isn’t ready."
            />
            <Figure
              src="/img/craft-quality.jpg"
              alt="Hands measuring the seam of a deep olive linen shirt with a tape measure"
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="mt-12"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Checklist items={standards} columns={1} />
            <Reveal>
              <div className="mt-10 border-t hairline pt-8 font-sans text-[14.5px] leading-[1.9] text-olive-600">
                <p>
                  If a piece ever reaches you with a fault, please let us know within{" "}
                  {returns.faultyReportDays} days of delivery and we will put it right.
                </p>
                <TextLink href="/returns-and-exchanges" className="mt-5 text-olive-800">
                  Returns and exchanges
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Made to last"
        title="Pieces made to be worn for years"
        body="Explore the collection, and the care guidance that keeps each piece at its best."
        primary={{ label: "Shop all", href: "/shop/all" }}
        secondary={{ label: "Garment care", href: "/garment-care" }}
        image="/img/journal-1.jpg"
        imageAlt="Hands working a length of cream fabric beside spools of olive thread"
      />

      <ContinueExploring current="/craftsmanship" />
    </>
  );
}
