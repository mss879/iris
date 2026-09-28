import { site } from "./site";

export type NavLink = { label: string; href: string };

/** Primary menu, exactly as briefed: NEW IN | SHOP | COLLECTIONS | OUR STORY | JOURNAL. */
export const mainNav = [
  { label: "New In", href: "/shop/new-arrivals" },
  { label: "Shop", href: "/shop", menu: "shop" },
  { label: "Collections", href: "/collections", menu: "collections" },
  { label: "Our Story", href: "/our-story", menu: "story" },
  { label: "Journal", href: "/journal" },
] as const;

export type MenuKey = "shop" | "collections" | "story";

/** The IrisandMe world — also the order the brand pages page through. */
export const brandPages: NavLink[] = [
  { label: "Our Story", href: "/our-story" },
  { label: "Our Philosophy", href: "/our-philosophy" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Our Fabrics", href: "/our-fabrics" },
  { label: "Our Prints", href: "/our-prints" },
  { label: "Consciously IrisandMe", href: "/consciously-irisandme" },
  { label: "People & Purpose", href: "/people-and-purpose" },
  { label: "Journal", href: "/journal" },
];

export const servicePages: NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Size & Fit", href: "/size-and-fit" },
  { label: "Garment Care", href: "/garment-care" },
  { label: "Shipping & Delivery", href: "/shipping-and-delivery" },
  { label: "Returns & Exchanges", href: "/returns-and-exchanges" },
  { label: "FAQ", href: "/faq" },
  { label: "Track My Order", href: "/track-order" },
];

export const discoverPages: NavLink[] = [
  { label: "Lookbook", href: "/lookbook" },
  { label: "Stockists", href: "/stockists" },
  { label: "Gift Cards", href: "/gift-cards" },
];

export const legalPages: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns Policy", href: "/returns-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

export const footerColumns = [
  { title: "IrisandMe", links: brandPages },
  { title: "Client Services", links: servicePages },
  { title: "Discover", links: discoverPages },
  { title: "Legal", links: legalPages },
];

export const socialLinks: NavLink[] = [
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
];
