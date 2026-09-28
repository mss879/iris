import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";
import Figure from "@/components/ui/Figure";
import CtaBand from "@/components/ui/CtaBand";
import { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/anim/Reveal";
import {
  collections,
  getCollection,
  getProduct,
  prints,
  products,
  type PrintKey,
  type Product,
} from "@/lib/products";
import Standfirst from "@/components/brand/Standfirst";
import PrintChapter, { type PrintPart } from "./_components/PrintChapter";
import PrintIndex, { swatchAlt } from "@/components/brand/PrintIndex";

export const metadata: Metadata = {
  title: "Our Prints",
  description:
    "The stories behind The Iris, The Lotus, Botanical Studies and Heritage Inspiration — IrisandMe’s signature prints, drawn by hand and printed on natural cloth.",
};

/**
 * The story of each print. `worn` names the piece whose lifestyle photograph
 * shows the print being worn; its name becomes the caption.
 */
const stories: Record<PrintKey, { worn: string; wornAlt: string; parts: PrintPart[] }> = {
  "the-iris": {
    worn: "iris-print-maxi-dress",
    wornAlt: "A woman in a cream iris-print maxi dress walking through a grassy summer meadow",
    parts: [
      {
        title: "The inspiration",
        body: (
          <p>
            The iris is the flower at the heart of our name. Upright and slender, with petals that
            open without hurry, it has the poise we hope our clothes carry. We wanted a print with
            the same feeling: long stems, open flowers, and space for the cloth to breathe.
          </p>
        ),
      },
      {
        title: "Drawn and printed",
        body: (
          <p>
            Each iris was drawn by hand before being arranged into the print, keeping the fine
            line and soft washes of colour of the original drawing. It is printed on cotton voile,
            light enough to let the colour sit gently on the cloth.
          </p>
        ),
      },
      {
        title: "The colours",
        body: (
          <p>
            Soft lavender-grey petals on sage-green stems, on a cream ground — the gentlest
            departure from our palette of cream and olive.
          </p>
        ),
      },
    ],
  },
  "the-lotus": {
    worn: "lotus-midi-dress",
    wornAlt:
      "A woman in a cream lotus-print midi dress with puff sleeves beside a stone fountain of lily pads",
    parts: [
      {
        title: "The inspiration",
        body: (
          <p>
            A flower that rises from still water, quietly beautiful, season after season. The
            lotus connects two things we care about deeply: the natural world, and the heritage of
            pattern-making that has celebrated it for centuries.
          </p>
        ),
      },
      {
        title: "Drawn and printed",
        body: (
          <p>
            Flowers, buds and leaves were drawn by hand, then printed on soft cotton voile. We
            print it so it reads softly, like a drawing, with the gentle edges of a hand-printed
            mark.
          </p>
        ),
      },
      {
        title: "The colours",
        body: (
          <p>
            Deep olive on cream — our signature pairing, and the calmest way we know to wear a
            print.
          </p>
        ),
      },
    ],
  },
  "botanical-studies": {
    worn: "botanical-print-blouse",
    wornAlt:
      "A woman reading in an armchair, wearing a cream botanical-print blouse and deep olive trousers",
    parts: [
      {
        title: "The inspiration",
        body: (
          <p>
            Botanical Studies comes from the habit of drawing what we find — a leaf, a frond of
            fern, a sprig of wildflowers — to understand how it is made. It belongs to a long
            tradition of botanical drawing, where looking closely is the whole point.
          </p>
        ),
      },
      {
        title: "Drawn and printed",
        body: (
          <p>
            The studies are taken from our sketchbooks and printed as they were drawn, fine line
            for fine line, on smooth cotton lawn.
          </p>
        ),
      },
      {
        title: "The colours",
        body: <p>Olive line work on a cream ground, as quiet as a page of drawings.</p>,
      },
    ],
  },
  "heritage-inspiration": {
    worn: "heritage-block-print-jacket",
    wornAlt:
      "A close view of a woman wearing a cream kimono-shaped jacket hand block printed with dense olive florals",
    parts: [
      {
        title: "The inspiration",
        body: (
          <p>
            Heritage Inspiration honours traditional textile craft: the dense florals, borders and
            motifs that have been carved, printed and handed down for generations. We reinterpret
            them for the way women dress now.
          </p>
        ),
      },
      {
        title: "Drawn and printed",
        body: (
          <p>
            These pieces are printed by hand with carved wooden blocks. Each impression is pressed
            by hand, so the pattern carries gentle variations and no two pieces are exactly alike.
            They are made in small, numbered editions.
          </p>
        ),
      },
      {
        title: "The colours",
        body: (
          <p>
            Cream and deep olive, with the soft irregularity that only comes from a block pressed
            by hand.
          </p>
        ),
      },
    ],
  },
};

/** Collections that carry at least one of the given pieces. */
const collectionLinks = (pieces: Product[]) =>
  collections
    .filter((c) => pieces.some((p) => p.collections.includes(c.slug)))
    .map((c) => ({ label: c.name, href: `/collections/${c.slug}` }));

const printedPieces = products.filter((p) => p.print);
const lotus = getCollection("the-lotus-collection");

const printSteps: Feature[] = [
  {
    title: "Drawing",
    body: "Every print begins on paper, drawn by hand from flowers, leaves and the textile traditions we admire.",
  },
  {
    title: "Arrangement",
    body: "The drawings are arranged into a repeat, spaced so the cloth can breathe and the pattern never crowds the body.",
  },
  {
    title: "Colour",
    body: "We keep to a small palette — deep olive, sage and lavender-grey on cream — so prints sit easily beside our plain pieces.",
  },
  {
    title: "Printing",
    body: "Printed on natural cotton — and, for our Limited Editions, by hand with carved wooden blocks.",
  },
];

export default function OurPrintsPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Drawn by hand"
        title="Our Prints"
        intro="Four signature prints, each with its own story. All begin as drawings of the natural world and the textile traditions we admire, and all are printed on natural cloth."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Our Prints" },
        ]}
        image="/img/l-lotus-set.jpg"
        imageAlt="A woman in a cream lotus-print shirt and matching trousers seated on a stone terrace between potted olive trees"
      />

      <Standfirst
        id="every-print-begins-as-a-drawing"
        title="Every print begins as a drawing"
        lede="Before it is a print, it is a drawing: a flower studied until its shape is understood, a leaf traced with a fine pen. We keep that first line alive all the way to the cloth."
        after={<PrintIndex navLabel="Our four prints" />}
      >
        <p>
          We print in a small palette — deep olive, sage and lavender-grey on cream — so our prints
          sit softly beside our plain pieces and read like drawings rather than decoration.
        </p>
        <p>
          Each print has its own story below: where it came from, how it is drawn and printed, its
          colours, and the pieces you will find it on.
        </p>
      </Standfirst>

      {prints.map((print, i) => {
        const story = stories[print.slug];
        const pieces = products.filter((p) => p.print === print.slug);
        const worn = getProduct(story.worn);
        return (
          <PrintChapter
            key={print.slug}
            id={print.slug}
            index={String(i + 1).padStart(2, "0")}
            name={print.name}
            summary={print.summary}
            swatch={print.image}
            swatchAlt={swatchAlt[print.slug]}
            photo={worn?.hover ?? worn?.image ?? print.image}
            photoAlt={story.wornAlt}
            photoCaption={worn?.name}
            parts={story.parts}
            pieces={pieces}
            links={collectionLinks(pieces)}
            reverse={i % 2 === 1}
            tone={i % 2 === 0 ? "cream" : "sand"}
          />
        );
      })}

      <Section id="from-drawing-to-cloth" tone="olive" labelledBy="from-drawing-to-cloth-heading">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              id="from-drawing-to-cloth-heading"
              eyebrow="How our prints are made"
              title="From drawing to cloth"
              intro="Four steps, taken slowly. The aim at every one is to keep the feeling of the original drawing."
            />
            <Figure
              src="/img/craft-print.jpg"
              alt="An artisan’s hands pressing a carved wooden block onto cream cotton, leaving an olive botanical print"
              ratio="4/3"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="mt-12"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <FeatureGrid items={printSteps} columns={2} dark />
          </div>
        </div>
      </Section>

      <Section id="caring-for-prints" tone="cream" pad="tight" labelledBy="caring-for-prints-heading">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="caring-for-prints-heading"
              size="small"
              eyebrow="Care"
              title="Caring for printed pieces"
            />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <div className="flex max-w-[54ch] flex-col gap-5 font-sans text-[15px] leading-[1.9] text-olive-600">
              <p>
                Wash cool on a gentle cycle, inside out, with a mild detergent. Line dry in the
                shade and warm iron on the reverse to protect the print.
              </p>
              <p>
                Printed cotton rewards gentle care: the colour stays clear, and the cloth grows
                softer with every wash.
              </p>
              <TextLink href="/garment-care" className="mt-1 self-start text-olive-800">
                Garment care
              </TextLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="printed-pieces" tone="sand" labelledBy="printed-pieces-heading">
        <SectionHeading
          id="printed-pieces-heading"
          eyebrow="Shop the prints"
          title="Every printed piece"
          intro="All of our current printed pieces, in one place."
          action={
            <TextLink href="/shop/all" className="text-olive-800">
              Shop all
            </TextLink>
          }
        />
        <div className="mt-14 md:mt-20">
          <ProductGrid products={printedPieces} columns={3} />
        </div>
      </Section>

      <CtaBand
        eyebrow={lotus?.name ?? "The Lotus Collection"}
        title={lotus?.tagline.replace(/\.$/, "") ?? "Our signature lotus, drawn by hand"}
        body="A collection built around The Lotus — flowers, buds and leaves printed on soft cotton, on shapes you can wear for years."
        primary={{ label: "Explore The Lotus Collection", href: "/collections/the-lotus-collection" }}
        secondary={{ label: "Limited Editions", href: "/collections/limited-editions" }}
        image="/img/col-lotus.jpg"
        imageAlt="A woman in a cream lotus-print dress standing beside a pond of pale lotus flowers"
      />

      <ContinueExploring current="/our-prints" />
    </>
  );
}
