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
        return `<a class="chip" href="${BASE}${l.path || "./"}" hreflang="${l.code}" lang="${l.code}" title="${esc(l.name)}" ${current ? 'aria-current="true"' : 'data-xp="lang"'}>${l.label}</a>`;
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
        <a class="hud-xp game-only" href="#suas-conquistas" title="${esc(t(D.game.openPanel))}">
          <span class="lv">Lv <span class="num" id="visitorLv">1</span></span>
          <span class="bar" id="visitorXp" style="--fill: 0%"></span>
          <span class="sr-only" id="visitorXpText">0 XP</span>
        </a>
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
                <span class="lv">Lv. <span class="num">${level}</span></span>
                <span>${ordinal(level)} ${esc(t(T.semester))}</span>
                <div class="bar" style="--fill: ${Math.round(progress * 100)}%; --bar-color: var(--mp)" aria-hidden="true"></div>
              </div>
              ${D.profile.available ? `<span class="badge badge-live"><span class="dot" aria-hidden="true"></span>${esc(t(T.status))}</span>` : ""}
            </div>
            <div class="dialog dialog-more title-dialog">
              <p>${esc(t(T.tagline))}</p>
            </div>
            <div class="title-actions">
              <a class="btn press-start" href="#${D.sections[0].id}" data-xp="start"><span class="cursor" aria-hidden="true">▶</span> ${esc(t(T.start))}</a>
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

  // ---------- Seções ----------

  // Tudo o que pode ser "linkado" de outras seções (skill tree, grimório): quests, andares da raid e capítulos
  const PLACES = (() => {
    const map = {};
    D.quests.list.forEach((q) => (map[q.id] = { label: t(q.title), href: `#quest-${q.id}` }));
    D.raid.floors.forEach((f) => (map[f.id] = { label: f.title, href: `#raid-${f.id}` }));
    D.campaign.chapters.forEach((c) => (map[c.id] = { label: t(c.org), href: `#cap-${c.id}` }));
    return map;
  })();

  const placeLinks = (ids) =>
    ids
      .filter((id) => PLACES[id])
      .map((id) => `<a href="${PLACES[id].href}">${esc(PLACES[id].label)}</a>`)
      .join(", ");

  const tags = (list) =>
    list.length ? `<ul class="tags" aria-label="Stack">${list.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : "";

  const ext = (url, label, cls = "link-btn") =>
    `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`;

  function sheet() {
    const A = D.about;
    const { level } = characterLevel();
    const photo = D.profile.photo
      ? `<img src="${BASE}${esc(D.profile.photo)}" alt="${esc(D.profile.name)}" width="320" height="320" loading="lazy">`
      : `<div class="portrait-empty">${Sprite.head()}<span>${esc(t(A.photoSoon))}</span></div>`;
    const nodes = D.skills.branches.reduce((n, b) => n + b.nodes.length, 0);
    const stats = [
      [level, A.stats.level],
      [D.quests.list.filter((q) => q.tier !== "wip").length, A.stats.quests],
      [D.campaign.chapters.filter((c) => c.kind === "work").length, A.stats.chapters],
      [nodes, A.stats.skills],
    ];
    return `
      <div class="sheet">
        <figure class="dialog portrait">
          <div class="portrait-frame">${photo}</div>
          <figcaption><span class="pixel">${esc(D.profile.shortName)}</span> <span class="lv">Lv. <span class="num">${level}</span></span></figcaption>
        </figure>
        <div class="sheet-main">
          <div class="dialog prose">${A.bio.map((p) => `<p>${esc(t(p))}</p>`).join("")}</div>
          <dl class="dialog info">
            ${A.info.map((r) => `<div><dt>${esc(t(r.k))}</dt><dd>${esc(t(r.v))}</dd></div>`).join("")}
          </dl>
          <div class="stats" role="list" aria-label="${esc(t(A.statsTitle))}">
            ${stats.map(([n, l]) => `<div class="stat" role="listitem"><span class="stat-n num">${n}</span><span class="stat-l">${esc(t(l))}</span></div>`).join("")}
          </div>
        </div>
      </div>`;
  }

  function skillTree() {
    const S = D.skills;
    const branches = S.branches
      .map(
        (b, bi) => `
        <div class="dialog branch">
          <h3><span class="branch-icon" aria-hidden="true">${b.icon}</span> ${esc(t(b.name))}</h3>
          <ul class="nodes">
            ${b.nodes
              .map((n, ni) => `<li><button class="node" type="button" aria-pressed="false" data-skill="${bi}-${ni}">${esc(t(n.name))}</button></li>`)
              .join("")}
          </ul>
        </div>`
      )
      .join("");
    return `
      <div class="skill-tree">${branches}</div>
      <div class="dialog skill-detail" id="skillDetail" aria-live="polite"><p>${esc(t(S.hint))}</p></div>`;
  }

  function campaign() {
    const C = D.campaign;
    const last = C.chapters.length - 1;
    return `
      <ol class="timeline">
        ${C.chapters
          .map(
            (c, i) => `
          <li class="chapter${c.current ? " is-current" : ""}" id="cap-${c.id}">
            <div class="chap-marker num" aria-hidden="true">${i + 1}</div>
            <article class="dialog">
              <p class="chap-top"><span class="pixel">${esc(t(C.chapter))} ${i + 1}</span>
                <span>${esc(c.period)}</span>
                ${c.current ? `<span class="badge badge-live"><span class="dot" aria-hidden="true"></span>${esc(t(C.current))}</span>` : ""}</p>
              <h3>${c.kind === "edu" ? "🎓" : "⚔"} ${esc(t(c.title))}</h3>
              <p class="chap-org">${esc(t(c.org))} · ${esc(t(c.place))}</p>
              ${c.bullets.length ? `<ul class="bullets">${c.bullets.map((b) => `<li>${esc(t(b))}</li>`).join("")}</ul>` : ""}
            </article>
            ${i === last ? `<p class="you-are-here pixel game-only">${esc(t(C.now))}</p>` : ""}
          </li>`
          )
          .join("")}
      </ol>`;
  }

  function linkList(links) {
    return links
      .map((l) => (l.private ? `<span class="link-btn is-private">${esc(l.label)} · ${esc(t(D.quests.private))}</span>` : ext(l.url, esc(l.label))))
      .join("");
  }

  function raid() {
    const R = D.raid;
    return `
      <div class="dialog prose raid-intro"><p>${esc(t(R.intro))}</p></div>
      <ol class="tower">
        ${R.floors
          .map(
            (f, i) => `
          <li class="dialog floor" id="raid-${f.id}">
            <p class="floor-n pixel">${esc(t(R.floor))} ${i + 1}</p>
            <h3>${esc(f.title)} <span class="sub">${esc(t(f.subtitle))}</span></h3>
            ${tags(f.stack)}
            <ul class="bullets">${f.bullets.map((b) => `<li>${esc(t(b))}</li>`).join("")}</ul>
            <div class="links">${linkList(f.links)}</div>
          </li>`
          )
          .join("")}
      </ol>`;
  }

  function questCard(q) {
    const Q = D.quests;
    const stars = { main: "★★★", side: "★★", wip: "🔒" }[q.tier];
    const actions = [
      q.repo ? ext(q.repo, esc(t(Q.repo))) : "",
      q.repoPrivate ? `<span class="link-btn is-private">${esc(t(Q.private))}</span>` : "",
      q.demo ? ext(q.demo, `▶ ${esc(t(Q.demo))}`, "link-btn is-demo") : "",
    ].join("");
    const details = q.bullets?.length
      ? `<details class="quest-details">
          <summary>${esc(t(Q.details))}</summary>
          <ul class="bullets">${q.bullets.map((b) => `<li>${esc(t(b))}</li>`).join("")}</ul>
          ${q.team ? `<p class="muted">${esc(t(Q.team))}: ${esc(t(q.team))}</p>` : ""}
        </details>`
      : "";
    return `
      <article class="dialog quest quest-${q.tier}" id="quest-${q.id}">
        <p class="quest-top"><span class="stars" aria-hidden="true">${stars}</span><span>${esc(q.period)}</span></p>
        <h4>${esc(t(q.title))}</h4>
        <p class="quest-sub">${esc(t(q.subtitle))}</p>
        <p>${esc(t(q.desc))}</p>
        ${tags(q.stack)}
        ${details}
        <div class="links">${actions}</div>
      </article>`;
  }

  function questLog() {
    const Q = D.quests;
    return ["main", "side", "wip"]
      .map((tier) => {
        const list = Q.list.filter((q) => q.tier === tier);
        if (!list.length) return "";
        return `
          <h3 class="tier-title">${esc(t(Q.tiers[tier]))}</h3>
          <div class="quest-grid quest-grid-${tier}">${list.map(questCard).join("")}</div>`;
      })
      .join("");
  }

  function grimoire() {
    const G = D.grimoire;
    return `
      <p class="section-intro">${esc(t(G.intro))}</p>
      <div class="spell-grid">
        ${G.spells
          .map(
            (s) => `
          <article class="dialog spell">
            <span class="spell-icon" aria-hidden="true">${s.icon}</span>
            <h3>${esc(t(s.name))}</h3>
            <p>${esc(t(s.desc))}</p>
            <p class="muted">${esc(t(G.usedIn))}: ${placeLinks(s.used)}</p>
          </article>`
          )
          .join("")}
      </div>`;
  }

  function achievements() {
    return `
      <ul class="achievements">
        ${D.certificates
          .map(
            (c) => `
          <li class="dialog achievement">
            <span class="ach-icon" aria-hidden="true">${c.icon}</span>
            <div><h3>${esc(t(c.title))}</h3><p class="muted">${esc(c.issuer)} · ${esc(c.date)}</p></div>
          </li>`
          )
          .join("")}
      </ul>
      <div class="visitor-ach game-only" id="suas-conquistas">
        <h3 class="tier-title">${esc(t(D.game.yours))}</h3>
        <p class="section-intro">${esc(t(D.game.yoursHint))}</p>
        <ul class="ach-grid" id="achList"></ul>
        <button class="chip ach-reset" type="button" id="achReset">↺ ${esc(t(D.game.reset))}</button>
      </div>`;
  }

  function diary() {
    const G = D.diary;
    return `
      <p class="section-intro">${esc(t(G.intro))}</p>
      <div class="diary" id="diary" aria-live="polite" aria-busy="true">
        <div class="dialog"><p class="muted">${esc(t(G.loading))}</p></div>
      </div>`;
  }

  function contact() {
    const C = D.contact;
    const P = D.profile;
    const links = [
      [`mailto:${P.email}`, "✉", P.email],
      [P.linkedin, "in", "LinkedIn"],
      [P.github, "⌥", "GitHub · doffyGC"],
      [P.lattes, "▣", "Lattes"],
    ].filter(([url]) => url);
    return `
      <div class="contact">
        <form class="dialog contact-form" id="contactForm" novalidate>
          <p>${esc(t(C.intro))}</p>
          <label>${esc(t(C.name))}<input name="name" autocomplete="name" required maxlength="120"></label>
          <label>${esc(t(C.email))}<input name="email" type="email" autocomplete="email" required maxlength="200"></label>
          <label>${esc(t(C.message))}<textarea name="message" rows="5" required maxlength="4000"></textarea></label>
          <!-- Campo-armadilha para bots: pessoas não veem -->
          <div class="sr-only" aria-hidden="true"><input name="_gotcha" tabindex="-1" autocomplete="off"></div>
          <button class="btn" type="submit">▶ ${esc(t(C.send))}</button>
          ${P.formspree ? "" : `<p class="muted small">${esc(t(C.mailtoNote))}</p>`}
          <p class="form-status" id="formStatus" role="status"></p>
        </form>
        <div class="dialog contact-links">
          <h3>${esc(t(C.links))}</h3>
          <ul>
            ${links
              .map(([url, icon, label]) => {
                const mail = url.startsWith("mailto:");
                return `<li><a href="${esc(url)}" ${mail ? "" : 'target="_blank" rel="noopener"'}><span class="link-icon" aria-hidden="true">${icon}</span>${esc(label)}</a></li>`;
              })
              .join("")}
          </ul>
        </div>
      </div>`;
  }

  const RENDERERS = {
    ficha: sheet,
    skills: skillTree,
    campanha: campaign,
    raid,
    quests: questLog,
    grimorio: grimoire,
    arena: () => `<div class="battle-wrap" id="battleGame"></div>`,
    conquistas: achievements,
    diario: diary,
    contato: contact,
  };

  function section(s) {
    const body = RENDERERS[s.id] ? RENDERERS[s.id]() : `<div class="dialog wip"><p>${t(D.ui.wip)}</p></div>`;
    return `
      <section class="section" id="${s.id}" aria-labelledby="h-${s.id}">
        <div class="wrap">
          <header class="section-head">
            <h2 id="h-${s.id}">${esc(t(s.game))}</h2>
            <span class="legend">${esc(t(s.legend))}</span>
          </header>
          ${body}
        </div>
      </section>`;
  }

  function setupSkills() {
    const detail = document.getElementById("skillDetail");
    if (!detail) return;
    const buttons = document.querySelectorAll(".node");
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => {
        const [bi, ni] = btn.dataset.skill.split("-").map(Number);
        const node = D.skills.branches[bi].nodes[ni];
        buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        const where = placeLinks(node.used);
        detail.innerHTML = `<p><strong class="pixel">${esc(t(node.name))}</strong> · ${
          where ? `${esc(t(D.skills.usedIn))}: ${where}` : esc(t(D.skills.noUse))
        }</p>`;
      })
    );
  }

  function setupContact() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const C = D.contact;
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form));
      if (data._gotcha) return;

      // Sem Formspree configurado: abre o app de e-mail com a mensagem pronta
      if (!D.profile.formspree) {
        const subject = encodeURIComponent(`Portfolio · ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n${data.name} <${data.email}>`);
        window.location.href = `mailto:${D.profile.email}?subject=${subject}&body=${body}`;
        return;
      }

      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      status.textContent = t(C.sending);
      try {
        const res = await fetch(`https://formspree.io/f/${D.profile.formspree}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = t(C.sent);
        document.dispatchEvent(new CustomEvent("portfolio:xp", { detail: { id: "contact" } }));
      } catch (err) {
        status.textContent = t(C.error);
      } finally {
        btn.disabled = false;
      }
    });
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
    setupSkills();
    setupContact();
  }

  render();

  // Exposto para os próximos módulos (hud.js, npc.js, arena.js...)
  window.App = { t, esc, store, lang: LANG, base: BASE, characterLevel };
})();
