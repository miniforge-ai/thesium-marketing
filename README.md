# Thesium marketing site

Static HTML for `https://thesium.app`. The Privacy and Support pages
are referenced from the macOS app's App Store Connect listing —
both URLs **must resolve** before App Store submission, or Apple
hard-rejects.

## Layout

```
marketing/
  index.html      — landing page
  privacy.html    — Privacy Policy (App Store-required)
  support.html    — Support page (App Store-required)
  404.html        — fallback
  style.css       — shared stylesheet (no framework, no JS)
```

Cloudflare Pages serves `/privacy` from `privacy.html` automatically
(extension stripping is on by default), so the App Store URLs
`https://thesium.app/privacy` and `https://thesium.app/support`
work without configuration.

## Deploy via Cloudflare Pages

One-time setup:

1. Cloudflare dashboard → Workers & Pages → Create → Pages →
   **Connect to Git** → pick `miniforge-ai/thesium`.
2. Build configuration:
   - Production branch: `main`
   - Framework preset: **None**
   - Build command: *(leave blank)*
   - Build output directory: `marketing`
3. Save and deploy. The first deploy gives you a
   `thesium.pages.dev` URL.
4. Pages → Custom domains → Add → `thesium.app`. Cloudflare DNS
   wires it automatically (assuming the domain is on Cloudflare).
   Add `www.thesium.app` too if you want; redirect later.

After that, every push to `main` that touches `marketing/` triggers
a fresh deploy (~30 seconds). No build step, no JS, no framework
churn.

## When this site grows up

Plan: extract to `thesium-site` once a Thesium Career landing page
joins this one. Until then, in-repo keeps the privacy/support pages
versioned alongside the macOS app that depends on them.

When extracting:

1. Create `miniforge-ai/thesium-site` repo.
2. `git mv marketing/* ../thesium-site/` (or `git filter-repo`
   for full history).
3. Re-point the Cloudflare Pages project to the new repo.
4. Delete `marketing/` from this repo.

## Local preview

```bash
python3 -m http.server -d marketing 8000
# then visit http://localhost:8000/
```
