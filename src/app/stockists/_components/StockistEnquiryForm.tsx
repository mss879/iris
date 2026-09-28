"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { FormStatus, SubmitButton, TextArea, TextField, isEmail } from "@/components/ui/Form";
import { site } from "@/lib/site";

const FIELDS = ["boutique", "name", "email", "web", "city", "country", "message"] as const;
type Field = (typeof FIELDS)[number];
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { boutique: "", name: "", email: "", web: "", city: "", country: "", message: "" };

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.boutique.trim()) errors.boutique = "Please enter the name of your boutique.";
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!isEmail(v.email)) errors.email = "Please enter a valid email address.";
  if (!v.city.trim()) errors.city = "Please enter your city.";
  if (!v.country.trim()) errors.country = "Please enter your country.";
  if (v.message.trim().length < 20)
    errors.message = "Please tell us a little about your boutique — a sentence or two is plenty.";
  return errors;
}

const firstName = (name: string) => name.trim().split(/\s+/)[0];

/**
 * Wholesale enquiry. There is no backend yet: the form validates on the
 * client and confirms on screen. Connect `submit` to the enquiry service (or
 * an email handler) before launch.
 */
export default function StockistEnquiryForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState<Values | null>(null);

  const update = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    // Once a submit has been tried, keep the messages in step with the typing.
    if (attempted) setErrors(validate(next));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setAttempted(true);

    const first = FIELDS.find((field) => found[field]);
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(values);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setAttempted(false);
    setSent(null);
  };

  if (sent) {
    return (
      <div
        ref={(el) => {
          el?.focus();
        }}
        tabIndex={-1}
        className="focus:outline-none"
      >
        <FormStatus>
          <span className="serif block text-[1.7rem] leading-snug text-olive-800">
            Thank you, {firstName(sent.name)}.
          </span>
          <span className="mt-2 block">
            We have your enquiry for {sent.boutique} and will reply to {sent.email} {site.responseTime}.
          </span>
        </FormStatus>
        <button
          type="button"
          onClick={reset}
          className="eyebrow link-underline mt-8 text-[10px] text-olive-800"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const hasErrors = attempted && Object.keys(errors).length > 0;

  return (
    <form method="post" noValidate onSubmit={submit}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        <TextField
          label="Boutique name"
          name="boutique"
          required
          autoComplete="organization"
          value={values.boutique}
          onChange={update("boutique")}
          error={errors.boutique}
        />
        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
        <TextField
          label="Website or Instagram"
          name="web"
          autoComplete="url"
          hint="Optional — where we can see your boutique"
          value={values.web}
          onChange={update("web")}
        />
        <TextField
          label="City"
          name="city"
          required
          autoComplete="address-level2"
          value={values.city}
          onChange={update("city")}
          error={errors.city}
        />
        <TextField
          label="Country"
          name="country"
          required
          autoComplete="country-name"
          value={values.country}
          onChange={update("country")}
          error={errors.country}
        />
        <TextArea
          label="About your boutique"
          name="message"
          required
          rows={6}
          hint="Your space, your customers and the labels you carry."
          value={values.message}
          onChange={update("message")}
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      {hasErrors ? (
        <div className="mt-6">
          <FormStatus tone="error">Please check the highlighted fields.</FormStatus>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
        <SubmitButton>Send enquiry</SubmitButton>
        <p className="max-w-[40ch] font-sans text-[12px] leading-relaxed text-olive-500">
          We use these details only to reply to your enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
