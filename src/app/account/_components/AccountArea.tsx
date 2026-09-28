"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { getProduct, type Product } from "@/lib/products";
import { returns } from "@/lib/site";
import { useStore } from "@/lib/store";
import EmptyState from "@/components/ui/EmptyState";
import Tabs from "@/components/ui/Tabs";
import ProductGrid from "@/components/ProductGrid";
import {
  Checkbox,
  FormStatus,
  SelectField,
  SubmitButton,
  TextField,
  isEmail,
} from "@/components/ui/Form";

type Address = {
  name: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

const countries = [
  "Australia",
  "New Zealand",
  "United States",
  "United Kingdom",
  "Europe — other",
  "Asia — other",
  "Rest of World",
];

/**
 * My Account: sign in or create an account, then the customer area —
 * Orders, Addresses, Returns, Wishlist and Account details. The store
 * platform will supply real data at launch; until then the area runs in
 * this browser session only and nothing is sent anywhere.
 */
export default function AccountArea() {
  const [user, setUser] = useState<{ first: string; last: string; email: string } | null>(null);

  if (!user) return <SignIn onSignIn={setUser} />;
  return <Dashboard user={user} onUpdate={setUser} onSignOut={() => setUser(null)} />;
}

function SignIn({ onSignIn }: { onSignIn: (u: { first: string; last: string; email: string }) => void }) {
  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});
  const [joinErrors, setJoinErrors] = useState<Record<string, string>>({});

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    const errs: Record<string, string> = {};
    if (!isEmail(email)) errs.email = "Please enter a valid email address.";
    if (!password) errs.password = "Please enter your password.";
    setSignInErrors(errs);
    if (Object.keys(errs).length) return;
    onSignIn({ first: "", last: "", email });
  };

  const join = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const first = String(f.get("first") ?? "").trim();
    const last = String(f.get("last") ?? "").trim();
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    const errs: Record<string, string> = {};
    if (!first) errs.first = "Please enter your first name.";
    if (!isEmail(email)) errs.email = "Please enter a valid email address.";
    if (password.length < 8) errs.password = "Use at least 8 characters.";
    setJoinErrors(errs);
    if (Object.keys(errs).length) return;
    onSignIn({ first, last, email });
  };

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
      <section aria-labelledby="signin-title" className="lg:col-span-5">
        <h2 id="signin-title" className="display text-[clamp(1.8rem,3vw,2.4rem)] text-olive-800">
          Sign in
        </h2>
        <p className="mt-3 font-sans text-[14px] leading-relaxed text-olive-600">
          Welcome back. Sign in to see your orders, returns and saved details.
        </p>
        <form method="post" noValidate onSubmit={signIn} className="mt-10 flex flex-col gap-4">
          <TextField label="Email" name="email" type="email" autoComplete="email" required error={signInErrors.email} />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            error={signInErrors.password}
          />
          <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
            <SubmitButton>Sign in</SubmitButton>
            <Link href="/contact" className="eyebrow link-underline text-[10px] text-olive-700">
              Forgotten your password?
            </Link>
          </div>
        </form>
      </section>

      <section aria-labelledby="join-title" className="border-t hairline pt-14 lg:col-span-6 lg:col-start-7 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
        <h2 id="join-title" className="display text-[clamp(1.8rem,3vw,2.4rem)] text-olive-800">
          Create an account
        </h2>
        <p className="mt-3 font-sans text-[14px] leading-relaxed text-olive-600">An IrisandMe account keeps everything in one place:</p>
        <ul className="mt-5 grid grid-cols-1 gap-2 font-sans text-[13.5px] text-olive-700 sm:grid-cols-2">
          {["Your orders and their tracking", "Saved delivery addresses", "Returns in a few steps", "Your wishlist, on any device", "Your details and preferences"].map(
            (b) => (
              <li key={b} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[0.7em] block h-px w-3 shrink-0 bg-olive-500" />
                {b}
              </li>
            )
          )}
        </ul>
        <form method="post" noValidate onSubmit={join} className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <TextField label="First name" name="first" autoComplete="given-name" required error={joinErrors.first} />
          <TextField label="Last name" name="last" autoComplete="family-name" />
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            error={joinErrors.email}
            className="sm:col-span-2"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            hint="At least 8 characters."
            error={joinErrors.password}
            className="sm:col-span-2"
          />
          <Checkbox
            name="letter"
            className="sm:col-span-2"
            label="Send me the IrisandMe letter — new collections and stories, a few times a season."
          />
          <p className="font-sans text-[12px] leading-relaxed text-olive-500 sm:col-span-2">
            By creating an account you agree to our{" "}
            <Link href="/terms-and-conditions" className="underline underline-offset-2">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="pt-2 sm:col-span-2">
            <SubmitButton variant="dark">Create account</SubmitButton>
          </div>
        </form>
      </section>
    </div>
  );
}

