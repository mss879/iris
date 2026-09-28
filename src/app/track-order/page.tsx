import type { Metadata } from "next";
import Link from "next/link";
import ServiceShell from "@/components/ui/ServiceShell";
import { SectionHeading } from "@/components/ui/Section";
import { shipping } from "@/lib/site";
import TrackForm from "./_components/TrackForm";

export const metadata: Metadata = {
  title: "Track My Order",
  description: "Track your IrisandMe order with your order number and email address.",
};

const stages = [
  { title: "Order received", body: "We have your order and payment, and a confirmation is on its way to your inbox." },
  {
    title: "Being prepared",
    body: `Your pieces are checked, folded and wrapped — usually within ${shipping.processing}.`,
  },
  { title: "Dispatched", body: "Your parcel is with our delivery partner and your tracking link has been emailed to you." },
  { title: "In transit", body: "On its way. International parcels may pause briefly while they clear customs." },
  { title: "Delivered", body: "Your parcel has arrived. We hope you love what is inside." },
];

export default function TrackOrderPage() {
  return (
    <ServiceShell
      current="/track-order"
      title="Track My Order"
      intro="Enter your order number and the email address you ordered with to see where your parcel is."
    >
      <div className="flex flex-col gap-20">
        <TrackForm />

        <section aria-labelledby="stages-title">
          <SectionHeading id="stages-title" eyebrow="What each status means" title="From our studio to you" size="small" />
          <ol className="mt-12 flex flex-col">
            {stages.map((s, i) => (
              <li key={s.title} className="relative flex gap-7 pb-10 last:pb-0">
                {i < stages.length - 1 ? (
                  <span aria-hidden="true" className="absolute left-[15px] top-9 h-[calc(100%-2.25rem)] w-px bg-olive-700/20" />
                ) : null}
                <span className="serif grid h-8 w-8 shrink-0 place-items-center rounded-full border border-olive-700/30 text-[1rem] text-olive-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="eyebrow pt-2 text-[10.5px] text-olive-800">{s.title}</h3>
                  <p className="mt-2 max-w-[56ch] font-sans text-[14px] leading-[1.85] text-olive-600">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="track-help-title" className="border-t hairline pt-12">
          <h2 id="track-help-title" className="eyebrow text-[10.5px] text-olive-800">
            Good to know
          </h2>
          <ul className="mt-6 flex flex-col gap-3 font-sans text-[14px] leading-[1.85] text-olive-600">
            <li>Your tracking link is emailed as soon as your order leaves our studio.</li>
            <li>Pre-order pieces are sent separately, with their own tracking, when they arrive.</li>
            <li>
              Delivery estimates for every region are on our{" "}
              <Link href="/shipping-and-delivery" className="underline underline-offset-4 hover:text-olive-800">
                Shipping &amp; Delivery
              </Link>{" "}
              page.
            </li>
          </ul>
        </section>
      </div>
    </ServiceShell>
  );
}
