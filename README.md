# IrisandMe

The IrisandMe website — a women's label working in linen, cotton and natural
fibres. The site follows the client's structure document ("IrisandMe website
structure"), as trimmed at the client's first review: an editorial homepage,
the shop, the collections, the IrisandMe brand world, client services,
discover pages, the customer area and the legal pages.

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
| 3 | Collections — The Linen Edit, We Love Cotton, The Resort Collection | `/collections`, `/collections/[slug]` |
| | The Lotus Collection, Limited Editions — switched off for now | `enabled: false` in `src/lib/products.ts` |
| 4 | Our Story — Who we are, then Consciously Iris&Me | `/our-story` |
| | People & Purpose of Iris&Me — People at the Heart of Our Story, Little Lives, Brighter Futures | `/people-and-purpose` |
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

The main menu is **NEW IN | SHOP | COLLECTIONS | OUR STORY** (SHOP,
COLLECTIONS and OUR STORY open dropdowns), and the footer carries the four
briefed columns — IRISANDME, CLIENT SERVICES, DISCOVER, LEGAL — followed by
Instagram and Facebook. Client Services and Track My Order sit in the utility
strip above the header on every page, so order tracking can be found
immediately.

### First review

The client's first review cut the brand world back:

- **Our Story** is now short: the "Who we are" story in plain paragraphs, then
  a Craftsmanship section (design process with how prints are chosen, fabric
  selection, construction, finishing, quality standards), ending on the
  "Made to last" band.
- **Craftsmanship, Our Fabrics and Our Prints** are folded into Our Story. Their
  old addresses redirect to the matching section (`next.config.ts`). The four
  care habits from Our Fabrics moved to Garment Care.
- **Our Philosophy** is one run of paragraphs, with the six principles as
  points under "What guides every piece".
- **Consciously IrisandMe** keeps natural fibres, recycled materials,
  small-batch production and packaging; responsible material choices and
  garment longevity are one paragraph each. Waste reduction, ethical
  manufacturing and future commitments are gone.
- **People & Purpose** keeps Support for Children only, for now.
- **The Journal** is gone, and **The Lotus Collection** and **Limited
  Editions** are switched off for now (their pieces stay in the shop).
- The **"On this page" index** is gone from every page, along with the section
  numbers it mirrored.

### Second review

- **Our Philosophy** ends on "What guides every piece"; the "In practice" band
  is gone.
- **Consciously IrisandMe** is now "Where we stand" leading into small-batch
  production, then the questions band. Natural fibres, responsible material
  choices, recycled materials, packaging and garment longevity are gone.
- The **"Continue exploring"** pager is gone from all four Our Story pages; the
  Our Story menu already lists them.

### Third review

The client sent new copy for the OUR STORY tab and asked for everything else
in it to come out, to keep it simple:

- The **OUR STORY** menu has two headings: **Who we are** (`/our-story`) and
  **People & Purpose of Iris&Me** (`/people-and-purpose`).
- **Our Story** is "Who we are", then **Consciously Iris&Me** on the same
  page, both in the client's words. Craftsmanship and the "Made to last" band
  are gone.
- **People & Purpose of Iris&Me** is the client's introduction, then **People
  at the Heart of Our Story** and **Little Lives, Brighter Futures**. Support
  for Children is replaced.
- **Our Philosophy** and the separate **Consciously IrisandMe** page are gone.
  Their old addresses, and those of Craftsmanship, Our Fabrics and Our Prints,
  redirect to Our Story (`next.config.ts`).
- Links elsewhere that pointed at the removed sections (homepage, product
  pages, Garment Care, the FAQ) now point at Our Story or are dropped.

Everything removed is in the git history (commit `4d1e3d3` and earlier) if any
of it comes back.

## Where content lives

Everything the pages repeat is defined once:

| File | Holds |
| --- | --- |
| `src/lib/site.ts` | Contact emails, hours, response time, social links, shipping regions and rates, returns window, gift card rules, payment methods |
| `src/lib/sizing.ts` | Size conversions (AU/UK/US/EU), body measurements, fit descriptions, model measurements, garment measurements |
| `src/lib/products.ts` | Shop categories, collections (each with an `enabled` switch), signature prints and every product |
| `src/lib/nav.ts` | Main menu, footer columns and the page families |
| `src/app/lookbook/_data/looks.ts` | Lookbook chapters and the pieces worn in each look |
| `src/app/stockists/_data/stockists.ts` | Boutique stockists — empty until the first boutique joins; the page lists them by region once added |
| `src/app/press/_data/press.ts` | As Seen In, press features, editorial shoots and placements — each section appears once it has an entry |
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
- Our Story and People & Purpose use the client's own copy, with one spelling
  fix ("encouraging").
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
| `SplitFeature`, `FeatureGrid`, `Figure`, `CtaBand` | Editorial building blocks |
| `ServiceShell` | Client Services pages: hero plus a sticky list of every service page |
| `LegalShell` | Policies: numbered sections and the other policies |
| `Accordion`, `Tabs`, `DataTable` | Accessible disclosure, tabs and reference tables |
| `Form` | Text, select, textarea and checkbox fields with labels, hints and errors |
| `NewsletterSignup`, `EmptyState`, `ContinueExploring`, `ButtonLink` | Shared pieces |

`src/components/brand/Standfirst.tsx` sets the brand pages' story sections — a
heading, a serif lede and plain paragraphs beside one held photograph — with
`Subhead` for titled breaks such as the stages of the making.
`src/components/services/` holds the pieces shared by the Client Services
pages.

Motion primitives are in `src/components/anim/` (`Reveal`, `SplitWords`,
`Parallax`, `ScrollProgress`), all timed from `src/lib/motion.ts`. Photographs
reveal by scaling a cover panel away rather than with `clip-path`, which could
fail silently and leave images hidden.

## Imagery

All photographs in `public/img/` are generated placeholders in one cream and
deep-olive art direction, ready to be swapped for the client's own shoots. The
close-ups of linen, stitching, buttons, prints and garment details are in
`craft-*.jpg`; fabrics in `fabric-*.jpg`;
prints in `print-*.jpg`; collection campaigns in `col-*.jpg`; product studio
and lifestyle frames in `p-*.jpg` and `l-*.jpg`.

## Brand mark

`public/img/logo-olive.png` and `logo-cream.png` are the two plates of the
wordmark, derived from `assets-archive/logo-source.png`. Both are always
mounted in the header and crossfaded, because swapping `src` on scroll flashes
while the second file decodes. The favicon and app icons are the ampersand from
the same artwork, set on deep olive.
