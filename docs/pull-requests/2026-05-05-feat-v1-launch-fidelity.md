# PR: V1 Launch Fidelity Pass

## Summary

Marketing-site fidelity pass for the Thesium v1.0 launch on the Mac App
Store. Replaces the "coming soon" eyebrow with a real Apple App Store
badge linking to the live listing, and restructures the page from a
single floating purple card into a wider, full-bleed section layout.

## Why

Thesium 1.0 is now live on the Mac App Store
(`apps.apple.com/us/app/thesium/id6761789951`). The site still showed
the pre-launch "Coming soon to the Mac App Store" eyebrow with no
download path. Visitors arriving from search or word-of-mouth had
nowhere to go.

The single 720-px floating card layout also reads as an iOS sheet on
desktop — too much margin, content penned into a small column. A wider
full-bleed structure gives the page room to breathe and lets the
feature grid carry visual weight.

`thesium.app` → `thesium.me` rename is intentionally **out of scope**
for this PR — that's a domain switch with App Store listing
implications and gets its own change.

## Changes

### Hero + CTA

- removed the `Coming soon to the Mac App Store` eyebrow
- added Apple's official "Download on the Mac App Store" SVG badge,
  vendored at `assets/mac-app-store-badge.svg`, linking to the live
  App Store listing (`id6761789951`)
- meta line under the CTA: `Free · macOS 14+ · Apple Silicon & Intel`
- hero is centered with a 760-px content container

### Layout — full-bleed sections

- `<main>` is no longer a single bordered card. It's a transparent
  full-width container.
- Each section paints its own subtle background tint over the indigo
  surround:
  - `hero` — purple wash
  - `features-section` — black wash for contrast
  - `pro-callout` — stronger purple wash
  - `more-section` — black wash
- Sections are separated by 1-px borders rather than the old card edge.
- Inner content is constrained by a `.container` wrapper at
  `max-width: 1080px` (or `760px` for `.container.narrow` on
  prose pages).

### Feature grid

- `What it does` becomes a 4-up grid at desktop, 2-up at tablet,
  1-up at phone — `grid-template-columns: repeat(4, 1fr)` with a
  `max-width: 960px` breakpoint
- card copy unchanged in substance; tightened phrasing on the
  portfolio-import card to mention all six supported brokers
  (Fidelity, Schwab, Vanguard, E\*TRADE, Ameriprise, Empower)

### Pro callout

- new `pro-callout` section explains the Pro upgrade (live data
  refresh + research lenses) without recreating the App Store
  product page

### Privacy / Support / 404

- header nav and footer get a `Mac App Store` link on every page
- prose pages (`support.html`, `privacy.html`, `404.html`) wrap their
  content in `<section class="prose-section"><div class="container narrow">`
  to pick up the new full-bleed layout
- **content unchanged** in `privacy.html` and `support.html` — the
  App Store Connect listing points at those URLs and Apple validates
  the copy on submission

## Notes

- We deliberately do **not** host product screenshots on the marketing
  site. Apple already curates that on the App Store listing;
  duplicating creates a second source of truth that drifts.
- Custom Apple-glyph CTAs were considered and rejected in favor of
  Apple's official badge per Identity Guidelines for App Store
  linking. The badge is vendored locally rather than hot-linked, so
  the page works offline and stays under our deploy.

## Verification

- `python3 -m http.server 8765` from the repo root and visually
  confirmed:
  - hero CTA links to the live App Store URL
  - feature grid wraps correctly at 960 / 640 px
  - support, privacy, 404 render with the narrow container
- HTML parses cleanly for all four pages (`html.parser` smoke check)
- All linked assets (`/style.css`, `/assets/logo.svg`,
  `/assets/mac-app-store-badge.svg`) return 200
