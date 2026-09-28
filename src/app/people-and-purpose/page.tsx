import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import SplitFeature from "@/components/ui/SplitFeature";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";
import EmptyState from "@/components/ui/EmptyState";
import PullQuote from "@/components/ui/PullQuote";
import CtaBand from "@/components/ui/CtaBand";
import ButtonLink, { TextLink } from "@/components/ui/ButtonLink";
import ContinueExploring from "@/components/ui/ContinueExploring";
import Reveal from "@/components/anim/Reveal";
import { site } from "@/lib/site";
import Standfirst from "@/components/brand/Standfirst";
import PageIndex from "@/components/brand/PageIndex";
import Steps, { type Step } from "./_components/Steps";
import { initiatives } from "./_components/initiatives";

export const metadata: Metadata = {
  title: "People & Purpose",
  description:
    "What IrisandMe is doing for women’s empowerment and support for children: where our programs stand, what we commit to, and how we will report on each one.",
};

const contents = [
  { href: "#womens-empowerment", label: "Women’s empowerment" },
  { href: "#support-for-children", label: "Support for children" },
  { href: "#where-we-are-today", label: "Where we are today" },
  { href: "#our-commitments", label: "Our commitments" },
  { href: "#choosing-partners", label: "Choosing partners" },
  { href: "#initiatives", label: "Initiatives" },
];

const progress: Step[] = [
  {
    status: "Done",
    title: "Choosing our focus",
    body: "Women’s empowerment and support for children: the two areas where we want to be genuinely useful.",
  },
  {
    status: "In progress",
    title: "Finding the right partners",
    body: "Looking for organisations with local knowledge, a clear purpose and a record they can show.",
    current: true,
  },
  {
    status: "Next",
    title: "Agreeing what we will do",
    body: "Deciding with each partner exactly what IrisandMe will fund or contribute, and for how long.",
  },
  {
    status: "To follow",
    title: "Publishing each initiative",
    body: "Giving every established initiative its own page, with the partner, our contribution and its aims.",
  },
  {
    status: "Ongoing",
    title: "Reporting outcomes",
    body: "Updating each page with what has changed, as reported by our partners.",
  },
];

const commitments: Feature[] = [
  {
    title: "We will name our partners",
    body: "Every initiative will say who we are working with, and why we chose them.",
  },
  {
    title: "We will say exactly what we give",
    body: "In plain terms — an amount, a share of sales, time, skills or products. Never a vague “portion of proceeds”.",
  },
  {
    title: "We will report outcomes",
    body: "What has changed as a result, as reported by our partners — not only what we hoped would happen.",
  },
  {
    title: "Each initiative gets its own page",
    body: "So you can see the whole of it: partner, contribution, aims, outcomes and updates, in one place.",
  },
  {
    title: "We won’t borrow a cause to sell clothing",
    body: "We won’t attach a cause to a product, or describe a purchase as a donation, unless there is a real program behind it.",
  },
  {
    title: "We will answer your questions",
    body: (
      <p>
        Write to us at{" "}
        <a href={`mailto:${site.email.care}`} className="underline underline-offset-[3px]">
          {site.email.care}
        </a>{" "}
        and we will answer as fully as we can.
      </p>
    ),
  },
];

const partnerCriteria: Feature[] = [
  {
    title: "Local knowledge",
    body: "Organisations led by, or working closely with, the communities they serve.",
  },
  {
    title: "A clear purpose",
    body: "A specific need, and a clear idea of how our support will help to meet it.",
  },
  {
    title: "A long-term view",
    body: "We would rather support fewer partners for longer than spread our support thinly.",
  },
  {
    title: "Openness",
    body: "A willingness to share what works, what doesn’t, and what changes as a result.",
  },
];

const pageIncludes = [
  { term: "The partner", detail: "Who we are working with, and why we chose them." },
  { term: "Our contribution", detail: "Exactly what IrisandMe funds or does, and for how long." },
  { term: "The aims", detail: "What the work sets out to change." },
  { term: "The outcomes", detail: "What has changed, as reported by our partner." },
  { term: "Updates", detail: "Dated notes as the work continues." },
];

