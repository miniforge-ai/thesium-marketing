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

## Adding thesium.me

`thesium.me` is on Google Domains nameservers serving a Squarespace
parking page. To point it at this Worker:

1. Cloudflare dashboard → **Add a site** → `thesium.me`. Let it import
   the existing DNS records.
2. **Check the imported MX and TXT records before changing anything.**
   If mail runs on this domain, losing those breaks it.
3. At the registrar, change the nameservers to the pair Cloudflare
   assigns. Wait for the zone to go active.
4. Delete the Squarespace `A` and `CNAME` records (the `198.185.159.x`
   and `198.49.23.x` addresses) and any `_domainconnect` record.
5. Workers & Pages → `thesium-risk` → **Custom Domains** → add
   `thesium.me`, then `www.thesium.me`.
6. Confirm every page returns 200 on the new host, then cancel the
   Squarespace parking subscription.

Custom domains are attached in the dashboard, not in `wrangler.toml` —
the comment at the bottom of that file explains why.

The `rel="canonical"` tags already point at `thesium.me`. Until step 5
completes they name a host that does not serve this site. That is
tolerable only because the Squarespace parking page is `noindex` and
has nothing to compete with — do not leave the cutover half-done.

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
