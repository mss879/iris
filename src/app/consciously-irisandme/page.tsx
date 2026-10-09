import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading, type Tone } from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import CtaBand from "@/components/ui/CtaBand";
import { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";
import { site } from "@/lib/site";
import Standfirst from "@/components/brand/Standfirst";
import { joinList, singleNaturalFibres } from "./_components/fibres";

export const metadata: Metadata = {
  title: "Consciously IrisandMe",
  description:
    "How IrisandMe approaches responsibility: natural fibres, responsible material choices, recycled materials, small-batch production, packaging and garment longevity.",
};

const fibres = singleNaturalFibres();

/** A section told in a single paragraph, set beside its heading on wide screens. */
function ParagraphSection({
  id,
  tone,
  eyebrow,
  title,
  children,
}: {
  id: string;
  tone: Tone;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <div className="prose-iris max-w-[62ch]">
            <p>{children}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

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
      >
        <p>
          This page sets out, in plain terms, how we approach each part of that: the materials we
          choose, how much we make, how your order is packed, and how we help each piece last.
          Where something is an intention rather than a practice, we say so.
        </p>
      </Standfirst>

      <Section id="natural-fibres" tone="cream">
        <SplitFeature
          image="/img/journal-2.jpg"
          imageAlt="Lengths of cream linen hanging to dry on lines above old stone basins"
          eyebrow="What our clothes are made of"
          title="Natural fibres"
          actions={<TextLink href="/our-story#fabric-selection">Fabric selection</TextLink>}
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

      <ParagraphSection
        id="material-choices"
        tone="sand"
        eyebrow="How we choose"
        title="Responsible material choices"
      >
        A fabric has to earn its place in our collection. First, it has to last: a cloth that
        wears out quickly is never the responsible choice, however it was made. It has to be the
        right fibre for the piece — linen for heat, cotton for prints, silk for drape, alpaca for
        warmth. We want to know where it is grown and processed, and are working to trace our
        fibres further back than we can today. Where natural colour suits a piece, we leave it
        undyed. And we favour single-fibre cloth that can be washed cool at home and dried on a
        line, because it is simpler to care for and far easier to recycle than a blend.
      </ParagraphSection>

      <Section id="recycled-materials" tone="cream">
        <SplitFeature
          reverse
          image="/img/fabric-recycled.jpg"
          imageAlt="Bundles of cream and olive linen offcuts tied with twine and stacked on a wooden table by a window"
          eyebrow="In development"
          title="Recycled materials"
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

      <Section id="small-batch-production" tone="olive">
        <SplitFeature
          dark
          image="/img/col-limited.jpg"
          imageAlt="A cream jacket hand block printed with olive leaves, hanging against a lime-washed wall"
          position="50% center"
          eyebrow="Making less, and better"
          title="Small-batch production"
        >
          <p>
            We make in small batches rather than large runs. It means we make closer to what is
            actually wanted, and that each piece gets more attention along the way.
          </p>
          <p>
            Some pieces are offered to pre-order ahead of their arrival, and some are made in
            small, numbered runs that are not remade once they are gone.
          </p>
          <p>Small batches are slower, and cost more to make. We think the trade is worth it.</p>
        </SplitFeature>
      </Section>

      <Section id="packaging" tone="sand">
        <SplitFeature
          reverse
          image="/img/packaging.jpg"
          imageAlt="A kraft box holding a folded cream garment, tied with cream cotton ribbon and an olive card tag"
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

      <ParagraphSection
        id="garment-longevity"
        tone="cream"
        eyebrow="The longest life"
        title="Garment longevity"
      >
        The most responsible piece of clothing is the one you keep wearing, and everything on this
        page is in service of that. We design shapes that don’t depend on a trend, in colours that
        sit together easily from one year to the next. We make them to last, with careful
        cutting, clean seams and reinforced stress points. And we give every piece care
        instructions, with fuller guidance in our{" "}
        <Link href="/garment-care">garment care guide</Link>. When a piece no longer suits you,
        give it a second life — with a friend, a sister, a daughter or an op shop — so it keeps
        being worn.
      </ParagraphSection>

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
