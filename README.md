# Thesium product portal

Static HTML for the Thesium product line, served on `https://thesium.me`
(canonical) and `https://thesium.app`. No framework, no build step, no
third-party requests — the pages load nothing but their own stylesheet,
one script, and local SVGs.

The Privacy and Support pages are referenced from the macOS app's App
Store Connect listing. Both URLs **must resolve** or Apple hard-rejects
the submission. Do not rename or redirect `/privacy` and `/support`.

## Layout

```
index.html            — portal home: the product register + the method
risk.html             — Thesium Risk (shipped; the Mac App Store app)
career.html           — Thesium Career (in development)
time.html             — Thesium Time (in design)
research.html         — Thesium Research (in design)
privacy.html          — Privacy Policy (App Store-required URL)
support.html          — Support (App Store-required URL)
404.html              — fallback
style.css             — shared stylesheet, both themes
assets/theme.js       — light/dark toggle wiring
assets/logo.svg       — wordmark, gold (dark theme)
assets/logo-ink.svg   — wordmark, indigo (light theme)
wrangler.toml         — Cloudflare Workers + Static Assets config
```

## Naming

The Mac App Store listing is **Thesium**. On this site the shipped app
is **Thesium Risk**, which distinguishes it from Career, Time, and
Research. `/risk` and `/support` both say so explicitly, so nobody
arriving from the App Store thinks they are on the wrong page.

`Thesium Financial` was considered and dropped. Naming a product
"Financial" widens the "holding out as being in the advisory business"
surface for no product benefit, and it overstates what the app does —
it reads regime and exposure, it does not advise. `/risk` carries an
explicit not-investment-advice disclaimer.

## Themes

Aurora, in both modes. The tokens at the top of `style.css` mirror
`ThemeColors.auroraDark` and `ThemeColors.auroraLight` in the macOS app
(`thesium-app/Sources/RiskAppleApp/ThemeManager.swift`). Changing one
side without the other is drift — if you retune the app palette, retune
these to match.

Light mode is not a recolor of dark. Gold `#FFC721` on a near-white
field measures 1.8:1, so light mode carries a darkened gold instead
(`--link`, `#7A4E00`, 6.5:1) for every piece of colored text, and each
status hue is re-tuned to clear 3:1 on its own background.

Resolution order: an explicit choice in `localStorage` wins, otherwise
the page follows `prefers-color-scheme`. The read happens in a blocking
inline `<script>` in each `<head>` so there is no flash of the wrong
theme; `assets/theme.js` only wires the button.

## Hostnames

Four, all on Cloudflare, all serving this Worker as of 2026-07-29:
`thesium.me`, `www.thesium.me`, `thesium.app`, `www.thesium.app`.
Neither domain redirects to the other — both serve, and every page
carries a `rel="canonical"` naming `thesium.me`.

Custom domains are attached through the Cloudflare dashboard
(Workers & Pages → `thesium-risk` → Custom Domains), not in
`wrangler.toml`. The comment at the bottom of that file explains why.

If a hostname starts failing, check in this order: the custom-domain
binding still lists it, the zone's `A`/`CNAME` records still point at
the Worker, and the zone is still on Cloudflare nameservers. When
`thesium.me` moved off Google Domains, its `MX` and `TXT` records were
carried over — do not prune records on that zone without checking mail
first.

`thesium.app/privacy` and `thesium.app/support` are the URLs in App
Store Connect. Both must keep returning 200 on that exact host.

## Deploy

Cloudflare Workers Builds is connected to this repo. Every push to
`main` deploys in about 30 seconds. The build command is empty; the
deploy command is `npx wrangler deploy`.

## Local preview

```bash
python3 -m http.server 8000
```

Extensionless URLs (`/risk`, `/privacy`) are Cloudflare behavior and do
**not** work under `http.server` — locally, use `/risk.html`.
