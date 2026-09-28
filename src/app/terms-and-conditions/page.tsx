import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { type LegalSection } from "@/components/ui/LegalShell";
import {
  FREE_SHIPPING_AU,
  formatPrice,
  giftCards,
  payments,
  returns,
  shipping,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the IrisandMe website and shop with us — orders, payment, pre-orders, gift cards, delivery, returns and your consumer rights.",
};

const UPDATED = "28 September 2026";
const domain = site.url.replace(/^https?:\/\//, "");
const offersAfterpay = payments.some((p) => p.startsWith("Afterpay"));

function Email({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}

const introLink =
  "underline decoration-1 underline-offset-[3px] transition-colors duration-500 hover:text-olive-800";

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    content: (
      <>
        <p>
          These terms and conditions (“terms”) apply to your use of {domain} (our “website”) and
          to any purchase you make from us through it. In these terms, “IrisandMe”, “we”, “us”
          and “our” refer to IrisandMe, an Australian business, and “you” refers to you as a
          visitor or customer.
        </p>
        <p>
          By using our website or placing an order, you agree to these terms. Our{" "}
          <Link href="/shipping-policy">Shipping Policy</Link>,{" "}
          <Link href="/returns-policy">Returns &amp; Refund Policy</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> also form part of these terms, so
          please read them too.
        </p>
        <p>
          To place an order, you must be at least 18 years old, or be ordering with the
          involvement of a parent or guardian.
        </p>
        <p>
          <strong>Your consumer rights.</strong> Nothing in these terms excludes, restricts or
          modifies any right or remedy you have under the Australian Consumer Law (Schedule 2 to
          the Competition and Consumer Act 2010 (Cth)) or any other law that cannot be excluded,
          including the consumer guarantees. If you’re a consumer outside Australia, you also keep
          the benefit of any mandatory consumer protections in the country where you live.
        </p>
      </>
    ),
  },
  {
    id: "using-our-website",
    title: "Using our website",
    content: (
      <>
        <p>We’re glad you’re here. When using our website, please don’t:</p>
        <ul>
          <li>use it for any unlawful, fraudulent or harmful purpose;</li>
          <li>
            try to interfere with its security or operation, or gain unauthorised access to our
            systems or to anyone else’s account;
          </li>
          <li>
            use bots, scrapers or other automated tools to access or copy our website, or to place
            orders; or
          </li>
          <li>introduce viruses or other harmful code.</li>
        </ul>
        <p>
          We work to keep our website available and accurate, but we can’t promise that it will
          always be uninterrupted or error-free. We may update, suspend or change parts of it —
          for example, for maintenance.
        </p>
        <p>
          Styling notes, care advice and other information on our website are general guidance
          only. Please always follow the care label on your garment.
        </p>
        <p>
          Our website links to other websites, such as social media platforms and payment
          providers. We’re not responsible for their content or practices, and their own terms and
          privacy policies apply when you use them.
        </p>
      </>
    ),
  },
  {
    id: "your-account",
    title: "Your account",
    content: (
      <>
        <p>If you create an account with us, please:</p>
        <ul>
          <li>give us accurate information and keep it up to date;</li>
          <li>keep your password confidential and don’t share your account with anyone else; and</li>
          <li>
            let us know straight away at <Email address={site.email.care} /> if you think someone
            has used your account without your permission.
          </li>
        </ul>
        <p>
          We may suspend or close an account if we reasonably believe it has been used
          fraudulently or in serious breach of these terms. Where appropriate, we’ll tell you why.
          You can ask us to close your account at any time.
        </p>
      </>
    ),
  },
  {
    id: "products",
    title: "Products, colours and sizing",
    content: (
      <>
        <p>
          We work with linen, cotton and other natural fibres, and some of our pieces are printed
          by hand. That’s what gives them their character — and it also means:
        </p>
        <ul>
          <li>
            <strong>Natural fibres vary.</strong> Linen and cotton can show slubs, subtle
            variations in texture and tone, and natural creasing. These are characteristics of the
            fabric, not faults.
          </li>
          <li>
            <strong>Hand-printed pieces are individual.</strong> Small differences in print
            placement, depth of colour and pattern alignment are part of printing by hand, so no two
            pieces are exactly alike.
          </li>
          <li>
            <strong>Colours can look different on screen.</strong> We photograph our pieces as
            true to life as we can, but colours may appear slightly different depending on your
            screen and its settings.
          </li>
          <li>
            <strong>Sizing is a guide.</strong> Our <Link href="/size-and-fit">Size &amp; Fit</Link>{" "}
            guide and the details on each product page are there to help you choose. Fit can vary
            with the cut and fabric of each piece.
          </li>
          <li>
            <strong>Care matters.</strong> Natural fibres last longest when they’re cared for
            gently. Please follow the care label and our{" "}
            <Link href="/garment-care">Garment Care</Link> guide.
          </li>
        </ul>
        <p>
          We take care to describe every piece accurately, including its fabric composition. Some
          pieces are made in small or limited runs and may not be restocked once they sell out.
          All products are subject to availability.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    title: "Pricing and currency",
    content: (
      <>
        <ul>
          <li>All prices on our website are in Australian dollars ({site.currency}).</li>
          <li>For orders delivered within Australia, prices include GST.</li>
          <li>
            Delivery charges, where they apply, are shown at checkout before you pay. See our{" "}
            <Link href="/shipping-policy">Shipping Policy</Link>.
          </li>
          <li>
            If you pay with a card or account in another currency, your bank or payment provider
            will convert the amount and may charge conversion or international transaction fees.
            These are set by them, not by us.
          </li>
          <li>
            Orders delivered outside Australia may attract import duties and taxes in the
            destination country, which are payable by the recipient — see{" "}
            <a href="#shipping">Shipping and delivery</a>.
          </li>
          <li>We may change our prices at any time, but changes won’t affect orders we’ve already accepted.</li>
          <li>Promotional offers and discount codes are subject to the conditions shown with them.</li>
        </ul>
        <p>
          Mistakes occasionally happen. If a piece is listed at an obviously incorrect price, we’ll
          contact you before dispatch, and you can choose to go ahead at the correct price or cancel
          for a full refund.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    title: "Orders and acceptance",
    content: (
      <>
        <p>
          When you place an order, you’re offering to buy the pieces in your bag at the prices
          shown at checkout. We accept your order — and a contract between us is formed — when we
          email you to confirm it.
        </p>
        <p>We may decline or cancel an order, in whole or in part, before it’s dispatched if:</p>
        <ul>
          <li>a piece has sold out or is no longer available;</li>
          <li>there’s an obvious error in the price or description of a piece;</li>
          <li>we reasonably suspect the order is fraudulent or unauthorised; or</li>
          <li>we’re unable to deliver to the address you’ve given us.</li>
        </ul>
        <p>
          If this happens, we’ll let you know as soon as we can and refund the amount you paid for
          the affected pieces in full.
        </p>
        <p>
          Please check your order carefully before you submit it. If you need to change or cancel
          an order, contact us as soon as possible at <Email address={site.email.care} />. We’ll do
          our best to help before your order is dispatched, but we can’t guarantee changes once
          it’s being prepared. Once it has been dispatched, you can return eligible pieces under
          our <Link href="/returns-policy">Returns &amp; Refund Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    content: (
      <>
        <p>We accept:</p>
        <ul>
          {payments.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
        <p>
          We take payment when you place your order. Payments are processed securely by our
          payment providers, and we don’t store your full card details.
        </p>
        {offersAfterpay ? (
          <p>
            Afterpay lets customers in Australia pay in instalments, subject to Afterpay’s approval
            and its own terms. Your instalments are paid to Afterpay, not to us.
          </p>
        ) : null}
        <p>
          Payments made through third-party services, such as digital wallets, are also subject to
          those providers’ terms. By paying, you confirm that you’re authorised to use your chosen
          payment method. We and our payment providers may carry out checks to verify payments and
          help prevent fraud.
        </p>
      </>
    ),
  },
  {
    id: "pre-orders",
    title: "Pre-orders",
    content: (
      <>
        <p>Some pieces can be pre-ordered before they arrive in our studio. For these pieces:</p>
        <ul>
          <li>the estimated dispatch timeframe is shown on the product page;</li>
          <li>you’re charged when you place your order, just as for any other order;</li>
          <li>
            if your order also includes pieces that are in stock, we’ll send those first and your
            pre-order pieces separately once they’re ready;
          </li>
          <li>
            dispatch estimates are our best guide based on the information we have at the time,
            but production and shipping can occasionally take longer;
          </li>
          <li>
            if your pre-order will be dispatched later than estimated, we’ll email you with an
            update — and if you’d rather not wait, you can cancel the pre-order pieces for a full
            refund; and
          </li>
          <li>if we’re unable to supply a pre-order piece, we’ll let you know and refund you in full.</li>
        </ul>
        <p>
          Once your pre-order piece is delivered, our usual returns policy applies, with the{" "}
          {returns.windowDays}-day return period starting from the day it arrives.
        </p>
      </>
    ),
  },
  {
    id: "gift-cards",
    title: "Gift cards",
    content: (
      <>
        <ul>
          <li>
            IrisandMe gift cards are digital. We email them to the recipient on the date you choose
            when you buy.
          </li>
          <li>
            Gift cards are available in values from {formatPrice(giftCards.min)} to{" "}
            {formatPrice(giftCards.max)}.
          </li>
          <li>
            Each gift card is valid for {giftCards.validityYears} years from the date of purchase,
            and its expiry date is shown on the gift card.
          </li>
          <li>
            Gift cards can be used to shop on our website. They can’t be exchanged for cash,
            except where the law requires.
          </li>
          <li>We don’t charge any fees on a gift card after it has been bought.</li>
          <li>
            Please check the recipient’s email address carefully before you buy, and treat gift
            card codes like cash — keep them safe and don’t share them.
          </li>
          <li>
            If a gift card hasn’t arrived on the chosen date, please ask the recipient to check
            their junk or spam folder, then contact us and we’ll help.
          </li>
          <li>
            Gift cards can’t be returned or refunded for change of mind. This doesn’t affect your
            rights under the Australian Consumer Law.
          </li>
        </ul>
        <p>
          You’ll find more about choosing and sending a gift card on our{" "}
          <Link href="/gift-cards">Gift Cards</Link> page.
        </p>
      </>
    ),
  },
  {
    id: "shipping",
    title: "Shipping and delivery",
    content: (
      <>
        <p>
          We deliver within Australia and internationally. Orders are usually prepared for dispatch
          within {shipping.processing}. Delivery options, charges and estimated timeframes for each
          destination are set out in our <Link href="/shipping-policy">Shipping Policy</Link>. In
          summary:
        </p>
        <ul>
          <li>
            Standard delivery within Australia is complimentary on orders over{" "}
            {formatPrice(FREE_SHIPPING_AU)}. Thresholds for other destinations are listed in our
            Shipping Policy.
          </li>
          <li>
            Delivery timeframes are estimates, not guarantees. We’ll always help you track down a
            parcel and keep you informed if there’s a delay.
          </li>
          <li>
            Responsibility for your order (risk of loss or damage) and ownership of it pass to you
            when it’s delivered to the address you gave us.
          </li>
          <li>
            For orders delivered outside Australia, import duties, taxes and customs charges may
            apply. Unless they’ve been collected at checkout, they’re payable by the recipient —
            usually on delivery.
          </li>
          <li>Please make sure your delivery address is complete and correct.</li>
        </ul>
      </>
    ),
  },
  {
    id: "returns",
    title: "Returns, refunds and your consumer rights",
    content: (
      <>
        <p>
          If you change your mind, you can return eligible pieces within {returns.windowDays} days
          of delivery for an exchange or a refund, as set out in our{" "}
          <Link href="/returns-policy">Returns &amp; Refund Policy</Link>. Pieces bought on sale
          or marked as final sale, and gift cards, can’t be returned for change of mind.
        </p>
        <p>
          If something is wrong with your order — for example, a piece is faulty, damaged or not
          as described — please let us know within {returns.faultyReportDays} days of delivery if
          you can, so we can put it right quickly. You’re still protected after that time: your
          rights under the Australian Consumer Law don’t depend on this timeframe.
        </p>
        <p>
          Our goods come with guarantees that cannot be excluded under the Australian Consumer
          Law. You are entitled to a replacement or refund for a major failure and compensation for
          any other reasonably foreseeable loss or damage. You are also entitled to have the goods
          repaired or replaced if the goods fail to be of acceptable quality and the failure does
          not amount to a major failure.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          Everything on our website — including our designs, prints, photographs, illustrations,
          text, graphics, logos and the IrisandMe name — is owned by or licensed to IrisandMe and
          is protected by copyright, trade mark and other intellectual property laws.
        </p>
        <p>
          You’re welcome to view and print pages from our website for your own personal,
          non-commercial use, and to share links to it. Otherwise, you must not copy, reproduce,
          adapt, distribute or use our content, designs or prints — including to make or sell
          products — without our prior written permission.
        </p>
        <p>Buying an IrisandMe piece doesn’t give you any rights in our designs, prints or trade marks.</p>
      </>
    ),
  },
  {
    id: "reviews-and-content",
    title: "Reviews and content you share",
    content: (
      <>
        <p>
          We love hearing from you and seeing how you wear IrisandMe. If you send us a review,
          photo or other content (“your content”):
        </p>
        <ul>
          <li>
            it must be honest and reflect your genuine experience, and must not be misleading,
            offensive, defamatory or unlawful;
          </li>
          <li>
            it must be yours to share and must not infringe anyone else’s rights, including their
            privacy — please ask before sharing photos of other people;
          </li>
          <li>
            you keep ownership of it, and give us a non-exclusive, royalty-free, worldwide licence
            to use, reproduce, display and adapt it (for example, by cropping or resizing) in
            connection with IrisandMe, including on our website and social media; and
          </li>
          <li>
            we may moderate content, and decline to publish content that doesn’t meet these terms.
            We don’t remove or edit reviews simply because they’re negative.
          </li>
        </ul>
        <p>
          If you tag us on social media, we’ll always ask your permission before sharing your photo
          on our own channels. You can ask us to remove your content from our website or social
          media at any time.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or
          remedy you have under the Australian Consumer Law or any other law that cannot lawfully
          be excluded, restricted or modified.
        </p>
        <p>Subject to that, and to the extent permitted by law:</p>
        <ul>
          <li>
            we’re not liable for any loss or damage that wasn’t reasonably foreseeable when you
            placed your order;
          </li>
          <li>
            because our products are sold for personal use, we’re not liable for business losses,
            such as loss of profit, revenue or business opportunity; and
          </li>
          <li>
            we’re not responsible for delays or failures caused by events beyond our reasonable
            control — such as severe weather, natural disasters, pandemics, industrial action or
            disruption to our delivery partners’ networks.
          </li>
        </ul>
        <p>
          If an event beyond our control affects your order, we’ll let you know and do what we
          reasonably can to limit the impact — including offering a refund if we can’t supply your
          order within a reasonable time.
        </p>
        <p>
          Nothing in these terms limits our liability for fraud, or for death or personal injury
          caused by our negligence.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    content: (
      <p>
        We respect your privacy. Our <Link href="/privacy-policy">Privacy Policy</Link> explains
        how we collect, use and protect your personal information, and our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> explains how we use cookies and similar
        technologies.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <>
        <p>
          These terms are governed by the laws of the Australian state or territory in which
          IrisandMe has its principal place of business, together with the Commonwealth laws that
          apply there. You and we each submit to the non-exclusive jurisdiction of the courts of
          that state or territory.
        </p>
        <p>
          If you’re a consumer who lives outside Australia, you’ll also have the benefit of any
          mandatory protections under the law of the country where you live, and you may be able to
          bring a claim in the courts there.
        </p>
        <p>
          If you have a concern, please contact us first — we’d like the chance to put things
          right, and most issues can be resolved quickly and informally.
        </p>
        <p>
          If any part of these terms is found to be invalid or unenforceable, it will be read down
          or severed to the extent necessary, and the rest of these terms will continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time — for example, to reflect changes in the law
        or in how we operate. Updated terms apply from the date they’re published on this page, as
        shown by the “last updated” date at the top. The terms that apply to an order are the ones
        published when you placed it.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Our Client Services team is here to help {site.hours}. Email{" "}
        <Email address={site.email.care} /> or use our <Link href="/contact">contact form</Link>{" "}
        with any question about these terms, an order or your account.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalShell
      current="/terms-and-conditions"
      title="Terms & Conditions"
      updated={UPDATED}
      intro={
        <>
          These terms apply when you use the IrisandMe website and when you shop with us. They’re
          written to be clear, and they never affect your rights under the Australian Consumer Law.
          You’ll also find answers to common questions in our{" "}
          <Link href="/faq" className={introLink}>
            FAQ
          </Link>
          .
        </>
      }
      sections={sections}
    />
  );
}
