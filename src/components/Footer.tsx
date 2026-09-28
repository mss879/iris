"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Reveal from "./anim/Reveal";
import Logo from "./Logo";
import { footerColumns, socialLinks } from "@/lib/nav";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./icons";

const socialIcon = { Instagram: InstagramIcon, Facebook: FacebookIcon } as const;

/**
 * Footer, as briefed: IRISANDME, CLIENT SERVICES, DISCOVER and LEGAL, then
 * the Instagram and Facebook links, closed by the full-width wordmark.
 */
export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="on-dark bg-olive-800 text-cream-100">
      <div className="px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="flex flex-col gap-6 border-b border-cream-100/15 pb-14 md:flex-row md:items-end md:justify-between">
              <p className="display max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[0.98] text-cream-50">
                {site.tagline}
              </p>
              <p className="max-w-[40ch] font-sans text-[13.5px] leading-relaxed text-cream-200/80">
                Womenswear in linen, cotton and natural fibres, designed in Australia to be
                worn well beyond a single season.
              </p>
            </div>
          </Reveal>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 pt-14 md:grid-cols-4">
            {footerColumns.map((col, i) => (
              <Reveal key={col.title} delay={0.06 * i}>
                <div>
                  <h2 className="eyebrow mb-6 text-[10.5px] text-olive-200">{col.title}</h2>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={pathname === link.href ? "page" : undefined}
                          className="link-underline font-sans text-[14px] text-cream-200/85 hover:text-cream-50"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </nav>

          <Reveal>
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream-100/15 pt-10">
              <p className="eyebrow text-[10px] text-cream-200/70">Follow {site.handle}</p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {socialLinks.map((s, i) => {
                  const Icon = socialIcon[s.label as keyof typeof socialIcon];
                  return (
                    <li key={s.label} className="flex items-center gap-6">
                      {i > 0 ? (
                        <span aria-hidden="true" className="h-3 w-px bg-cream-100/30" />
                      ) : null}
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow group/s flex items-center gap-2.5 text-[10.5px] text-cream-50"
                      >
                        {Icon ? <Icon className="h-4 w-4 opacity-80 transition-opacity group-hover/s:opacity-100" /> : null}
                        <span className="link-underline">{s.label}</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-20 flex justify-center border-t border-cream-100/15 pt-16">
              <div className="w-[min(70vw,620px)] opacity-90">
                <Logo tone="cream" />
              </div>
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mt-16 flex flex-col gap-4 border-t border-cream-100/15 pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-sans text-[12px] text-cream-200/70">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p className="eyebrow text-[10px] text-cream-200/70">
              {site.country} — {site.currency} $
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
