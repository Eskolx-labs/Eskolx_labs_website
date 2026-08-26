/*
 * Static preview server for out/ with Cache-Control: no-store.
 * python http.server sends no cache headers, so phones heuristically
 * cache index.html; the next build deletes its hashed chunks and the
 * phone 404s every one of them - page arrives dead. no-store makes
 * every reload fresh. Usage: node scripts/serve.mjs [port] [dir]
 */
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.resolve(ROOT, process.argv[3] || 'out')
const PORT = Number(process.argv[2] || 3400)
const MIME = {
  html: 'text/html; charset=utf-8',
  js: 'text/javascript',
  css: 'text/css',
  svg: 'image/svg+xml',
  woff2: 'font/woff2',
  json: 'application/json',
  txt: 'text/plain',
}

const server = http.createServer((req, res) => {
  let rel
  try {
    rel = decodeURIComponent(req.url.split('?')[0])
  } catch {
    res.statusCode = 400
    res.end('bad request')
    return
  }
  let p = path.join(OUT, rel === '/' ? 'index.html' : rel)
  if (!p.startsWith(OUT)) { res.statusCode = 403; res.end(); return }
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) {
    const fallback = path.join(OUT, rel + '.html')
    p = fs.existsSync(fallback) ? fallback : path.join(OUT, '404.html')
  }
  fs.readFile(p, (err, data) => {
    if (err) { res.statusCode = 404; res.end('missing'); return }
    res.setHeader('Content-Type', MIME[p.split('.').pop()] || 'application/octet-stream')
    res.setHeader('Cache-Control', 'no-store')
    res.end(data)
  })
})
// a tunnel relay probing odd paths must never take the preview down
process.on('uncaughtException', (e) => console.error('recovered:', e.message))
server.listen(PORT, '0.0.0.0', () => console.log(`serving ${OUT} on http://0.0.0.0:${PORT} (no-store)`))
