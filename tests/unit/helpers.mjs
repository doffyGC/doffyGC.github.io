// Funções comuns aos testes: carregar o data.js, listar arquivos e resolver caminhos do site.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Executa um script do site num contexto parecido com o navegador e devolve o "window"
export function loadScript(file, window = {}) {
  vm.runInNewContext(readFileSync(join(ROOT, file), "utf8"), { window });
  return window;
}

export const loadData = () => loadScript("js/data.js").PORTFOLIO;

const IGNORE = new Set(["node_modules", ".git", "test-results", "playwright-report"]);

export function listFiles(dir = ROOT, out = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) listFiles(full, out);
    else out.push(full);
  }
  return out;
}

export const rel = (file) => relative(ROOT, file).replaceAll("\\", "/");

// Um caminho do site existe? Pastas valem se tiverem index.html
export function siteFileExists(path) {
  if (!existsSync(path)) return false;
  return statSync(path).isDirectory() ? existsSync(join(path, "index.html")) : true;
}
