import Link from "next/link";
import type { ReactNode } from "react";
import { legalPages } from "@/lib/nav";
import { site } from "@/lib/site";
import PageHero from "./PageHero";
import Prose from "./Prose";

export type LegalSection = { id: string; title: string; content: ReactNode };

/**
 * Frame for the legal pages: a contents list that stays in view beside the
 * text on wide screens, numbered sections with stable anchors, and the other
 * policies one click away.
 */
export default function LegalShell({
  current,
  title,
  updated,
  intro,
  sections,
  contactEmail = site.email.care,
}: {
  current: string;
  title: string;
  /** Human-readable date, e.g. "28 September 2026". */
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
  contactEmail?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        intro={intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: title }]}
      >
        <p className="eyebrow text-[10px] text-olive-500">Last updated {updated}</p>
      </PageHero>

      <div className="bg-cream-100 px-6 py-16 md:px-14 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="flex flex-col gap-12 lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <nav aria-label="On this page">
                <p className="eyebrow mb-5 text-[10px] text-olive-500">On this page</p>
                <ol className="flex flex-col gap-2.5">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group/toc flex gap-3 font-sans text-[13.5px] leading-snug text-olive-600 transition-colors duration-500 hover:text-olive-800"
                      >
                        <span className="w-5 shrink-0 text-olive-500">{i + 1}.</span>
                        <span className="link-underline">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <nav aria-label="Legal" className="hidden lg:block">
                <p className="eyebrow mb-5 text-[10px] text-olive-500">Policies</p>
                <ul className="flex flex-col gap-2.5">
                  {legalPages.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        aria-current={p.href === current ? "page" : undefined}
                        className={`link-underline font-sans text-[13.5px] ${
                          p.href === current ? "text-olive-800" : "text-olive-600 hover:text-olive-800"
                        }`}
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <Prose>
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className="mt-16 scroll-mt-[calc(var(--header-h)+2rem)] first:mt-0"
                >
                  <h2 id={`${s.id}-title`} className="mt-0">
                    <span className="mr-3 text-olive-500">{i + 1}.</span>
                    {s.title}
                  </h2>
                  <div className="mt-[0.8em] flex flex-col gap-[1.15em]">{s.content}</div>
                </section>
              ))}

              <hr />
              <p>
                Questions about this policy? Write to us at{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and our team will
                reply {site.responseTime}.
              </p>
            </Prose>

            <nav aria-label="Other policies" className="mt-16 border-t hairline pt-10 lg:hidden">
              <p className="eyebrow mb-5 text-[10px] text-olive-500">Other policies</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {legalPages
                  .filter((p) => p.href !== current)
                  .map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="link-underline font-sans text-[13.5px] text-olive-700">
                        {p.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
