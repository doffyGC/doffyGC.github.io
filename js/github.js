/* Diário de bordo: atividade pública recente e repositórios atualizados, via API pública do GitHub.
   Sem token (limite de 60 pedidos por hora por IP), por isso o resultado fica 30 min em cache.
   Desde 2025 os eventos de push não trazem mais as mensagens de commit: mostramos o push com link para o commit final. */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const App = window.App;
  const box = document.getElementById("diary");
  if (!App || !box) return;
  const { t, esc, store } = App;
  const G = D.diary;
  const E = G.events;
  const API = "https://api.github.com";
  const CACHE = "gh-diary";
  const TTL = 30 * 60 * 1000;
  const profile = `https://github.com/${G.user}`;

  function ago(iso) {
    const L = G.ago[App.lang] || G.ago.pt;
    const min = Math.max(0, Math.round((Date.now() - new Date(iso)) / 60000));
    if (min < 1) return L.now;
    const v = min < 60 ? `${min} ${L.m}` : min < 1440 ? `${Math.round(min / 60)}${L.h}` : `${Math.round(min / 1440)}${L.d}`;
    return `${L.prefix}${v}${L.suffix}`;
  }

  const repoLink = (name) => `<a href="https://github.com/${esc(name)}" target="_blank" rel="noopener">${esc(name)}</a>`;

  // Converte eventos da API em linhas do diário, juntando pushes seguidos no mesmo repo e branch
  function toEntries(events) {
    const out = [];
    events.forEach((e) => {
      const repo = e.repo?.name;
      const p = e.payload || {};
      if (!repo) return;
      if (e.type === "PushEvent") {
        const branch = (p.ref || "").replace("refs/heads/", "");
        const last = out[out.length - 1];
        if (last && last.kind === "push" && last.repo === repo && last.branch === branch) {
          last.n++;
          return;
        }
        out.push({ kind: "push", repo, branch, n: 1, head: p.head, date: e.created_at });
      } else if (e.type === "PullRequestEvent" && p.number) {
        out.push({ kind: "pr", repo, action: p.action, number: p.number, date: e.created_at });
      } else if (e.type === "IssuesEvent" && p.issue) {
        out.push({ kind: "issue", repo, action: p.action, number: p.issue.number, title: p.issue.title, url: p.issue.html_url, date: e.created_at });
      } else if (e.type === "CreateEvent" && (p.ref_type === "branch" || p.ref_type === "repository")) {
        out.push({ kind: p.ref_type, repo, ref: p.ref, date: e.created_at });
      } else if (e.type === "PublicEvent") {
        out.push({ kind: "public", repo, date: e.created_at });
      }
    });
    return out.slice(0, 8);
  }

  function entryHtml(x) {
    let icon = "◆";
    let text = "";
    if (x.kind === "push") {
      icon = "⬆";
      const label = x.n > 1 ? t(E.pushes).replace("{n}", x.n) : t(E.push);
      const branch = x.branch ? ` <code>${esc(x.branch)}</code>` : "";
      text = `${esc(label)} ${repoLink(x.repo)}${branch}`;
      if (x.head) text += ` · <a href="https://github.com/${esc(x.repo)}/commit/${esc(x.head)}" target="_blank" rel="noopener"><code>${esc(x.head.slice(0, 7))}</code></a>`;
    } else if (x.kind === "pr") {
      icon = "⇄";
      const label = x.action === "closed" ? t(E.prClosed) : t(E.prOpened);
      text = `${esc(label)} <a href="https://github.com/${esc(x.repo)}/pull/${x.number}" target="_blank" rel="noopener">#${x.number}</a> ${esc(t(E.in))} ${repoLink(x.repo)}`;
    } else if (x.kind === "issue") {
      icon = "✎";
      const label = x.action === "closed" ? t(E.issueClosed) : t(E.issueOpened);
      text = `${esc(label)} <a href="${esc(x.url)}" target="_blank" rel="noopener">#${x.number}</a> ${esc(t(E.in))} ${repoLink(x.repo)}${x.title ? `: ${esc(x.title)}` : ""}`;
    } else if (x.kind === "branch") {
      icon = "⑂";
      text = `${esc(t(E.branch))} <code>${esc(x.ref)}</code> ${esc(t(E.in))} ${repoLink(x.repo)}`;
    } else if (x.kind === "repository") {
      icon = "✚";
      text = `${esc(t(E.repo))} ${repoLink(x.repo)}`;
    } else if (x.kind === "public") {
      icon = "◉";
      text = `${esc(t(E.public))} ${repoLink(x.repo)}`;
    }
    return `<li><span class="log-icon" aria-hidden="true">${icon}</span><span class="log-text">${text}</span><time datetime="${esc(x.date)}">${esc(ago(x.date))}</time></li>`;
  }

  function repoHtml(r) {
    return `<li class="repo">
      <a href="${esc(r.html_url)}" target="_blank" rel="noopener" class="repo-name">${esc(r.name)}</a>
      ${r.description ? `<p>${esc(r.description)}</p>` : ""}
      <p class="repo-meta">${r.language ? `<span>${esc(r.language)}</span>` : ""}<time datetime="${esc(r.pushed_at)}">${esc(ago(r.pushed_at))}</time></p>
    </li>`;
  }

  function render({ events, repos }) {
    const entries = toEntries(events);
    box.setAttribute("aria-busy", "false");
    box.innerHTML = `
      <div class="dialog diary-log">
        <h3>${esc(t(G.recentCommits))}</h3>
        ${entries.length ? `<ul class="log">${entries.map(entryHtml).join("")}</ul>` : `<p class="muted">${esc(t(G.empty))}</p>`}
      </div>
      <div class="dialog diary-repos">
        <h3>${esc(t(G.recentRepos))}</h3>
        <ul class="repos">${repos.map(repoHtml).join("")}</ul>
        <a class="link-btn" href="${profile}" target="_blank" rel="noopener">${esc(t(G.seeAll))} <span aria-hidden="true">↗</span></a>
      </div>`;
  }

  function fail() {
    box.setAttribute("aria-busy", "false");
    box.innerHTML = `<div class="dialog"><p>${esc(t(G.error))} <a href="${profile}" target="_blank" rel="noopener">github.com/${esc(G.user)}</a></p></div>`;
  }

  async function load() {
    try {
      const cached = JSON.parse(store.get(CACHE));
      if (cached && Date.now() - cached.at < TTL) return render(cached);
    } catch (e) {}
    try {
      const [ev, rp] = await Promise.all([
        fetch(`${API}/users/${G.user}/events/public?per_page=50`),
        fetch(`${API}/users/${G.user}/repos?sort=pushed&per_page=12&type=owner`),
      ]);
      if (!ev.ok || !rp.ok) throw new Error("GitHub API");
      const events = await ev.json();
      const repos = (await rp.json())
        .filter((r) => !r.fork && r.name !== G.user)
        .slice(0, 5)
        .map(({ name, description, language, pushed_at, html_url }) => ({ name, description, language, pushed_at, html_url }));
      // Guarda só o que o diário usa, para o cache ficar pequeno
      const slim = events.map(({ type, repo, payload, created_at }) => ({
        type,
        repo: { name: repo?.name },
        created_at,
        payload: {
          ref: payload?.ref,
          ref_type: payload?.ref_type,
          head: payload?.head,
          action: payload?.action,
          number: payload?.number,
          issue: payload?.issue && { number: payload.issue.number, title: payload.issue.title, html_url: payload.issue.html_url },
        },
      }));
      const data = { at: Date.now(), events: slim, repos };
      store.set(CACHE, JSON.stringify(data));
      render(data);
    } catch (e) {
      fail();
    }
  }

  // Só busca quando o visitante se aproxima da seção
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(box);
  } else {
    load();
  }
})();
