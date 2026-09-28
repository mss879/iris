"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { brandPages, mainNav, type MenuKey } from "@/lib/nav";
import { bagCount, store, useStore } from "@/lib/store";
import Announcement from "./Announcement";
import Logo from "./Logo";
import { lockScroll } from "./SmoothScroll";
import MegaMenu from "./header/MegaMenu";
import MobileMenu from "./header/MobileMenu";
import SearchOverlay from "./header/SearchOverlay";
import BagDrawer from "./header/BagDrawer";
import { BagIcon, ChevronIcon, HeartIcon, SearchIcon, UserIcon } from "./icons";

type Panel = "menu" | "search";

/** Which main-menu item the current page belongs under. */
function isActive(href: string, pathname: string) {
  switch (href) {
    case "/shop/new-arrivals":
      return pathname === href;
    case "/shop":
      return (
        pathname !== "/shop/new-arrivals" &&
        (pathname === "/shop" || pathname.startsWith("/shop/") || pathname.startsWith("/products/"))
      );
    case "/our-story":
      return brandPages.some((p) => p.href !== "/journal" && p.href === pathname);
    default:
      return pathname === href || pathname.startsWith(`${href}/`);
  }
}

/**
 * Fixed site header. Transparent over the homepage hero until the page moves,
 * solid everywhere else. SHOP, COLLECTIONS and OUR STORY open a dropdown on
 * hover, or from the chevron beside them for keyboard users.
 *
 * Open states are stored with the path they were opened on, so navigating
 * anywhere closes them without an effect having to reset anything.
 */
export default function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  const [mega, setMega] = useState<{ key: MenuKey; path: string } | null>(null);
  const [panel, setPanel] = useState<{ key: Panel; path: string } | null>(null);
  const openMega = mega?.path === pathname ? mega.key : null;
  const openPanel = panel?.path === pathname ? panel.key : null;

  const state = useStore();
  const count = bagCount(state);
  const saved = state.wishlist.length;
  const bagOpen = state.bagOpen;

  const solid = !overlay || scrolled || openMega !== null;
  const wrapRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  const closePanel = useCallback(() => setPanel(null), []);
  const closeBag = useCallback(() => store.setBagOpen(false), []);
  const closeMega = useCallback(() => setMega(null), []);

  // An overlay owns the page: pause the scroll behind it.
  const overlayOpen = openPanel !== null || bagOpen;
  useEffect(() => {
    if (!overlayOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [overlayOpen]);

  // The dropdown closes on Escape and hands focus back to its chevron.
  useEffect(() => {
    if (!openMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(null);
      document.getElementById(`mega-toggle-${openMega}`)?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMega]);

  const openFromKeyboard = (key: MenuKey) => {
    if (openMega === key) return setMega(null);
    setMega({ key, path: pathname });
    window.setTimeout(() => megaRef.current?.querySelector<HTMLElement>("a")?.focus(), 80);
  };

  // Tabbing out of the header entirely closes the dropdown.
  const onBlur = (e: FocusEvent) => {
    if (!wrapRef.current?.contains(e.relatedTarget as Node)) setMega(null);
  };

  const ink = solid ? "text-olive-800" : "text-cream-50";

  return (
    <>
      <div
        ref={wrapRef}
        onMouseLeave={() => setMega(null)}
        onBlur={onBlur}
        className="fixed inset-x-0 top-0 z-50"
      >
        <header
          className={`relative transition-colors duration-500 ${
            solid ? "border-b hairline bg-cream-100/95 backdrop-blur-md" : "bg-transparent"
          } ${ink}`}
        >
          <Announcement />

          <div className="relative mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 md:px-10">
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-5 2xl:gap-8">
                {mainNav.map((item) => {
                  const key = "menu" in item ? item.menu : null;
                  const active = isActive(item.href, pathname);
                  return (
                    <li
                      key={item.label}
                      className="flex items-center"
                      onMouseEnter={() => (key ? setMega({ key, path: pathname }) : setMega(null))}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="eyebrow link-underline py-3"
                      >
                        {item.label}
                      </Link>
                      {key ? (
                        <button
                          type="button"
                          id={`mega-toggle-${key}`}
                          onClick={() => openFromKeyboard(key)}
                          aria-expanded={openMega === key}
                          // Only reference the panel while it exists in the DOM.
                          aria-controls={openMega === key ? `mega-${key}` : undefined}
                          aria-label={`${item.label} menu`}
                          className="grid h-6 w-6 place-items-center opacity-60 transition-opacity hover:opacity-100"
                        >
                          <span
                            className={`transition-transform duration-500 ${openMega === key ? "rotate-180" : ""}`}
                          >
                            <ChevronIcon className="h-2 w-2" />
                          </span>
                        </button>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setPanel({ key: "menu", path: pathname })}
              className="eyebrow flex items-center gap-2.5 xl:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
            >
              <span className="flex w-4 flex-col gap-[3px]" aria-hidden="true">
                <span className="block h-px w-full bg-current" />
                <span className="block h-px w-full bg-current" />
              </span>
              Menu
            </button>

            {/*
              Both plates are always mounted and crossfaded. Swapping the `src`
              on scroll would flash while the second file decoded.
            */}
            <Link
              href="/"
              aria-label="IrisandMe — home"
              className="absolute left-1/2 w-[112px] -translate-x-1/2 md:w-[148px]"
            >
              <span className="relative block">
                <Logo tone="olive" priority className={`transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
                <span className="absolute inset-0">
                  <Logo tone="cream" priority className={`transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-4 md:gap-5">
              <button
                type="button"
                onClick={() => setPanel({ key: "search", path: pathname })}
                className="eyebrow flex items-center gap-2"
                aria-label="Search"
                aria-haspopup="dialog"
              >
                <SearchIcon className="h-[15px] w-[15px]" />
                <span className="link-underline hidden xl:inline-block">Search</span>
              </button>
              <Link href="/account" className="eyebrow hidden items-center gap-2 sm:flex" aria-label="My account">
                <UserIcon className="h-[15px] w-[15px]" />
                <span className="link-underline hidden xl:inline-block">Account</span>
              </Link>
              <Link
                href="/wishlist"
                className="eyebrow hidden items-center gap-1.5 sm:flex"
                aria-label={`Wishlist, ${saved} saved`}
              >
                <HeartIcon className="h-[15px] w-[15px]" filled={saved > 0} />
                {saved > 0 ? <span className="text-[9.5px]">{saved}</span> : null}
              </Link>
              <button
                type="button"
                onClick={() => store.setBagOpen(true)}
                className="eyebrow flex items-center gap-2"
                aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
                aria-haspopup="dialog"
              >
                <BagIcon className="h-[15px] w-[15px]" />
                <span className="hidden sm:inline">Bag</span>
                <span className="text-[9.5px]">({count})</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {openMega ? <MegaMenu key={openMega} ref={megaRef} menu={openMega} onNavigate={closeMega} /> : null}
          </AnimatePresence>
        </header>
      </div>

      <AnimatePresence>
        {openPanel === "menu" ? <MobileMenu key="menu" onClose={closePanel} /> : null}
        {openPanel === "search" ? <SearchOverlay key="search" onClose={closePanel} /> : null}
        {bagOpen ? <BagDrawer key="bag" onClose={closeBag} /> : null}
      </AnimatePresence>
    </>
  );
}
