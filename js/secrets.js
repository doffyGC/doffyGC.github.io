/* Segredos: Konami code (modo CRT + skin dourada), comando no console do DevTools e o bug do rodapé.
   Cada segredo vale XP e a conquista "Caçador(a) de segredos" (via window.HUD). */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const App = window.App;
  if (!App || !window.Sprite) return;
  const { t, esc, store } = App;
  const S = D.secrets;
  const root = document.documentElement;
  const hud = () => window.HUD;

  function found(key, icon, title, text) {
    const h = hud();
    if (!h) return false;
    const first = h.award(`secret:${key}`, "secret");
    h.unlock("secret");
    if (first && title) h.toast(icon, title, text);
    return first;
  }

  // ---------- Konami code: ↑ ↑ ↓ ↓ ← → ← → B A ----------

  const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let pos = 0;

  // Troca o sprite do personagem em todos os lugares onde ele já está desenhado
  function repaintSprites() {
    document.querySelectorAll(".stage .sprite").forEach((el) => (el.outerHTML = Sprite.full({ className: "sprite", title: D.profile.shortName })));
    document.querySelectorAll(".hud-logo svg").forEach((el) => (el.outerHTML = Sprite.head()));
    document.querySelectorAll(".hero-svg").forEach((el) => (el.outerHTML = Sprite.full({ className: "hero-svg" })));
  }

  function setCrt(on) {
    root.classList.toggle("crt", on);
    Sprite.skin = on ? "gold" : "default";
    repaintSprites();
    store.set("crt", on ? "on" : "off");
  }

  document.addEventListener("keydown", (e) => {
    if (e.target.closest?.("input, textarea, select")) return;
    const key = e.key.toLowerCase();
    pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
    if (pos < KONAMI.length) return;
    pos = 0;
    const on = !root.classList.contains("crt");
    setCrt(on);
    if (on) found("konami", "🕹", t(S.konami), t(S.crtOn));
    else hud()?.toast("🕹", t(S.konami), t(S.crtOff));
  });

  if (store.get("crt") === "on") setCrt(true);

  // ---------- Console do DevTools ----------

  window.gm = {
    secret() {
      const first = found("console", "⌨", t(S.consoleTitle), t(S.consoleReward));
      return first ? t(S.consoleReward) : t(S.consoleAgain);
    },
  };

  try {
    console.log(
      "%c GM %c " + t(S.consoleHi),
      "background:#f6c453;color:#14112b;font:700 14px monospace;padding:4px 6px",
      "color:#a99fc9;font:13px sans-serif;padding:4px"
    );
  } catch (e) {}

  // ---------- Bug escondido no rodapé ----------

  const footer = document.getElementById("footer");
  const leak = D.battle?.enemies?.[0];
  if (footer && leak) {
    const bug = document.createElement("button");
    bug.type = "button";
    bug.className = "footer-bug game-only";
    bug.setAttribute("aria-label", t(S.bugLabel));
    bug.title = t(S.bugLabel);
    bug.innerHTML = Sprite.draw(leak.map, leak.colors);
    (footer.querySelector(".wrap") || footer).appendChild(bug);

    let hits = 0;
    bug.addEventListener("click", () => {
      if (bug.classList.contains("is-fixed")) return;
      hits++;
      hud()?.sfx("hit");
      bug.classList.remove("is-hit");
      void bug.offsetWidth;
      bug.classList.add("is-hit");
      if (hits < 3) return;
      bug.classList.add("is-fixed");
      bug.innerHTML = `<span aria-hidden="true">✓</span>`;
      bug.setAttribute("aria-label", t(S.bugTitle));
      bug.title = t(S.bugTitle);
      found("footer-bug", "🐞", t(S.bugTitle), t(S.bugFixed));
    });
  }
})();
