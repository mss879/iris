"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { body, conversions, garments, model, SIZES } from "@/lib/sizing";
import { useFocusTrap } from "@/lib/useFocusTrap";
import DataTable from "@/components/ui/DataTable";
import { CloseIcon } from "@/components/icons";

/** Size chart drawer on the product page, with this piece's own measurements. */
export default function SizeGuide({
  slug,
  name,
  onClose,
}: {
  slug: string;
  name: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  const measures = garments[slug];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[75]"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-olive-950/45 backdrop-blur-[2px]"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        data-lenis-prevent
        className="absolute right-0 top-0 h-full w-full max-w-[620px] overflow-y-auto overscroll-contain bg-cream-100"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b hairline bg-cream-100 px-7 py-6">
          <h2 id="size-guide-title" className="eyebrow text-olive-800">
            Size guide
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="eyebrow flex items-center gap-2.5 text-[10px] text-olive-700"
            aria-label="Close size guide"
          >
            Close <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-12 px-7 py-10">
          <DataTable
            caption="International sizes"
            head={["IrisandMe", "AU", "UK", "US", "EU"]}
            rows={SIZES.map((s) => [s, conversions[s].au, conversions[s].uk, conversions[s].us, conversions[s].eu])}
            minWidth={420}
          />

          <DataTable
            caption="Body measurements (cm)"
            head={["Size", "Bust", "Waist", "Hip"]}
            rows={SIZES.map((s) => [s, body[s].bust, body[s].waist, body[s].hip])}
            minWidth={420}
          />

          {measures ? (
            <DataTable
              caption={`${name} — garment measurements (cm)`}
              head={["Measurement", ...SIZES]}
              rows={measures.map((m) => [m.label, ...SIZES.map((s) => m.values[s] ?? "—")])}
              note="Measured flat and doubled where relevant. Allow ±1cm, as linen and cotton relax with wear."
              minWidth={480}
            />
          ) : null}

          <p className="font-sans text-[13.5px] leading-relaxed text-olive-600">
            Our model is {model.height} with a {model.bust}cm bust, {model.waist}cm waist and{" "}
            {model.hip}cm hips, and wears a size {model.size} (AU {conversions[model.size].au}).
          </p>

          <Link
            href="/size-and-fit"
            onClick={onClose}
            className="eyebrow link-underline self-start text-[10px] text-olive-700"
          >
            How to measure &amp; full Size &amp; Fit guide
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