export default function PeopleAndPurposePage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="For women, for children"
        title="People & Purpose"
        intro="Women’s empowerment and support for children are part of who IrisandMe is. This page explains, plainly, what we are doing about both — and how we will show you."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "People & Purpose" },
        ]}
        image="/img/promise-lux.jpg"
        imageAlt="Three women in deep olive and cream linen standing together in a bright studio"
      />

      <Standfirst
        id="our-approach"
        title="Our approach"
        lede="A clothing label should be judged by what it does, not by what it says. So rather than broad promises, this page sets out our two focus areas, where we are today, and exactly how we will report on our work."
        aside={<PageIndex items={contents} />}
      >
        <p>
          Our first programs are being established now. We are taking the time to choose the right
          partners and to agree what we will fund or do, because we would rather get this right
          than announce it early.
        </p>
        <p>
          When an initiative is ready, it will be published on this page in full — who we are
          working with, what IrisandMe contributes, and what changes as a result.
        </p>
      </Standfirst>

      {/* Focus area 01 */}
      <Section id="womens-empowerment" tone="cream">
        <SplitFeature
          image="/img/purpose-hands.jpg"
          imageAlt="Several women’s hands embroidering a botanical motif in olive thread on cream linen stretched in a wooden frame"
          position="62% center"
          index="01"
          eyebrow="Focus area"
          title="Women’s empowerment"
        >
          <p>
            We design for women, and we depend on the skill of the people who make our clothing. It
            feels right that our work should help more women build skills, earn fairly and shape
            their own lives.
          </p>
          <p>
            Our intention is to support women’s skills, fair work and financial independence, with
            a particular interest in the textile and craft skills that clothing like ours depends
            on.
          </p>
          <p>
            When a partnership is in place, we will publish exactly who it is with, what IrisandMe
            funds or does, and what changes as a result.
          </p>
        </SplitFeature>
      </Section>

      {/* Focus area 02 */}
      <Section id="support-for-children" tone="sand" labelledBy="support-for-children-heading">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="support-for-children-heading"
              index="02"
              eyebrow="Focus area"
              title="Support for children"
            />
            <Reveal delay={0.15}>
              <p className="serif mt-10 max-w-[26ch] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.35] text-olive-700">
                Every child deserves a safe and hopeful start: to be healthy, to learn, and to be a
                child.
              </p>
            </Reveal>
          </div>
          <Reveal
            delay={0.2}
            className="lg:col-span-6 lg:col-start-7 lg:pt-16"
          >
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
                As with our work for women, each initiative will be published with its partner,
                what IrisandMe funds or does, and its outcomes.
              </p>
              <TextLink
                href="/consciously-irisandme#ethical-manufacturing"
                className="mt-2 self-start text-olive-800"
              >
                Our workshop standards
              </TextLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="where-we-are-today" tone="cream" labelledBy="where-we-are-today-heading">
        <SectionHeading
          id="where-we-are-today-heading"
          eyebrow="Where we are today"
          title="Programs in progress"
          intro="We would rather take the time to do this properly than announce something before it is ready. This is where things stand."
        />
        <div className="mt-14 md:mt-20">
          <Steps items={progress} />
        </div>
      </Section>

      <Section id="our-commitments" tone="olive" labelledBy="our-commitments-heading">
        <SectionHeading
          dark
          id="our-commitments-heading"
          eyebrow="What we commit to"
          title="Our commitments"
          intro="Whatever form our initiatives take, these commitments apply to every one."
        />
        <div className="mt-14 md:mt-20">
          <FeatureGrid items={commitments} columns={3} dark />
        </div>
      </Section>

      <Section id="choosing-partners" tone="cream" labelledBy="choosing-partners-heading">
        <SectionHeading
          id="choosing-partners-heading"
          eyebrow="Choosing partners"
          title="What we look for in a partner"
          intro="The right partner matters more than the size of the gesture. These are the qualities we are looking for."
        />
        <div className="mt-14 md:mt-20">
          <FeatureGrid items={partnerCriteria} columns={4} numbered={false} />
        </div>
      </Section>

      <Section id="initiatives" tone="sand" labelledBy="initiatives-heading">
        <SectionHeading
          id="initiatives-heading"
          eyebrow="Initiatives"
          title="Our initiatives"
          intro="Every established initiative will be published here, each with a page of its own."
        />
        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {initiatives.length > 0 ? (
              <ul className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {initiatives.map((item) => (
                  <li key={item.slug}>
                    <Reveal className="flex h-full flex-col border-t hairline pt-7">
                      <h3 className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.02] text-olive-800">
                        <Link href={item.href} className="link-underline">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-4 font-sans text-[14px] leading-[1.85] text-olive-600">
                        {item.summary}
                      </p>
                      <TextLink href={item.href} className="mt-6 self-start text-olive-800">
                        Read about this initiative
                        <span className="sr-only">: {item.title}</span>
                      </TextLink>
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : (
              <Reveal>
                <EmptyState
                  title="Our first initiatives will be published here"
                  action={<ButtonLink href="/contact">Ask us about this work</ButtonLink>}
                >
                  Each will set out who we are working with, what IrisandMe funds or does, and
                  what has changed as a result. Until then, we would rather show you nothing than
                  something that isn’t real.
                </EmptyState>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <h3 className="eyebrow text-[10.5px] text-olive-800">Every initiative page will include</h3>
            <dl className="mt-5">
              {pageIncludes.map((row) => (
                <div key={row.term} className="border-t hairline py-4">
                  <dt className="font-sans text-[14px] font-medium text-olive-800">{row.term}</dt>
                  <dd className="mt-1 font-sans text-[14px] leading-[1.8] text-olive-600">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" pad="tight">
        <PullQuote>We would rather show you than tell you.</PullQuote>
      </Section>

      <CtaBand
        eyebrow="Related"
        title="The standards behind our clothing"
        body="Fair pay, safe conditions, reasonable hours, and no child or forced labour: the standards we ask of every workshop we work with."
        primary={{ label: "Consciously IrisandMe", href: "/consciously-irisandme" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />

      <ContinueExploring current="/people-and-purpose" />
    </>
  );
}
