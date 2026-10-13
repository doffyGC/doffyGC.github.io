// Abre cada página do site e confere que tudo monta sem erro, nos 3 idiomas e no celular.
const { test, expect } = require("@playwright/test");

const PAGES = [
  { url: "/", lang: "pt-BR" },
  { url: "/en/", lang: "en" },
  { url: "/es/", lang: "es" },
  { url: "/quests/scavenger/", lang: "pt-BR", case: true },
  { url: "/en/quests/scavenger/", lang: "en", case: true },
  { url: "/es/quests/scavenger/", lang: "es", case: true },
];

// A API do GitHub responde com dados fixos: o teste não depende da rede nem do limite de pedidos
test.beforeEach(async ({ page }) => {
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "[]" })
  );
});

// Falha o teste se a página lançar erro ou escrever erro no console
function watchErrors(page) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`console: ${m.text()}`));
  return errors;
}

for (const p of PAGES) {
  test(`${p.url} monta sem erros`, async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto(p.url);
    await expect(page.locator("html")).toHaveAttribute("lang", p.lang);
    await expect(page.locator("#hud .hud-logo")).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    if (p.case) {
      await expect(page.locator(".case-section")).toHaveCount(7);
    } else {
      await expect(page.locator("main section.section")).toHaveCount(10);
      await expect(page.locator(".quest")).toHaveCount(10);
    }
    // Nada de rolagem horizontal (principalmente no celular)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("a 404 mostra a tela de Game Over", async ({ page }) => {
  await page.goto("/404.html");
  await expect(page.locator("h1")).toHaveText("GAME OVER");
});

test.describe("camada de jogo", () => {
  test.skip(({ isMobile }) => isMobile, "interações testadas no desktop");

  test("skill tree mostra onde a skill foi usada e dá XP", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-skill="1-0"]').click();
    await expect(page.locator("#skillDetail")).toContainText("Scavenger Project");
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("rpg-state")).xp)).toBeGreaterThan(0);
  });

  test("tema, modo recrutador e menu respondem", async ({ page }) => {
    await page.goto("/");
    await page.locator("#themeBtn").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.locator("#skipBtn").click();
    await expect(page.locator("html")).toHaveClass(/recruiter/);
    await page.locator("#menuBtn").click();
    await expect(page.locator("#menuPanel")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#menuPanel")).toBeHidden();
  });

  test("UniBot responde a uma pergunta", async ({ page }) => {
    await page.goto("/");
    await page.locator(".npc-launcher").click();
    await page.locator(".npc-log").click(); // pula a digitação da saudação
    await page.locator(".npc-q").first().click();
    await page.locator(".npc-log").click();
    await expect(page.locator(".npc-msg-bot")).toHaveCount(3); // saudação, resposta e link
  });

  test("batalha da Arena começa e aceita um golpe", async ({ page }) => {
    await page.goto("/#arena");
    await page.locator('#battleGame [data-act="start"]').click();
    await expect(page.locator(".foe .combatant-name")).toContainText("Memory Leak");
    await page.locator('[data-move="pytest"]').click();
    await expect(page.locator(".battle-log")).toContainText("pytest");
  });

  test("Konami code liga o modo CRT", async ({ page }) => {
    await page.goto("/");
    for (const key of ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]) {
      await page.keyboard.press(key);
    }
    await expect(page.locator("html")).toHaveClass(/crt/);
  });

  test("print do projeto abre ampliado e fecha com Esc", async ({ page }) => {
    await page.goto("/");
    await page.locator("#quest-scavenger .shot").click();
    await expect(page.locator("dialog.lightbox")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog.lightbox")).toBeHidden();
  });

  test("botão do card leva ao estudo de caso e o link de volta retorna", async ({ page }) => {
    await page.goto("/en/");
    await page.locator("#quest-scavenger .is-case").click();
    await expect(page).toHaveURL(/\/en\/quests\/scavenger\/$/);
    await page.locator(".case-back").click();
    await expect(page).toHaveURL(/\/en\/#quests$/);
  });
});
