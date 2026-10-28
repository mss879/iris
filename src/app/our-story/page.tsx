import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import Standfirst from "@/components/brand/Standfirst";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Born in Australia, Iris&Me is a celebration of femininity, individuality and the enduring beauty of thoughtful design — and a conscious approach to clothing made to be enjoyed for years.",
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="The IrisandMe World"
        title="Our Story"
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
        lede="Born in Australia, Iris&Me is a celebration of femininity, individuality and the enduring beauty of thoughtful design."
        image={{
          src: "/img/ugc-1.jpg",
          alt: "A woman in a deep olive linen dress holding a cup beside a sunlit kitchen window",
        }}
      >
        <p>
          Our story begins with a love for natural fibres, expressive colours and the artistry
          found in nature. Inspired by nature and rich cultural heritage, we bring a fresh
          perspective to contemporary women’s fashion.
        </p>
        <p>
          Every Iris&amp;Me creation is designed with small batches and pieces made to work
          together and last for more than a season; meet comfort, elegance and femininity
          connecting nature and our true selves. From carefully selected fabrics, delicately
          illustrated prints, beautifully considered silhouettes, our pieces bring together the
          charm of natural beauty and the spirit of modern femininity.
        </p>
      </Standfirst>

      <Section id="consciously-irisandme" tone="sand">
        <SplitFeature
          image="/img/ugc-5.jpg"
          imageAlt="A woman in deep olive linen trousers and a cream top seated on a wooden bench, holding a bunch of dried flowers"
          eyebrow="Our approach to responsibility"
          title="Consciously Iris&Me"
        >
          <p>
            We believe in slow fashion and that true style is not defined by passing trends but by
            the character, confidence and individuality of the woman who wears it, we value
            mindful choices, and a deeper appreciation for the resources that shape our garments.
            Our approach favours considered design over fleeting trends, with an aspiration to
            minimise waste and encourage a more conscious relationship with clothing.
          </p>
          <p>
            Our commitment to a more responsible future inspires us to favour natural fibres,
            thoughtful production choices and designs that transcend seasons. We believe that
            beautiful fashion should be enjoyed for years, not just a moment.
          </p>
        </SplitFeature>
      </Section>
    </>
  );
}
