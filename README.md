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

## Deploy (Cloudflare Pages/Workers, free)

The site deploys as a static export — no server runtime, no adapter.
`wrangler.jsonc` declares the `out/` directory as static assets, so the
deploy command is plain `npx wrangler deploy`.

1. Push this repo to GitHub (origin: `Eskolx-labs/Eskolx_labs_website`).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Connect to Git**,
   pick the repo, production branch `main`.
3. Build settings (Workers build flow):
   - Build command: `pnpm build`
   - Deploy command: `npx wrangler deploy`
4. Optional env var (build): `PNPM_VERSION` = `11.22.0`. Not required: the
   `packageManager` field in package.json pins pnpm, and the workspace file
   is compatible with the build image's default pnpm 10 too.
5. Save and deploy. Every push to `main` redeploys automatically.
   The site serves from `https://<project>.workers.dev` (custom domain free).

Preview a build locally: `python3 -m http.server 8080 --directory out`
(`next start` is unavailable in export mode).

## Notes

- Product context: PRODUCT.md. Design system and motion contracts: DESIGN.md.
- Append `?debug=1` to the URL to see the animation diagnostics HUD.
- Reduced-motion visitors get static complete states; pins collapse to plain
  sections below 768px.

