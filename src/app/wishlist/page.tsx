import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import WishlistItems from "./_components/WishlistItems";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your IrisandMe wishlist — the pieces you are considering, kept in one place.",
};

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Wishlist"
        title="Your Wishlist"
        intro="A private collection of the pieces you are considering. Take your time — they will be here when you are ready."
        crumbs={[{ label: "Home", href: "/" }, { label: "My Account", href: "/account" }, { label: "Wishlist" }]}
      />
      <Section pad="tight">
        <WishlistItems />
      </Section>
      <Section tone="paper" pad="tight">
        <p className="text-center font-sans text-[13.5px] leading-relaxed text-olive-600">
          Sign in to{" "}
          <Link href="/account" className="underline underline-offset-4 hover:text-olive-800">
            My Account
          </Link>{" "}
          to keep your wishlist alongside your orders, or{" "}
          <Link href="/size-and-fit" className="underline underline-offset-4 hover:text-olive-800">
            find your size
          </Link>{" "}
          before you choose.
        </p>
      </Section>
    </>
  );
}
