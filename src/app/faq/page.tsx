import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import ServiceShell from "@/components/ui/ServiceShell";
import Accordion from "@/components/ui/Accordion";
import { site } from "@/lib/site";
import {
  HelpPrompt,
  JumpNav,
  ServiceSection,
  ServiceSections,
  sectionIndex,
  type JumpLink,
} from "@/components/services/ServiceBlocks";
import { toPlainText, topics, type Paragraph } from "./_components/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about sizing, fit, fabrics, care, orders, payments, shipping, international delivery, duties and taxes, returns, exchanges, pre-orders, product availability and gift cards.",
};

const toc: JumpLink[] = topics.map((t) => ({ id: t.id, label: t.label }));

/** FAQPage structured data, built from the same answers the page shows. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: topics.flatMap((topic) =>
    topic.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(q.answer) },
    }))
  ),
};

function Answer({ paragraphs }: { paragraphs: Paragraph[] }) {
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {paragraph.map((segment, j) =>
            typeof segment === "string" ? (
              <Fragment key={j}>{segment}</Fragment>
            ) : segment.href.startsWith("/") ? (
              <Link key={j} href={segment.href}>
                {segment.label}
              </Link>
            ) : (
              <a key={j} href={segment.href}>
                {segment.label}
              </a>
            )
          )}
        </p>
      ))}
    </>
  );
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ServiceShell
        current="/faq"
        title="Frequently Asked Questions"
        intro={
          <p>
            Quick answers to the questions we’re asked most. Choose a topic below, or write to us —
            we reply to every message {site.responseTime}.
          </p>
        }
      >
        <ServiceSections compact>
          <JumpNav items={toc} label="Browse by topic" />

          {topics.map((topic) => (
            <ServiceSection
              key={topic.id}
              id={topic.id}
              index={sectionIndex(toc, topic.id)}
              eyebrow={`${topic.questions.length} questions`}
              title={topic.label}
            >
              <Accordion
                items={topic.questions.map((q) => ({
                  id: q.id,
                  title: q.question,
                  content: <Answer paragraphs={q.answer} />,
                }))}
              />
            </ServiceSection>
          ))}

          <HelpPrompt title="Still have a question?">
            <p>
              Our Client Services team is available {site.hours}, and replies to every message{" "}
              {site.responseTime}.
            </p>
          </HelpPrompt>
        </ServiceSections>
      </ServiceShell>
    </>
  );
}
