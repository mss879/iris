import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import CtaBand from "@/components/ui/CtaBand";
import { site } from "@/lib/site";
import Standfirst from "@/components/brand/Standfirst";

export const metadata: Metadata = {
  title: "Consciously IrisandMe",
  description:
    "How IrisandMe approaches responsibility: making fewer things, making them well, and making them in small batches rather than large runs.",
};

export default function ConsciouslyIrisandMePage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Our approach to responsibility"
        title="Consciously IrisandMe"
        intro="What we do, and why we do it. We would rather be clear about that than claim more than we can show."
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
      />

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
    </>
  );
}
