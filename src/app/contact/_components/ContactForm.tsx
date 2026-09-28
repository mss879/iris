"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  FormStatus,
  SelectField,
  SubmitButton,
  TextArea,
  TextField,
  isEmail,
} from "@/components/ui/Form";
import { site } from "@/lib/site";

const TOPICS = [
  "Order assistance",
  "Sizing & fit",
  "Returns & exchanges",
  "Product question",
  "Press",
  "Stockist enquiry",
  "Something else",
] as const;

type Topic = (typeof TOPICS)[number];

type Values = { name: string; email: string; order: string; topic: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", order: "", topic: "", message: "" };

/** Form order, so focus can move to the first field that needs attention. */
const FIELDS: Field[] = ["name", "email", "order", "topic", "message"];
const fieldId = (field: Field) => `contact-${field}`;

/** Guidance beneath the message box, tuned to the topic chosen. */
const MESSAGE_HINTS: Record<Topic, string> = {
  "Order assistance":
    "Tell us how we can help. Your order number lets us find your order straight away.",
  "Sizing & fit":
    "Tell us your height, the size you usually wear and the piece you’re considering.",
  "Returns & exchanges":
    "Tell us which pieces you’d like to return or exchange, and the size you’d like instead.",
  "Product question": "Tell us which piece you’re asking about.",
  Press: `You’re also welcome to write to ${site.email.press}.`,
  "Stockist enquiry": `You’re also welcome to write to ${site.email.stockists}.`,
  "Something else": "Tell us how we can help.",
};

const isTopic = (value: string): value is Topic => (TOPICS as readonly string[]).includes(value);

/**
 * False on the server and during hydration, true once React is attached.
 * Until then the submit button stays disabled: a native submission would
 * otherwise send the customer's details to the URL as a query string.
 */
const noop = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false
  );

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!isEmail(v.email))
    errors.email = "Please enter a valid email address, such as name@example.com.";
  if (!v.topic) errors.topic = "Please choose a topic.";
  if (!v.message.trim()) errors.message = "Please write your message.";
  else if (v.message.trim().length < 10)
    errors.message = "Please tell us a little more, so we can help.";
  return errors;
}

/**
 * Client Services enquiry form. There is no backend yet: the form validates in
 * the browser, keeps the message in component state and confirms receipt.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState<Values | null>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef(false);
  const hydrated = useHydrated();

  // Move focus to the confirmation so it is read out as soon as it appears,
  // and back to the first field when the customer starts a new message.
  useEffect(() => {
    if (sent) {
      thanksRef.current?.focus();
    } else if (returnFocus.current) {
      returnFocus.current = false;
      document.getElementById(fieldId("name"))?.focus();
    }
  }, [sent]);

  const change =
    (field: Field) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      // Keep an already-flagged field's message in step with what is typed, and
      // clear it once it is put right. Untouched fields are never flagged early.
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
      }
    };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setAttempted(true);
    const first = FIELDS.find((f) => found[f]);
    if (first) {
      document.getElementById(fieldId(first))?.focus();
      return;
    }
    setSent(values);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setAttempted(false);
    returnFocus.current = true;
    setSent(null);
  };

  if (sent) {
    const firstName = sent.name.trim().split(/\s+/)[0];
    return (
      <div className="flex max-w-[820px] flex-col items-start gap-8">
        <FormStatus>
          <h3
            ref={thanksRef}
            tabIndex={-1}
            className="serif text-[1.7rem] leading-snug text-olive-800 outline-none"
          >
            Thank you, {firstName}.
          </h3>
          <p className="mt-2">
            Your message is on its way to our Client Services team. We’ll reply to{" "}
            <strong className="font-medium">{sent.email}</strong> {site.responseTime}.
          </p>
        </FormStatus>
        <button
          type="button"
          onClick={reset}
          className="eyebrow link-underline text-[10px] text-olive-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  const hasErrors = FIELDS.some((f) => errors[f]);
  const hint = isTopic(values.topic) ? MESSAGE_HINTS[values.topic] : "Tell us how we can help.";

  return (
    <form method="post" noValidate onSubmit={submit} className="flex max-w-[820px] flex-col">
      <p className="mb-8 font-sans text-[13px] text-olive-500">Fields marked * are required.</p>

      <div className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
        <TextField
          id={fieldId("name")}
          name="name"
          label="Name"
          autoComplete="name"
          required
          value={values.name}
          onChange={change("name")}
          error={errors.name}
        />
        <TextField
          id={fieldId("email")}
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          value={values.email}
          onChange={change("email")}
          error={errors.email}
        />
        <TextField
          id={fieldId("order")}
          name="order"
          label="Order number"
          hint="Optional. You’ll find it in your order confirmation email."
          value={values.order}
          onChange={change("order")}
        />
        <SelectField
          id={fieldId("topic")}
          name="topic"
          label="Topic"
          required
          placeholder="Choose a topic"
          options={[...TOPICS]}
          value={values.topic}
          onChange={change("topic")}
          error={errors.topic}
        />
      </div>

      <TextArea
        id={fieldId("message")}
        name="message"
        label="Message"
        required
        rows={7}
        className="mt-3"
        value={values.message}
        onChange={change("message")}
        hint={hint}
        error={errors.message}
      />

      {attempted && hasErrors ? (
        <div className="mt-6">
          <FormStatus tone="error">
            Some details need your attention. Please check the highlighted fields.
          </FormStatus>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton disabled={!hydrated}>Send message</SubmitButton>
        <p className="max-w-[42ch] font-sans text-[12.5px] leading-relaxed text-olive-500">
          We use these details only to reply to your message. Read our{" "}
          <Link
            href="/privacy-policy"
            className="text-olive-700 underline decoration-1 underline-offset-[3px] hover:text-olive-800"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
