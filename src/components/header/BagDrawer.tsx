"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { products } from "@/lib/products";
import { FREE_SHIPPING_AU, formatPrice } from "@/lib/site";
import { bagCount, bagTotal, store, useStore } from "@/lib/store";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { CloseIcon } from "../icons";

/** Slide-in bag: lines with quantity controls, subtotal and the shipping note. */
export default function BagDrawer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useStore();
  const [checkoutNote, setCheckoutNote] = useState(false);
  useFocusTrap(ref, true, onClose);

  const count = bagCount(state);
  const total = bagTotal(state);
  // Gift cards travel by email, so only pieces count toward free shipping.
  const goods = state.bag.filter((b) => b.kind === "product");
  const goodsTotal = goods.reduce((n, b) => n + b.qty * b.price, 0);
  const toGo = Math.max(0, FREE_SHIPPING_AU - goodsTotal);
  const suggestions = products.filter((p) => p.isNew).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70]"
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-default bg-olive-950/45 backdrop-blur-[2px]"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-cream-100"
      >
        <div className="flex items-center justify-between border-b hairline px-7 py-6">
          <p className="eyebrow text-olive-700">Your bag ({count})</p>
          <button
            type="button"
            onClick={onClose}
            className="eyebrow flex items-center gap-2.5 text-[10px] text-olive-700"
            aria-label="Close bag"
          >
            Close <CloseIcon />
          </button>
        </div>

        {state.bag.length === 0 ? (
          <>
            <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
              <p className="serif text-[1.7rem] leading-snug text-olive-700">Your bag is empty</p>
              <p className="mt-4 max-w-[30ch] font-sans text-[13px] leading-relaxed text-olive-600">
                Complimentary shipping within Australia on orders over {formatPrice(FREE_SHIPPING_AU)}, and{" "}
                30 days to change your mind.
              </p>
              <Link href="/shop" onClick={onClose} className="btn btn-dark mt-9 px-10 py-3.5">
                <span className="eyebrow text-[10px]">Start shopping</span>
              </Link>
            </div>
            <div className="border-t hairline px-7 py-6">
              <p className="eyebrow mb-4 text-[10px] text-olive-500">New arrivals</p>
              <ul className="flex flex-col gap-3">
                {suggestions.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between gap-4 font-sans text-[12px] uppercase tracking-[0.14em] text-olive-700 hover:text-olive-500"
                    >
                      {p.name}
                      <span className="normal-case tracking-normal text-olive-600">{formatPrice(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <ul data-lenis-prevent className="flex-1 divide-y divide-olive-700/10 overflow-y-auto overscroll-contain px-7">
              {state.bag.map((item) => (
                <li key={item.key} className="flex gap-5 py-6">
                  <div className="relative h-[120px] w-[90px] shrink-0 overflow-hidden bg-cream-200">
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="90px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-olive-800 p-2 text-center">
                        <span className="eyebrow text-[8px] text-cream-100">Gift Card</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      {item.slug ? (
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={onClose}
                          className="font-sans text-[12px] uppercase tracking-[0.15em] text-olive-800 hover:text-olive-500"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-olive-800">{item.name}</p>
                      )}
                      <p className="font-sans text-[13px] text-olive-700">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <p className="mt-1.5 font-sans text-[12px] text-olive-500">{item.detail}</p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border hairline">
                        <button
                          type="button"
                          onClick={() => store.setQty(item.key, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="grid h-8 w-8 place-items-center text-olive-700 hover:bg-cream-200"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-sans text-[12.5px] text-olive-800" aria-live="polite">
                          <span className="sr-only">Quantity </span>
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.setQty(item.key, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="grid h-8 w-8 place-items-center text-olive-700 hover:bg-cream-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => store.removeFromBag(item.key)}
                        className="eyebrow link-underline text-[9.5px] text-olive-600"
                      >
                        Remove<span className="sr-only"> {item.name}</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t hairline px-7 py-6">
              {goods.length === 0 ? (
                <p className="font-sans text-[12.5px] text-olive-600">
                  Gift cards are delivered by email — there is nothing to ship.
                </p>
              ) : (
                <>
                  <p className="font-sans text-[12.5px] text-olive-600">
                    {toGo === 0
                      ? "Your order qualifies for complimentary shipping within Australia."
                      : `Add ${formatPrice(toGo)} more for complimentary shipping within Australia.`}
                  </p>
                  <div className="mt-2 h-px w-full bg-olive-700/15">
                    <div
                      className="h-full bg-olive-700 transition-[width] duration-700"
                      style={{ width: `${Math.min(100, (goodsTotal / FREE_SHIPPING_AU) * 100)}%` }}
                    />
                  </div>
                </>
              )}

              <div className="mt-6 flex items-baseline justify-between">
                <p className="eyebrow text-[10.5px] text-olive-800">Subtotal</p>
                <p className="font-sans text-[15px] text-olive-800">{formatPrice(total)}</p>
              </div>
              <p className="mt-1 font-sans text-[12px] text-olive-500">
                Shipping, duties and taxes are calculated at checkout.
              </p>

              <button
                type="button"
                onClick={() => setCheckoutNote(true)}
                className="btn btn-solid mt-6 w-full py-4"
              >
                <span className="eyebrow text-[10px]">Checkout</span>
              </button>
              {checkoutNote ? (
                <p role="status" className="mt-3 text-center font-sans text-[12.5px] text-olive-600">
                  Secure checkout opens when the store launches.
                </p>
              ) : null}
              <Link
                href="/shipping-and-delivery"
                onClick={onClose}
                className="eyebrow link-underline mx-auto mt-5 block w-fit text-[9.5px] text-olive-600"
              >
                Shipping &amp; returns
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
