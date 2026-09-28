import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import AccountArea from "./_components/AccountArea";

export const metadata: Metadata = {
  title: "My Account",
  description: "Sign in to your IrisandMe account to see your orders, addresses, returns, wishlist and details.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        eyebrow="My Account"
        title="My Account"
        intro="Your orders, addresses, returns, wishlist and details — all in one place."
        crumbs={[{ label: "Home", href: "/" }, { label: "My Account" }]}
      />
      <Section pad="tight">
        <AccountArea />
      </Section>
    </>
  );
}