function Dashboard({
  user,
  onUpdate,
  onSignOut,
}: {
  user: { first: string; last: string; email: string };
  onUpdate: (u: { first: string; last: string; email: string }) => void;
  onSignOut: () => void;
}) {
  return (
    <div>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[10px] text-olive-500">Signed in as {user.email}</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3rem)] text-olive-800">
            {user.first ? `Welcome, ${user.first}` : "Welcome back"}
          </h2>
        </div>
        <button type="button" onClick={onSignOut} className="eyebrow link-underline text-[10px] text-olive-700">
          Sign out
        </button>
      </div>

      <Tabs
        label="My Account"
        tabs={[
          { id: "orders", label: "Orders", content: <Orders /> },
          { id: "addresses", label: "Addresses", content: <Addresses /> },
          { id: "returns", label: "Returns", content: <Returns /> },
          { id: "wishlist", label: "Wishlist", content: <SavedPieces /> },
          { id: "details", label: "Account details", content: <Details user={user} onUpdate={onUpdate} /> },
        ]}
      />
    </div>
  );
}

function Orders() {
  return (
    <EmptyState
      title="No orders yet"
      action={
        <Link href="/shop" className="btn btn-dark px-10">
          <span className="eyebrow text-[10px]">Visit the Shop</span>
        </Link>
      }
    >
      When you place an order it will appear here, with its status and tracking. Ordered as a guest?{" "}
      <Link href="/track-order" className="underline underline-offset-2">
        Track your order
      </Link>
      .
    </EmptyState>
  );
}

