# Eskolx Labs website

Marketing site for Eskolx Labs, an open-source lab that rebuilds statistical
tools in pure Python from first principles. One scrollytelling landing page:
sections pin, fields turn between parchment and loam, and the copy stays
plain.

## Stack

- Next.js 16 App Router, React 19, Tailwind v4
- GSAP ScrollTrigger + Lenis smooth scroll (lib/scrollytelling.tsx, lib/field-controller.ts)
- Self-hosted fonts via next/font/local (app/fonts)

## Develop

    pnpm install
    pnpm dev

## Build

    pnpm build

The build emits a fully static site into `out/` (`output: 'export'`), ready
for any static host.

## Deploy (Cloudflare Pages, free)

The site deploys as a static export — no server runtime, no adapter.

1. Push this repo to GitHub (origin: `Eskolx-labs/Eskolx_labs_website`).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   pick the repo, production branch `main`.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `pnpm build`
   - Build output directory: `out`
4. Environment variables (build):
   - `NODE_VERSION` = `22`
   - `PNPM_VERSION` = `11.22.0`
5. Save and deploy. Every push to `main` redeploys; `*.pages.dev` URL is free,
   custom domains are free too.

## Notes

- Product context: PRODUCT.md. Design system and motion contracts: DESIGN.md.
- Append `?debug=1` to the URL to see the animation diagnostics HUD.
- Reduced-motion visitors get static complete states; pins collapse to plain
  sections below 768px.
- Local preview of a build: `python3 -m http.server 8080 --directory out`
  (`next start` is unavailable in export mode).

