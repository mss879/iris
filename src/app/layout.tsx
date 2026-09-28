import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/anim/ScrollProgress";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Italic is only used for accents in editorial statements, so it is loaded
// as its own small face and not preloaded ahead of the page.
const cormorantItalic = Cormorant_Garamond({
  variable: "--font-cormorant-italic",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: "italic",
  display: "swap",
  preload: false,
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_AU",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${cormorant.variable} ${cormorantItalic.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream-100 text-olive-700 flex flex-col">
        <MotionProvider>
          {/* First stop for keyboard users: straight past the header to the page. */}
          <a
            href="#main"
            className="eyebrow sr-only z-[120] bg-olive-800 px-5 py-3.5 text-[10.5px] text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <Grain />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
