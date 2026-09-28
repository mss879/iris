# IrisandMe

The IrisandMe website — a women's label working in linen, cotton and natural
fibres. The site follows the client's structure document ("IrisandMe website
structure") page for page: an editorial homepage, the shop, the collections,
the IrisandMe brand world, client services, discover pages, the customer area
and the legal pages.

Next.js 16.3 · React 19.2 · Tailwind CSS 4 · Motion 13 · Lenis

## Run

```bash
npm run dev
```

## Site map

Numbers follow the client's brief.

| # | Page | Route |
| --- | --- | --- |
| 1 | Home | `/` |
| 2 | Shop (landing) | `/shop` |
| | New Arrivals · Shop All · Dresses · Tops & Shirts · Skirts · Trousers & Shorts · Sets / Co-ords · Essentials | `/shop/[category]` |
| | Sale — built but switched off ("to be added later") | `enabled: false` in `src/lib/products.ts` |
| | Product pages | `/products/[slug]` |
| 3 | Collections — The Linen Edit, We Love Cotton, The Resort Collection, The Lotus Collection, Limited Editions | `/collections`, `/collections/[slug]` |
| 4 | Our Story | `/our-story` |
| 5 | Our Philosophy | `/our-philosophy` |
| 6 | Craftsmanship | `/craftsmanship` |
| 7 | Our Fabrics | `/our-fabrics` |
| 8 | Our Prints | `/our-prints` |
| 9 | Consciously IrisandMe | `/consciously-irisandme` |
| 10 | People & Purpose | `/people-and-purpose` |
| 11 | The Journal — The Art of Linen, How to Style Linen, Seasonal Trends | `/journal`, `/journal/[slug]` |
| 12 | Size & Fit | `/size-and-fit` |
| 13 | Garment Care | `/garment-care` |
| 14 | Shipping & Delivery | `/shipping-and-delivery` |
| 15 | Returns & Exchanges | `/returns-and-exchanges` |
| 16 | FAQ | `/faq` |
| 17 | Customer Services (Contact) | `/contact` |
| 18 | Stockists | `/stockists` |
| 20 | Press | `/press` |
| 21 | Lookbook | `/lookbook` |
| 22 | Gift Cards | `/gift-cards` |
| 23 | My Account — Orders, Addresses, Returns, Wishlist, Account details | `/account` |
| 24 | Wishlist | `/wishlist` |
| 25 | Order Tracking | `/track-order` |
| 26–30 | Privacy Policy · Terms & Conditions · Shipping Policy · Returns & Refund Policy · Cookie Policy | `/privacy-policy`, `/terms-and-conditions`, `/shipping-policy`, `/returns-policy`, `/cookie-policy` |
| 31 | Accessibility | `/accessibility` |

The main menu is exactly **NEW IN | SHOP | COLLECTIONS | OUR STORY | JOURNAL**
(SHOP, COLLECTIONS and OUR STORY open dropdowns), and the footer carries the
four briefed columns — IRISANDME, CLIENT SERVICES, DISCOVER, LEGAL — followed
by Instagram and Facebook. Client Services and Track My Order sit in the
utility strip above the header on every page, so order tracking can be found
immediately.

## Where content lives

Everything the pages repeat is defined once:

| File | Holds |
| --- | --- |
| `src/lib/site.ts` | Contact emails, hours, response time, social links, shipping regions and rates, returns window, gift card rules, payment methods |
| `src/lib/sizing.ts` | Size conversions (AU/UK/US/EU), body measurements, fit descriptions, model measurements, garment measurements |
| `src/lib/products.ts` | Shop categories, collections, signature prints and every product |
| `src/lib/journal.ts` | Journal articles, written as typed content blocks |
| `src/lib/nav.ts` | Main menu, footer columns and the page families |
| `src/app/lookbook/_data/looks.ts` | Lookbook chapters and the pieces worn in each look |
| `src/app/stockists/_data/stockists.ts` | Boutique stockists — empty until the first boutique joins; the page lists them by region once added |
| `src/app/press/_data/press.ts` | As Seen In, press features, editorial shoots and placements — each section appears once it has an entry |
| `src/app/people-and-purpose/_components/initiatives.ts` | Women's empowerment and children's initiatives — empty until programs are established |
| `src/app/faq/_components/faqs.ts` | FAQ answers, used for both the page and its structured data |

Change a value in `site.ts` and every page that quotes it — service pages,
policies, product pages, the bag — updates together.

### Awaiting client confirmation

The structure document describes what each page should cover but not the
operational facts, so these are sensible working defaults to confirm before
launch:

- Contact emails (`care@`, `press@`, `stockists@`, `privacy@irisandme.com`),
  business hours and the one-business-day response time.
- Shipping carriers, rates, delivery estimates and free-shipping thresholds per
  region; processing time.
- Returns window (30 days), faulty-item reporting window (7 days), the $10
  domestic return-label deduction, refund timing.
