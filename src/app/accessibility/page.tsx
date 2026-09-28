import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { type LegalSection } from "@/components/ui/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "IrisandMe’s accessibility statement: the standard we aim for (WCAG 2.2 Level AA), the features built into our website, known limitations and how to get help.",
};

const UPDATED = "28 September 2026";

function Email({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our commitment",
    content: (
      <>
        <p>
          We want everyone to be able to discover IrisandMe, find the right piece and place an
          order with ease — including people who use a screen reader, navigate by keyboard, zoom
          in on their screen or prefer less movement.
        </p>
        <p>
          Accessibility has been part of how our website is designed and built from the
          beginning, rather than something added afterwards. We see it as ongoing work, and we
          welcome your feedback.
        </p>
      </>
    ),
  },
  {
    id: "standard",
    title: "The standard we aim for",
    content: (
      <>
        <p>
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. Published
          by the World Wide Web Consortium (W3C), these internationally recognised guidelines
          explain how to make websites more accessible for people with a wide range of disabilities
          — including blindness and low vision, deafness and hearing loss, limited movement,
          cognitive disabilities and sensitivity to motion.
        </p>
        <p>
          We describe this as our aim because accessibility is never finished: every new page,
          photograph and feature needs the same care as the last.
        </p>
      </>
    ),
  },
  {
    id: "built-in",
    title: "What we’ve built in",
    content: (
      <>
        <h3>Navigation and structure</h3>
        <ul>
          <li>
            A “Skip to content” link is the first thing you reach with a keyboard. It takes you
            straight past the header to the main content of the page.
          </li>
          <li>
            Pages are organised into landmarks — header, navigation, main content and footer — so
            screen reader users can move around quickly.
          </li>
          <li>Each page has a single main heading.</li>
          <li>The language of every page is set to English, so screen readers pronounce it correctly.</li>
          <li>Our policy pages, including this one, begin with a list of contents linking to each section.</li>
        </ul>

        <h3>Keyboard</h3>
        <ul>
          <li>
            Menus, accordions, tabs, drawers and dialogs can all be operated with a keyboard, and
            the Escape key closes overlays such as search and your shopping bag.
          </li>
          <li>A visible focus indicator shows where you are as you move through each page.</li>
        </ul>

        <h3>Colour and contrast</h3>
        <ul>
          <li>
            Our text colours are designed to meet the WCAG 2.2 Level AA contrast requirements
            against our cream backgrounds.
          </li>
        </ul>

        <h3>Images</h3>
        <ul>
          <li>Our photography has descriptive alternative text, so you know what each image shows.</li>
          <li>
            Purely decorative touches, such as the paper texture across the page, are hidden from
            screen readers.
          </li>
        </ul>

        <h3>Motion</h3>
        <ul>
          <li>
            If your device is set to reduce motion, our animations and smooth scrolling are reduced
            or switched off.
          </li>
          <li>
            The rotating messages at the top of every page can be paused with the button beside
            them, and they don’t rotate at all when your device asks for reduced motion.
          </li>
          <li>
            Our decorative cursor appears only with a precise pointer, such as a mouse or trackpad.
            It never appears on touch screens or when your device asks for reduced motion — you’ll
            always have your standard pointer then.
          </li>
        </ul>

        <h3>Forms</h3>
        <ul>
          <li>Every form field is clearly labelled.</li>
          <li>
            If something needs correcting, a message appears beside the field and is announced to
            screen reader users.
          </li>
        </ul>

        <h3>Zoom and small screens</h3>
        <ul>
          <li>
            Content reflows to fit screens as narrow as 320 pixels without scrolling sideways, so
            you can also zoom in to 400% in a desktop browser.
          </li>
          <li>
            Tables, such as size charts and delivery rates, scroll within their own area on small
            screens, so the rest of the page stays in place.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "known-limitations",
    title: "Known limitations and ongoing work",
    content: (
      <>
        <p>We’re open about the places where we know there’s more to do:</p>
        <ul>
          <li>
            <strong>Checkout and payments.</strong> Parts of the checkout and payment process are
            provided by our e-commerce and payment partners, so their accessibility isn’t entirely
            within our control. If you have any difficulty completing an order, contact us and we’ll
            help you by email.
          </li>
          <li>
            <strong>Decorative cursor.</strong> With a mouse or trackpad, our decorative cursor
            replaces the standard pointer across most of the site. If you rely on an enlarged or
            high-contrast pointer, turning on your device’s reduced-motion setting will bring your
            usual pointer back everywhere on our website.
          </li>
          <li>
            <strong>New content and features.</strong> We review new pages, photography and
            features for accessibility as they’re added, and fix issues as we find them.
          </li>
          <li>
            <strong>Documents.</strong> We don’t currently offer PDFs or other downloadable
            documents. If we do in future, we’ll make them accessible or provide an accessible
            alternative.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "assistive-technologies",
    title: "Browsers and assistive technologies",
    content: (
      <>
        <p>
          We design our website to work with current versions of the major browsers — including
          Chrome, Safari, Firefox and Edge — and with the assistive technologies commonly used with
          them, such as these screen readers:
        </p>
        <ul>
          <li>VoiceOver on macOS, iOS and iPadOS;</li>
          <li>NVDA and JAWS on Windows; and</li>
          <li>TalkBack on Android.</li>
        </ul>
        <p>
          Our website also respects browser zoom and your device’s reduced-motion setting. For the
          best experience, we recommend keeping your browser and assistive technology up to date.
        </p>
      </>
    ),
  },
  {
    id: "feedback",
    title: "Feedback and assistance",
    content: (
      <>
        <p>
          If you have difficulty using any part of our website, or have ideas about how we could
          make it more accessible, please tell us. Email <Email address={site.email.care} /> or use
          our <Link href="/contact">contact form</Link>, and let us know:
        </p>
        <ul>
          <li>the page or feature you were using;</li>
          <li>what you were trying to do, and what went wrong; and</li>
          <li>the browser and any assistive technology you use, if you’re happy to share it.</li>
        </ul>
        <p>
          Our Client Services team is available {site.hours} and will reply {site.responseTime}.
        </p>
        <p>
          We’re also happy to help in other ways. We can send you product details, sizing
          information or any of our policies in an alternative format — such as plain text by
          email — and we can help you choose pieces and place an order by email.
        </p>
      </>
    ),
  },
  {
    id: "review",
    title: "Continuous improvement",
    content: (
      <>
        <p>
          We’ll keep improving our website as it grows, guided by WCAG and by the feedback you
          give us.
        </p>
        <p>
          This statement was prepared on {UPDATED}. It reflects our own assessment of the website
          as it has been designed and built. We’ll review it at least once a year, and whenever we
          make significant changes to the site.
        </p>
      </>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalShell
      current="/accessibility"
      title="Accessibility"
      updated={UPDATED}
      intro={
        <>
          IrisandMe should be a pleasure to browse and easy to shop, however you use the web. This
          statement explains the standard we work to, what we’ve built into our website, where we
          know there’s more to do, and how to reach us if anything gets in your way.
        </>
      }
      sections={sections}
    />
  );
}
