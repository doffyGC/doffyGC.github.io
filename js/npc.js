/* NPC UniBot: janela de chat estilo "Pampa Live Messenger", com perguntas pré-definidas e respostas
   que aparecem letra a letra (clique ou Enter pula). Não usa backend nem LLM: tudo vem de data.js. */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const App = window.App;
  if (!App || !window.Sprite) return;
  const { t, esc } = App;
  const N = D.npc;
  const root = document.documentElement;
  const hud = () => window.HUD;

  const BOT = [
    ".....kk.....",
    ".....gg.....",
    "..kkkkkkkk..",
    ".kbbbbbbbbk.",
    ".kbeebbeebk.",
    ".kbeebbeebk.",
    ".kbbbbbbbbk.",
    ".kbbmmmmbbk.",
    ".kbbbbbbbbk.",
    "..kkkkkkkk..",
    "...kbbbbk...",
    "...kkkkkk...",
  ];
  const BOT_COLORS = { k: "#0d0b1f", g: "#f6c453", b: "#5aa9ff", e: "#14112b", m: "#f4ecd8" };
  const avatar = (cls) => Sprite.draw(BOT, BOT_COLORS, { className: cls });

  const level = App.characterLevel().level;
  const fill = (s) => s.replace(/\{lv\}/g, level);

  // ---------- Montagem ----------

  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "npc-launcher game-only";
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-controls", "npcWindow");
  launcher.innerHTML = `${avatar("npc-launcher-bot")}<span class="npc-launcher-label">${esc(t(N.open))}</span><span class="npc-ping" aria-hidden="true">!</span>`;

  const win = document.createElement("div");
  win.className = "dialog npc-window game-only";
  win.id = "npcWindow";
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-labelledby", "npcName");
  win.hidden = true;
  win.innerHTML = `
    <div class="npc-titlebar">
      <span class="pixel">${esc(N.title)}</span>
      <button type="button" class="npc-close" aria-label="${esc(t(N.close))}">✕</button>
    </div>
    <div class="npc-contact">
      ${avatar("npc-avatar")}
      <div><p class="npc-name pixel" id="npcName">${esc(N.name)}</p>
      <p class="npc-status"><span class="dot" aria-hidden="true"></span>${esc(t(N.status))}</p></div>
    </div>
    <div class="npc-log" role="log" aria-live="polite"></div>
    <p class="npc-pick">${esc(t(N.pick))}</p>
    <div class="npc-options">
      ${N.questions.map((q, i) => `<button type="button" class="npc-q" data-q="${i}">${esc(t(q.q))}</button>`).join("")}
    </div>`;

  document.body.append(launcher, win);

  const log = win.querySelector(".npc-log");
  const options = win.querySelectorAll(".npc-q");
  let greeted = false;
  let typing = null; // { el, text, timer, done }

  // ---------- Mensagens ----------

  function bubble(who, html) {
    const el = document.createElement("div");
    el.className = `npc-msg npc-msg-${who}`;
    el.innerHTML = `<span class="npc-who">${esc(who === "bot" ? N.name : t(N.you))}</span><p>${html}</p>`;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el.querySelector("p");
  }

  const instant = () => root.classList.contains("recruiter") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finishTyping() {
    if (!typing) return;
    clearInterval(typing.timer);
    typing.el.textContent = typing.text;
    const done = typing.done;
    typing = null;
    options.forEach((b) => (b.disabled = false));
    done?.();
    log.scrollTop = log.scrollHeight;
  }

  // Resposta do bot letra a letra
  function say(text, done) {
    finishTyping();
    const el = bubble("bot", "");
    el.title = t(N.skip);
    typing = { el, text, done, i: 0 };
    options.forEach((b) => (b.disabled = true));
    if (instant()) return finishTyping();
    hud()?.sfx("blip");
    typing.timer = setInterval(() => {
      if (!typing) return;
      typing.i += 2;
      el.textContent = text.slice(0, typing.i);
      log.scrollTop = log.scrollHeight;
      if (typing.i >= text.length) finishTyping();
    }, 22);
  }

  function ask(i) {
    const q = N.questions[i];
    bubble("you", esc(t(q.q)));
    options[i].classList.add("is-asked");
    say(fill(t(q.a)), () => {
      if (q.link) {
        const p = bubble("bot", `<a class="link-btn npc-link" href="${esc(q.link.href)}">▶ ${esc(t(q.link.label))}</a>`);
        p.parentElement.classList.add("npc-msg-link");
      }
    });
    const h = hud();
    if (h && h.award(`npc:${i}`, "npc")) {
      const asked = win.querySelectorAll(".npc-q.is-asked").length;
      if (asked >= 3) h.unlock("npc");
    }
  }

  // ---------- Abrir / fechar ----------

  function open(yes) {
    win.hidden = !yes;
    launcher.setAttribute("aria-expanded", String(yes));
    launcher.classList.add("is-seen");
    if (yes) {
      if (!greeted) {
        greeted = true;
        say(t(N.hello));
      }
      setTimeout(() => (options[0].disabled ? win.querySelector(".npc-close") : options[0]).focus(), 30);
    } else {
      finishTyping();
      launcher.focus();
    }
  }

  launcher.addEventListener("click", () => open(win.hidden));
  win.querySelector(".npc-close").addEventListener("click", () => open(false));
  options.forEach((b) => b.addEventListener("click", () => ask(Number(b.dataset.q))));
  log.addEventListener("click", (e) => {
    if (e.target.closest(".npc-link")) open(false);
    else finishTyping();
  });
  win.addEventListener("keydown", (e) => {
    if (e.key === "Escape") open(false);
    if (e.key === "Enter" && typing) {
      e.preventDefault();
      finishTyping();
    }
  });
})();
