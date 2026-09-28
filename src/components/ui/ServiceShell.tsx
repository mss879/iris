import Link from "next/link";
import type { ReactNode } from "react";
import { servicePages } from "@/lib/nav";
import { site } from "@/lib/site";
import PageHero from "./PageHero";

/**
 * Frame for the Client Services pages: the page opens on a plain hero, then
 * sits beside a sticky index of every service page and a contact card, so a
 * customer who lands on the wrong answer is one click from the right one.
 */
export default function ServiceShell({
  current,
  title,
  intro,
  eyebrow = "Client Services",
  children,
}: {
  current: string;
  title: string;
  intro?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Client Services", href: "/contact" },
          { label: title },
        ]}
      />

      <div className="bg-cream-100 px-6 py-16 md:px-14 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:order-2 lg:col-span-8 lg:col-start-5">{children}</div>

          <aside className="lg:order-1 lg:col-span-3">
            <div className="flex flex-col gap-12 lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <nav aria-label="Client Services">
                <p className="eyebrow mb-5 text-[10px] text-olive-500">Client Services</p>
                <ul className="flex flex-col border-t hairline">
                  {servicePages.map((p) => {
                    const active = p.href === current;
                    return (
                      <li key={p.href} className="border-b hairline">
                        <Link
                          href={p.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between py-3.5 font-sans text-[14px] transition-colors duration-500 ${
                            active ? "text-olive-800" : "text-olive-600 hover:text-olive-800"
                          }`}
                        >
                          {p.label}
                          <span
                            aria-hidden="true"
                            className={`block h-px bg-olive-800 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              active ? "w-6" : "w-0"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="bg-cream-200/70 p-7">
                <p className="eyebrow text-[10px] text-olive-700">Speak with us</p>
                <p className="mt-4 font-sans text-[13.5px] leading-[1.85] text-olive-600">
                  Our Client Services team is available {site.hours}, and replies to
                  every message {site.responseTime}.
                </p>
                <a
                  href={`mailto:${site.email.care}`}
                  className="link-underline mt-5 inline-block font-sans text-[13.5px] text-olive-800"
                >
                  {site.email.care}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
