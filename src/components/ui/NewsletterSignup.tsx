"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import Reveal from "../anim/Reveal";
import SplitWords from "../anim/SplitWords";
import { isEmail } from "./Form";

/**
 * The IrisandMe letter. Set as its own band on the homepage (per the brief)
 * and reused at the foot of the Journal.
 */
export default function NewsletterSignup({
  eyebrow = "The IrisandMe Letter",
  title = "Stories, new collections and quiet news",
  body = "Be the first to see new collections and limited editions, with the occasional story from the studio. A few letters a season — never more.",
  tone = "sand",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  tone?: "sand" | "cream";
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setJoined(true);
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className={`${tone === "sand" ? "bg-cream-200" : "bg-cream-100"} px-6 py-24 md:px-14 md:py-32`}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal direction="none">
            <div className="section-index mb-6 text-olive-500">
              <span className="rule" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </Reveal>
          <div id="newsletter-title">
            <SplitWords
              text={title}
              className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.96] text-olive-800"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[46ch] font-sans text-[15px] leading-[1.9] text-olive-600">{body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5 lg:col-start-8">
          <AnimatePresence mode="wait">
            {joined ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                role="status"
                className="border-t border-olive-700/30 pt-6"
              >
                <p className="serif text-[1.7rem] leading-snug text-olive-700">Thank you for joining us.</p>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-olive-600">
                  Your first letter is on its way to {email}.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                // POST, so a submission made before hydration never puts the
                // address in the URL.
                method="post"
                noValidate
                onSubmit={submit}
              >
                <label htmlFor="newsletter-email" className="field-label">
                  Email address
                </label>
                <div className="flex items-center gap-4 border-b border-olive-700/35 transition-colors duration-500 focus-within:border-olive-800">
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby="newsletter-msg"
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-3.5 font-sans text-[15px] text-olive-800 placeholder:text-olive-500/70 focus:outline-none"
                  />
                  <button type="submit" className="eyebrow link-underline shrink-0 py-3.5 text-[10.5px] text-olive-800">
                    Subscribe
                  </button>
                </div>
                <p
                  id="newsletter-msg"
                  aria-live="polite"
                  className={`mt-3 min-h-[1.25rem] font-sans text-[12px] leading-relaxed ${
                    error ? "text-alert" : "text-olive-500"
                  }`}
                >
                  {error ?? (
                    <>
                      Unsubscribe at any time. See our{" "}
                      <Link href="/privacy-policy" className="underline underline-offset-2">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
