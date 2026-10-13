// Procura arquivos quebrados: links e scripts nas páginas, url() no CSS, imagens do data.js e o sitemap.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { ROOT, loadData, listFiles, rel, siteFileExists } from "./helpers.mjs";

const files = listFiles();
const html = files.filter((f) => f.endsWith(".html"));
const css = files.filter((f) => f.endsWith(".css"));
const external = (u) => /^(https?:|mailto:|data:|#|javascript:)/.test(u);

test("todo href/src local das páginas aponta para um arquivo que existe", () => {
  const broken = [];
  for (const file of html) {
    const src = readFileSync(file, "utf8");
    for (const [, url] of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (external(url) || url.includes("${")) continue;
      const clean = url.split("#")[0].split("?")[0];
      if (!clean) continue;
      // A 404 usa caminhos absolutos (o Pages serve ela em qualquer URL)
      const target = clean.startsWith("/") ? join(ROOT, clean) : join(dirname(file), clean);
      if (!siteFileExists(target)) broken.push(`${rel(file)} → ${url}`);
    }
  }
  assert.ok(html.length >= 7, `poucas páginas encontradas: ${html.length}`);
  assert.deepEqual(broken, [], `links quebrados:\n${broken.join("\n")}`);
});

test("todo url() dos CSS aponta para um arquivo que existe", () => {
  const broken = [];
  for (const file of css) {
    for (const [, raw] of readFileSync(file, "utf8").matchAll(/url\(([^)]+)\)/g)) {
      const url = raw.replace(/["']/g, "").trim();
      if (external(url)) continue;
      if (!siteFileExists(join(dirname(file), url))) broken.push(`${rel(file)} → ${url}`);
    }
  }
  assert.deepEqual(broken, []);
});

test("imagens, CV e foto citados no data.js existem", () => {
  const D = loadData();
  const paths = [D.profile.cv, D.profile.photo].filter(Boolean);
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    for (const [k, v] of Object.entries(node)) {
      if ((k === "image" || k === "img") && typeof v === "string") paths.push(v);
      else walk(v);
    }
  };
  walk(D);
  assert.ok(paths.length >= 5, "esperava pelo menos 5 imagens de projetos");
  assert.deepEqual(paths.filter((p) => !siteFileExists(join(ROOT, p))), []);
});

test("toda URL do sitemap corresponde a uma página do site", () => {
  const xml = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<loc>https:\/\/doffygc\.github\.io\/([^<]*)<\/loc>/g)].map((m) => m[1]);
  assert.ok(urls.length >= 6);
  assert.deepEqual(urls.filter((u) => !siteFileExists(join(ROOT, u))), []);
});

test("o CV original com telefone nunca entra no site", () => {
  assert.ok(readFileSync(join(ROOT, ".gitignore"), "utf8").includes("Curriculum_Vitae.pdf"));
  const D = loadData();
  assert.notEqual(D.profile.cv, "Curriculum_Vitae.pdf");
});
