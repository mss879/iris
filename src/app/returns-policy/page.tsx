import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { type LegalSection } from "@/components/ui/LegalShell";
import { returns, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: `IrisandMe’s returns and refund policy: ${returns.windowDays}-day change-of-mind returns, exchanges, refunds, faulty items and your rights under the Australian Consumer Law.`,
};

const UPDATED = "28 September 2026";
const domain = site.url.replace(/^https?:\/\//, "");

function Email({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
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
          This Returns &amp; Refund Policy applies to purchases made on {domain} and forms part of
          our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>. If you bought an
          IrisandMe piece from one of our stockists, please contact that stockist, as its own
          returns policy will apply.
        </p>
        <p>
          Timeframes in this policy are in business days — Monday to Friday, excluding public
          holidays — unless we say otherwise.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights under the Australian Consumer Law",
    content: (
      <>
        <p>
          <strong>
            Our goods come with guarantees that cannot be excluded under the Australian Consumer
            Law. You are entitled to a replacement or refund for a major failure and compensation
            for any other reasonably foreseeable loss or damage. You are also entitled to have the
            goods repaired or replaced if the goods fail to be of acceptable quality and the failure
            does not amount to a major failure.
          </strong>
        </p>
        <p>
          In practice, this means that if a piece is faulty, unsafe, doesn’t match its description
          or isn’t of acceptable quality, you’re entitled to a remedy — even if you bought it on
          sale. These rights don’t end when our change-of-mind period does; they last for as long as
          is reasonable for the piece, taking into account its nature and price.
        </p>
        <p>
          Nothing in this policy excludes, restricts or modifies those rights. Our change-of-mind
          returns are offered in addition to them.
        </p>
        <p>
          <strong>If you live outside Australia</strong>, you may also have rights under the
          consumer laws of your own country — for example, if you live in the United Kingdom or the
          European Union, a legal right to cancel an online order within 14 days of delivery.
          Nothing in this policy limits those rights.
        </p>
      </>
    ),
  },
  {
    id: "change-of-mind",
    title: "Change-of-mind returns",
    content: (
      <>
        <p>
          If you change your mind, you can return eligible pieces within {returns.windowDays} days
          of the day your order is delivered, for an exchange or a refund. Please start your return
          and post the pieces back to us within this period — see{" "}
          <a href="#how-to-return">How to start a return</a>.
        </p>
        <p>
          For pre-order pieces, the {returns.windowDays} days start from the day the pre-order piece
          is delivered.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "What can be returned",
    content: (
      <>
        <p>To be eligible for a change-of-mind return or exchange, pieces must be:</p>
        <ul>
          <li>unworn, unwashed and unaltered;</li>
          <li>free from make-up, perfume, deodorant and other marks or odours;</li>
          <li>returned with all original tags attached; and</li>
          <li>returned in their original packaging.</li>
        </ul>
        <p>We can’t accept change-of-mind returns of:</p>
        <ul>
          <li>pieces bought on sale, or marked as final sale;</li>
          <li>gift cards; or</li>
          <li>
            pieces that can’t be returned for hygiene reasons, such as earrings or intimates, if we
            offer them. These will always be clearly marked as final sale on the product page.
          </li>
        </ul>
        <p>
          These exclusions apply to change of mind only. If a piece is faulty, your rights under the
          Australian Consumer Law still apply — see{" "}
          <a href="#faulty-items">Faulty or damaged items</a>.
        </p>
      </>
    ),
  },
  {
    id: "exchanges",
    title: "Exchanges",
    content: (
      <ul>
        <li>
          If a piece doesn’t fit, you can exchange it for a different size of the same piece within
          the {returns.windowDays}-day return period, subject to availability.
        </li>
        <li>
          If the size you’d like isn’t available, we’ll let you know, and you can choose a refund
          instead.
        </li>
        <li>
          To change to a different piece or colour, please return the original for a refund and
          place a new order.
        </li>
        <li>
          Postage for exchanges is explained in <a href="#return-postage">Return postage</a>. If
          you’re outside Australia, import duties and taxes may also apply when your new size is
          delivered.
        </li>
      </ul>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    content: (
      <>
        <ul>
          <li>
            Once your return reaches us, we’ll inspect it and process it within{" "}
            {returns.processingDays}, and email you to let you know.
          </li>
          <li>
            Approved refunds are made to your original payment method and usually appear within{" "}
            {returns.refundDays}, depending on your bank or payment provider.
          </li>
          <li>
            If you paid with a digital wallet or a buy now, pay later service, your refund is
            returned through that provider, in line with its terms. If you paid with an IrisandMe
            gift card, the refunded amount is returned to your gift card.
          </li>
          <li>
            Refunds are made in Australian dollars. If your bank converted your payment from
            another currency, the amount you receive may differ because of exchange rates and your
            bank’s fees.
          </li>
        </ul>
        <h3>What isn’t refunded</h3>
        <p>For change-of-mind returns, we don’t refund:</p>
        <ul>
          <li>original delivery charges, including express delivery;</li>
          <li>import duties, taxes and customs charges on international orders; or</li>
          <li>
            the cost of return postage — for returns within Australia, this is deducted from your
            refund, as explained in <a href="#return-postage">Return postage</a>.
          </li>
        </ul>
        <p>
          These deductions apply to change-of-mind returns only. If a piece is faulty or not as
          described, see <a href="#faulty-items">Faulty or damaged items</a>.
        </p>
      </>
    ),
  },
  {
    id: "return-postage",
    title: "Return postage",
    content: (
      <>
        <h3>Within Australia</h3>
        <p>{returns.domesticLabel}</p>
        <h3>From outside Australia</h3>
        <p>{returns.internationalPostage}</p>
        <p>
          Wherever you are, please keep your proof of postage and tracking number until your return
          has been processed — we’ll need them if your parcel goes astray.
        </p>
        <h3>Faulty items</h3>
        <p>
          If you’re returning a piece because it’s faulty, damaged or not as described, we’ll cover
          the cost of return postage, wherever you are — see{" "}
          <a href="#faulty-items">Faulty or damaged items</a>.
        </p>
      </>
    ),
  },
  {
    id: "faulty-items",
    title: "Faulty or damaged items",
    content: (
      <>
        <p>We take great care with every piece, but if something isn’t right, we want to hear about it.</p>
        <ol>
          <li>
            Contact us at <Email address={site.email.care} /> — ideally within{" "}
            {returns.faultyReportDays} days of delivery — with your order number, a short
            description of the problem and photos showing the fault or damage (and the packaging, if
            the damage happened in transit).
          </li>
          <li>
            We’ll review the details and, if we need the piece back, arrange its return at our cost.
          </li>
          <li>
            If the piece is faulty, we’ll repair it, replace it or refund you, in line with the
            Australian Consumer Law. If the problem is a major failure, you can choose a replacement
            or a refund.
          </li>
        </ol>
        <p>
          We ask you to report problems within {returns.faultyReportDays} days so we can resolve
          them quickly — particularly damage in transit, which we need to raise with our delivery
          partners. This timeframe doesn’t limit your rights: if a fault appears later, please still
          contact us, and we’ll assess it under the Australian Consumer Law.
        </p>
        <p>If we’ve sent you the wrong piece or size, let us know and we’ll put it right at no cost to you.</p>
        <h3>What isn’t a fault</h3>
        <ul>
          <li>
            the natural characteristics of linen, cotton and other natural fibres, such as slubs,
            subtle variations in tone and creasing;
          </li>
          <li>the small variations that make each hand-printed piece individual;</li>
          <li>normal wear and tear; and</li>
          <li>
            damage caused by not following the care label — for example, washing at too high a
            temperature — or by accidents or alterations after delivery.
          </li>
        </ul>
        <p>
          Our <Link href="/garment-care">Garment Care</Link> guide has advice on looking after your
          pieces so they last.
        </p>
      </>
    ),
  },
  {
    id: "how-to-return",
    title: "How to start a return",
    content: (
      <ol>
        <li>
          <strong>Get in touch within {returns.windowDays} days of delivery.</strong> Email{" "}
          <Email address={site.email.care} /> or use our <Link href="/contact">contact form</Link>.
          Include your order number, the pieces you’re returning, and whether you’d like an
          exchange (and which size) or a refund.
        </li>
        <li>
          <strong>Receive your return instructions.</strong> We’ll reply {site.responseTime} with
          everything you need, including a prepaid label for returns within Australia.
        </li>
        <li>
          <strong>Pack your return carefully</strong>, with tags attached and in the original
          packaging, and include a note with your order number.
        </li>
        <li>
          <strong>Send it back within {returns.windowDays} days of delivery</strong>, and keep your
          proof of postage and tracking number.
        </li>
        <li>
          <strong>We’ll take it from there.</strong> Once your return arrives, we’ll process it
          within {returns.processingDays} and email you when your new size is on its way or your
          refund has been issued.
        </li>
      </ol>
    ),
  },
  {
    id: "inspection",
    title: "Inspection and rejected returns",
    content: (
      <>
        <p>
          We inspect every return when it arrives. If a piece doesn’t meet the conditions in{" "}
          <a href="#eligibility">What can be returned</a> — for example, if it has been worn,
          washed or altered, or its tags have been removed — or it arrives after the return period,
          we may not be able to accept it. We’ll let you know and arrange to send the piece back to
          you; return delivery charges may apply.
        </p>
        <p>
          If you think we’ve made a mistake, please contact us — we’re always happy to take another
          look. This section doesn’t apply to faulty pieces, which we assess under the Australian
          Consumer Law.
        </p>
      </>
    ),
  },
  {
    id: "gift-returns",
    title: "Returning a gift",
    content: (
      <>
        <p>
          If you received an IrisandMe piece as a gift, you can return or exchange it within{" "}
          {returns.windowDays} days of delivery, under the same conditions as any other return.
          You’ll need the order number — the person who sent the gift can find it in their order
          confirmation email.
        </p>
        <p>
          Rather than refunding the original purchaser, we’ll issue store credit to you, the gift
          recipient, for the value of the returned piece. Exchanges for a different size work in
          the usual way.
        </p>
        <p>
          If a gift turns out to be faulty, please contact us — the recipient of a gift is also
          protected by the Australian Consumer Law.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        For help with a return, exchange or refund, email <Email address={site.email.care} />{" "}
        with your order number, or use our <Link href="/contact">contact form</Link>. Our Client
        Services team is available {site.hours}.
      </p>
    ),
  },
];

export default function ReturnsPolicyPage() {
  return (
    <LegalShell
      current="/returns-policy"
      title="Returns & Refund Policy"
      updated={UPDATED}
      intro={
        <>
          We want you to love every IrisandMe piece. If something isn’t right, this policy explains
          your options — and your rights. For a quick, friendly overview, see our{" "}
          <Link href="/returns-and-exchanges" className={introLink}>
            Returns &amp; Exchanges
          </Link>{" "}
          guide.
        </>
      }
      sections={sections}
    />
  );
}
