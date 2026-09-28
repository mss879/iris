"use client";

import { useSyncExternalStore } from "react";

/**
 * Wishlist and bag, kept in localStorage and shared across every component
 * through one external store. The server snapshot is always empty, so the
 * first client render matches the HTML and saved items appear straight after
 * hydration without a mismatch.
 */

export type BagItem = {
  /** Unique per line: product + size, or one gift card per line. */
  key: string;
  kind: "product" | "gift-card";
  slug?: string;
  name: string;
  detail: string;
  price: number;
  qty: number;
  image?: string;
};

type State = {
  wishlist: string[];
  bag: BagItem[];
  /** UI only — never persisted. */
  bagOpen: boolean;
};

const KEY = "irisandme:store:v1";
const EMPTY: State = { wishlist: [], bag: [], bagOpen: false };

let state: State = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function read() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<State>;
      state = {
        ...EMPTY,
        wishlist: Array.isArray(saved.wishlist) ? saved.wishlist : [],
        bag: Array.isArray(saved.bag) ? saved.bag : [],
      };
    }
  } catch {
    // Private windows and blocked storage fall back to an in-memory session.
  }
}

function commit(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ wishlist: next.wishlist, bag: next.bag }));
  } catch {
    // Storage unavailable — keep working from memory.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  read();
  listeners.add(listener);
  // Keep open tabs in step with each other.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    hydrated = false;
    const open = state.bagOpen;
    read();
    state = { ...state, bagOpen: open };
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  read();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const store = {
  toggleWishlist(slug: string) {
    const has = state.wishlist.includes(slug);
    commit({
      ...state,
      wishlist: has ? state.wishlist.filter((s) => s !== slug) : [slug, ...state.wishlist],
    });
  },
  removeFromWishlist(slug: string) {
    commit({ ...state, wishlist: state.wishlist.filter((s) => s !== slug) });
  },
  addToBag(item: Omit<BagItem, "qty"> & { qty?: number }, { open = true } = {}) {
    const existing = state.bag.find((b) => b.key === item.key);
    const bag = existing
      ? state.bag.map((b) => (b.key === item.key ? { ...b, qty: b.qty + (item.qty ?? 1) } : b))
      : [...state.bag, { ...item, qty: item.qty ?? 1 }];
    commit({ ...state, bag, bagOpen: open ? true : state.bagOpen });
  },
  setQty(key: string, qty: number) {
    const bag =
      qty <= 0
        ? state.bag.filter((b) => b.key !== key)
        : state.bag.map((b) => (b.key === key ? { ...b, qty: Math.min(qty, 10) } : b));
    commit({ ...state, bag });
  },
  removeFromBag(key: string) {
    commit({ ...state, bag: state.bag.filter((b) => b.key !== key) });
  },
  setBagOpen(open: boolean) {
    commit({ ...state, bagOpen: open });
  },
};

export const bagCount = (s: State) => s.bag.reduce((n, b) => n + b.qty, 0);
export const bagTotal = (s: State) => s.bag.reduce((n, b) => n + b.qty * b.price, 0);
