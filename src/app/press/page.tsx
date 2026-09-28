import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import ButtonLink, { TextLink } from "@/components/ui/ButtonLink";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/anim/Reveal";
import { collections, prints } from "@/lib/products";
import { site } from "@/lib/site";
import CopyText from "./_components/CopyText";
import { AsSeenIn, EditorialShoots, Placements, PressFeatures } from "./_components/Coverage";
import { asSeenIn, editorialShoots, placements, pressFeatures } from "./_data/press";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press enquiries, brand information and coverage for IrisandMe, the Australian womenswear label designing in linen, cotton and natural fibres.",
};

const domain = new URL(site.url).hostname.replace(/^www\./, "");

/** Brand boilerplate for journalists. Keep every claim in it verifiable. */
const boilerplate = `${site.name} is an Australian womenswear label designing considered clothing in linen, cotton and other natural fibres. Guided by three principles — Considered Design, Natural Beauty and Modern Femininity — the label pairs relaxed, timeless shapes with its own signature prints, among them The Iris and The Lotus, drawn by hand. Each piece is made to be worn well beyond a single season. ${site.name} is available online at ${domain}, shipping worldwide.`;

/** What the press office can provide — all on request. */
const provisions = [
  { title: "Imagery", body: "High-resolution campaign, lookbook and product photography." },
  { title: "Samples", body: "Pieces for editorial shoots and styling, subject to availability." },
  { title: "Interviews", body: "Conversations about natural fabrics, craftsmanship and considered design." },
  { title: "Information", body: "Product details, pricing, availability and logo files." },
];

const facts: { term: string; value: ReactNode }[] = [
  { term: "Label", value: site.name },
  { term: "Based in", value: site.country },
  { term: "Designs", value: "Womenswear in linen, cotton and natural fibres" },
  { term: "Collections", value: collections.map((c) => c.name).join(", ") },
  { term: "Signature prints", value: prints.map((p) => p.name).join(", ") },
  { term: "Available", value: `Online at ${domain}, shipping worldwide` },
  {
    term: "Instagram",
    value: (
      <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
        {site.handle}
        <span className="sr-only"> on Instagram (opens in a new tab)</span>
      </a>
    ),
  },
  {
    term: "Press contact",
    value: (
      <a href={`mailto:${site.email.press}`} className="link-underline">
        {site.email.press}
      </a>
    ),
  },
];

/** PRESS — coverage as it arrives, the press office, and a boilerplate to quote. */
export default function PressPage() {
  const hasCoverage =
    asSeenIn.length + pressFeatures.length + editorialShoots.length + placements.length > 0;

  return (
    <>
      <PageHero
        variant="split"
        image="/img/story-studio.jpg"
        imageAlt="A light-filled design studio with sketches spread across a timber table and a deep olive dress on a dress form"
        position="52% center"
        eyebrow="Press & media"
        title="Press"
        intro="News, features and editorial from IrisandMe. Journalists, stylists and editors are welcome to contact our press office for imagery, samples and interviews."
        crumbs={[{ label: "Home", href: "/" }, { label: "Press" }]}
      >
        <a href={`mailto:${site.email.press}`} className="btn btn-solid px-10">
          <span className="eyebrow text-[10px]">Contact the press office</span>
        </a>
      </PageHero>

      {hasCoverage ? (
        <>
          {asSeenIn.length > 0 ? <AsSeenIn items={asSeenIn} /> : null}
          {pressFeatures.length > 0 ? <PressFeatures items={pressFeatures} /> : null}
          {editorialShoots.length > 0 ? <EditorialShoots items={editorialShoots} /> : null}
          {placements.length > 0 ? <Placements items={placements} /> : null}
        </>
      ) : (
        <Section labelledBy="press-coverage-title">
          <SectionHeading id="press-coverage-title" eyebrow="Coverage" title="In the press" className="mb-14" />
          <Reveal>
            <EmptyState
              title="Coverage will appear here as it’s published"
              action={<ButtonLink href="#press-enquiries">Press enquiries</ButtonLink>}
            >
              As IrisandMe grows, this page will gather the publications we appear in, press features,
              editorial shoots and the people photographed in our pieces. In the meantime, our press office
              is glad to help.
            </EmptyState>
          </Reveal>
        </Section>
      )}

      <Section id="press-enquiries" tone="sand" labelledBy="press-enquiries-title">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHeading
              id="press-enquiries-title"
              eyebrow="Press office"
              title="Press enquiries"
              intro={`For features, editorial requests and interviews, please contact our press office. We reply ${site.responseTime}.`}
            />
            <Reveal delay={0.2}>
              <a
                href={`mailto:${site.email.press}`}
                className="serif link-underline mt-10 inline-block text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-olive-800"
              >
                {site.email.press}
              </a>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href="/lookbook" className="text-olive-800">
                  Browse the lookbook
                </TextLink>
                <TextLink href="/collections" className="text-olive-800">
                  Explore the collections
                </TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="eyebrow text-[10.5px] text-olive-700">Available on request</h3>
            <ul className="mt-6 border-t hairline">
              {provisions.map((item, i) => (
                <li key={item.title} className="border-b hairline">
                  <Reveal delay={i * 0.08} className="flex gap-6 py-6">
                    <span
                      aria-hidden="true"
                      className="serif w-7 shrink-0 text-[1.3rem] leading-none text-olive-500"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="eyebrow text-[10.5px] text-olive-800">{item.title}</p>
                      <p className="mt-2 font-sans text-[14px] leading-[1.8] text-olive-600">{item.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="press-about-title">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="press-about-title"
              eyebrow="Boilerplate"
              title="About IrisandMe"
              intro="A short description of the label, written for use in press coverage."
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="border-l border-olive-700/25 pl-7">
                <p className="serif text-[clamp(1.3rem,2vw,1.6rem)] leading-[1.55] text-olive-700">{boilerplate}</p>
              </div>
              <div className="mt-6 pl-7">
                <CopyText text={boilerplate} label="Copy the boilerplate" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="eyebrow mt-16 text-[10.5px] text-olive-700">At a glance</h3>
              <dl className="mt-6 border-t hairline">
                {facts.map((fact) => (
                  <div
                    key={fact.term}
                    className="grid grid-cols-1 gap-1 border-b hairline py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="eyebrow pt-0.5 text-[10px] text-olive-500">{fact.term}</dt>
                    <dd className="font-sans text-[14.5px] leading-[1.75] text-olive-800">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
