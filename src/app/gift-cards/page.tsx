import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import FeatureGrid from "@/components/ui/FeatureGrid";
import { giftCards } from "@/lib/site";
import GiftCardForm from "./_components/GiftCardForm";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give an IrisandMe digital gift card, delivered by email on the day you choose and valid for three years.",
};

export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Discover"
        title="Gift Cards"
        intro="Let someone choose a piece they will keep for years. A digital gift card, delivered by email on the day you choose."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gift Cards" }]}
      />

      <Section pad="tight">
        <GiftCardForm />
      </Section>

      <Section tone="sand" labelledBy="gift-how">
        <SectionHeading id="gift-how" eyebrow="How it works" title="Simple to give" size="small" className="mb-14" />
        <FeatureGrid
          columns={3}
          items={[
            {
              title: "Choose",
              body: "Pick an amount and write a message. Add as many cards to your bag as you like.",
            },
            {
              title: "Send",
              body: "We email the card to the recipient on the date you choose, with your note.",
            },
            {
              title: "Spend",
              body: `The recipient enters the code at checkout on irisandme.com. Any remaining balance stays on the card for next time.`,
            },
          ]}
        />
        <div className="mt-16 max-w-[70ch] border-t hairline pt-8 font-sans text-[13.5px] leading-[1.85] text-olive-600">
          <p>
            Gift cards are valid for {giftCards.validityYears} years from purchase, can be used across several
            orders, and cannot be exchanged for cash. See our{" "}
            <Link href="/terms-and-conditions" className="underline underline-offset-4 hover:text-olive-800">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/faq" className="underline underline-offset-4 hover:text-olive-800">
              FAQ
            </Link>{" "}
            for details.
          </p>
        </div>
      </Section>
    </>
  );
}
