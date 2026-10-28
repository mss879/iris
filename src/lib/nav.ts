import { site } from "./site";

export type NavLink = { label: string; href: string };

/**
 * Primary menu: NEW IN | SHOP | COLLECTIONS | OUR STORY. The Journal was
 * briefed as a fifth item and taken off at the client's first review.
 */
export const mainNav = [
  { label: "New In", href: "/shop/new-arrivals" },
  { label: "Shop", href: "/shop", menu: "shop" },
  { label: "Collections", href: "/collections", menu: "collections" },
  { label: "Our Story", href: "/our-story", menu: "story" },
] as const;

export type MenuKey = "shop" | "collections" | "story";

/**
 * The IrisandMe world: the two headings under OUR STORY. Consciously Iris&Me
 * is a section of Who we are, on the Our Story page.
 */
export const brandPages: NavLink[] = [
  { label: "Who we are", href: "/our-story" },
  { label: "People & Purpose of Iris&Me", href: "/people-and-purpose" },
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
