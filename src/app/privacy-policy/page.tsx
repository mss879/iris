import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { type LegalSection } from "@/components/ui/LegalShell";
import DataTable from "@/components/ui/DataTable";
import { shipping, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How IrisandMe collects, uses, shares and protects your personal information, and the choices and rights you have wherever you shop with us.",
};

const UPDATED = "28 September 2026";
const domain = site.url.replace(/^https?:\/\//, "");

function listJoin(items: readonly string[]) {
  return items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "Australia Post and DHL Express" — read from the delivery table, never retyped. */
const carriers = listJoin([...new Set(shipping.regions.map((r) => r.carrier))]);

function Email({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}

const uses: string[][] = [
  [
    "Processing and delivering your orders, including payment, delivery updates, returns, exchanges and refunds",
    "Contact, delivery and order details; payment confirmation",
    "Contract",
  ],
  ["Creating and managing your account", "Name, email address, password and order history", "Contract"],
  [
    "Sending gift cards to their recipients on the date chosen",
    "Purchaser’s and recipient’s names and email addresses; gift message; delivery date",
    "Contract; legitimate interests",
  ],
  [
    "Answering your enquiries and looking after you",
    "Contact details, order number, your message and any photos you send",
    "Contract; legitimate interests",
  ],
  [
    "Sending our newsletter and other marketing emails",
    "Email address; whether emails are opened and links clicked",
    "Consent",
  ],
  [
    "Keeping our website and store secure, and preventing fraud and misuse",
    "Technical information; order and payment details",
    "Legitimate interests",
  ],
  [
    "Improving our website, products and service",
    "Feedback and enquiries; analytics information, only if you’ve agreed to optional cookies",
    "Legitimate interests; consent",
  ],
  ["Responding to stockist and other business enquiries", "Contact and business details", "Legitimate interests"],
  [
    "Meeting our legal obligations, such as tax, accounting and consumer law requirements, and responding to lawful requests",
    "Order, payment and correspondence records",
    "Legal obligation",
  ],
  ["Establishing, exercising or defending legal claims", "Relevant records", "Legitimate interests"],
];

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About this policy",
    content: (
      <>
        <p>
          IrisandMe is an Australian womenswear label. In this policy, “IrisandMe”, “we”, “us”
          and “our” refer to the business that owns and operates {domain} and sells IrisandMe
          pieces online.
        </p>
        <p>
          This policy explains how we collect, use, share and protect personal information when
          you visit our website, shop with us, join our newsletter or get in touch. “Personal
          information” means information that identifies you, or could reasonably be used to
          identify you. It includes what European law calls “personal data”.
        </p>
        <p>
          We handle personal information in line with the Privacy Act 1988 (Cth) and the
          Australian Privacy Principles. Because we welcome customers from around the world, this
          policy also explains the rights you may have under other laws, including the EU General
          Data Protection Regulation (GDPR), the UK GDPR and the privacy laws of some US states,
          such as California.
        </p>
        <p>
          For the purposes of European and UK data protection law, IrisandMe is the controller of
          the personal information described in this policy.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We collect only the information we need to run our store, look after you and — if
          you’d like — keep in touch.
        </p>

        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>When you place an order:</strong> your name, email address, phone number,
            billing and delivery addresses, the pieces you order and any delivery notes. Card and
            digital wallet payments are processed by our payment providers; we don’t store your
            full card number.
          </li>
          <li>
            <strong>When you create an account:</strong> your name, email address and password,
            along with your order history.
          </li>
          <li>
            <strong>When you join our newsletter:</strong> your email address.
          </li>
          <li>
            <strong>When you contact us:</strong> your name, email address, the topic of your
            enquiry, your message and, if you include it, your order number — as well as anything
            else you choose to share, such as photos of a faulty piece.
          </li>
          <li>
            <strong>When you buy a gift card:</strong> your name and email address, the
            recipient’s name and email address, your gift message and the delivery date you choose.
          </li>
          <li>
            <strong>When you track an order:</strong> your order number and email address, so we
            can find your order.
          </li>
          <li>
            <strong>When you arrange a return or exchange:</strong> the pieces you’re returning,
            whether you’d like an exchange or a refund and, if a piece is faulty, a description and
            photos of the problem.
          </li>
          <li>
            <strong>When you make a stockist enquiry:</strong> your contact details and
            information about your business.
          </li>
        </ul>
        <p>
          If you give us information about someone else — for example, a gift card recipient or
          the delivery address for a gift — please make sure they’re happy for you to share it.
        </p>

        <h3>Information collected automatically</h3>
        <p>
          Like almost every website, our site and the providers that host it automatically receive
          technical information when you visit, such as your IP address, browser and device type,
          the pages you request, the website that referred you, and the date and time of your
          visit. We use this to deliver pages to you, keep the site secure and fix problems.
        </p>
        <p>
          Your shopping bag, your wishlist and your cookie choice are saved in your own browser.
          We don’t currently use analytics or advertising cookies. Our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link> explains exactly what is stored.
        </p>

        <h3>Information from other sources</h3>
        <ul>
          <li>
            Our payment providers tell us whether a payment was successful, and may share the
            outcome of fraud checks.
          </li>
          <li>Our delivery partners send us updates on the progress of your parcel.</li>
          <li>
            Someone who buys you a gift card or sends you a gift gives us your name and email
            address or delivery details.
          </li>
          <li>
            If you interact with us on social media, such as Instagram or Facebook, we can see the
            profile details and messages you share with us there.
          </li>
        </ul>

        <h3>Information we don’t ask for</h3>
        <p>
          We don’t need, and don’t ask for, sensitive information — such as details of your
          health, religious beliefs or ethnic origin. Please don’t include this kind of information
          in messages to us.
        </p>

        <h3>Staying anonymous</h3>
        <p>
          You’re welcome to browse our website and ask us general questions without telling us who
          you are, or by using a pseudonym. To place an order or arrange a return, though, we’ll
          need your name, contact details and delivery address.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>
          We use personal information for the purposes below, for related purposes you would
          reasonably expect, or where the law requires or allows it. If you’re in the European
          Economic Area or the United Kingdom, the table also shows the lawful basis we rely on for
          each purpose.
        </p>
        <DataTable
          caption="How we use your information"
          head={["Purpose", "Information used", "Lawful basis (EU & UK)"]}
          rows={uses}
          minWidth={520}
        />
        <p>In the table:</p>
        <ul>
          <li>
            <strong>Contract</strong> means we need the information to fulfil our contract with
            you, or to take steps you’ve asked for before entering into one.
          </li>
          <li>
            <strong>Legitimate interests</strong> means we use the information to run, protect and
            improve our business and to help our customers, where those interests aren’t
            outweighed by your own rights and interests. You can object to this at any time.
          </li>
          <li>
            <strong>Consent</strong> means you’ve agreed to the use. You can withdraw your consent
            at any time.
          </li>
          <li>
            <strong>Legal obligation</strong> means we need the information to comply with the
            law.
          </li>
        </ul>
        <p>
          If you don’t give us information we need — a delivery address, for example — we may not
          be able to complete your order or help with your request.
        </p>
        <p>
          We don’t make decisions about you based solely on automated processing that have legal or
          similarly significant effects. Our payment providers may use automated checks to help
          prevent fraud when you pay; if you think a payment has been declined in error, please
          contact us.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing and your choices",
    content: (
      <>
        <p>
          We’d love to share new collections, limited editions and stories from our studio with
          you — but only if you’d like to hear from us.
        </p>
        <ul>
          <li>
            We send marketing emails only if you’ve subscribed — for example, through our newsletter
            sign-up — or where the law otherwise allows, in line with the Spam Act 2003 (Cth) and
            the other laws that apply to you.
          </li>
          <li>
            Every marketing email identifies us as the sender and includes an unsubscribe link. We
            act on unsubscribe requests promptly, and always within five business days.
          </li>
          <li>
            You can also unsubscribe at any time by emailing <Email address={site.email.privacy} />.
          </li>
          <li>
            Even if you unsubscribe, we’ll still send the service emails you need — order and
            delivery updates, return and refund confirmations, gift cards and replies to your
            enquiries.
          </li>
          <li>
            Our marketing emails may use standard technology that tells us whether an email was
            opened and which links were clicked, so we can understand what our readers enjoy. You
            can limit this by turning off automatic image loading in your email app.
          </li>
          <li>
            We don’t currently use advertising cookies. If we introduce advertising or audience
            tools in future, we’ll update this policy first and ask for your consent where the law
            requires it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    content: (
      <>
        <p>
          We use a small number of essential technologies that our website needs to work — for
          example, to remember your bag, your wishlist and your cookie choice. Our e-commerce and
          payment providers may also set essential cookies at checkout to process your order
          securely.
        </p>
        <p>
          Optional cookies, such as analytics cookies, are only ever set with your consent, and
          none are in use today. Our <Link href="/cookie-policy">Cookie Policy</Link> lists what
          we use and explains how to change your choice at any time.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>
          We share personal information only where it’s needed, and only with people and
          organisations that help us serve you:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong> who help us run our business, including our
            e-commerce platform, website hosting providers, email service provider and IT and data
            storage providers. They may use your information only to provide their services to us.
          </li>
          <li>
            <strong>Payment providers</strong>, who process your payment securely using the method
            you choose at checkout. If you pay through a service you hold your own account with —
            such as a digital wallet or a buy now, pay later service — you’ll also share information
            with that provider directly, and its own privacy policy applies.
          </li>
          <li>
            <strong>Delivery partners</strong> (such as {carriers}), who need your name, delivery
            address and contact details to deliver your order and keep you updated. For international orders, the details on the customs declaration — including
            your name, address and the contents and value of your parcel — are also provided to
            customs authorities in the destination country.
          </li>
          <li>
            <strong>Professional advisers</strong>, such as our accountants, lawyers and insurers,
            where they need it to advise or protect us.
          </li>
          <li>
            <strong>Authorities and others where the law requires or allows it</strong> — for
            example, to comply with a court order, to respond to a lawful request from a regulator
            or law enforcement agency, or to protect our customers, our business or others from
            fraud or harm.
          </li>
          <li>
            <strong>A buyer or successor</strong>, if all or part of IrisandMe’s business is sold or
            restructured. Your information would continue to be protected in line with this policy.
          </li>
        </ul>
        <p>
          We don’t sell your personal information, and we don’t give it to other businesses for
          their own marketing.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    content: (
      <>
        <p>
          IrisandMe is based in Australia, and we handle your personal information in Australia.
          Some of our service providers — such as those that host our online store, process
          payments and send our emails — may store or process information in other countries,
          which may include the United States. When we send an order overseas, we share your
          delivery details with our delivery partners and with customs authorities in the
          destination country.
        </p>
        <p>
          Before we disclose personal information to a recipient outside Australia, we take
          reasonable steps to ensure it will be handled in a way that is consistent with the
          Australian Privacy Principles.
        </p>
        <p>
          If you’re in the European Economic Area or the United Kingdom, your information will be
          transferred to Australia, and possibly to other countries, whose laws may not offer the
          same level of protection as your own. Where European or UK law applies to a transfer, we
          rely on an appropriate safeguard — such as the standard contractual clauses approved by
          the European Commission, or the UK equivalent — or on a condition the law allows, such as
          where the transfer is necessary to fulfil our contract with you (for example, to deliver
          your order). You can ask us for more information about these safeguards.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Storage and security",
    content: (
      <>
        <p>
          We take reasonable steps to protect your personal information from misuse, interference
          and loss, and from unauthorised access, modification and disclosure. These include:
        </p>
        <ul>
          <li>using encrypted (HTTPS) connections across our website;</li>
          <li>
            leaving card payments to our payment providers, so that we never hold your full card
            details;
          </li>
          <li>limiting access to personal information to the people who need it for their work; and</li>
          <li>choosing service providers that apply appropriate security measures of their own.</li>
        </ul>
        <p>
          No method of sending or storing information online is completely secure, so we can’t
          guarantee the security of information you send us. Please keep your account password to
          yourself, and let us know straight away if you think your account has been used without
          your permission.
        </p>
        <p>
          If we become aware of a data breach that is likely to cause you serious harm, we will
          notify you and the relevant regulator — in Australia, the Office of the Australian
          Information Commissioner — where the law requires us to.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <>
        <p>
          We keep personal information only for as long as we need it for the purposes in this
          policy, or for as long as the law requires. In general:
        </p>
        <ul>
          <li>
            <strong>Orders and transactions:</strong> for as long as Australian tax, accounting and
            consumer laws require us to keep these records — generally five to seven years.
          </li>
          <li>
            <strong>Your account:</strong> for as long as your account is open. If you ask us to
            close it, we’ll delete your account details and keep only the order records we’re
            required to hold.
          </li>
          <li>
            <strong>Newsletter:</strong> until you unsubscribe. We then keep your email address on
            a suppression list, so that we don’t email you again by mistake.
          </li>
          <li>
            <strong>Enquiries and customer care:</strong> for as long as we need to help you, and
            for a reasonable period afterwards in case you follow up.
          </li>
          <li>
            <strong>Gift cards:</strong> until the gift card has been used in full or has expired,
            and then as part of our transaction records.
          </li>
          <li>
            <strong>Stockist enquiries:</strong> for as long as we’re considering your enquiry or
            working together.
          </li>
          <li>
            <strong>Your bag, wishlist and cookie choice:</strong> in your browser, until you clear
            them.
          </li>
        </ul>
        <p>When we no longer need personal information, we securely delete or de-identify it.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Wherever you live, you can:</p>
        <ul>
          <li>ask for access to the personal information we hold about you;</li>
          <li>
            ask us to correct information that is inaccurate, out of date, incomplete, irrelevant
            or misleading;
          </li>
          <li>unsubscribe from marketing at any time; and</li>
          <li>
            make a complaint — see <a href="#complaints">Complaints</a>.
          </li>
        </ul>
        <p>
          These rights are set out in the Australian Privacy Principles, and we extend them to all
          our customers. Occasionally the law allows us to decline a request — for example, where
          giving access would unreasonably affect someone else’s privacy. If that happens, we’ll
          explain why in writing.
        </p>

        <h3>If you’re in the European Economic Area or the United Kingdom</h3>
        <p>Under the GDPR and the UK GDPR, you also have the right to:</p>
        <ul>
          <li>receive a copy of your personal information (access);</li>
          <li>have inaccurate information corrected (rectification);</li>
          <li>have your information deleted in certain circumstances (erasure);</li>
          <li>ask us to limit how we use your information in certain circumstances (restriction);</li>
          <li>
            receive the information you’ve given us in a structured, commonly used,
            machine-readable format, or have it sent to another organisation (portability);
          </li>
          <li>
            object to our use of your information where we rely on legitimate interests, and object
            at any time to direct marketing;
          </li>
          <li>
            withdraw your consent at any time where we rely on it — this won’t affect anything we
            did before you withdrew it; and
          </li>
          <li>
            complain to a data protection supervisory authority — see{" "}
            <a href="#complaints">Complaints</a>.
          </li>
        </ul>

        <h3>If you’re in the United States</h3>
        <p>
          Depending on where you live — including California, under the California Consumer Privacy
          Act as amended by the California Privacy Rights Act — you may have the right to:
        </p>
        <ul>
          <li>know what personal information we collect, use and disclose, and receive a copy of it;</li>
          <li>ask us to delete it;</li>
          <li>ask us to correct it;</li>
          <li>
            opt out of the “sale” of your personal information, or its “sharing” for cross-context
            behavioural advertising; and
          </li>
          <li>not be treated differently for exercising any of these rights.</li>
        </ul>
        <p>
          We don’t sell your personal information, and we don’t share it for cross-context
          behavioural advertising. We don’t knowingly sell or share the personal information of
          anyone under 16.
        </p>
        <p>
          The categories of personal information we collect are described in{" "}
          <a href="#information-we-collect">Information we collect</a>: identifiers (such as your
          name, email address, postal address and IP address), customer records, commercial
          information (such as the orders you place), internet activity (such as technical
          information about your visits) and the content of messages you send us. We collect this
          information from the sources, use it for the purposes, and disclose it to the categories
          of recipients described in this policy.
        </p>
        <p>
          You can make a request yourself or through an authorised agent, who will need your
          written permission. Our website doesn’t respond to “Do Not Track” browser signals, as
          there is no agreed standard for them; optional cookies are only ever set with your
          consent.
        </p>

        <h3>How to make a request</h3>
        <p>
          Email <Email address={site.email.privacy} /> and tell us what you’d like us to do. To
          protect your information, we may need to verify your identity first — usually by
          confirming details linked to your orders or account. We won’t charge you for making a
          request.
        </p>
        <p>
          We’ll respond within 30 days. If we need longer, we’ll let you know why and how long it
          will take, within the limits the law allows.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s privacy",
    content: (
      <p>
        Our website and products are intended for adults. We don’t knowingly collect personal
        information from children under 16. If you believe a child has given us their personal
        information, please contact us at <Email address={site.email.privacy} /> and we’ll delete
        it.
      </p>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    content: (
      <>
        <p>
          If you’re concerned about how we’ve handled your personal information, please contact us
          first at <Email address={site.email.privacy} />, so that we can try to put things right.
          Tell us what happened and how you’d like it resolved. We’ll acknowledge your complaint
          promptly and aim to give you a full response within 30 days.
        </p>
        <p>If you’re not satisfied with our response, you can contact:</p>
        <ul>
          <li>
            <strong>In Australia:</strong> the Office of the Australian Information Commissioner
            (OAIC), at <a href="https://www.oaic.gov.au">oaic.gov.au</a>.
          </li>
          <li>
            <strong>In New Zealand:</strong> the Office of the Privacy Commissioner, at{" "}
            <a href="https://www.privacy.org.nz">privacy.org.nz</a>.
          </li>
          <li>
            <strong>In the United Kingdom:</strong> the Information Commissioner’s Office (ICO), at{" "}
            <a href="https://ico.org.uk">ico.org.uk</a>.
          </li>
          <li>
            <strong>In the European Economic Area:</strong> the data protection supervisory
            authority in the country where you live or work, or where you believe the issue
            occurred. The European Data Protection Board lists them at{" "}
            <a href="https://www.edpb.europa.eu">edpb.europa.eu</a>.
          </li>
        </ul>
        <p>
          If you’re in the European Economic Area or the United Kingdom, you can contact your
          supervisory authority at any time — you don’t need to come to us first, although we’d
          welcome the chance to help.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy from time to time — for example, when we introduce new services,
        change how we use information or the law changes. We’ll publish the updated policy on this
        page and change the “last updated” date at the top. If we make a significant change, we’ll
        also let you know by email or with a notice on our website before it takes effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>
          For privacy questions, or to exercise any of your rights, email{" "}
          <Email address={site.email.privacy} />. It helps if you include your name, the email
          address you use with us, your order number if your question relates to an order, and a
          short description of your request.
        </p>
        <p>
          For anything else — orders, delivery or returns — our Client Services team is available{" "}
          {site.hours} at <Email address={site.email.care} />, or through our{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      current="/privacy-policy"
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <>
          Your privacy matters to us. This policy explains what personal information IrisandMe
          collects, how we use and protect it, and the choices and rights you have — wherever in
          the world you shop with us.
        </>
      }
      sections={sections}
      contactEmail={site.email.privacy}
    />
  );
}
