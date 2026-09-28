import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { type LegalSection } from "@/components/ui/LegalShell";
import DataTable from "@/components/ui/DataTable";
import { ManageCookiesButton } from "@/components/CookieConsent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How IrisandMe uses cookies and similar technologies, exactly what we store in your browser, and how to change your cookie choice at any time.",
};

const UPDATED = "28 September 2026";
const domain = site.url.replace(/^https?:\/\//, "");

function Email({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}

/** Name cell: the key or label, with where it lives and who sets it beneath. */
function StoredItem({ name, code = false, detail }: { name: string; code?: boolean; detail: string }) {
  return (
    <>
      {code ? <code className="text-[12.5px]">{name}</code> : name}
      <span className="mt-1 block text-[12px] font-normal text-olive-500">{detail}</span>
    </>
  );
}

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About this policy",
    content: (
      <>
        <p>
          This Cookie Policy applies to {domain}, which is operated by IrisandMe, an Australian
          business. It explains which cookies and similar technologies we use, why we use them and
          how you can control them.
        </p>
        <p>
          It should be read together with our <Link href="/privacy-policy">Privacy Policy</Link>,
          which explains how we handle personal information more generally, and the rights you
          have.
        </p>
      </>
    ),
  },
  {
    id: "what-are-cookies",
    title: "Cookies and similar technologies",
    content: (
      <>
        <p>
          <strong>Cookies</strong> are small text files that a website saves in your browser. They
          are sent back to the website on each visit, which lets it remember things — for example,
          that you’re part-way through checking out.
        </p>
        <p>
          <strong>Local storage</strong> works in a similar way, but the information stays in your
          browser. It isn’t sent to the website with every visit; it’s read on your device by the
          website’s own pages when needed.
        </p>
        <p>
          <strong>Pixels and tags</strong> are small pieces of code in web pages or emails that can
          tell a business when a page has been viewed or an email opened.
        </p>
        <p>
          Cookies can be set by the website you’re visiting (first-party cookies) or by another
          company whose service that website uses (third-party cookies). Some last only until you
          close your browser; others stay until they expire or you delete them.
        </p>
        <p>
          In this policy, we use “cookies” to cover all of these technologies unless we say
          otherwise.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-them",
    title: "How we use them",
    content: (
      <>
        <p>
          We keep things simple. Today our website uses only <strong>essential</strong>{" "}
          technologies — the ones it needs to work as you’d expect:
        </p>
        <ul>
          <li>remembering the pieces in your bag and your wishlist, so they’re still there when you return;</li>
          <li>remembering your cookie choice, so we don’t ask you on every visit; and</li>
          <li>at checkout, keeping your session secure, processing your payment and helping to prevent fraud.</li>
        </ul>
        <p>
          Because these are strictly necessary to provide the service you’ve asked for, they don’t
          need your consent. We don’t currently use analytics or advertising cookies.
        </p>
        <p>
          Our marketing emails may contain a pixel that tells us whether an email was opened and
          which links were clicked. We only send marketing emails to people who have asked to
          receive them, and you can limit this by turning off automatic image loading in your email
          app.
        </p>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "What we currently use",
    content: (
      <>
        <p>This is everything our website currently stores in your browser, or allows others to set.</p>
        <DataTable
          caption="Cookies and similar technologies on our website"
          head={["Name", "Purpose", "Type", "Duration"]}
          rows={[
            [
              <StoredItem
                key="store"
                name="irisandme:store:v1"
                code
                detail="Local storage · set by IrisandMe"
              />,
              "Remembers the pieces in your shopping bag and your wishlist on this device.",
              "Essential",
              "Until you clear it from your browser",
            ],
            [
              <StoredItem
                key="consent"
                name="irisandme:consent"
                code
                detail="Local storage · set by IrisandMe"
              />,
              "Remembers whether you chose “Accept all” or “Essential only”, and when.",
              "Essential",
              "Until you clear it or change your choice",
            ],
            [
              <StoredItem
                key="checkout"
                name="Checkout cookies"
                detail="Cookies · set by our e-commerce and payment providers"
              />,
              "May be set when you check out, to keep your session secure, process your payment and help prevent fraud.",
              "Essential",
              "Varies by provider",
            ],
          ]}
          minWidth={520}
          note="Local storage doesn’t expire on its own. Clearing your browser’s site data for our website removes it."
        />
        <p>
          We’ll keep this table up to date. Before we add anything new, we’ll list it here with its
          purpose, who sets it and how long it lasts.
        </p>
      </>
    ),
  },
  {
    id: "optional-cookies",
    title: "Optional cookies",
    content: (
      <>
        <p>In future, we may use two optional categories of cookies:</p>
        <ul>
          <li>
            <strong>Analytics cookies</strong> would help us understand how visitors use our site —
            such as which pages are popular and where people have difficulty — so we can improve
            it.
          </li>
          <li>
            <strong>Marketing cookies</strong> would help us measure our advertising and show you
            more relevant IrisandMe content on other websites and social media.
          </li>
        </ul>
        <p>
          <strong>Neither is in use today</strong>, so choosing “Accept all” on our cookie banner
          doesn’t currently set any additional cookies. Optional cookies will only ever be set with
          your consent. If we introduce any, we’ll update this policy first — including the table
          above — and ask for your choice again before any are set.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    content: (
      <>
        <p>
          You can change your mind at any time, and withdrawing your consent is as easy as giving
          it.
        </p>
        <div className="flex flex-col items-start gap-5 border hairline bg-cream-50 p-6 md:p-8">
          <p>
            <strong>Change your cookie choice.</strong> Reopen our cookie banner to choose between
            “Accept all” and “Essential only”.
          </p>
          <ManageCookiesButton className="max-w-full whitespace-normal text-center" />
        </div>
        <p>
          Essential cookies stay on whichever you choose, because our website can’t work properly
          without them. Your choice applies to the browser and device you’re using, so you may be
          asked again on another device.
        </p>

        <h3>Browser settings</h3>
        <p>
          Most browsers let you view, block and delete cookies and other site data, usually in
          their privacy or security settings. Your browser’s help pages explain how.
        </p>
        <ul>
          <li>
            Clearing your browser’s data for our website empties your bag and wishlist on that
            device and resets your cookie choice, so you’ll see our banner again on your next
            visit.
          </li>
          <li>If you block all cookies, some parts of our website, such as checkout, may not work.</li>
          <li>
            In a private or incognito window, site data is usually deleted when you close the
            window, so your bag and wishlist won’t be kept.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "international",
    title: "Visitors around the world",
    content: (
      <>
        <p>
          <strong>European Union and United Kingdom.</strong> Under the EU ePrivacy rules and the
          GDPR — and, in the United Kingdom, the Privacy and Electronic Communications Regulations
          (PECR) and the UK GDPR — websites may set non-essential cookies only with your prior
          consent. That’s why optional cookies on our website stay off unless you choose “Accept
          all”, why “Essential only” is just as easy to choose, and why you can change your choice
          at any time.
        </p>
        <p>
          <strong>Australia.</strong> Where information collected through cookies is personal
          information, we handle it in line with the Privacy Act 1988 (Cth) and our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
        <p>
          <strong>Everywhere else.</strong> We take the same consent-first approach for every
          visitor, wherever you are. We don’t sell personal information, or share it for
          cross-context behavioural advertising.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We’ll update this policy whenever we change the cookies we use — and always before we
        introduce any optional cookies — and change the “last updated” date at the top of this
        page. If a change affects the choice you’ve made, we’ll ask you again.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        For anything about cookies or how we handle your information, email{" "}
        <Email address={site.email.privacy} />. For more about your privacy rights, including how
        to make a complaint, see our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalShell
      current="/cookie-policy"
      title="Cookie Policy"
      updated={UPDATED}
      intro={
        <>
          We use only the cookies our website needs to work, and nothing optional without your
          consent. This policy explains what we store, why, and how to change your choice at any
          time.
        </>
      }
      sections={sections}
      contactEmail={site.email.privacy}
    />
  );
}
