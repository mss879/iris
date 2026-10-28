import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading, type Tone } from "@/components/ui/Section";
import Standfirst from "@/components/brand/Standfirst";
import Reveal from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "People & Purpose",
  description:
    "Rooted in humanity, inspired by artistry, created with purpose: the people at the heart of Iris&Me, and our support for underprivileged children through Little Lives, Brighter Futures.",
};

/**
 * A chapter of the purpose: its heading and opening line on the left, the
 * rest of its paragraphs beside them on wide screens.
 */
function PurposeSection({
  id,
  tone,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  tone: Tone;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
          <Reveal delay={0.15}>
            <p className="serif mt-10 max-w-[26ch] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.35] text-olive-700">
              {lead}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <div className="flex flex-col gap-6 font-sans text-[15px] leading-[1.9] text-olive-600">
            {children}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default function PeopleAndPurposePage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Our purpose"
        title="People & Purpose of Iris&Me"
        intro={<em>Rooted in Humanity. Inspired by Artistry. Created with Purpose.</em>}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "People & Purpose" },
        ]}
        image="/img/promise-lux.jpg"
        imageAlt="Three women in deep olive and cream linen standing together in a bright studio"
      />

      <Standfirst
        id="what-we-believe"
        title="What we believe"
        lede="At Iris&Me, we believe the true beauty of fashion lies not only in the garments we create, but in the lives we touch, the stories we celebrate and the positive difference we aspire to make."
      >
        <p>
          Our journey is shaped by a belief that creativity, compassion and responsibility belong
          together. Beyond beautiful fabrics and distinctive designs, we envision a brand that
          values human connection, celebrates individuality and contributes meaningfully to the
          world around us.
        </p>
      </Standfirst>

      <PurposeSection
        id="people-at-the-heart-of-our-story"
        tone="sand"
        eyebrow="Our people"
        title="People at the Heart of Our Story"
        lead="Behind every garment is a story of human creativity, skill and dedication."
      >
        <p>
          We recognise the hands that bring our designs to life, the communities that inspire our
          artistic expression and the women who make each creation uniquely their own.
        </p>
        <p>
          We aspire to nurture relationships built on fairness, dignity and mutual respect,
          recognising that meaningful fashion begins with valuing the people behind it.
        </p>
      </PurposeSection>

      <PurposeSection
        id="little-lives-brighter-futures"
        tone="cream"
        eyebrow="Our focus"
        title="Little Lives, Brighter Futures"
        lead="We believe that every child deserves the opportunity to dream, learn and flourish, regardless of their circumstances."
      >
        <p>
          A meaningful part of our purpose is to extend compassion beyond fashion by supporting
          underprivileged children and helping create opportunities for a brighter future.
        </p>
        <p>
          We contribute to initiatives that nurture children’s wellbeing through Chakraa Life
          Foundation, encouraging education of identified little lives that are in need and
          provide access to essential resources to them. Through meaningful partnerships and
          community involvement, we hope to contribute to moments of joy, confidence and
          possibility to young lives.
        </p>
      </PurposeSection>
    </>
  );
}
