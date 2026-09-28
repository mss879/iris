import type { Metadata } from "next";
import Link from "next/link";
import ServiceShell from "@/components/ui/ServiceShell";
import Prose from "@/components/ui/Prose";
import { returns, site } from "@/lib/site";
import {
  Callout,
  DetailList,
  Facts,
  HelpPrompt,
  JumpNav,
  ServiceSection,
  ServiceSections,
  Steps,
  SubHeading,
  sectionIndex,
  type JumpLink,
} from "@/components/services/ServiceBlocks";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: `Return or exchange unworn IrisandMe pieces within ${returns.windowDays} days of delivery. Eligibility, exchanges, refunds, sale items, international returns, return postage and faulty items explained.`,
};

const toc: JumpLink[] = [
  { id: "return-period", label: "Return period" },
  { id: "eligibility", label: "Eligibility" },
  { id: "how-to-return", label: "How to start a return" },
  { id: "exchanges", label: "Exchanges" },
  { id: "refunds", label: "Refunds" },
  { id: "return-postage", label: "Return postage" },
  { id: "international-returns", label: "International returns" },
  { id: "sale-items", label: "Sale items" },
  { id: "faulty", label: "Damaged or faulty items" },
];
const n = (id: string) => sectionIndex(toc, id);

const careEmail = <a href={`mailto:${site.email.care}`}>{site.email.care}</a>;

const returnSteps = [
  {
    title: "Get in touch",
    body: (
      <p>
        Email {careEmail} with your order number, the pieces you’re returning and the reason — and,
        for an exchange, the size you’d like instead. You can also start a return from the Returns
        section of <Link href="/account">your account</Link>.
      </p>
    ),
  },
  {
    title: "Receive your instructions",
    body: (
      <p>
        We’ll reply {site.responseTime} with your return instructions. For returns within
        Australia, these include a prepaid return label.
      </p>
    ),
  },
  {
    title: "Pack your pieces",
    body: (
      <p>
        Fold each piece with its tags still attached, in its original packaging if you can, and
        include a note with your order number.
      </p>
    ),
  },
  {
    title: "Send it back",
    body: (
      <p>
        Attach your prepaid label or, from outside Australia, send your parcel with a tracked
        service. Keep your receipt and tracking number until your return is complete.
      </p>
    ),
  },
  {
    title: "We take it from there",
    body: (
      <p>
        Once your return arrives, we process it within {returns.processingDays}. Refunds go back to
        your original payment method and can take {returns.refundDays} to appear; exchanges are
        sent out once your return has been processed.
      </p>
    ),
  },
];

