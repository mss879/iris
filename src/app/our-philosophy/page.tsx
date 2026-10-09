import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Standfirst, { Subhead } from "@/components/brand/Standfirst";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Considered Design. Natural Beauty. Modern Femininity. The ideas behind IrisandMe, and six principles for clothing made to be worn beyond a single season.",
};

const principles = [
  {
    title: "Timelessness",
    body: "designed away from trends, so a piece looks as right in years to come as it does today.",
  },
  {
    title: "Versatility",
    body: "each piece earns its place in many outfits, from morning to evening and from home to away.",
  },
  { title: "Quality", body: "good cloth, careful cutting and clean finishing, inside and out." },
  { title: "Comfort", body: "natural fibres that breathe, and cuts with room to move." },
  {
    title: "Responsible production",
    body: "small batches, natural fibres, and honesty about what we are still working towards.",
  },
  {
    title: "Beyond a single season",
    body: "nothing is designed to be replaced next season; every piece is made to be worn for years.",
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
        id="our-philosophy"
        title="Our philosophy"
        lede="We believe clothing should be chosen slowly, worn often and kept for years. It is a simple idea that asks a great deal of design, of cloth and of making — and it is the measure we hold every piece to."
        image={{
          src: "/img/ugc-3.jpg",
          alt: "A woman in a deep olive wrap dress walking along a sandy path through dry coastal grass",
        }}
      >
        <p>
          Our three pillars — Considered Design, Natural Beauty and Modern Femininity — describe
          what we hope you feel when you wear IrisandMe. The six principles that follow describe
          how we get there. None of this is new; good clothing has always been made this way. We
          simply think it is worth holding to.
        </p>
        <p>
          <strong>Considered Design</strong> means every decision has a reason, and none is made
          for the sake of novelty. Pockets sit where hands naturally fall and buttons are easy to
          use; if a detail doesn’t make a piece better to wear, we leave it out. We design as a
          wardrobe, in a palette of cream, deep olive and soft botanical colour, and would rather
          make fewer pieces well than many pieces quickly.
        </p>
        <p>
          <strong>Natural Beauty</strong> is the beauty that is already there — in the slubs of
          linen and the soft handle of cotton, in prints that begin as drawings of flowers and
          leaves, and in the woman wearing the clothes. We choose fabrics whose character improves
          with wear, and cut to frame rather than disguise: for ease and movement, never to
          reshape.
        </p>
        <p>
          <strong>Modern Femininity</strong> is ease, confidence and a sense of self — not a
          silhouette, and not a set of rules. Relaxed cuts and softly gathered shapes follow the
          body as it walks, reaches and sits, in fabrics made for real days. Tied or loose, tucked
          or not, together or apart: the pieces adapt, and the woman decides.
        </p>

        <Subhead id="what-guides-every-piece">What guides every piece</Subhead>
        <p>
          Beneath the three pillars sit six principles. Together they decide what we make and how
          we make it, and a piece is only ready to be made when it meets all six:
        </p>
        <ul>
          {principles.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong> — {p.body}
            </li>
          ))}
        </ul>

        <p>
          Fashion moves in seasons; we would rather design in years. That means fabrics that
          improve with wear, shapes that don’t depend on a trend, and colours that sit together
          easily from one year to the next — pieces that layer, like a linen dress over knitwear
          when the light turns. And it means helping you look after them: every piece comes with
          care guidance, and our <Link href="/garment-care">garment care guide</Link> goes further.
        </p>
      </Standfirst>

      <CtaBand
        eyebrow="In practice"
        title="See the philosophy in the making"
        body="From the first sketch to the final check, this is how our principles become clothing."
        primary={{ label: "Craftsmanship", href: "/our-story#craftsmanship" }}
      />

      <ContinueExploring current="/our-philosophy" />
    </>
  );
}
