import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import ServiceShell from "@/components/ui/ServiceShell";
import DataTable from "@/components/ui/DataTable";
import FeatureGrid from "@/components/ui/FeatureGrid";
import Figure from "@/components/ui/Figure";
import Prose from "@/components/ui/Prose";
import Tabs from "@/components/ui/Tabs";
import { getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";
import {
  SIZES,
  body,
  conversions,
  fits,
  garments,
  model,
  toInches,
  type FitKey,
} from "@/lib/sizing";
import {
  Dash,
  Facts,
  HelpPrompt,
  JumpNav,
  ServiceSection,
  ServiceSections,
  Steps,
  SubHeading,
  linkStyles,
  sectionIndex,
  type JumpLink,
} from "@/components/services/ServiceBlocks";
import { Measure, UnitLabel, UnitProvider, UnitToggle } from "./_components/Units";

export const metadata: Metadata = {
  title: "Size & Fit",
  description:
    "Find your IrisandMe size, with AU, UK, US and EU size conversions, body and garment measurements, how to measure, fit descriptions and our model’s measurements.",
};

const toc: JumpLink[] = [
  { id: "size-chart", label: "Size chart" },
  { id: "body-measurements", label: "Body measurements" },
  { id: "garment-measurements", label: "Garment measurements" },
  { id: "how-to-measure", label: "How to measure" },
  { id: "fit", label: "Fit descriptions" },
  { id: "model", label: "Our model" },
];
const n = (id: string) => sectionIndex(toc, id);

const FIRST = SIZES[0];
const LAST = SIZES[SIZES.length - 1];

const REGIONS = [
  { id: "au", label: "AU" },
  { id: "uk", label: "UK" },
  { id: "us", label: "US" },
  { id: "eu", label: "EU" },
] as const;

const FIT_ORDER: FitKey[] = ["fitted", "regular", "relaxed", "oversized"];

/** Column heading that follows the page's unit toggle, e.g. "Bust (cm)". */
const withUnit = (label: string) => (
  <Fragment key={label}>
    {label} (<UnitLabel />)
  </Fragment>
);

/** Both units at once, in the house style of `model.height`: "81cm (31.9in)". */
const cmAndInches = (cm: number) => `${cm}cm (${toInches(cm).toFixed(1)}in)`;

const bodyCells = (size: (typeof SIZES)[number]) => [
  <Measure key="bust" cm={body[size].bust} />,
  <Measure key="waist" cm={body[size].waist} />,
  <Measure key="hip" cm={body[size].hip} />,
];

const chartTabs = [
  {
    id: "all",
    label: "All sizes",
    content: (
      <DataTable
        caption="IrisandMe size chart"
        head={[
          "IrisandMe",
          "AU",
          "UK",
          "US",
          "EU",
          withUnit("Bust"),
          withUnit("Waist"),
          withUnit("Hip"),
        ]}
        rows={SIZES.map((s) => [
          s,
          conversions[s].au,
          conversions[s].uk,
          conversions[s].us,
          conversions[s].eu,
          ...bodyCells(s),
        ])}
        minWidth={720}
        note={`Our sizes run from ${FIRST} to ${LAST}; where a piece is made in a smaller range, its product page shows the sizes available. Bust, waist and hip are body measurements, not garment measurements.`}
      />
    ),
  },
  ...REGIONS.map((r) => ({
    id: r.id,
    label: r.label,
    content: (
      <DataTable
        caption={`${r.label} size chart`}
        head={[
          `${r.label} size`,
          "IrisandMe size",
          withUnit("Bust"),
          withUnit("Waist"),
          withUnit("Hip"),
        ]}
        rows={SIZES.map((s) => [conversions[s][r.id], s, ...bodyCells(s)])}
        note="Bust, waist and hip are body measurements, not garment measurements."
      />
    ),
  })),
];

const measureSteps = [
  {
    title: "Bust",
    body: (
      <p>
        Measure around the fullest part of your bust, keeping the tape level across your back.
        Wear a well-fitting, unpadded bra.
      </p>
    ),
  },
  {
    title: "Waist",
    body: (
      <p>
        Measure around your natural waist — the narrowest part of your torso, usually a little
        above your belly button. Breathe out normally and keep the tape comfortable rather than
        tight.
      </p>
    ),
  },
  {
    title: "Hips",
    body: (
      <p>
        Stand with your feet together and measure around the fullest part of your hips and seat.
      </p>
    ),
  },
  {
    title: "Inside leg",
    body: (
      <p>
        Measure from the top of your inner thigh straight down to your ankle bone. It’s often
        easier to measure along the inside seam of a pair of trousers that fit you well.
      </p>
    ),
  },
  {
    title: "Length",
    body: (
      <p>
        For dresses, measure from the highest point of your shoulder, where it meets your neck,
        down to where you’d like the hem to fall. For shirts, measure down the back from the base
        of the collar to the hem. Compare your lengths with our{" "}
        <a href="#garment-measurements">garment measurements</a>.
      </p>
    ),
  },
];

/** A few pieces cut to a fit, so the description can be seen on a real piece. */
function FitExamples({ fit }: { fit: FitKey }) {
  const list = products.filter((p) => p.fit === fit).slice(0, 3);
  if (list.length === 0) return null;
  return (
    <p className={`text-[13px] leading-[1.8] text-olive-500 ${linkStyles}`}>
      For example, the{" "}
      {list.map((p, i) => (
        <Fragment key={p.slug}>
          {i > 0 ? (i === list.length - 1 ? " and " : ", ") : null}
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </Fragment>
      ))}
      .
    </p>
  );
}

export default function SizeAndFitPage() {
  const worn = conversions[model.size];

  return (
    <ServiceShell
      current="/size-and-fit"
      title="Size & Fit"
      intro={
        <p>
          Our pieces are made in sizes {FIRST} to {LAST}. Use the charts below to find your size in
          AU, UK, US or EU sizing, compare your measurements, and see how each piece is designed to
          fit.
        </p>
      }
    >
      <UnitProvider>
        <ServiceSections>
          <JumpNav items={toc} />

          <ServiceSection
            id="size-chart"
            index={n("size-chart")}
            eyebrow="Conversions"
            title="The IrisandMe size chart"
            intro="Find the size you usually wear in your own country’s sizing, then read across to your IrisandMe size."
          >
            <UnitToggle className="mb-10" />
            <Tabs label="Size chart by region" tabs={chartTabs} />
          </ServiceSection>

          <ServiceSection
            id="body-measurements"
            index={n("body-measurements")}
            eyebrow="Your measurements"
            title="Body measurements"
            intro="These are measurements of the body, not of the garment. If your measurements fall across two sizes, the fit descriptions below explain which way to go."
          >
            <UnitToggle className="mb-10" />
            <DataTable
              caption="Body measurements"
              head={["IrisandMe size", withUnit("Bust"), withUnit("Waist"), withUnit("Hip")]}
              rows={SIZES.map((s) => [s, ...bodyCells(s)])}
              minWidth={480}
              note={
                <>
                  Not sure of your measurements? See{" "}
                  <a href="#how-to-measure" className="underline underline-offset-[3px]">
                    how to measure
                  </a>
                  .
                </>
              }
            />
          </ServiceSection>

          <ServiceSection
            id="garment-measurements"
            index={n("garment-measurements")}
            eyebrow="The pieces themselves"
            title="Garment measurements"
            intro="For the pieces where proportion matters most, these are measurements of the garment itself, taken with it laid flat. Bust, chest, waist and hip are given as the full circumference."
          >
            <UnitToggle className="mb-10" />
            <Prose className="mb-14">
              <p>
                The difference between a garment measurement and your body measurement is the ease
                — the room a piece is designed to have. To picture the fit, compare these figures
                with a similar piece you own and love.
              </p>
            </Prose>

            <div className="flex flex-col gap-16">
              {Object.entries(garments).map(([slug, measures]) => {
                const product = getProduct(slug);
                const name = product?.name ?? slug;
                return (
                  <div key={slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <SubHeading>
                        {product ? (
                          <Link
                            href={`/products/${slug}`}
                            className="transition-colors duration-500 hover:text-olive-500"
                          >
                            {name}
                          </Link>
                        ) : (
                          name
                        )}
                      </SubHeading>
                      {product ? (
                        <p className="eyebrow text-[10px] text-olive-500">
                          {fits[product.fit].label} fit · {product.fabric}
                        </p>
                      ) : null}
                    </div>
                    <DataTable
                      className="mt-6"
                      caption={`${name} garment measurements`}
                      hideCaption
                      head={[withUnit("Measurement"), ...SIZES]}
                      rows={measures.map((m) => [
                        m.label,
                        ...SIZES.map((s) => {
                          const value = m.values[s];
                          return value === undefined ? (
                            <Dash key={s} />
                          ) : (
                            <Measure key={s} cm={value} />
                          );
                        }),
                      ])}
                    />
                  </div>
                );
              })}
            </div>

            <p className={`mt-12 font-sans text-[14px] leading-[1.85] text-olive-600 ${linkStyles}`}>
              Considering a piece that isn’t listed here? <Link href="/contact">Ask us</Link> for
              its measurements.
            </p>
          </ServiceSection>

          <ServiceSection
            id="how-to-measure"
            index={n("how-to-measure")}
            eyebrow="A soft tape"
            title="How to measure"
            intro="You’ll need a soft tape measure. Measure over light underwear, keeping the tape level and snug but not tight — and ask someone to help if you can, as it’s more accurate."
          >
            <Steps items={measureSteps} />

            <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
              <Figure
                src="/img/craft-quality.jpg"
                alt="Hands measuring across the front of an olive linen shirt with a cloth tape measure"
                ratio="4/3"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div>
                <SubHeading>Measuring a piece you own</SubHeading>
                <Prose className="mt-5">
                  <p>A garment that already fits you well is one of the best guides to size.</p>
                  <ol>
                    <li>Lay it flat and smooth it out, with any buttons done up.</li>
                    <li>
                      Measure straight across the bust or chest, just below the armholes, then
                      double it for the full circumference.
                    </li>
                    <li>
                      Measure the length from the highest point of the shoulder, or from the base
                      of the collar at the back, down to the hem.
                    </li>
                    <li>
                      Compare your figures with our{" "}
                      <a href="#garment-measurements">garment measurements</a>.
                    </li>
                  </ol>
                </Prose>
              </div>
            </div>
          </ServiceSection>

          <ServiceSection
            id="fit"
            index={n("fit")}
            eyebrow="How it sits"
            title="Fit descriptions"
            intro="Every IrisandMe piece is cut to one of four fits, named on its product page. Here’s how each is designed to sit, and which size to choose."
          >
            <FeatureGrid
              columns={2}
              numbered={false}
              items={FIT_ORDER.map((key) => ({
                title: fits[key].label,
                body: (
                  <>
                    <p>{fits[key].description}</p>
                    <FitExamples fit={key} />
                  </>
                ),
              }))}
            />
          </ServiceSection>

          <ServiceSection
            id="model"
            index={n("model")}
            eyebrow="In our photographs"
            title="Our model"
            intro={`The model in our studio photography is ${model.height} tall and wears size ${model.size}. Compare her measurements with your own to picture how a piece will sit.`}
          >
            <Facts
              items={[
                { term: "Height", detail: model.height },
                { term: "Bust", detail: cmAndInches(model.bust) },
                { term: "Waist", detail: cmAndInches(model.waist) },
                { term: "Hip", detail: cmAndInches(model.hip) },
                {
                  term: "Size worn",
                  detail: model.size,
                  note: `AU ${worn.au} · UK ${worn.uk} · US ${worn.us} · EU ${worn.eu}`,
                },
              ]}
            />
            <Prose className="mt-12">
              <p>
                Each product page notes the size our model is wearing in its photographs. If you’re
                shorter than our model, dresses, skirts and trousers will fall a little longer on
                you — the lengths in our{" "}
                <a href="#garment-measurements">garment measurements</a> will help you judge where a
                hem will sit.
              </p>
            </Prose>
          </ServiceSection>

          <HelpPrompt
            title="Not sure which size to choose?"
            action={{ href: "/contact", label: "Ask about sizing" }}
          >
            <p>
              Tell us your height, the size you usually wear and the piece you’re considering, and
              our Client Services team will recommend a size. We reply {site.responseTime}.
            </p>
          </HelpPrompt>
        </ServiceSections>
      </UnitProvider>
    </ServiceShell>
  );
}
