import type { Metadata } from "next";
import Link from "next/link";
import ServiceShell from "@/components/ui/ServiceShell";
import FeatureGrid from "@/components/ui/FeatureGrid";
import Prose from "@/components/ui/Prose";
import { returns, shipping, site } from "@/lib/site";
import ContactForm from "./_components/ContactForm";
import {
  Facts,
  ServiceSection,
  ServiceSections,
  sectionIndex,
  type JumpLink,
} from "@/components/services/ServiceBlocks";
import { capitalise } from "@/components/services/facts";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the IrisandMe Client Services team about an order, sizing and fit, returns or anything else. We reply to every message ${site.responseTime}.`,
};

const toc: JumpLink[] = [
  { id: "contact-details", label: "Contact details" },
  { id: "send-a-message", label: "Send us a message" },
  { id: "sizing-assistance", label: "Sizing & fit assistance" },
  { id: "order-assistance", label: "Order assistance" },
  { id: "other-enquiries", label: "Other enquiries" },
];
const n = (id: string) => sectionIndex(toc, id);

export default function ContactPage() {
  return (
    <ServiceShell
      current="/contact"
      title="Contact"
      eyebrow="Client Services"
      intro={
        <p>
          Whether it’s a question about sizing, an order on its way or a piece you’re
          considering, our Client Services team is here to help. We reply to every message{" "}
          {site.responseTime}.
        </p>
      }
    >
      <ServiceSections>
        <ServiceSection
          id="contact-details"
          index={n("contact-details")}
          eyebrow="Speak with us"
          title="Contact details"
        >
          <Facts
            size="small"
            items={[
              {
                term: "Email",
                detail: <a href={`mailto:${site.email.care}`}>{site.email.care}</a>,
                note: "For orders, sizing, returns and general questions.",
              },
              { term: "Hours", detail: site.hours },
              {
                term: "Response time",
                detail: capitalise(site.responseTime),
                note: "We reply to every message by email.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="send-a-message"
          index={n("send-a-message")}
          eyebrow="Write to us"
          title="Send us a message"
          intro={`Tell us a little about what you need and we’ll reply ${site.responseTime}. If your message is about an order, please include your order number.`}
        >
          <ContactForm />
        </ServiceSection>

        <ServiceSection
          id="sizing-assistance"
          index={n("sizing-assistance")}
          eyebrow="Sizing & fit"
          title="Sizing & fit assistance"
          intro="Between sizes, or unsure how a piece will sit? We’re happy to help you choose."
        >
          <Prose>
            <p>To recommend a size, it helps to know:</p>
            <ul>
              <li>Your height</li>
              <li>The size you usually wear — in IrisandMe, or in another label you know well</li>
              <li>Your bust, waist and hip measurements, if you have them</li>
              <li>
                The piece you’re considering, and whether you like a closer or a more relaxed fit
              </li>
            </ul>
            <p>
              Our <Link href="/size-and-fit">Size &amp; Fit</Link> guide has size charts for AU,
              UK, US and EU sizing, garment measurements for key pieces and a guide to{" "}
              <Link href="/size-and-fit#how-to-measure">measuring yourself</Link>.
            </p>
          </Prose>
        </ServiceSection>

        <ServiceSection
          id="order-assistance"
          index={n("order-assistance")}
          eyebrow="Orders"
          title="Order assistance"
          intro="Include your order number in your message so we can find your order straight away."
        >
          <FeatureGrid
            columns={2}
            numbered={false}
            items={[
              {
                title: "Tracking an order",
                body: "We email a tracking link as soon as your order is dispatched. You can also check its progress with your order number and email address.",
                href: "/track-order",
                linkLabel: "Track my order",
              },
              {
                title: "Changes & cancellations",
                body: `Orders are prepared within ${shipping.processing}, so please get in touch as soon as possible if you need to change or cancel an order. We’ll do our best to help before it’s dispatched.`,
                href: "#send-a-message",
                linkLabel: "Send us a message",
              },
              {
                title: "Delivery questions",
                body: "Delivery times, shipping charges, tracking, duties and customs information for every region we deliver to.",
                href: "/shipping-and-delivery",
                linkLabel: "Shipping & delivery",
              },
              {
                title: "Returns & exchanges",
                body: `Return or exchange unworn pieces within ${returns.windowDays} days of delivery. Faulty items are always put right.`,
                href: "/returns-and-exchanges",
                linkLabel: "Returns & exchanges",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="other-enquiries"
          index={n("other-enquiries")}
          eyebrow="Press & stockists"
          title="Other enquiries"
        >
          <Facts
            size="small"
            items={[
              {
                term: "Press",
                detail: <a href={`mailto:${site.email.press}`}>{site.email.press}</a>,
                note: (
                  <>
                    For press and media enquiries. See also our{" "}
                    <Link href="/press">Press</Link> page.
                  </>
                ),
              },
              {
                term: "Stockists",
                detail: <a href={`mailto:${site.email.stockists}`}>{site.email.stockists}</a>,
                note: (
                  <>
                    For stockist enquiries. Our <Link href="/stockists">Stockists</Link> page shows
                    where to find IrisandMe.
                  </>
                ),
              },
              {
                term: "Follow along",
                detail: <a href={site.social.instagram}>{site.handle}</a>,
                note: (
                  <>
                    On <a href={site.social.instagram}>Instagram</a> and{" "}
                    <a href={site.social.facebook}>Facebook</a>. For anything about an order,
                    email is the best way to reach us.
                  </>
                ),
              },
            ]}
          />
        </ServiceSection>
      </ServiceSections>
    </ServiceShell>
  );
}
