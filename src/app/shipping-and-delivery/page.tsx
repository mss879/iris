import type { Metadata } from "next";
import Link from "next/link";
import ServiceShell from "@/components/ui/ServiceShell";
import DataTable from "@/components/ui/DataTable";
import Figure from "@/components/ui/Figure";
import Prose from "@/components/ui/Prose";
import { FREE_SHIPPING_AU, formatPrice, returns, shipping, site } from "@/lib/site";
import {
  Callout,
  Dash,
  DetailList,
  HelpPrompt,
  JumpNav,
  ServiceSection,
  ServiceSections,
  SubHeading,
  sectionIndex,
  type Detail,
  type JumpLink,
} from "@/components/services/ServiceBlocks";
import {
  domestic,
  expressRegions,
  international,
  internationalCarriers,
  listJoin,
  regionPhrase,
  regions,
  slugify,
} from "@/components/services/facts";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: `Delivery times and shipping charges for ${listJoin(
    regions.map((r) => regionPhrase(r.region))
  )}, plus tracking, duties, taxes and customs information.`,
};

const toc: JumpLink[] = [
  { id: "at-a-glance", label: "Shipping at a glance" },
  { id: "processing-times", label: "Processing times" },
  { id: "delivery-by-region", label: "Delivery by region" },
  { id: "tracking", label: "Tracking" },
  { id: "duties-and-taxes", label: "Duties & taxes" },
  { id: "customs", label: "Customs information" },
  { id: "delays-and-addresses", label: "Delays & addresses" },
];
const n = (id: string) => sectionIndex(toc, id);

/** "1–3 business days, $18" — express terms, when a region offers them. */
const expressTerms = (r: (typeof regions)[number]) =>
  [r.express, r.expressCost].filter(Boolean).join(", ");

function regionDetails(r: (typeof regions)[number]): Detail[] {
  return [
    { term: "Standard delivery", detail: r.standard },
    {
      term: "Standard shipping",
      detail: r.freeOver
        ? `${r.standardCost}, or complimentary on orders over ${formatPrice(r.freeOver)}`
        : r.standardCost,
    },
    ...(r.express ? [{ term: "Express delivery", detail: expressTerms(r) }] : []),
    { term: "Carrier", detail: r.carrier },
    { term: "Duties & taxes", detail: r.duties },
  ];
}

