import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iris and Me | Slow Fashion for Every Chapter",
  description:
    "Iris and Me makes considered women's clothing in cream and deep olive — natural fibres, small runs, and pieces made to be lived in and treasured.",
  openGraph: {
    title: "Iris and Me | Slow Fashion for Every Chapter",
    description:
      "Considered women's clothing in cream and deep olive. Natural fibres, small runs, made to be treasured.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream-100 text-olive-700 flex flex-col">
        <MotionProvider>
          {children}
          <Grain />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
