"use client";

import { useState, type FormEvent } from "react";
import { giftCards, formatPrice } from "@/lib/site";
import { store } from "@/lib/store";
import Logo from "@/components/Logo";
import { FormStatus, SubmitButton, TextArea, TextField, isEmail } from "@/components/ui/Form";

const MESSAGE_MAX = 240;

/** Today's date in the visitor's own timezone, as YYYY-MM-DD. */
function localToday() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

/** Choose an amount, address the card and add it to the bag. */
export default function GiftCardForm() {
  const [amount, setAmount] = useState<number>(giftCards.amounts[1]);
  const [custom, setCustom] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string | null>(null);

  const value = custom ? Number(custom) : amount;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const to = String(f.get("to") ?? "").trim();
    const toEmail = String(f.get("toEmail") ?? "").trim();
    const from = String(f.get("from") ?? "").trim();
    // Read the clock only on submit, so server and browser render the same form.
    const today = localToday();
    const date = String(f.get("date") || today);
    const errs: Record<string, string> = {};
    if (!Number.isFinite(value) || value < giftCards.min || value > giftCards.max || !Number.isInteger(value))
      errs.custom = `Choose a whole amount between ${formatPrice(giftCards.min)} and ${formatPrice(giftCards.max)}.`;
    if (!to) errs.to = "Please enter the recipient's name.";
    if (!isEmail(toEmail)) errs.toEmail = "Please enter the recipient's email address.";
    if (!from) errs.from = "Please enter your name.";
    if (date < today) errs.date = "Please choose today or a later date.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const when =
      date === today
        ? "today"
        : new Date(`${date}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
    store.addToBag({
      key: `gift-card:${Date.now()}`,
      kind: "gift-card",
      name: "IrisandMe Gift Card",
      detail: `Digital · for ${to} · sent ${when}`,
      price: value,
    });
    setAdded(to);
    e.currentTarget.reset();
    setMessage("");
  };

  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
      {/* The card itself, updating as the amount changes. */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
          <div
            className="on-dark relative flex aspect-[1.6/1] w-full flex-col justify-between overflow-hidden bg-olive-800 p-7 text-cream-50 shadow-[0_30px_60px_-30px_rgba(25,29,18,0.5)] md:p-9"
            aria-label={`IrisandMe gift card, ${formatPrice(value || 0)}`}
            role="img"
          >
            <div className="flex items-start justify-between">
              <span className="block w-[120px] md:w-[140px]">
                <Logo tone="cream" />
              </span>
              <span className="eyebrow text-[9px] text-cream-100/70">Gift Card</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="serif text-[clamp(2.4rem,5vw,3.4rem)] leading-none">
                {Number.isFinite(value) && value > 0 ? formatPrice(value) : "—"}
              </span>
              <span className="eyebrow text-[9px] text-cream-100/70">Valid {giftCards.validityYears} years</span>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-cream-100/10" />
          </div>
          <p className="mt-5 font-sans text-[12.5px] leading-relaxed text-olive-600">
            Delivered by email on the date you choose, with your message. Redeemable online at irisandme.com.
          </p>
        </div>
      </div>

      <form method="post" noValidate onSubmit={submit} className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
        <fieldset>
          <legend className="field-label">Amount</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {giftCards.amounts.map((a) => {
              const active = !custom && amount === a;
              return (
                <label key={a} className="cursor-pointer">
                  <input
                    type="radio"
                    name="amount"
                    value={a}
                    checked={active}
                    onChange={() => {
                      setAmount(a);
                      setCustom("");
                    }}
                    className="peer sr-only"
                  />
                  <span className="eyebrow flex h-12 min-w-[5.5rem] items-center justify-center border border-olive-700/25 px-4 text-[10.5px] text-olive-800 transition-colors duration-300 hover:border-olive-800 peer-checked:border-olive-800 peer-checked:bg-olive-800 peer-checked:text-cream-50 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive-600">
                    {formatPrice(a)}
                  </span>
                </label>
              );
            })}
          </div>
          <TextField
            label="Or another amount (AUD)"
            name="custom"
            type="number"
            inputMode="numeric"
            min={giftCards.min}
            max={giftCards.max}
            step={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            hint={`Any whole amount from ${formatPrice(giftCards.min)} to ${formatPrice(giftCards.max)}.`}
            error={errors.custom}
            className="mt-6 max-w-[260px]"
          />
        </fieldset>

        <fieldset className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <legend className="field-label mb-4">Who is it for?</legend>
          <TextField label="Recipient's name" name="to" autoComplete="off" required error={errors.to} />
          <TextField label="Recipient's email" name="toEmail" type="email" autoComplete="off" required error={errors.toEmail} />
          <TextField label="Your name" name="from" autoComplete="name" required error={errors.from} />
          <TextField
            label="Send on (optional)"
            name="date"
            type="date"
            hint="Leave blank to send it today."
            error={errors.date}
          />
          <TextArea
            label="Your message (optional)"
            name="message"
            rows={4}
            maxLength={MESSAGE_MAX}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            hint={`${MESSAGE_MAX - message.length} characters remaining`}
            className="sm:col-span-2"
          />
        </fieldset>

        <div className="flex flex-col gap-5">
          <SubmitButton className="self-start">
            Add to bag — {Number.isFinite(value) && value > 0 ? formatPrice(value) : "—"}
          </SubmitButton>
          {added ? (
            <FormStatus>
              A gift card for {added} is in your bag.{" "}
              <button type="button" onClick={() => store.setBagOpen(true)} className="underline underline-offset-2">
                View bag
              </button>
            </FormStatus>
          ) : null}
        </div>
      </form>
    </div>
  );
}