function Addresses() {
  const [saved, setSaved] = useState<Address[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [adding, setAdding] = useState(false);

  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const a = Object.fromEntries(
      ["name", "line1", "line2", "city", "region", "postcode", "country"].map((k) => [k, String(f.get(k) ?? "").trim()])
    ) as Address;
    const errs: Record<string, string> = {};
    if (!a.name) errs.name = "Please enter a name.";
    if (!a.line1) errs.line1 = "Please enter the street address.";
    if (!a.city) errs.city = "Please enter a city or suburb.";
    if (!a.postcode) errs.postcode = "Please enter a postcode.";
    if (!a.country) errs.country = "Please choose a country.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaved((s) => [...s, a]);
    setAdding(false);
  };

  return (
    <div className="flex flex-col gap-10">
      {saved.length === 0 && !adding ? (
        <EmptyState
          title="No saved addresses"
          action={
            <button type="button" onClick={() => setAdding(true)} className="btn btn-dark px-10">
              <span className="eyebrow text-[10px]">Add an address</span>
            </button>
          }
        >
          Save a delivery address for a quicker checkout.
        </EmptyState>
      ) : null}

      {saved.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {saved.map((a, i) => (
            <li key={i} className="border hairline bg-cream-50 p-7 font-sans text-[14px] leading-[1.8] text-olive-700">
              {i === 0 ? <p className="eyebrow mb-3 text-[9.5px] text-olive-500">Default address</p> : null}
              <p className="text-olive-800">{a.name}</p>
              <p>{a.line1}</p>
              {a.line2 ? <p>{a.line2}</p> : null}
              <p>
                {a.city} {a.region} {a.postcode}
              </p>
              <p>{a.country}</p>
              <button
                type="button"
                onClick={() => setSaved((s) => s.filter((_, j) => j !== i))}
                className="eyebrow link-underline mt-4 text-[9.5px] text-olive-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {adding ? (
        <form method="post" noValidate onSubmit={save} className="grid grid-cols-1 gap-x-8 gap-y-4 border hairline bg-cream-50 p-7 sm:grid-cols-2 md:p-10">
          <p className="eyebrow text-[10px] text-olive-700 sm:col-span-2">New address</p>
          <TextField label="Full name" name="name" autoComplete="name" required error={errors.name} className="sm:col-span-2" />
          <TextField label="Street address" name="line1" autoComplete="address-line1" required error={errors.line1} className="sm:col-span-2" />
          <TextField label="Apartment, suite (optional)" name="line2" autoComplete="address-line2" className="sm:col-span-2" />
          <TextField label="City or suburb" name="city" autoComplete="address-level2" required error={errors.city} />
          <TextField label="State or region" name="region" autoComplete="address-level1" />
          <TextField label="Postcode" name="postcode" autoComplete="postal-code" required error={errors.postcode} />
          <SelectField
            label="Country"
            name="country"
            autoComplete="country-name"
            options={countries}
            placeholder="Choose a country"
            required
            error={errors.country}
          />
          <div className="flex flex-wrap items-center gap-6 pt-2 sm:col-span-2">
            <SubmitButton variant="dark">Save address</SubmitButton>
            <button type="button" onClick={() => setAdding(false)} className="eyebrow link-underline text-[10px] text-olive-700">
              Cancel
            </button>
          </div>
        </form>
      ) : saved.length > 0 ? (
        <button type="button" onClick={() => setAdding(true)} className="btn btn-dark self-start px-10">
          <span className="eyebrow text-[10px]">Add another address</span>
        </button>
      ) : null}
    </div>
  );
}

function Returns() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <EmptyState title="No returns in progress">
        Returns can be started within {returns.windowDays} days of delivery for unworn pieces with their tags
        attached. Orders eligible for return will appear here.
      </EmptyState>
      <div className="flex flex-col justify-center gap-4 font-sans text-[14px] leading-[1.85] text-olive-600">
        <p className="eyebrow text-[10px] text-olive-700">How returns work</p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 marker:text-olive-500">
          <li>Choose the order and the pieces you would like to return or exchange.</li>
          <li>We send your return instructions and label by email.</li>
          <li>Pack the pieces with their tags attached and drop the parcel off.</li>
          <li>Your refund or exchange is processed within {returns.processingDays} of the parcel reaching us.</li>
        </ol>
        <Link href="/returns-and-exchanges" className="eyebrow link-underline mt-2 self-start text-[10px] text-olive-700">
          Returns &amp; Exchanges
        </Link>
      </div>
    </div>
  );
}

function SavedPieces() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is Product => Boolean(p));
  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing saved yet"
        action={
          <Link href="/shop/new-arrivals" className="btn btn-dark px-10">
            <span className="eyebrow text-[10px]">New Arrivals</span>
          </Link>
        }
      >
        Tap the heart on any piece to keep it in your wishlist.
      </EmptyState>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <ProductGrid products={items.slice(0, 4)} />
      <Link href="/wishlist" className="eyebrow link-underline self-start text-[10px] text-olive-700">
        View your full wishlist ({items.length})
      </Link>
    </div>
  );
}

function Details({
  user,
  onUpdate,
}: {
  user: { first: string; last: string; email: string };
  onUpdate: (u: { first: string; last: string; email: string }) => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next = {
      first: String(f.get("first") ?? "").trim(),
      last: String(f.get("last") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
    };
    const errs: Record<string, string> = {};
    if (!next.first) errs.first = "Please enter your first name.";
    if (!isEmail(next.email)) errs.email = "Please enter a valid email address.";
    setErrors(errs);
    setDone(false);
    if (Object.keys(errs).length) return;
    onUpdate(next);
    setDone(true);
  };

  return (
    <form method="post" noValidate onSubmit={save} className="grid max-w-[720px] grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      <TextField label="First name" name="first" defaultValue={user.first} autoComplete="given-name" required error={errors.first} />
      <TextField label="Last name" name="last" defaultValue={user.last} autoComplete="family-name" />
      <TextField
        label="Email"
        name="email"
        type="email"
        defaultValue={user.email}
        autoComplete="email"
        required
        error={errors.email}
        className="sm:col-span-2"
      />
      <Checkbox name="letter" className="sm:col-span-2" label="Receive the IrisandMe letter" />
      <div className="flex flex-col gap-6 pt-4 sm:col-span-2">
        <SubmitButton variant="dark" className="self-start">
          Save details
        </SubmitButton>
        {done ? <FormStatus>Your details have been updated.</FormStatus> : null}
      </div>
    </form>
  );
}
