import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import { brandPages, servicePages } from "@/lib/nav";

export default function NotFound() {
  return (
    <section className="bg-cream-100 px-6 pb-28 pt-[calc(var(--header-h)+5rem)] md:px-14 md:pb-40 md:pt-[calc(var(--header-h)+8rem)]">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="eyebrow text-olive-500">Page not found</p>
        <h1 className="display mx-auto mt-6 max-w-[16ch] text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.93] text-olive-800">
          This page has wandered off
        </h1>
        <p className="mx-auto mt-8 max-w-[50ch] font-sans text-[15px] leading-[1.9] text-olive-600">
          The page you were looking for may have moved, or the piece may no longer be available.
          Let us help you find your way.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/shop" variant="solid">
            Visit the Shop
          </ButtonLink>
          <ButtonLink href="/">Return home</ButtonLink>
        </div>

        <div className="mx-auto mt-20 grid max-w-[720px] grid-cols-1 gap-10 border-t hairline pt-12 text-left sm:grid-cols-2">
          {[
            { title: "IrisandMe", links: brandPages.slice(0, 5) },
            { title: "Client Services", links: servicePages.slice(0, 5) },
          ].map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 text-[10px] text-olive-500">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline font-sans text-[14px] text-olive-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