export default function ReturnsAndExchangesPage() {
  return (
    <ServiceShell
      current="/returns-and-exchanges"
      title="Returns & Exchanges"
      intro={
        <p>
          If something isn’t quite right, you have {returns.windowDays} days from delivery to
          return or exchange it. Here’s how it works — from what can be returned to when your
          refund arrives. Ready to begin?{" "}
          <a
            href="#how-to-return"
            className="text-olive-800 underline decoration-1 underline-offset-[3px] transition-colors duration-500 hover:text-olive-500"
          >
            Start a return
          </a>
          .
        </p>
      }
    >
      <ServiceSections>
        <JumpNav items={toc} />

        <ServiceSection
          id="return-period"
          index={n("return-period")}
          eyebrow="At a glance"
          title="Return period"
          intro={`You have ${returns.windowDays} days from the day your order is delivered to start a return or exchange.`}
        >
          <Facts
            columns={2}
            items={[
              {
                term: "Return window",
                detail: `${returns.windowDays} days`,
                note: "From the day your order is delivered.",
              },
              {
                term: "Exchanges",
                detail: "Size exchanges",
                note: "Subject to availability, within the return window.",
              },
              {
                term: "Refunds",
                detail: "To your original payment method",
                note: `Processed within ${returns.processingDays} of your return arriving.`,
              },
              {
                term: "Faulty items",
                detail: `Tell us within ${returns.faultyReportDays} days`,
                note: "We cover return postage and put it right.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="eligibility"
          index={n("eligibility")}
          eyebrow="What can be returned"
          title="Eligibility"
          intro="For a change-of-mind return or exchange, pieces need to come back to us as they arrived."
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
            <div>
              <SubHeading>Eligible</SubHeading>
              <Prose className="mt-5">
                <ul>
                  <li>Unworn, unwashed and unaltered</li>
                  <li>With all original tags attached</li>
                  <li>Free of marks, make-up and scents</li>
                  <li>Started within {returns.windowDays} days of delivery</li>
                  <li>In their original packaging, where possible</li>
                </ul>
              </Prose>
            </div>
            <div>
              <SubHeading>Not eligible</SubHeading>
              <Prose className="mt-5">
                <ul>
                  <li>Sale pieces, which are final sale</li>
                  <li>Pieces that have been worn, washed or altered</li>
                  <li>Pieces with their tags removed</li>
                  <li>Gift cards</li>
                </ul>
              </Prose>
            </div>
          </div>

          <Callout className="mt-12">
            <p>
              These conditions apply to change-of-mind returns. If a piece is faulty, you’re always
              entitled to a remedy — see <a href="#faulty">damaged or faulty items</a>.
            </p>
          </Callout>
        </ServiceSection>

        <ServiceSection
          id="how-to-return"
          index={n("how-to-return")}
          eyebrow="Step by step"
          title="How to start a return"
          intro={`Start within ${returns.windowDays} days of delivery. It only takes a few minutes, and we’ll guide you through each step.`}
        >
          <Steps items={returnSteps} />
        </ServiceSection>

        <ServiceSection
          id="exchanges"
          index={n("exchanges")}
          eyebrow="A different size"
          title="Exchanges"
        >
          <Prose>
            <p>
              We offer size exchanges within {returns.windowDays} days of delivery, subject to
              availability. Just tell us the size you’d like when you start your return.
            </p>
            <p>If the size you’d like is unavailable, we’ll refund the original piece instead.</p>
            <p>
              Exchanges are for a different size of the same piece. If you’d prefer something
              else, return the original for a refund and place a new order.
            </p>
            <p>
              Your new size is sent as soon as your return has arrived and been processed. For
              postage, see <a href="#return-postage">return postage</a>.
            </p>
          </Prose>
        </ServiceSection>

        <ServiceSection id="refunds" index={n("refunds")} eyebrow="Back to you" title="Refunds">
          <Prose>
            <p>Refunds are made to your original payment method.</p>
            <p>
              Once your return arrives, we process it within {returns.processingDays} and let you
              know by email when your refund has been issued. Depending on your bank or payment
              provider, it can then take {returns.refundDays} to appear in your account.
            </p>
            <p>
              What is refunded depends on where your order was delivered: see{" "}
              <a href="#return-postage">return postage</a> for returns within Australia, and{" "}
              <a href="#international-returns">international returns</a> for orders delivered
              overseas.
            </p>
          </Prose>
        </ServiceSection>

        <ServiceSection
          id="return-postage"
          index={n("return-postage")}
          eyebrow="Sending it back"
          title="Return postage"
        >
          <DetailList
            items={[
              { term: "Within Australia", detail: returns.domesticLabel },
              { term: "From overseas", detail: returns.internationalPostage },
              {
                term: "Faulty items",
                detail: "We cover return postage for faulty items, wherever you are.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="international-returns"
          index={n("international-returns")}
          eyebrow="Outside Australia"
          title="International returns"
          intro={`International customers can return or exchange pieces within the same ${returns.windowDays}-day window, on the same conditions.`}
        >
          <DetailList
            items={[
              { term: "Postage & charges", detail: returns.internationalPostage },
              {
                term: "Tracking",
                detail:
                  "Send your return with a tracked service, and keep the tracking number until your return has been processed — an untracked parcel can’t be traced if it goes astray.",
              },
              {
                term: "Customs",
                detail:
                  "Your return instructions will explain how to label your parcel for customs, so it’s recognised as a returned item.",
              },
              {
                term: "Exchanges",
                detail:
                  "Size exchanges are available internationally too, subject to availability. We’ll confirm the details when you get in touch.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="sale-items"
          index={n("sale-items")}
          eyebrow="Final sale"
          title="Sale items"
        >
          <Prose>
            <p>
              Pieces bought on sale are final sale: they can’t be returned or exchanged for a change
              of mind.
            </p>
            <p>
              This never affects your rights if a sale piece is faulty — you’re still entitled to a
              repair, replacement or refund. See <a href="#faulty">damaged or faulty items</a>.
            </p>
          </Prose>
        </ServiceSection>

        <ServiceSection
          id="faulty"
          index={n("faulty")}
          eyebrow="Putting it right"
          title="Damaged or faulty items"
          intro="If a piece arrives damaged or develops a fault, we’ll put it right."
        >
          <Prose>
            <p>
              Email {careEmail} within {returns.faultyReportDays} days of delivery with your order
              number, a short description and photos of the fault — and of the packaging, if the
              parcel was damaged in transit.
            </p>
            <p>We’ll cover the return postage and offer a repair, replacement or refund.</p>
          </Prose>

          <Callout title="Your rights under the Australian Consumer Law" className="mt-12">
            <p>
              Our goods come with guarantees that cannot be excluded under the Australian Consumer
              Law. Whatever our change-of-mind policy says — including for sale pieces — if an item
              is faulty, you are entitled to a remedy: a repair, replacement or refund. For a major
              failure, you can choose a refund or a replacement.
            </p>
            <p>
              Asking you to tell us within {returns.faultyReportDays} days simply helps us put
              things right quickly. It doesn’t limit these rights.
            </p>
          </Callout>

          <SubHeading className="mt-14">What isn’t a fault</SubHeading>
          <Prose className="mt-5">
            <p>
              Natural fibres and handcraft have their own character. Small slubs in linen and slight
              variations in hand block-printed pieces are part of how the fabric is made, rather
              than faults. Everyday wear over time, or damage from care that differs from the care
              label, isn’t considered a fault either.
            </p>
            <p>If you’re unsure, send us a photo — we’re happy to take a look.</p>
          </Prose>
        </ServiceSection>

        <HelpPrompt title="Need help with a return?">
          <p>
            Our Client Services team can help you start a return, choose a new size or check on a
            refund. For the full terms, read our <Link href="/returns-policy">Returns Policy</Link>.
          </p>
        </HelpPrompt>
      </ServiceSections>
    </ServiceShell>
  );
}
