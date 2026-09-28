"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { brandPages, mainNav, socialLinks } from "@/lib/nav";
import { collections, shopCategories } from "@/lib/products";
import { useFocusTrap } from "@/lib/useFocusTrap";
import Logo from "../Logo";
import { ChevronIcon, CloseIcon } from "../icons";

const groups: Record<string, { label: string; href: string }[]> = {
  shop: shopCategories.map((c) => ({ label: c.label, href: `/shop/${c.slug}` })),
  collections: collections.map((c) => ({ label: c.name, href: `/collections/${c.slug}` })),
  story: brandPages.filter((p) => p.href !== "/journal"),
};

const utility = [
  { label: "Track My Order", href: "/track-order" },
  { label: "My Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Client Services", href: "/contact" },
  { label: "Size & Fit", href: "/size-and-fit" },
];

/** Full-screen menu for small screens: the five main items, each section opening in place. */
export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  useFocusTrap(ref, true, onClose);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-olive-800 text-cream-100"
    >
      <div className="flex h-[76px] shrink-0 items-center justify-between px-5">
        <span className="w-[124px]">
          <Logo tone="cream" />
        </span>
        <button
          type="button"
          onClick={onClose}
          className="eyebrow flex items-center gap-2.5 text-[10px]"
          aria-label="Close menu"
        >
          Close <CloseIcon />
        </button>
      </div>

      <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-5 pb-10">
        <nav aria-label="Main">
          <ul className="flex flex-col">
            {mainNav.map((item, i) => {
              const key = "menu" in item ? item.menu : null;
              const expanded = key !== null && open === key;
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.6, ease: EASE_OUT }}
                  className="border-b border-cream-100/15"
                >
                  <div className="flex items-center justify-between">
                    <Link href={item.href} onClick={onClose} className="display flex-1 py-5 text-[30px] leading-none">
                      {item.label}
                    </Link>
                    {key ? (
                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : key)}
                        aria-expanded={expanded}
                        aria-controls={`m-${key}`}
                        aria-label={`${expanded ? "Hide" : "Show"} ${item.label} links`}
                        className="grid h-11 w-11 place-items-center"
                      >
                        <span className={`transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}>
                          <ChevronIcon className="h-3 w-3" />
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {key ? (
                    <div
                      id={`m-${key}`}
                      inert={!expanded}
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {groups[key].map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={onClose}
                              className="block py-2.5 pl-1 font-sans text-[15px] text-cream-200/90"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                        <li className="h-4" aria-hidden="true" />
                      </ul>
                    </div>
                  ) : null}
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
          {utility.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onClose} className="eyebrow text-[10px] text-cream-100/85">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex gap-6 border-t border-cream-100/15 pt-6">
          {socialLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow text-[10px] text-cream-200/75"
            >
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
