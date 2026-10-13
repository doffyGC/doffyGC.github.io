/* Camada de jogo do visitante: XP, níveis, conquistas, toasts e sons chiptune.
   Cada ação conta uma vez só. O progresso fica no localStorage (o site funciona sem ele).
   Outros módulos chamam window.HUD.award / unlock / sfx, ou disparam o evento "portfolio:xp". */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const App = window.App;
  if (!App) return;
  const { t, esc, store } = App;
  const G = D.game;
  const root = document.documentElement;
  const KEY = "rpg-state";

  // ---------- Estado ----------

  function load() {
    try {
      const s = JSON.parse(store.get(KEY));
      if (s && typeof s.xp === "number") return { done: {}, ach: {}, queue: [], ...s };
    } catch (e) {}
    return { xp: 0, done: {}, ach: {}, queue: [] };
  }

  let state = load();
  const save = () => store.set(KEY, JSON.stringify(state));
  const levelOf = (xp) => 1 + Math.floor(xp / G.xpPerLevel);
  const count = (prefix) => Object.keys(state.done).filter((k) => k.startsWith(prefix)).length;
  const gameOn = () => !root.classList.contains("recruiter");

  // ---------- Som (Web Audio, sem arquivos) ----------

  let audio = null;
  const SFX = {
    blip: [[880, 0.04]],
    coin: [[988, 0.06], [1319, 0.12]],
    fanfare: [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.22]],
    levelup: [[392, 0.07], [523, 0.07], [659, 0.07], [784, 0.07], [1047, 0.28]],
    hit: [[180, 0.06], [120, 0.1]],
  };

  function sfx(name) {
    if (root.dataset.sound !== "on" || !gameOn() || !SFX[name]) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      let at = audio.currentTime;
      SFX[name].forEach(([freq, dur]) => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, at);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        osc.connect(gain).connect(audio.destination);
        osc.start(at);
        osc.stop(at + dur);
        at += dur * 0.9;
      });
    } catch (e) {}
  }

  // ---------- Toasts ----------

  const toasts = document.createElement("div");
  toasts.className = "toasts game-only";
  toasts.setAttribute("aria-live", "polite");
  document.body.appendChild(toasts);

  function toast(icon, title, text) {
    if (!gameOn()) return;
    // No máximo 3 na tela: o mais antigo sai
    while (toasts.children.length >= 3) toasts.firstElementChild.remove();
    const el = document.createElement("div");
    el.className = "dialog toast";
    el.innerHTML = `<span class="toast-icon" aria-hidden="true">${esc(icon)}</span>
      <div><p class="toast-title">${esc(title)}</p><p>${esc(text)}</p></div>`;
    toasts.appendChild(el);
    setTimeout(() => el.classList.add("is-leaving"), 3800);
    setTimeout(() => el.remove(), 4300);
  }

  // Conquistas desbloqueadas antes de trocar de página aparecem quando a próxima carrega
  function flushQueue() {
    const queue = state.queue || [];
    state.queue = [];
    save();
    queue.forEach((id, i) => setTimeout(() => showAchievement(id), 600 + i * 900));
  }

  function showAchievement(id) {
    const a = G.achievements.find((x) => x.id === id);
    if (!a) return;
    toast(a.icon, t(G.unlocked), t(a.name));
    sfx("fanfare");
  }

  // ---------- XP e conquistas ----------

  // O localStorage é a fonte da verdade: relê antes de mudar, para duas abas abertas não se sobrescreverem
  const sync = () => (state = load());

  function unlock(id, { defer = false } = {}) {
    sync();
    if (state.ach[id] || !G.achievements.some((a) => a.id === id)) return;
    state.ach[id] = Date.now();
    if (defer) state.queue.push(id);
    save();
    renderList();
    if (!defer) showAchievement(id);
  }

  function award(key, type, opts = {}) {
    sync();
    if (state.done[key]) return false;
    const before = levelOf(state.xp);
    state.done[key] = 1;
    state.xp += G.xp[type] || 0;
    save();
    paint();
    const after = levelOf(state.xp);
    if (after > before && !opts.defer) {
      toast("⬆", t(G.levelUp), `${t(G.levelUpText)} ${after}`);
      sfx("levelup");
    } else if (!opts.defer) {
      sfx("coin");
    }
    if (after >= 5) unlock("lv5", opts);
    return true;
  }

  function paint() {
    const per = G.xpPerLevel;
    const lv = document.getElementById("visitorLv");
    const bar = document.getElementById("visitorXp");
    const text = document.getElementById("visitorXpText");
    if (lv) lv.textContent = levelOf(state.xp);
    if (bar) bar.style.setProperty("--fill", `${((state.xp % per) / per) * 100}%`);
    if (text) text.textContent = `${state.xp} XP`;
  }

  function renderList() {
    const list = document.getElementById("achList");
    if (!list) return;
    list.innerHTML = G.achievements
      .map((a) => {
        const got = !!state.ach[a.id];
        const desc = got || !a.secret ? t(a.desc) : t(G.locked);
        return `<li class="ach ${got ? "is-got" : "is-locked"}">
          <span class="ach-badge" aria-hidden="true">${got ? esc(a.icon) : "🔒"}</span>
          <div><p class="ach-name">${esc(got ? t(a.name) : t(G.locked))}</p><p class="ach-desc">${esc(desc)}</p></div>
          <span class="sr-only">${got ? "✓" : "✗"}</span>
        </li>`;
      })
      .join("");
  }

  // ---------- Gatilhos ----------

  function watchSections() {
    if (!("IntersectionObserver" in window)) return;
    const ids = D.sections.map((s) => s.id);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          award(`visit:${en.target.id}`, "visit");
          io.unobserve(en.target);
          if (ids.every((id) => state.done[`visit:${id}`])) unlock("explorer");
        }),
      { threshold: 0.25 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  function watchClicks() {
    document.addEventListener("click", (e) => {
      const el = e.target.closest("a, button, summary");
      if (!el) return;
      if (el.matches(".btn, .chip, .node, summary, .link-btn")) sfx("blip");

      const xp = el.dataset.xp;
      if (xp === "start") {
        award("start", "start");
        unlock("start");
      } else if (xp === "cv") {
        award("cv", "cv");
        unlock("save");
      } else if (xp === "lang") {
        // A página vai trocar: guarda e mostra o toast na próxima
        award("lang", "lang", { defer: true });
        unlock("polyglot", { defer: true });
      }

      if (el.matches(".node")) {
        if (award(`skill:${el.dataset.skill}`, "skill") && count("skill:") >= 5) unlock("scout");
      }
      if (el.id === "themeBtn") {
        award("theme", "theme");
        unlock("theme");
      }
      if (el.id === "soundBtn") {
        // O app.js troca a preferência primeiro; aqui só confere o resultado
        setTimeout(() => {
          if (root.dataset.sound === "on") {
            award("sound", "sound");
            unlock("chiptune");
          }
        });
      }
      if (el.id === "achReset") {
        state = { xp: 0, done: {}, ach: {}, queue: [] };
        save();
        paint();
        renderList();
      }
    });

    // Abrir os detalhes de uma quest ("toggle" não borbulha, por isso a captura)
    document.addEventListener(
      "toggle",
      (e) => {
        const quest = e.target.closest?.(".quest");
        if (!quest || !e.target.open) return;
        if (award(`quest:${quest.id}`, "quest") && count("quest:") >= 3) unlock("reader");
      },
      true
    );

    // Eventos de outros módulos: { id: "contact" } ou { id: "secret", key: "konami" }
    document.addEventListener("portfolio:xp", (e) => {
      const { id, key } = e.detail || {};
      if (id === "contact") {
        award("contact", "contact");
        unlock("party");
      } else if (id === "secret") {
        if (award(`secret:${key}`, "secret")) unlock("secret");
      }
    });
  }

  paint();
  renderList();
  // Estudo de caso: chegar ao fim do relatório vale XP e a conquista "lore"
  const caseEnd = root.dataset.page === "case" && document.querySelector(".case-content > .btn");
  if (caseEnd && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((en) => en.isIntersecting)) return;
      io.disconnect();
      if (award(`case:${root.dataset.case}`, "case")) unlock("lore");
    });
    io.observe(caseEnd);
  }
  watchSections();
  watchClicks();
  flushQueue();

  window.HUD = { award, unlock, sfx, toast };
})();
