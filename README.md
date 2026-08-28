# Iris and Me

Homepage for **Iris and Me**, a women's slow-fashion label — rebuilt from the
structure of daughtersofindia.net in a cream and dark-olive palette.

Next.js 16.3.2 · React 19.2.8 · Tailwind CSS 4.3.3 · Motion 13 · Lenis

## Run

```bash
npm run dev
```

## Brand mark

`public/img/logo-olive.png` and `logo-cream.png` are the two plates of the
wordmark. Both are derived from the supplied artwork in `assets-archive/logo-source.png`,
which was dark ink on a white ground: luminance is inverted into an alpha mask
(so the anti-aliased edges survive), the mark is re-tinted along a horizontal
gradient in the brand palette, then trimmed tight.

| Plate | Gradient | Use |
| --- | --- | --- |
| `logo-olive` | `olive-800` → `olive-400` | Cream grounds — curtain, solid header |
| `logo-cream` | `cream-50` → `cream-300` | Olive grounds — transparent header, menu, footer |

Both are always mounted in the header and crossfaded, because swapping `src`
on scroll flashes while the second file decodes.

## Palette

Defined as Tailwind tokens in `src/app/globals.css` (`@theme`).

| Token | Hex | Use |
| --- | --- | --- |
| `cream-50` | `#FBF8F1` | Type on olive |
| `cream-100` | `#F6F1E6` | Page background |
| `cream-200` | `#EFE8D9` | Alternating band |
| `olive-700` | `#363E28` | Primary text, announcement |
| `olive-800` | `#2C331F` | Footer, editorial ground |
| `olive-950` | `#191D12` | Image veils |

Type: **Cormorant Garamond** (display, uppercase; `.serif` for mixed-case pull
quotes) + **Jost** (UI/body).

Shared recipes live in `@layer components`: `.btn` (with `.btn-dark` /
`.btn-light` grounds) is the single button, so every call to action wipes up
from the bottom edge with the same weight; `.section-index` is the numeral +
rule + label that opens each section; `--rule` is the one hairline token.

## Scroll animation system

`src/components/anim/` holds the reusable primitives:

| Component | Behaviour |
| --- | --- |
| `Reveal` / `RevealItem` | Fade + slide on entry, `once: true`, optional stagger |
| `SplitWords` | Headings rise word-by-word out of an overflow mask |
| `ImageReveal` | Clip-path wipe over a photograph settling out of over-scale |
| `Parallax` | Spring-damped counter-scroll drift |
| `VelocityMarquee` | Infinite marquee that surges with scroll velocity and flips direction |
| `Counter` | Counts up when scrolled into view |
| `ScrollProgress` | Hairline progress bar |

All timing and easing comes from `src/lib/motion.ts` — an expo-out curve
(`0.16, 1, 0.3, 1`) and one shared scroll spring, so the whole page settles
with the same weight.

Section-level scroll choreography:

- **Curtain** — a cream panel holds the brand mark, then lifts to hand the page
  to the hero. Zero-length for reduced-motion users; hidden entirely without JS.
- **Hero** — a single full-bleed cinematic frame that scales and drifts on a
  scroll spring while the copy sits in the negative space and sinks away.
- **AsSeenOnYou** — pinned panel converting vertical scroll into horizontal
  travel, with each card reading its **own** screen position every frame and
  driving its own transforms from it: rotating toward the viewer as it reaches
  the middle and away again on the far side, scaling and dimming with distance,
  while the photograph inside counter-drifts against its frame. Because the
  effect is position-derived rather than index-derived, it holds for any card
  count or viewport. Track travel is measured (not guessed in `vw`) so the last
  card lands flush against the gutter, and the section's height is derived from
  that travel so the pin never outlasts the movement.
- **Editorial** — pinned background scaled and drifted behind settling copy.
- **Header** — always pinned; crossfades from transparent to a solid blurred
  ground past 80px. Search and bag open full overlays that lock the scroll
  behind them and close on Escape.

Two page-wide layers sit above everything: `Grain`, a fixed fractal-noise
overlay at ~5% that gives the flat cream fields a paper tooth, and `Cursor`, a
trailing ring that opens over links and becomes a labelled disc over product
imagery. The cursor reads pointer capability through `useSyncExternalStore`
(server snapshot `false`), so it never reaches touch devices, and it hides the
native cursor from JS rather than CSS — if it fails to mount, the page is still
left with a usable pointer.

Lenis provides weighted smooth scrolling; `MotionProvider` sets
`reducedMotion="user"`, and Lenis is skipped entirely, when the OS asks for
reduced motion.

## Imagery

All 21 photographs in `public/img/` were generated with the Higgsfield CLI
against a shared cream/dark-olive art direction so the set reads as one
campaign. Budget was spent where it shows:

- **Feature images** (hero, both editorial plates, the promise portrait) —
  `seedream_v5_pro` / `nano_banana_pro` at 2K, 2–3 credits each.
- **Grid images** (products, UGC, journal) — `z_image` at 0.15 credits each.

Total: **~18 credits**. Sources are JPEG (quality 84) — 16 MB rather than the
101 MB the original PNGs occupied. Superseded shots are kept in `assets-archive/`, outside `public/`, so they are
neither served nor built — and git-ignored, so they never reach the repo. The
brand master (`logo-source.png`) is the one file there that is tracked.

## Sections

| Section | Notes |
| --- | --- |
| Hero | Full-bleed cinematic frame on a scroll spring |
| Intro | Statement + three-up commitments |
| PressStrip | Masthead row set in the display serif |
| ShopCollection (02) | Filterable grid; an editorial panel spans the remainder of an incomplete row so it always closes flush |
| Editorial (03, 04) | Pinned plate behind settling copy |
| AsSeenOnYou | Position-aware 3D gallery |
| BrandPromise (05) | Parallax portrait + counted pledges |
| Testimonials (06) | Auto-advancing quotes, paused on hover |
| Journal (07) | One feature story + a reading list |
| Moments | Community grid |
| Footer | Assurances, letter sign-up, full-width wordmark |

Product cards carry a second lifestyle frame that crossfades on hover, a badge,
fabric, colour swatches, rating, a wishlist toggle and size quick-add with
sold-out sizes struck through rather than hidden.

## Notes

Content is presentational — products live in `src/lib/products.ts`, and cart,
search, wishlist and account controls are UI-only.