export default function ShippingAndDeliveryPage() {
  return (
    <ServiceShell
      current="/shipping-and-delivery"
      title="Shipping & Delivery"
      intro={
        <p>
          We deliver from {site.country} to customers around the world. Orders are prepared within{" "}
          {shipping.processing} and sent with tracking, and standard shipping within{" "}
          {domestic.region} is complimentary on orders over {formatPrice(FREE_SHIPPING_AU)}.
        </p>
      }
    >
      <ServiceSections>
        <JumpNav items={toc} />

        <ServiceSection
          id="at-a-glance"
          index={n("at-a-glance")}
          eyebrow="Rates & times"
          title="Shipping at a glance"
          intro={`Delivery estimates are in business days, counted from dispatch. All charges are in Australian dollars (${site.currency}).`}
        >
          <DataTable
            caption="Rates and delivery times"
            head={[
              "Region",
              "Standard delivery",
              "Standard shipping",
              "Complimentary on orders over",
              "Express delivery",
            ]}
            rows={regions.map((r) => [
              <a
                key="region"
                href={`#${slugify(r.region)}`}
                className="underline decoration-1 underline-offset-[3px] transition-colors duration-500 hover:text-olive-500"
              >
                {r.region}
              </a>,
              r.standard,
              r.standardCost,
              r.freeOver ? formatPrice(r.freeOver) : <Dash key="free" label="Not offered" />,
              r.express ? expressTerms(r) : <Dash key="express" label="Not available" />,
            ])}
            minWidth={780}
            note={`Allow ${shipping.processing} for us to prepare your order before it is dispatched. Complimentary shipping applies to standard delivery.`}
          />
        </ServiceSection>

        <ServiceSection
          id="processing-times"
          index={n("processing-times")}
          eyebrow="Before dispatch"
          title="Processing times"
          intro={`We prepare every order within ${shipping.processing}.`}
        >
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
            <Prose className="md:col-span-7">
              <p>{shipping.processingNote}</p>
              <p>
                Business days are Monday to Friday, excluding public holidays. As soon as your
                order is on its way, we’ll email you a tracking link.
              </p>
            </Prose>
            <Figure
              className="md:col-span-5"
              src="/img/packaging.jpg"
              alt="A kraft box holding folded cream fabric, tied with cream ribbon and an olive tag"
              ratio="4/3"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>

          <Callout title="Pre-orders" className="mt-12">
            <p>
              Pieces available to pre-order show an estimated dispatch time on their product page,
              and are charged when you place your order.
            </p>
            <p>
              If your order includes pre-order and in-stock pieces, we send the in-stock pieces as
              soon as they’re ready and the pre-order piece separately when it arrives — at no
              extra shipping charge.
            </p>
          </Callout>
        </ServiceSection>

        <ServiceSection
          id="delivery-by-region"
          index={n("delivery-by-region")}
          eyebrow="Where we deliver"
          title="Delivery by region"
          intro={`How long delivery takes, what it costs and who carries your parcel.${
            expressRegions.length
              ? ` Express delivery is currently available within ${listJoin(expressRegions)}.`
              : ""
          }`}
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 xl:grid-cols-2">
            {regions.map((r) => (
              <div key={r.region} id={slugify(r.region)}>
                <SubHeading>{r.region}</SubHeading>
                <DetailList className="mt-5" items={regionDetails(r)} />
              </div>
            ))}
          </div>
        </ServiceSection>

        <ServiceSection
          id="tracking"
          index={n("tracking")}
          eyebrow="Following your parcel"
          title="Tracking your order"
          intro="Every order is sent with tracking, so you can follow it all the way to your door."
        >
          <Prose>
            <p>
              As soon as your order is dispatched, we’ll email you a tracking link. You can also
              check its progress at any time on <Link href="/track-order">Track My Order</Link>,
              using your order number and the email address you ordered with.
            </p>
            <p>
              Orders within {domestic.region} travel with {domestic.carrier}; international orders
              travel with {listJoin(internationalCarriers)}.
            </p>
            <p>
              If your order is sent in more than one parcel — for example, when it includes a
              pre-order piece — we’ll send tracking for each.
            </p>
            <p>
              Tracking can take a little time to update after dispatch. If it hasn’t moved for
              several business days, or shows your parcel as delivered when it hasn’t arrived,{" "}
              <Link href="/contact">contact us</Link> and we’ll look into it with the carrier.
            </p>
          </Prose>
        </ServiceSection>

        <ServiceSection
          id="duties-and-taxes"
          index={n("duties-and-taxes")}
          eyebrow="International orders"
          title="Duties & taxes"
          intro="International orders are sent delivered duties unpaid (DDU). Here’s what that means for you."
        >
          <Prose>
            <p>
              <strong>Within {domestic.region}:</strong> {domestic.duties}
            </p>
            <p>
              <strong>Everywhere else:</strong> unless your region’s note below says otherwise, any
              import duties, taxes (such as VAT or GST) and customs fees are set by your country’s
              customs authority. They aren’t included in our prices or shipping charges, and are
              payable by the recipient when the parcel arrives. The carrier may contact you to
              arrange payment before delivery.
            </p>
            <p>
              Thresholds and rates differ between countries and change from time to time, so we
              can’t tell you in advance exactly what you’ll pay. Your local customs office can
              advise.
            </p>
          </Prose>

          <DataTable
            className="mt-12"
            caption="What to expect by region"
            head={["Region", "Duties & taxes"]}
            rows={international.map((r) => [r.region, r.duties])}
            minWidth={480}
          />
        </ServiceSection>

        <ServiceSection
          id="customs"
          index={n("customs")}
          eyebrow="Paperwork"
          title="Customs information"
          intro="What travels with your parcel, and what to expect at the border."
        >
          <DetailList
            items={[
              {
                term: "Commercial invoice",
                detail:
                  "Every international parcel travels with a commercial invoice listing its contents and their value.",
              },
              {
                term: "Declared value",
                detail:
                  "Orders are declared at their full value — the price you paid. We’re unable to mark orders as gifts or declare a lower value.",
              },
              {
                term: "Inspections",
                detail:
                  "Customs may hold a parcel for inspection, which can add to delivery times. These checks are outside our control, but we’ll help however we can.",
              },
              {
                term: "Refused parcels",
                detail: (
                  <>
                    If duties and taxes go unpaid or a delivery is refused, the carrier may hold the
                    parcel or return it to us. Please contact us before refusing a delivery. Our{" "}
                    <Link href="/shipping-policy">Shipping Policy</Link> explains how refused
                    parcels are handled.
                  </>
                ),
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="delays-and-addresses"
          index={n("delays-and-addresses")}
          eyebrow="Good to know"
          title="Delays & addresses"
        >
          <DetailList
            items={[
              {
                term: "Public holidays",
                detail:
                  "Delivery estimates count business days only, so weekends and public holidays — in Australia and at your destination — aren’t included.",
              },
              {
                term: "Delays",
                detail:
                  "Estimates are a guide rather than a guarantee. Carrier networks, customs checks, severe weather and busy periods, such as the weeks before Christmas, can occasionally add time.",
              },
              {
                term: "Your address",
                detail:
                  "Please check your delivery address carefully before you place your order. If you spot a mistake, contact us straight away — we can usually correct it if your order hasn’t yet been dispatched.",
              },
              {
                term: "After dispatch",
                detail:
                  "Once a parcel is with the carrier, we may not be able to change its address. A parcel returned to us because of an incorrect or incomplete address may need to be re-sent, and further shipping charges may apply.",
              },
              {
                term: "Damaged in transit",
                detail: (
                  <>
                    If your parcel arrives damaged, keep the packaging and email{" "}
                    <a href={`mailto:${site.email.care}`}>{site.email.care}</a> within{" "}
                    {returns.faultyReportDays} days of delivery, with photos. See{" "}
                    <Link href="/returns-and-exchanges#faulty">damaged or faulty items</Link>.
                  </>
                ),
              },
            ]}
          />
        </ServiceSection>

        <HelpPrompt title="A question about your delivery?">
          <p>
            For anything not covered here, our Client Services team is happy to help. Our{" "}
            <Link href="/shipping-policy">Shipping Policy</Link> sets out the full terms.
          </p>
        </HelpPrompt>
      </ServiceSections>
    </ServiceShell>
  );
}
