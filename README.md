# Thesium marketing site

Static HTML for `https://thesium.app`. Extracted from
`miniforge-ai/thesium` so the deploy is decoupled from the app
repo's build system (Swift, submodules, Rust, etc.) — Cloudflare
Workers Builds only has to clone this repo.

The Privacy and Support pages are referenced from the macOS app's
App Store Connect listing — both URLs **must resolve** before App
Store submission, or Apple hard-rejects.

## Layout

```
index.html     — landing page
privacy.html   — Privacy Policy (App Store-required)
support.html   — Support page (App Store-required)
404.html       — fallback
style.css      — shared stylesheet (no framework, no JS)
aurora/        — A/B variant at /aurora/ (gold + indigo brand)
royal/         — A/B variant at /royal/  (purple + champagne brand)
wrangler.toml  — Cloudflare Workers + Static Assets config
```

Cloudflare's default extension-stripping serves `/privacy` from
`privacy.html` automatically, so the App Store URLs
`https://thesium.app/privacy` and `https://thesium.app/support`
work without extra config.

## Deploy via Cloudflare Workers Builds

One-time setup:

1. Cloudflare dashboard → Workers & Pages → **Create** → Workers →
   **Connect to Git** → pick `miniforge-ai/thesium-marketing`.
2. Build configuration:
   - Production branch: `main`
   - Build command: *(leave blank — wrangler reads `wrangler.toml`)*
   - Deploy command: `npx wrangler deploy`
3. Save and deploy. First deploy gives you a
   `thesium-marketing.<account>.workers.dev` preview URL.
4. Workers & Pages → your project → Custom Domains → Add →
   `thesium.app` (and `www.thesium.app` if desired).

After that, every push to `main` triggers a fresh deploy
(~30 seconds).

## Local preview

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## History

This repo started as the `marketing/` subtree of
`miniforge-ai/thesium`. History was preserved via
`git subtree split --prefix=marketing`, so the initial landing-page
commit and the Aurora/Royal brand A/B commit both survive here.
