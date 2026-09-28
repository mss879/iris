"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/**
 * Cookie consent. Essential storage (the bag, the wishlist, this choice) is
 * always on; anything optional waits for a yes. The choice lives in
 * localStorage and can be reopened from the Cookie Policy page at any time.
 *
 * State is read through an external store with an empty server snapshot, so
 * the banner is never part of the server HTML and hydration stays clean.
 */

const KEY = "irisandme:consent";
const OPEN_EVENT = "irisandme:consent-open";

type Consent = { analytics: boolean; decidedAt: string } | null;
type Snapshot = { consent: Consent; open: boolean };

let snapshot: Snapshot = { consent: null, open: false };
let loaded = false;
const listeners = new Set<() => void>();
const SERVER: Snapshot = { consent: null, open: false };

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  let consent: Consent = null;
  try {
    const raw = window.localStorage.getItem(KEY);
    consent = raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    consent = null;
  }
  snapshot = { consent, open: consent === null };
}

function set(next: Snapshot) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const reopen = () => set({ ...snapshot, open: true });
  window.addEventListener(OPEN_EVENT, reopen);
  return () => {
    listeners.delete(listener);
    window.removeEventListener(OPEN_EVENT, reopen);
  };
}

function decide(analytics: boolean) {
  const consent = { analytics, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    // Without storage the choice holds for this visit only.
  }
  set({ consent, open: false });
}

export default function CookieConsent() {
  const { open } = useSyncExternalStore(
    subscribe,
    () => {
      load();
      return snapshot;
    },
    () => SERVER
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          aria-describedby="consent-body"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="fixed inset-x-3 bottom-3 z-[80] border hairline bg-cream-50 p-6 shadow-[0_18px_50px_-20px_rgba(25,29,18,0.35)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[430px] md:p-7"
        >
          <p id="consent-title" className="eyebrow text-[10px] text-olive-800">
            Your privacy
          </p>
          <p id="consent-body" className="mt-3 font-sans text-[13px] leading-[1.75] text-olive-600">
            We use essential cookies to keep your bag and wishlist, and — only with your
            permission — analytics cookies to understand how our site is used. Read our{" "}
            <Link href="/cookie-policy" className="underline underline-offset-2 hover:text-olive-800">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => decide(true)} className="btn btn-solid px-6 py-3">
              <span className="eyebrow text-[9.5px]">Accept all</span>
            </button>
            <button type="button" onClick={() => decide(false)} className="btn btn-dark px-6 py-3">
              <span className="eyebrow text-[9.5px]">Essential only</span>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Reopens the consent choice — used on the Cookie Policy page. */
export function ManageCookiesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`btn btn-dark px-8 py-3.5 ${className}`}
    >
      <span className="eyebrow text-[10px]">Manage cookie preferences</span>
    </button>
  );
}
