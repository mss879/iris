import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { type LegalSection } from "@/components/ui/LegalShell";
import DataTable from "@/components/ui/DataTable";
import { formatPrice, returns, shipping, site, type Region } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "IrisandMe’s shipping terms: processing times, delivery rates and estimates for Australia and international destinations, duties and taxes, tracking, and what happens if a parcel is lost or damaged.",
};

const UPDATED = "28 September 2026";
const domain = site.url.replace(/^https?:\/\//, "");

/* Everything below is read from the delivery table in site.ts, so this policy
   can never quote a rate or carrier the checkout doesn't. */
const regions: readonly Region[] = shipping.regions;
const domestic = regions.find((r) => r.region === site.country);
const international = regions.filter((r) => r !== domestic);
const complimentary = regions.flatMap((r) =>
  r.freeOver ? [{ region: r.region, over: r.freeOver }] : []
);
const notComplimentary = regions.filter((r) => !r.freeOver).map((r) => r.region);
const restOfWorld = regions.find((r) => r.region === "Rest of World");

function listJoin(items: readonly string[]) {
  return items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const internationalCarriers = listJoin([...new Set(international.map((r) => r.carrier))]);

function Email({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}

function Rate({ cost, time }: { cost: string; time: string }) {
  return (
    <>
      <span className="block text-olive-800">{cost}</span>
      <span className="block">{time}</span>
    </>
  );
}

const introLink =
  "underline decoration-1 underline-offset-[3px] transition-colors duration-500 hover:text-olive-800";

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About this policy",
    content: (
      <>
        <p>
          This Shipping Policy applies to orders placed on {domain} and forms part of our{" "}
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>. It explains how and
          when we dispatch orders, where we deliver, what delivery costs and what happens if
          something goes wrong on the way to you.
        </p>
        <p>
          Timeframes in this policy are in business days — Monday to Friday, excluding public
          holidays. Nothing in this policy affects your rights under the Australian Consumer Law.
        </p>
      </>
    ),
  },
  {
    id: "processing",
    title: "Processing times",
    content: (
      <>
        <p>
          Orders are usually prepared for dispatch within {shipping.processing}.{" "}
          {shipping.processingNote}
        </p>
        <p>
          During busy periods, such as new collection launches and the lead-up to the holidays,
          processing can take a little longer. If your order will be significantly delayed, we’ll
          let you know.
        </p>
        <p>
          Pre-order pieces are dispatched in line with the estimate shown on the product page — see{" "}
          <a href="#pre-orders">Pre-orders and split shipments</a>.
        </p>
      </>
    ),
  },
  {
    id: "destinations-and-rates",
    title: "Destinations, rates and estimates",
    content: (
      <>
        <p>
          We deliver to the destinations below. Delivery charges are shown at checkout before you
          pay. Delivery estimates start from the day your order is dispatched, so please allow for
          processing time as well.
        </p>
        <DataTable
          caption="Delivery rates and estimates by destination"
          head={["Destination", "Standard", "Express", "Complimentary", "Carrier"]}
          rows={regions.map((r) => [
            r.region,
            <Rate key="standard" cost={r.standardCost} time={r.standard} />,
            r.express && r.expressCost ? (
              <Rate key="express" cost={r.expressCost} time={r.express} />
            ) : (
              "Not available"
            ),
            r.freeOver ? `Standard, on orders over ${formatPrice(r.freeOver)}` : "Not available",
            r.carrier,
          ])}
          minWidth={540}
          note={`Charges are in Australian dollars (${site.currency}). Estimates are in business days from dispatch and are not guaranteed.`}
        />
        {restOfWorld ? (
          <p>
            If your country isn’t named in the table, the {restOfWorld.region} rate applies. The
            rate for your address is confirmed at checkout.
          </p>
        ) : null}
        <p>
          If we’re unable to deliver to your country or address, we’ll let you know and refund your
          order in full.
        </p>
      </>
    ),
  },
  {
    id: "complimentary-delivery",
    title: "Complimentary delivery",
    content: (
      <>
        <p>
          Standard delivery is complimentary when your order is over the amount shown for your
          destination:
        </p>
        <ul>
          {complimentary.map((c) => (
            <li key={c.region}>
              <strong>{c.region}:</strong> orders over {formatPrice(c.over)}
            </li>
          ))}
        </ul>
        <p>
          Thresholds are in Australian dollars. Complimentary delivery applies to standard delivery
          only; express delivery, where available, is charged at the rate shown above.
          Complimentary delivery doesn’t cover any import duties or taxes payable in your country.
        </p>
        {notComplimentary.length > 0 ? (
          <p>
            Complimentary delivery isn’t currently available to {listJoin(notComplimentary)}{" "}
            destinations.
          </p>
        ) : null}
      </>
    ),
  },
  {
    id: "delivery-estimates",
    title: "Delivery estimates and delays",
    content: (
      <>
        <p>
          Delivery timeframes are estimates, not guarantees. Most orders arrive within them, but
          delays can happen for reasons outside our control, including:
        </p>
        <ul>
          <li>customs inspection and clearance;</li>
          <li>severe weather, natural disasters and other emergencies;</li>
          <li>industrial action or disruption to our delivery partners’ networks;</li>
          <li>peak periods, such as the weeks before Christmas; and</li>
          <li>incorrect or incomplete delivery details.</li>
        </ul>
        <p>
          We can’t be responsible for delays caused by events beyond our reasonable control, but
          we’ll always help you find out where your parcel is and keep you informed. If your parcel
          is running late, see <a href="#lost-or-damaged">Lost, delayed or damaged parcels</a>.
        </p>
      </>
    ),
  },
  {
    id: "pre-orders",
    title: "Pre-orders and split shipments",
    content: (
      <ul>
        <li>
          Pre-order pieces are dispatched in line with the estimated timeframe shown on the product
          page. You’re charged for them when you place your order.
        </li>
        <li>
          If your order includes both pre-order pieces and pieces that are in stock, we’ll send the
          in-stock pieces first and the pre-order pieces separately once they’re ready. You’ll
          receive tracking details as each parcel is dispatched.
        </li>
        <li>
          If a pre-order dispatch estimate changes, we’ll email you with an update. If you’d rather
          not wait, you can cancel those pieces for a full refund.
        </li>
      </ul>
    ),
  },
  {
    id: "tracking",
    title: "Tracking your order",
    content: (
      <p>
        When your order is dispatched, we’ll email you with its tracking details. You can also
        follow its progress on our <Link href="/track-order">Track My Order</Link> page using your
        order number and email address. Tracking information can take a little time to appear once
        your parcel is with our delivery partner.
      </p>
    ),
  },
  {
    id: "risk-and-title",
    title: "Risk and ownership",
    content: (
      <>
        <p>
          Responsibility for your order — the risk of loss or damage — passes to you when it’s
          delivered to the address you gave us. Ownership of the pieces (title) also passes to you
          on delivery.
        </p>
        <p>
          Until then, your parcel is our responsibility: if it’s lost or damaged in transit, we’ll
          put it right, as explained in{" "}
          <a href="#lost-or-damaged">Lost, delayed or damaged parcels</a>.
        </p>
        <p>
          If you’ve asked for your parcel to be left without a signature, or given our delivery
          partner instructions about where to leave it, it’s treated as delivered once it has been
          left as you instructed.
        </p>
      </>
    ),
  },
  {
    id: "duties-and-taxes",
    title: "Duties, taxes and customs",
    content: (
      <>
        <p>
          Orders delivered outside Australia are sent “delivered duties unpaid” (DDU). This means
          any import duties, taxes (such as VAT or GST) and customs clearance charges set by the
          destination country are the recipient’s responsibility — unless they’ve already been
          collected at checkout — and are usually collected by our delivery partner before or on
          delivery.
        </p>
        <p>By destination:</p>
        <ul>
          {regions.map((r) => (
            <li key={r.region}>
              <strong>{r.region}:</strong> {r.duties}
            </li>
          ))}
        </ul>
        <p>
          These charges are set by customs authorities, not by IrisandMe, so we can’t tell you in
          advance exactly what they’ll be. If you’re unsure, we recommend checking with your local
          customs office before you order.
        </p>
        <p>
          We complete customs declarations accurately, showing the true contents and value of your
          order. We’re unable to mark orders as gifts or declare a lower value.
        </p>
        <h3>Refused or unclaimed parcels</h3>
        <p>
          If duties and taxes aren’t paid, or a parcel is refused or not collected, it may be
          returned to us. Once it’s back with us, we’ll refund you for the pieces returned. The original
          delivery charge, and any costs we incur for the parcel’s return — including return
          shipping and charges imposed by customs or our delivery partner — may be deducted from
          your refund. This doesn’t affect any legal right you have to cancel your order.
        </p>
      </>
    ),
  },
  {
    id: "addresses",
    title: "Delivery addresses and changes",
    content: (
      <ul>
        <li>
          Please check that your delivery address is complete and correct, including any unit or
          apartment number and your postcode, and give us a phone number. Our delivery partners may
          use it to contact you about delivery or customs clearance.
        </li>
        <li>
          We deliver to the address you give us at checkout. If it’s incorrect, we may not be able
          to recover a parcel once it has been delivered there, so please double-check it before
          you pay.
        </li>
        <li>
          If you need to change your delivery address, contact us at{" "}
          <Email address={site.email.care} /> as soon as possible. We can usually update it before
          your order is dispatched, but we can’t guarantee changes once it’s with our delivery
          partner.
        </li>
        <li>
          If a parcel is returned to us because the address was incorrect or incomplete, we’ll
          contact you to arrange delivery again, which may involve an additional delivery charge,
          or a refund of the pieces less delivery costs.
        </li>
      </ul>
    ),
  },
  {
    id: "po-boxes",
    title: "PO boxes and parcel lockers",
    content: (
      <>
        {domestic ? (
          <p>
            Within {domestic.region}, standard delivery with {domestic.carrier} can be sent to a PO
            box or parcel locker. Please enter the address exactly as {domestic.carrier} provides
            it.
          </p>
        ) : null}
        {international.length > 0 ? (
          <p>
            International orders travel with {internationalCarriers}, which needs a street address
            and a contact phone number, and can’t deliver to PO boxes or parcel lockers.
          </p>
        ) : null}
      </>
    ),
  },
  {
    id: "lost-or-damaged",
    title: "Lost, delayed or damaged parcels",
    content: (
      <>
        <h3>Delayed or lost parcels</h3>
        <p>
          If your parcel hasn’t arrived within the estimated timeframe, or its tracking hasn’t
          updated for several business days, please contact us with your order number. We’ll look
          into it with our delivery partner. If your parcel is confirmed lost in transit, we’ll send
          a replacement (if the piece is still available) or refund you in full, including the
          delivery charge.
        </p>
        <h3>Parcels marked as delivered</h3>
        <p>
          If tracking shows your parcel as delivered but you can’t find it, please check around
          your property, with your neighbours and at your local collection point, then contact us
          within {returns.faultyReportDays} days of the delivery date. We’ll investigate with our
          delivery partner.
        </p>
        <h3>Damaged parcels</h3>
        <p>
          If your parcel arrives damaged, or a piece inside is damaged, please contact us within{" "}
          {returns.faultyReportDays} days of delivery with your order number and photos of the
          packaging and the piece. Please keep the packaging until we’ve resolved things. We’ll
          arrange a replacement, repair or refund — and cover the cost of returning the piece — as
          set out in our <Link href="/returns-policy">Returns &amp; Refund Policy</Link>.
        </p>
        <p>
          Reporting within {returns.faultyReportDays} days helps us resolve things quickly with our
          delivery partners. It doesn’t limit your rights under the Australian Consumer Law, so
          please still contact us if you notice a problem later.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        For help with a delivery, email <Email address={site.email.care} /> with your order
        number, or use our <Link href="/contact">contact form</Link>. Our Client Services team is
        available {site.hours}.
      </p>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <LegalShell
      current="/shipping-policy"
      title="Shipping Policy"
      updated={UPDATED}
      intro={
        <>
          The terms on which we deliver IrisandMe orders in Australia and around the world. For a
          quick, friendly overview, see our{" "}
          <Link href="/shipping-and-delivery" className={introLink}>
            Shipping &amp; Delivery
          </Link>{" "}
          guide.
        </>
      }
      sections={sections}
    />
  );
}
