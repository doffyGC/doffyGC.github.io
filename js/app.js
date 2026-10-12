/* Monta a página a partir de js/data.js: HUD, tela de título e seções.
   Cada página de idioma (/, /en/, /es/) define <html data-lang> e data-base (caminho até a raiz). */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const root = document.documentElement;
  const LANG = root.dataset.lang || "pt";
  const BASE = root.dataset.base || "";

  // ---------- Utilidades ----------

  // Escolhe o texto no idioma atual (cai para PT se faltar tradução)
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[LANG] ?? v.pt : v);

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const store = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {}
    },
  };

  // Nível = semestres desde o início do curso (1º semestre: mar–jul; 2º: ago–fev)
  function characterLevel(now = new Date()) {
    const { startYear, startSemester } = D.profile;
    const m = now.getMonth() + 1;
    let year = now.getFullYear();
    let sem;
    if (m >= 3 && m <= 7) sem = 1;
    else {
      sem = 2;
      if (m <= 2) year -= 1;
    }
    const level = (year - startYear) * 2 + (sem - startSemester) + 1;
    // Progresso dentro do semestre atual (para a barrinha)
    const start = sem === 1 ? new Date(year, 2, 1) : new Date(year, 7, 1);
    const end = sem === 1 ? new Date(year, 7, 1) : new Date(year + 1, 2, 1);
    const progress = Math.min(1, Math.max(0, (now - start) / (end - start)));
    return { level: Math.max(1, level), progress };
  }

  function ordinal(n) {
    if (LANG !== "en") return `${n}º`;
    const suffix = n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th";
    return n + suffix;
  }

  // ---------- HUD ----------

  function hud() {
    const langs = D.languages
      .map((l) => {
        const current = l.code === LANG;
        return `<a class="chip" href="${BASE}${l.path || "./"}" hreflang="${l.code}" lang="${l.code}" title="${esc(l.name)}" ${current ? 'aria-current="true"' : ""}>${l.label}</a>`;
      })
      .join("");

    const items = D.sections
      .map(
        (s) => `<li><a href="#${s.id}" data-nav="${s.id}">
          <span class="m-game">${esc(t(s.game))}</span>
          <span class="m-legend">${esc(t(s.legend))}</span></a></li>`
      )
      .join("");

    return `
      <div class="wrap hud-inner">
        <a class="hud-logo" href="#inicio" aria-label="${esc(D.profile.shortName)}">
          ${Sprite.head()}
          <span class="logo-text">GM</span>
        </a>
        <div class="menu-wrap">
          <button class="chip" id="menuBtn" aria-expanded="false" aria-controls="menuPanel" aria-label="${esc(t(D.ui.menu))}">☰ <span class="menu-label">${esc(t(D.ui.menu))}</span></button>
          <nav class="dialog menu-panel" id="menuPanel" aria-label="${esc(t(D.ui.sectionsNav))}" hidden>
            <ul class="menu-list">${items}</ul>
          </nav>
        </div>
        <div class="hud-spacer"></div>
        <div class="hud-xp game-only" title="${esc(t(D.ui.visitorXp))}">
          <span class="lv" id="visitorLv">Lv 1</span>
          <div class="bar" id="visitorXp" style="--fill: 0%"><span class="sr-only">0 XP</span></div>
        </div>
        <div class="hud-tools">
          <div class="hud-langs" role="group" aria-label="${esc(t(D.ui.language))}">${langs}</div>
          <button class="chip" id="themeBtn"></button>
          <button class="chip game-only" id="soundBtn"></button>
          <button class="chip" id="skipBtn" title="${esc(t(D.ui.skipGameHint))}"></button>
        </div>
      </div>`;
  }

  // ---------- Tela de título ----------

  function titleScreen() {
    const T = D.title;
    const { level, progress } = characterLevel();
    const cv = D.profile.cv;
    const saveBtn = cv
      ? `<a class="btn btn-ghost" href="${BASE}${cv}" download data-xp="cv">💾 ${esc(t(T.save))}</a>`
      : `<span class="btn btn-ghost" aria-disabled="true" title="${esc(t(T.saveSoon))}">💾 ${esc(t(T.save))}</span>`;

    return `
      <section class="title-screen" id="inicio" aria-labelledby="titleName">
        <div class="sky game-only" id="sky"></div>
        <div class="ground game-only"></div>
        <div class="wrap title-grid">
          <div>
            <p class="title-kicker">${esc(t(T.kicker))}</p>
            <h1 class="title-name" id="titleName">${esc(D.profile.shortName)}</h1>
            <p class="title-class">${esc(t(T.classLabel))}: <strong>${esc(t(T.className))}</strong><br>
              <span style="color: var(--muted)">${esc(t(T.classDetail))} · ${esc(D.profile.location)}</span></p>
            <div class="title-stats">
              <div class="level-box">
                <span class="lv">Lv. ${level}</span>
                <span>${ordinal(level)} ${esc(t(T.semester))}</span>
                <div class="bar" style="--fill: ${Math.round(progress * 100)}%; --bar-color: var(--mp)" aria-hidden="true"></div>
              </div>
              ${D.profile.available ? `<span class="badge badge-live"><span class="dot" aria-hidden="true"></span>${esc(t(T.status))}</span>` : ""}
            </div>
            <div class="dialog dialog-more title-dialog">
              <p>${esc(t(T.tagline))}</p>
            </div>
            <div class="title-actions">
              <a class="btn press-start" href="#${D.sections[0].id}"><span class="cursor" aria-hidden="true">▶</span> ${esc(t(T.start))}</a>
              ${saveBtn}
            </div>
          </div>
          <div class="stage">
            ${Sprite.full({ className: "sprite", title: D.profile.shortName })}
          </div>
        </div>
        <a class="scroll-hint game-only" href="#${D.sections[0].id}" aria-hidden="true" tabindex="-1">${esc(t(T.scroll))}</a>
      </section>`;
  }

  // ---------- Seções (por enquanto, placeholders) ----------

  function section(s) {
    return `
      <section class="section" id="${s.id}" aria-labelledby="h-${s.id}">
        <div class="wrap">
          <header class="section-head">
            <h2 id="h-${s.id}">${esc(t(s.game))}</h2>
            <span class="legend">${esc(t(s.legend))}</span>
          </header>
          <div class="dialog wip"><p>${t(D.ui.wip)}</p></div>
        </div>
      </section>`;
  }

  function footer() {
    return `<div class="wrap">${esc(t(D.ui.footer))} · ${new Date().getFullYear()}</div>`;
  }

  // ---------- Comportamentos ----------

  function stars() {
    const sky = document.getElementById("sky");
    if (!sky) return;
    let html = "";
    for (let i = 0; i < 46; i++) {
      const size = Math.random() < 0.2 ? 6 : Math.random() < 0.5 ? 4 : 2;
      html += `<span class="star" style="left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 78).toFixed(2)}%;--s:${size}px;--d:${(2 + Math.random() * 3).toFixed(1)}s;--delay:${(Math.random() * 3).toFixed(1)}s"></span>`;
    }
    sky.innerHTML = html;
  }

  function setupTheme() {
    const btn = document.getElementById("themeBtn");
    const paint = () => {
      const dark = root.dataset.theme !== "light";
      btn.textContent = dark ? "☀" : "☾";
      btn.setAttribute("aria-label", t(dark ? D.ui.toLight : D.ui.toDark));
      btn.title = btn.getAttribute("aria-label");
    };
    btn.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      store.set("theme", root.dataset.theme);
      paint();
    });
    paint();
  }

  // O som em si chega com o hud.js; aqui só fica a preferência (desligado por padrão)
  function setupSound() {
    const btn = document.getElementById("soundBtn");
    const paint = () => {
      const on = root.dataset.sound === "on";
      btn.textContent = on ? "🔊" : "🔇";
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", t(on ? D.ui.soundOff : D.ui.soundOn));
      btn.title = btn.getAttribute("aria-label");
    };
    root.dataset.sound = store.get("sound") === "on" ? "on" : "off";
    btn.addEventListener("click", () => {
      root.dataset.sound = root.dataset.sound === "on" ? "off" : "on";
      store.set("sound", root.dataset.sound);
      paint();
    });
    paint();
  }

  // Modo recrutador: sem preferência salva, segue o prefers-reduced-motion do sistema
  function setupSkip() {
    const btn = document.getElementById("skipBtn");
    const saved = store.get("recruiter");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.toggle("recruiter", saved ? saved === "on" : reduced);

    const paint = () => {
      const on = root.classList.contains("recruiter");
      btn.innerHTML = on
        ? `🎮 <span class="skip-label">${esc(t(D.ui.playGame))}</span>`
        : `⏭ <span class="skip-label">${esc(t(D.ui.skipGame))}</span>`;
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", t(on ? D.ui.playGame : D.ui.skipGame));
    };
    btn.addEventListener("click", () => {
      const on = !root.classList.contains("recruiter");
      root.classList.toggle("recruiter", on);
      store.set("recruiter", on ? "on" : "off");
      paint();
    });
    paint();
  }

  function setupMenu() {
    const btn = document.getElementById("menuBtn");
    const panel = document.getElementById("menuPanel");
    const open = (yes) => {
      panel.hidden = !yes;
      btn.setAttribute("aria-expanded", String(yes));
      if (yes) panel.querySelector("a")?.focus();
    };
    btn.addEventListener("click", () => open(panel.hidden));
    panel.addEventListener("click", (e) => {
      if (e.target.closest("a")) open(false);
    });
    document.addEventListener("click", (e) => {
      if (!panel.hidden && !e.target.closest(".menu-wrap")) open(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) {
        open(false);
        btn.focus();
      }
      // Setas navegam no menu, como num JRPG
      if (!panel.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        const links = [...panel.querySelectorAll("a")];
        const i = links.indexOf(document.activeElement);
        const next = e.key === "ArrowDown" ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
        links[next].focus();
        e.preventDefault();
      }
    });
  }

  // Marca no menu a seção que está na tela
  function setupActiveSection() {
    if (!("IntersectionObserver" in window)) return;
    const links = document.querySelectorAll("[data-nav]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.setAttribute("aria-current", String(a.dataset.nav === en.target.id)));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    D.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  }

  // ---------- Render ----------

  function render() {
    document.getElementById("hud").innerHTML = hud();
    document.getElementById("main").innerHTML = titleScreen() + D.sections.map(section).join("");
    document.getElementById("footer").innerHTML = footer();
    document.querySelector(".skip-link").textContent = t(D.ui.skipLink);

    stars();
    setupTheme();
    setupSound();
    setupSkip();
    setupMenu();
    setupActiveSection();
  }

  render();

  // Exposto para os próximos módulos (hud.js, npc.js, arena.js...)
  window.App = { t, esc, store, lang: LANG, base: BASE, characterLevel };
})();
