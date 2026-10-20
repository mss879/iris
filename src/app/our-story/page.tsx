import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Standfirst, { Subhead } from "@/components/brand/Standfirst";
import { returns } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Who IrisandMe is — an Australian label of considered womenswear in linen, cotton and natural fibres — and the craftsmanship behind every piece, from the first sketch to the final check.",
};

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

      <Standfirst
        id="who-we-are"
        heading="display"
        eyebrow="The label"
        title="Who we are"
        lede="IrisandMe makes clothing for women who choose carefully and wear things often."
        image={{
          src: "/img/ugc-1.jpg",
          alt: "A woman in a deep olive linen dress holding a cup beside a sunlit kitchen window",
        }}
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
        <p>
          IrisandMe was born in Australia, a place of strong light, long summers and wide horizons,
          and one that asks a lot of what you wear. Cloth has to breathe in the heat, and colour
          has to keep its calm in bright sun.
        </p>
        <p>
          Three ideas guide everything we make: Considered Design, Natural Beauty and Modern
          Femininity. Every line, seam and button has a reason to be there, and we design fewer
          pieces, more carefully, so each one earns its place.
        </p>
        <p>
          Our prints and techniques begin in two places — the natural world, and the textile
          traditions that have celebrated it for centuries. We draw what we love to look at, from
          the iris and the lotus to leaves and wildflowers, and print those drawings so they still
          read like drawings when you wear them.
        </p>
        <p>
          We are rooted in Australia and curious about everywhere else: how women dress in
          different cities and climates, and the slow kind of travel where a few good pieces carry
          you a long way. What comes back is clothing that is contemporary rather than
          fashionable, and at home wherever you take it.
        </p>
        <p>
          We choose natural fabrics for how they feel and how they live. They breathe in the heat,
          layer easily when the weather cools, and grow softer with every wash — wearing in rather
          than out.
        </p>
        <p>
          Modern femininity, to us, is ease rather than effort: the confidence of a woman who
          dresses for herself. So we design clothing that moves with the body instead of asking it
          to hold still — soft in line, clear in purpose.
        </p>
        <p>
          What makes IrisandMe different is what we hold ourselves to: natural fabrics, prints
          drawn by hand, small batches, and pieces made to work together and to last for more than
          a season. We tell you what we do, and what we are still working on, rather than claim
          more than we can show.
        </p>
      </Standfirst>

      <Standfirst
        id="craftsmanship"
        tone="sand"
        reverse
        heading="display"
        eyebrow="How our pieces are made"
        title="Craftsmanship"
        lede="Every IrisandMe piece passes through many hands before it reaches yours. This is how it is made, from the first sketch to the final check."
        image={{
          src: "/img/editorial-craft.jpg",
          alt: "Bolts of olive silk and cream linen unrolled across a wooden atelier table",
          position: "62% center",
        }}
      >
        <Subhead id="design-process">Design process</Subhead>
        <p>
          Each piece begins with a drawing and a length of cloth, side by side. We design with the
          fabric in hand, because the way a linen falls or a voile moves decides as much about a
          shape as any sketch. We design as a wardrobe, too, so a new shirt is considered
          alongside the skirts, trousers and dresses it will be worn with. Samples are fitted,
          adjusted and fitted again, and a design is only approved once we have seen how it moves,
          washes and wears.
        </p>
        <p>
          Our prints are selected with the same care. Each one begins as a drawing — a flower, a
          leaf, a motif from a heritage textile — and we choose only those that keep the life of
          the original line once they are on cloth. A chosen print is arranged into a repeat with
          room for the cloth to breathe, kept to a small palette of deep olive, sage and
          lavender-grey on cream so it sits easily beside our plain pieces, and printed on a
          cotton chosen to carry it. There are four today: The Iris, The Lotus, Botanical Studies
          and Heritage Inspiration.
        </p>

        <Subhead id="fabric-selection">Fabric selection</Subhead>
        <p>
          We choose cloth by hand. Weight, drape, handle and the way a fabric takes colour are
          judged in person, against the piece it is meant for.
        </p>
        <p>
          Almost everything we make is linen or cotton, with a small number of other natural
          fibres where they are the right choice — sand-washed silk for fluid drape, undyed alpaca
          for warmth without weight. Each fabric is chosen for its purpose: washed linen for
          softness from the first wear, a heavier linen twill for trousers that hold their line,
          fine cotton voile and lawn for prints that need to float.
        </p>

        <Subhead id="construction">Construction</Subhead>
        <p>
          Construction is where a garment earns its longevity. Where the cloth allows, seams are
          enclosed — French seams on fine linens and voiles — so the inside of a piece is as
          considered as the outside. Pocket openings, plackets and straps are reinforced, because
          that is where a garment is pulled every day, and fine cloths are lined in cotton where
          they need it.
        </p>

        <Subhead id="finishing">Finishing</Subhead>
        <p>
          Finishing is the part you notice last, and feel first. Each piece is steamed and pressed
          so its seams lie flat, hems are finished to sit level and fall evenly, and fastenings
          are chosen with care: natural corozo buttons, cut from the nut of the tagua palm, or
          buttons covered in the garment’s own cloth.
        </p>

        <Subhead id="quality-standards">Quality standards</Subhead>
        <p>
          Every piece is held to the same standards before it reaches you. Cloth is inspected
          before cutting and cut true to the grain; prints are placed with care; seams are
          enclosed or cleanly finished and stress points reinforced; buttons are sewn to last and
          hems checked; each size is measured against its specification; and every piece is
          pressed and folded, ready to wear. If a piece falls short, it isn’t ready.
        </p>
        <p>
          If one ever reaches you with a fault, please{" "}
          <Link href="/returns-and-exchanges#faulty">let us know</Link> within{" "}
          {returns.faultyReportDays} days of delivery and we will put it right.
        </p>
      </Standfirst>

      <CtaBand
        eyebrow="Made to last"
        title="Pieces made to be worn for years"
        body="Explore the collection, and the care guidance that keeps each piece at its best."
        primary={{ label: "Shop all", href: "/shop/all" }}
        secondary={{ label: "Garment care", href: "/garment-care" }}
        image="/img/journal-1.jpg"
        imageAlt="Hands working a length of cream fabric beside spools of olive thread"
      />
    </>
  );
}
