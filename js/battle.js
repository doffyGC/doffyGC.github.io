/* Arena: batalha por turnos estilo JRPG contra três bugs. Os golpes vêm da skill tree;
   cada bug tem uma fraqueza (dano x1,5) que o jogador descobre pelas pistas nas descrições.
   HP, MP e dano ficam em data.js (battle), equilibrados por simulação. */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const App = window.App;
  const box = document.getElementById("battleGame");
  if (!App || !box || !window.Sprite) return;
  const { t, esc, store } = App;
  const B = D.battle;
  const P = B.player;
  const root = document.documentElement;
  const hud = () => window.HUD;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const move = (id) => B.moves.find((m) => m.id === id);
  const wait = () => (root.classList.contains("recruiter") || matchMedia("(prefers-reduced-motion: reduce)").matches ? 250 : 750);

  let g; // estado da partida

  function newGame() {
    g = { phase: "fight", wave: 0, hp: P.hp, mp: P.mp, uses: {}, turns: 0, busy: false, known: {}, log: [] };
    B.moves.forEach((m) => m.uses && (g.uses[m.id] = m.uses));
    spawn();
  }

  function spawn() {
    const e = B.enemies[g.wave];
    g.enemy = { hp: e.hp, max: e.hp };
    say(`${t(e.name)} ${t(B.appears)}`);
  }

  function say(line) {
    g.log.push(line);
    g.log = g.log.slice(-3);
  }

  const best = () => Number(store.get("battle-best")) || 0;

  // ---------- Desenho ----------

  function bar(value, max, cls) {
    const pct = Math.max(0, Math.round((value / max) * 100));
    return `<span class="bar ${cls}" style="--fill:${pct}%" aria-hidden="true"></span>`;
  }

  function intro() {
    box.innerHTML = `
      <div class="dialog battle-intro">
        <h3>🐞 ${esc(t(B.title))}</h3>
        <p>${esc(t(B.intro))}</p>
        ${best() ? `<p class="muted">${esc(t(B.best))}: <span class="num">${best()}</span> ${esc(t(B.turns))}</p>` : ""}
        <button class="btn" type="button" data-act="start">▶ ${esc(t(B.start))}</button>
      </div>`;
  }

  function fight(focusId) {
    const e = B.enemies[g.wave];
    const weak = g.known[e.id] ? t(move(e.weak).name) : t(B.unknown);
    const moves = B.moves
      .map((m) => {
        const left = m.uses ? g.uses[m.id] : null;
        const off = g.busy || g.mp < m.mp || left === 0;
        const cost = m.heal ? `${left} ${t(B.uses)}` : m.mp ? `${m.mp} MP` : "0 MP";
        return `<button type="button" class="move" data-move="${m.id}" title="${esc(t(m.desc))}" ${off ? "disabled" : ""}>
          <span class="move-icon" aria-hidden="true">${m.icon}</span>
          <span class="move-name">${esc(t(m.name))}</span>
          <span class="move-cost">${esc(cost)}</span>
          <span class="move-desc">${esc(t(m.desc))}</span>
        </button>`;
      })
      .join("");

    box.innerHTML = `
      <div class="dialog battle">
        <div class="battle-field">
          <div class="combatant foe${e.boss ? " is-boss" : ""}">
            <p class="combatant-name pixel">${esc(t(B.wave))} ${g.wave + 1}/${B.enemies.length} · ${esc(t(e.name))}</p>
            <div class="hp-row"><span class="pixel">HP</span>${bar(g.enemy.hp, g.enemy.max, "bar-hp")}<span class="num">${Math.max(0, g.enemy.hp)}/${g.enemy.max}</span></div>
            <p class="muted small">${esc(t(B.weakness))}: <strong>${esc(weak)}</strong></p>
            <div class="foe-sprite" id="foeSprite">${Sprite.draw(e.map, e.colors, { className: "foe-svg", title: t(e.name) })}</div>
          </div>
          <div class="combatant hero">
            <div class="hero-sprite" id="heroSprite">${Sprite.full({ className: "hero-svg" })}</div>
            <p class="combatant-name pixel">${esc(D.profile.shortName)}</p>
            <div class="hp-row"><span class="pixel">HP</span>${bar(g.hp, P.hp, "bar-hp")}<span class="num">${Math.max(0, g.hp)}/${P.hp}</span></div>
            <div class="hp-row"><span class="pixel">MP</span>${bar(g.mp, P.mp, "bar-mp")}<span class="num">${g.mp}/${P.mp}</span></div>
          </div>
        </div>
        <div class="battle-log" aria-live="polite">${g.log.map((l) => `<p>${esc(l)}</p>`).join("")}</div>
        <p class="battle-choose pixel">${esc(t(B.choose))}</p>
        <div class="moves" role="group" aria-label="${esc(t(B.choose))}">${moves}</div>
      </div>`;

    const keep = focusId && box.querySelector(`[data-move="${focusId}"]:not(:disabled)`);
    (keep || box.querySelector(".move:not(:disabled)"))?.focus({ preventScroll: true });
  }

  function end(won) {
    if (won) {
      const record = best();
      if (!record || g.turns < record) store.set("battle-best", String(g.turns));
      const h = hud();
      if (h) {
        h.award("battle", "battle");
        h.unlock("debugger");
      }
    }
    box.innerHTML = `
      <div class="dialog battle-end ${won ? "is-win" : "is-lose"}">
        <h3 tabindex="-1">${won ? "🏆" : "💀"} ${esc(t(won ? B.win : B.lose))}</h3>
        ${won ? `<p>${esc(t(B.best))}: <span class="num">${best()}</span> ${esc(t(B.turns))} · <span class="num">${g.turns}</span> ${esc(t(B.turns))}</p>` : ""}
        <p>${esc(t(B.outro))}</p>
        <div class="links">
          <button class="btn" type="button" data-act="start">▶ ${esc(t(won ? B.again : B.retry))}</button>
          <a class="link-btn" href="#skills">${esc(t(B.outroLink))}</a>
        </div>
      </div>`;
    box.querySelector("h3").focus({ preventScroll: true });
  }

  function shake(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("is-hit");
    void el.offsetWidth; // reinicia a animação
    el.classList.add("is-hit");
  }

  // ---------- Turnos ----------

  function playerTurn(id) {
    const m = move(id);
    if (g.busy || !m) return;
    if (g.mp < m.mp) {
      say(t(B.noMp));
      return fight(id);
    }
    const e = B.enemies[g.wave];
    g.busy = true;
    g.turns++;

    if (m.heal) {
      g.uses[id]--;
      const before = g.hp;
      g.hp = Math.min(P.hp, g.hp + m.heal);
      say(`${D.profile.shortName} ${t(B.used)} ${t(m.name)}: ${t(B.healed)} ${g.hp - before} HP.`);
      hud()?.sfx("coin");
    } else {
      g.mp -= m.mp;
      let dmg = m.power + rnd(-2, 2);
      const sup = e.weak === id;
      if (sup) {
        dmg = Math.round(dmg * 1.5);
        g.known[e.id] = true;
      }
      g.enemy.hp -= dmg;
      say(`${D.profile.shortName} ${t(B.used)} ${t(m.name)}: ${dmg} ${t(B.damage)}.${sup ? ` ${t(B.superEffective)}` : ""}`);
      hud()?.sfx("hit");
    }
    fight(id);
    if (!m.heal) shake("foeSprite");

    setTimeout(() => {
      if (g.enemy.hp <= 0) return defeated(id);
      enemyTurn(id);
    }, wait());
  }

  function enemyTurn(focusId) {
    const e = B.enemies[g.wave];
    const a = e.attacks[rnd(0, e.attacks.length - 1)];
    const dmg = a.power + rnd(-2, 2);
    g.hp -= dmg;
    say(`${t(e.name)} ${t(a.name)}: ${dmg} ${t(B.damage)}.`);
    hud()?.sfx("hit");
    if (g.hp <= 0) {
      g.busy = true;
      fight(focusId);
      shake("heroSprite");
      return setTimeout(() => end(false), wait());
    }
    g.mp = Math.min(P.mp, g.mp + P.mpRegen);
    g.busy = false;
    fight(focusId);
    shake("heroSprite");
  }

  function defeated(focusId) {
    const e = B.enemies[g.wave];
    say(`${t(e.name)} ${t(B.defeated)}`);
    hud()?.sfx("fanfare");
    if (g.wave === B.enemies.length - 1) return end(true);
    g.wave++;
    g.hp = Math.min(P.hp, g.hp + P.between.hp);
    g.mp = Math.min(P.mp, g.mp + P.between.mp);
    spawn();
    g.busy = false;
    fight(focusId);
  }

  // ---------- Controles ----------

  box.addEventListener("click", (e) => {
    const el = e.target.closest("button");
    if (!el) return;
    if (el.dataset.act === "start") {
      newGame();
      fight();
    } else if (el.dataset.move) {
      playerTurn(el.dataset.move);
    }
  });

  // Setas navegam entre os golpes, como num menu de JRPG
  box.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const list = [...box.querySelectorAll(".move:not(:disabled)")];
    const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
    list[next].focus();
    e.preventDefault();
  });

  intro();
})();
