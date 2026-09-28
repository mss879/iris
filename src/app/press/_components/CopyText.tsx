"use client";

import { useState } from "react";

/** Copies a passage — here, the brand boilerplate — to the clipboard. */
export default function CopyText({ text, label = "Copy text" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <button type="button" onClick={copy} className="eyebrow link-underline text-[10px] text-olive-800">
        {label}
      </button>
      <span role="status" className="font-sans text-[12px] text-olive-500">
        {state === "copied"
          ? "Copied to your clipboard."
          : state === "failed"
            ? "Please select the text above to copy it."
            : ""}
      </span>
    </div>
  );
}
