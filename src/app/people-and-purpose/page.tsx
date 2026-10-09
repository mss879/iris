import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "People & Purpose",
  description:
    "IrisandMe’s support for children: what we intend to do for children’s education, health and wellbeing, and how each initiative will be published.",
};

export default function PeopleAndPurposePage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Our purpose"
        title="People & Purpose"
        intro="Support for children is part of who IrisandMe is. This page explains, plainly, what we intend to do — and how we will show you."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "People & Purpose" },
        ]}
        image="/img/promise-lux.jpg"
        imageAlt="Three women in deep olive and cream linen standing together in a bright studio"
      />

      <Section id="support-for-children" tone="sand" labelledBy="support-for-children-heading">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="support-for-children-heading"
              eyebrow="Our focus"
              title="Support for children"
            />
            <Reveal delay={0.15}>
              <p className="serif mt-10 max-w-[26ch] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.35] text-olive-700">
                Every child deserves a safe and hopeful start: to be healthy, to learn, and to be a
                child.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <div className="flex flex-col gap-6 font-sans text-[15px] leading-[1.9] text-olive-600">
              <p>
                Our intention is to support children’s education, health and wellbeing, working
                with people who know the communities they serve.
              </p>
              <p>
                It also begins in our own supply chain. One of the standards we ask of every
                workshop we work with is that no one under the legal working age is employed.
              </p>
              <p>
                Each initiative will be published here with its partner, what IrisandMe funds or
                does, and its outcomes.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <ContinueExploring current="/people-and-purpose" />
    </>
  );
}
