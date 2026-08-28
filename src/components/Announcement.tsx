"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const messages = [
  "Complimentary shipping on orders over $250",
  "New — The Olive Edit has landed",
  "Made in small runs. When it's gone, it's gone.",
];

export default function Announcement() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % messages.length), 4600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-[55] flex h-9 items-center justify-center gap-6 overflow-hidden bg-olive-800 text-cream-100">
      {/* Flanking rules narrow the message into a plate rather than a banner. */}
      <span className="hidden h-px w-16 bg-cream-100/25 sm:block" />

      <div className="relative flex h-full items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow whitespace-nowrap text-[10px] text-cream-100/90"
          >
            {messages[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      <span className="hidden h-px w-16 bg-cream-100/25 sm:block" />
    </div>
  );
}