- Gift card amounts ($50–$1,000) and validity (3 years).
- Payment methods, including Afterpay.
- Size chart values and model measurements.
- Instagram and Facebook handles (`@irisandme`) and the domain.
- Brand story specifics (founding, people, workshops) — the copy describes the
  brand's approach without inventing facts, so real details can be added. The
  making process (sampling, fabric selection, construction, finishing,
  printing methods, the quality checklist) is written as the house's practice
  and should be checked against how IrisandMe actually works.
- Consciously IrisandMe and People & Purpose state intentions and future
  commitments, never achievements; confirm each commitment is one the
  business is willing to make publicly.
- Care guidance against the real care labels, and the fabric compositions of
  each product.
- The press boilerplate and the press office offer (imagery, samples,
  interviews on request).
- The legal pages are thorough drafts written for an Australian business
  selling internationally. They need review by the client's lawyer, and the
  legal entity details (name, ABN, address, governing state) added. Tax
  treatment of international orders (GST, UK VAT, EU import VAT) needs an
  accountant's confirmation.

## Commerce

The bag, wishlist, account area, gift cards and order tracking are fully
interactive on the front end but not yet connected to a store platform:

- **Bag and wishlist** persist in `localStorage` (`irisandme:store:v1`) and are
  shared by every component through one external store (`src/lib/store.ts`).
  Checkout shows a note until the payment platform is connected.
- **My Account** signs in for the session only; nothing is sent anywhere.
- **Forms** (contact, newsletter, stockist enquiry, gift cards) validate and
  confirm on the page; they need wiring to an email or CRM service.
- **Order tracking** answers honestly that no order was found until it can
  query real orders.

## Accessibility

Built in from the start, as the brief asks: a skip link, landmarks and one
`h1` per page; every menu, dropdown, drawer, tab set and accordion works by
keyboard (Escape closes overlays and returns focus); overlays trap focus;
colour tokens meet WCAG AA on every cream ground (`olive-400` was deepened for
this); labelled fields with announced errors; the announcement strip can be
paused; motion and smooth scrolling stand down for `prefers-reduced-motion`;
nothing scrolls sideways at 320px. Every route passes an axe-core audit
against WCAG 2.2 AA.

A cookie consent banner (essential only / accept all) stores its choice in
`localStorage` and can be reopened from the Cookie Policy.

## Design system

Tokens live in `src/app/globals.css` (`@theme`): cream grounds, deep olive
type, Cormorant Garamond for display (`.display`, uppercase; `.serif` for
mixed-case quotes) and Jost for body. Shared recipes: `.btn` (`-dark`,
`-light`, `-solid`), `.section-index`, `.prose-iris` for long-form text, and
`.field-*` for forms.

Pages are composed from `src/components/ui/`:

| Component | Use |
| --- | --- |
| `PageHero` | Opening band — `plain`, `split` (type + portrait) or `image` (full bleed) |
| `Section`, `SectionHeading` | Bands on one spacing rhythm; numeral, rule, label and a word-by-word heading |
| `SplitFeature`, `FeatureGrid`, `Figure`, `PullQuote`, `CtaBand` | Editorial building blocks |
| `ServiceShell` | Client Services pages: hero plus a sticky index of every service page |
| `LegalShell` | Policies: contents list, numbered sections, other policies |
| `Accordion`, `Tabs`, `DataTable` | Accessible disclosure, tabs and reference tables |
| `Form` | Text, select, textarea and checkbox fields with labels, hints and errors |
| `NewsletterSignup`, `EmptyState`, `ContinueExploring`, `ButtonLink` | Shared pieces |

`src/components/brand/` holds the pieces shared by the IrisandMe brand pages
(standfirsts, page indexes, checklists, print index) and
`src/components/services/` those shared by the Client Services pages.

Motion primitives are in `src/components/anim/` (`Reveal`, `SplitWords`,
`Parallax`, `ScrollProgress`), all timed from `src/lib/motion.ts`. Photographs
reveal by scaling a cover panel away rather than with `clip-path`, which could
fail silently and leave images hidden.

## Imagery

All photographs in `public/img/` are generated placeholders in one cream and
deep-olive art direction, ready to be swapped for the client's own shoots. The
close-ups of linen, stitching, buttons, prints and garment details the brief
asks for on Craftsmanship are in `craft-*.jpg`; fabrics in `fabric-*.jpg`;
prints in `print-*.jpg`; collection campaigns in `col-*.jpg`; product studio
and lifestyle frames in `p-*.jpg` and `l-*.jpg`.

## Brand mark

`public/img/logo-olive.png` and `logo-cream.png` are the two plates of the
wordmark, derived from `assets-archive/logo-source.png`. Both are always
mounted in the header and crossfaded, because swapping `src` on scroll flashes
while the second file decodes. The favicon and app icons are the ampersand from
the same artwork, set on deep olive.
