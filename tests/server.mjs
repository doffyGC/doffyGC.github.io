// Servidor estático para os testes (o http.server do Python recusa conexões sob carga no Windows).
// Uso: node tests/server.mjs [porta]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2] || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

async function resolveFile(urlPath) {
  const path = normalize(join(ROOT, decodeURIComponent(urlPath.split("?")[0])));
  if (!path.startsWith(ROOT)) return null; // nada de sair da pasta do site
  try {
    const s = await stat(path);
    return s.isDirectory() ? join(path, "index.html") : path;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url);
  try {
    if (!file) throw new Error("404");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    // Igual ao GitHub Pages: qualquer caminho inexistente recebe a 404.html
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    res.end(await readFile(join(ROOT, "404.html")));
  }
}).listen(PORT, "127.0.0.1", () => console.log(`servindo ${ROOT} em http://127.0.0.1:${PORT}`));
