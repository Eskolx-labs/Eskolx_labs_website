/** @type {import('next').NextConfig} */
const nextConfig = {
  // the site is fully prerendered (no server features), so builds emit a
  // plain static site into out/ — served by Cloudflare Pages as-is
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
