"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FormStatus, SubmitButton, TextField, isEmail } from "@/components/ui/Form";
import { site } from "@/lib/site";

/**
 * Order lookup. It will query the store platform at launch; until orders
 * exist there is nothing to find, so every lookup answers honestly.
 */
export default function TrackForm() {
  const [errors, setErrors] = useState<{ order?: string; email?: string }>({});
  const [looked, setLooked] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const order = String(f.get("order") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const errs: typeof errors = {};
    if (!order) errs.order = "Please enter your order number.";
    if (!isEmail(email)) errs.email = "Please enter the email used for your order.";
    setErrors(errs);
    setLooked(Object.keys(errs).length ? null : order);
  };

  return (
    <div className="border hairline bg-cream-50 p-7 md:p-10">
      <form method="post" noValidate onSubmit={submit} className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        <TextField
          label="Order number"
          name="order"
          placeholder="e.g. IM10245"
          hint="Found in your order confirmation email."
          autoComplete="off"
          required
          error={errors.order}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <div className="pt-2 sm:col-span-2">
          <SubmitButton>Track order</SubmitButton>
        </div>
      </form>

      {looked ? (
        <div className="mt-8">
          <FormStatus tone="error">
            We couldn&rsquo;t find order {looked} with that email address. Please check both against your
            confirmation email, or write to{" "}
            <a href={`mailto:${site.email.care}`} className="underline underline-offset-2">
              {site.email.care}
            </a>{" "}
            and we&rsquo;ll look it up for you.
          </FormStatus>
          <p className="mt-4 font-sans text-[13px] text-olive-600">
            Have an account?{" "}
            <Link href="/account" className="underline underline-offset-2">
              Sign in to see all your orders
            </Link>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
