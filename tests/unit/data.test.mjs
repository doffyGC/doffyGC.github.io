// Confere o conteúdo de js/data.js: traduções, ids e referências entre seções.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadData } from "./helpers.mjs";

const D = loadData();
const LANGS = D.languages.map((l) => l.code);

test("todo texto traduzível tem PT, EN e ES preenchidos", () => {
  const missing = [];
  const walk = (node, path) => {
    if (Array.isArray(node)) return node.forEach((x, i) => walk(x, `${path}[${i}]`));
    if (!node || typeof node !== "object") return;
    if ("pt" in node) {
      for (const lang of LANGS) {
        const v = node[lang];
        const ok = typeof node.pt === "string" ? typeof v === "string" && v.trim() !== "" : v && typeof v === "object";
        if (!ok) missing.push(`${path}.${lang}`);
      }
      if (typeof node.pt === "string") return;
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
  };
  walk(D, "PORTFOLIO");
  assert.deepEqual(missing, [], `traduções faltando:\n${missing.join("\n")}`);
});

test("ids de seções, quests, capítulos e conquistas são únicos", () => {
  for (const [name, list] of [
    ["sections", D.sections],
    ["quests", D.quests.list],
    ["campaign", D.campaign.chapters],
    ["raid", D.raid.floors],
    ["achievements", D.game.achievements],
  ]) {
    const ids = list.map((x) => x.id);
    assert.equal(new Set(ids).size, ids.length, `ids repetidos em ${name}: ${ids}`);
  }
});

test("skill tree e grimório só apontam para lugares que existem", () => {
  const places = new Set([...D.quests.list, ...D.raid.floors, ...D.campaign.chapters].map((x) => x.id));
  const bad = [];
  D.skills.branches.forEach((b) => b.nodes.forEach((n) => n.used.forEach((id) => places.has(id) || bad.push(`skill ${JSON.stringify(n.name)} → ${id}`))));
  D.grimoire.spells.forEach((s) => s.used.forEach((id) => places.has(id) || bad.push(`spell ${s.name.pt} → ${id}`)));
  assert.deepEqual(bad, []);
});

test("toda quest tem link de código, aviso de código privado ou está em andamento", () => {
  const tiers = new Set(Object.keys(D.quests.tiers));
  for (const q of D.quests.list) {
    assert.ok(tiers.has(q.tier), `${q.id}: tier inválido "${q.tier}"`);
    assert.ok(q.repo || q.repoPrivate || q.tier === "wip", `${q.id}: sem repo nem repoPrivate`);
  }
});

test("conquistas e tipos de XP usados no código existem no data.js", () => {
  const code = ["hud.js", "npc.js", "battle.js", "secrets.js", "app.js"].map((f) => readFileSync(join(ROOT, "js", f), "utf8")).join("\n");
  const achievements = new Set(D.game.achievements.map((a) => a.id));
  const unlocked = [...code.matchAll(/unlock\("([\w-]+)"/g)].map((m) => m[1]);
  assert.ok(unlocked.length > 5, "não achei chamadas a unlock()");
  assert.deepEqual(unlocked.filter((id) => !achievements.has(id)), [], "unlock() com conquista inexistente");
  const types = [...code.matchAll(/award\([^,]+,\s*"(\w+)"/g)].map((m) => m[1]);
  assert.deepEqual(types.filter((t) => !(t in D.game.xp)), [], "award() com tipo de XP inexistente");
});

test("batalha: fraquezas são golpes existentes e os sprites são retangulares", () => {
  const moves = new Set(D.battle.moves.map((m) => m.id));
  for (const e of D.battle.enemies) {
    assert.ok(moves.has(e.weak), `${e.id}: fraqueza "${e.weak}" não é um golpe`);
    const widths = new Set(e.map.map((row) => row.length));
    assert.equal(widths.size, 1, `${e.id}: linhas do sprite com larguras diferentes`);
    const colors = new Set(e.map.join("").replaceAll(".", ""));
    for (const c of colors) assert.ok(e.colors[c], `${e.id}: cor "${c}" sem definição`);
  }
});

test("links internos do UniBot apontam para seções que existem", () => {
  const ids = new Set(D.sections.map((s) => s.id));
  for (const q of D.npc.questions) {
    if (!q.link) continue;
    assert.ok(ids.has(q.link.href.replace("#", "")), `UniBot: link quebrado ${q.link.href}`);
  }
});

test("cada estudo de caso tem quest correspondente e página nos 3 idiomas", () => {
  for (const id of Object.keys(D.cases)) {
    assert.ok(D.quests.list.some((q) => q.id === id), `caso ${id} sem quest`);
    for (const l of D.languages) {
      const page = join(ROOT, l.path, "quests", id, "index.html");
      assert.ok(existsSync(page), `falta a página ${l.path}quests/${id}/`);
      assert.match(readFileSync(page, "utf8"), new RegExp(`data-lang="${l.code}"[^>]*data-case="${id}"`));
    }
  }
});
