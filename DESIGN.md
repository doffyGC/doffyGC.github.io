# Portfolio-RPG — Documento de Design

Decisões fechadas na sessão de design de 12/10/2026. Referência de inspiração (não copiar):
<https://medeiros08.github.io/>. Lá o visual é neo-brutalista e o tema é hacker/CTF, com um jogo em
que o visitante **defende** como firewall. Aqui o tema é **RPG em pixel art**, e no minigame o visitante **ataca** e
recebe uma explicação.

---

## 1. Objetivo e público

- **Principal:** recrutadores de vaga júnior / web (Guilherme está buscando vaga).
- **Secundário:** área acadêmica (pesquisa em XAI, cibersegurança, IoT, IA agêntica, com o ecossistema ERENO).
- Regra de ouro: quem tem 30 segundos acha tudo; quem é curioso se diverte.

## 2. Conceito

Site **normal e rolável**, com uma **camada de jogo** por cima.

- **Metáfora:** RPG. O Guilherme é o personagem, os projetos são quests e as competências são a skill tree.
- **Visual:** *pixel nos detalhes*. Fonte pixel só em títulos, HUD e botões. O corpo usa uma fonte legível.
  Os cards são **caixas de diálogo de JRPG** (borda dupla, cantos em degrau, ▼ piscando).
- **Nomes de seção:** termo de jogo + legenda clara. Ex.: `Quest Log · Projetos`.

## 3. Identidade visual

### Paleta "Noite de SNES" (padrão: escuro)

| Token | Escuro | Claro (estilo menu de Pokémon) | Uso |
|---|---|---|---|
| `--bg` | `#14112b` | `#f7f1e3` | fundo da página |
| `--panel` | `#221c45` | `#fffdf6` | caixas de diálogo |
| `--panel-2` | `#2e2660` | `#ece4d0` | caixas aninhadas, hover |
| `--ink` | `#f4ecd8` | `#1b1630` | texto e bordas |
| `--muted` | `#a99fc9` | `#5b5470` | texto secundário |
| `--gold` | `#f6c453` | `#b07800` | destaques, links, conquistas |
| `--hp` | `#5ee27a` | `#1f9d4a` | barras de XP/HP, "disponível" |
| `--mp` | `#5aa9ff` | `#2f6fd6` | barras secundárias, info |
| `--danger` | `#ff5d7a` | `#d6334f` | alertas, inimigos |

- Tema salvo no `localStorage` e aplicado antes de pintar a página (sem flash). Botão ☀/☾ no HUD.
- Contraste mínimo AA em todos os pares texto/fundo.

### Tipografia

- **Títulos/HUD/botões:** `Tiny5` (OFL, auto-hospedada em `fonts/`). A Pixelify Sans foi descartada porque o "c" dela parece um "o" em tamanhos pequenos.
- **Corpo:** `Atkinson Hyperlegible` (OFL, feita pra legibilidade, o que combina com o projeto de acessibilidade).
- **Código/números do HUD:** `IBM Plex Mono`.

### Elementos recorrentes

- Caixa de diálogo com borda dupla `--ink` e cantos "pixelados" (via `clip-path` ou `box-shadow` em degrau).
- Barras de HP/XP segmentadas.
- Sprites em **SVG pixel art** (`shape-rendering: crispEdges`), que escalam sem borrar.
- Cursor ▶ piscando no item de menu em foco (teclado e hover).

## 4. Estrutura das seções

| # | Seção (jogo · legenda) | Conteúdo |
|---|---|---|
| 0 | **HUD** (fixo no topo) | XP/nível do visitante, menu das seções, idioma, tema, 🔇 som, ⏭ Pular o jogo |
| 1 | **Tela de título** | Sprite pixel do Guilherme, nome, classe "Engenheiro de Software · Full-stack & IA", **Lv. automático** (semestre desde 03/2023), selo 🟢 "Procurando party: vaga júnior / web", botões `PRESS START` (rola até a Ficha) e `💾 Save file` (baixa o CV) |
| 2 | **Ficha do personagem · Sobre** | Retrato (foto: **espaço reservado**, Guilherme adiciona depois), origem Alegrete/RS, UNIPAMPA (Eng. de Software), idiomas, resumo, "atributos" |
| 3 | **Skill tree · Competências** | Ramos: Linguagens · Web & Frameworks · Bancos · IA & Dados · Cloud & DevOps · Versionamento & Testes. Nós clicáveis mostram onde a skill foi usada (links pras quests) |
| 4 | **Campanha · Experiência e Formação** | Capítulos em linha do tempo: Ensino Médio (2022) → UNIPAMPA (2023–) → BRISA, Residência em TIC (03–09/2025) → PET-Saúde (09/2025–) → Estágio na Escola Demétrio Ribeiro (03–12/2026) |
| 5 | **Raid: Ecossistema ERENO** | Quest especial com 3 andares (ver §5) |
| 6 | **Quest Log · Projetos** | Main quests, side quests e quest em andamento (ver §5) |
| 7 | **Grimório · Pesquisa** | XAI, Cibersegurança, IoT, IA Agêntica, conectados ao Gray-GOOSE e ao ERENO |
| 8 | **Arena · Minigame** | "Raid na Subestação" (ver §6.4) |
| 9 | **Conquistas · Certificados** | Udemy Web (12/2022), Udemy ML & Data Science (12/2023), Nivelação Residência em TIC BRISA (01/2025) |
| 10 | **Diário de bordo · GitHub** | Últimos commits/repos via API pública do GitHub (sem token, cache de 30 min no `localStorage`) |
| 11 | **Recrutar para a party · Contato** | Formulário Formspree + links (e-mail `guilhermemundt2@gmail.com`, LinkedIn, GitHub). Lattes: adicionar depois |
| — | **Rodapé** | Créditos, "feito à mão sem framework", dica sutil de easter egg |

## 5. Conteúdo das quests

### Raid: Ecossistema ERENO (cada andar linka **o repo + a branch onde está o código do Guilherme**)

1. **Andar 1: ERENO** (simulador IEC 61850/GOOSE, Java). Mecanismos de degradação benigna
   (*impairments*, UC01) e colunas de metadados (seed, configuração da subestação, `loss_rate`).
   Fica em `sequincozes/ereno`, branch `refactor/fix-major-revision`.
2. **Andar 2: ERENO 2.0** (front-end e back-end desacoplados). Front-end inicial inteiro: configuração de ataque
   (incluindo múltiplos ataques), configuração de IED, fluxo GOOSE, upload, download de dataset, persistência
   no Firebase Realtime Database e deploy. Fica em `sequincozes/ereno-2.0`, branch `dev-guilherme`.
3. **Andar 3: ERENO AI** (arquitetura agêntica). Loop adversarial Red Team × Blue Team com agentes Agno
   (Estrategista propõe ataques; Analista explica, via XAI, quais features enganaram o IDS). Repos:
   `doffyGC/ERENO-AI-LAB` (50 commits) e `sequincozes/ereno-ai` (integração do ERENO 2.0 como submódulo).

### Main quests ⭐⭐⭐

- **UniBot · Pampa Live Messenger**: assistente RAG institucional da UNIPAMPA (FastAPI, Agno, ChromaDB, React/Vite).
- **Scavenger Project**: plataforma de gincanas implantada numa escola real (React, Express, MongoDB Atlas, JWT).
- **PET-Saúde Tech IV**: comunicação de vacinação de gestantes e crianças para a Saúde de Jaguari (React, NestJS, GovBR-DS, Docker).
- **Gray-GOOSE**: ML com explicabilidade (SHAP) contra ataques grayhole DoS em GOOSE/IEC 61850 (repo `explicability-GOOSE-research`).

### Side quests ⭐⭐

- **A Ciência por Trás do Hit**: pipeline bronze/silver/gold + dashboard Streamlit (repo `dashboard-icd`).
- **Demeter**: marketplace de máquinas pesadas com State/Builder/Decorator (SvelteKit, Express, Firebase).
- **InsightMiner**: agente de IA para análise exploratória de dados.
- **Recurso Educacional Aberto**: projeto de Acessibilidade e Inclusão Digital.
- **Multiple Knapsack Problem**: heurística específica (Teoria da Computação).

### Quest em andamento 🔒

- **MundtHub**: gestão de colaboradores (ponto, RH, ausências, auditoria) com detecção de anomalias via IA explicável.

**Repos privados** (aparecem com "🔒 Código privado", sem link): PET-Saúde, Demeter, Multiple Knapsack e ERENO-AI-LAB.

**Fora do site:** repos da DIO, `calculadora`, forks, `agent-guidelines`, `sistema-ingresso-adversarial`.

## 6. Camada de jogo

### 6.1 XP e conquistas do visitante

- Barra de XP no HUD; o progresso fica salvo no `localStorage` (com try/catch; o site funciona sem ele).
- Ganha-se XP ao: visitar cada seção pela primeira vez, abrir uma quest, clicar num nó da skill tree, conversar
  com o UniBot, jogar a Arena, baixar o CV, enviar o formulário e achar segredos.
- Ao subir de nível ou desbloquear algo: toast "🏆 Conquista desbloqueada" + som (se ligado).
- Painel de conquistas (com as bloqueadas como `???`) acessível pelo HUD.

### 6.2 Nível do personagem

- `Lv.` calculado a partir de 03/2023: um nível por semestre letivo (em 10/2026, Lv. 8).

### 6.3 NPC: UniBot

- Referência ao projeto UniBot, no visual "Pampa Live Messenger" (janelinha de chat retrô).
- Funciona por **menu de perguntas** pré-definidas, sem backend: "O que ele estuda?", "Tá disponível pra vaga?",
  "Qual o melhor projeto?", "O que é o ERENO?", "Como falo com ele?" etc. As respostas linkam as seções.
- Texto aparece letra a letra (máquina de escrever), e dá pra pular com clique/Enter.

### 6.4 Minigame: "Raid na Subestação" (Arena)

- O visitante é o **Red Team** e precisa passar um ataque GOOSE pelo IDS.
- A cada rodada, distribui um **orçamento** entre parâmetros: temporização, campo adulterado, intensidade, número de mensagens.
- O IDS avalia e responde com **barras estilo SHAP** mostrando qual feature denunciou o ataque.
- O IDS "aprende" entre rodadas (as regras endurecem). São 3 rodadas, com pontuação e recorde salvo no navegador.
- Fim: texto curto conectando o jogo à pesquisa real (ERENO AI, XAI).
- Controles por mouse, toque e teclado.

### 6.5 Easter egg: Batalha contra bugs

- Batalha por turnos estilo JRPG. Inimigos: *Memory Leak*, *Merge Conflict*, *Undefined is not a function*,
  *Deploy na sexta às 18h* (chefe). Os golpes vêm da skill tree (ex.: `git rebase`, `docker compose up`, `pytest`).
- Escondida: aparece por um gatilho secreto (ver §6.6).

### 6.6 Segredos (carta branca, mas confirmar a lista final com o Guilherme)

- **Konami code** (↑↑↓↓←→←→BA): modo CRT (scanlines + leve curvatura) e skin dourada no sprite.
- Comentários secretos no HTML e uma mensagem no console do DevTools pra quem inspeciona.
- Gatilho da Batalha contra bugs (ex.: clicar várias vezes num inseto pixel escondido no rodapé, ou digitar `bug`).
- Tudo inofensivo e leve; cada segredo vale uma conquista.

### 6.7 Som

- Efeitos chiptune gerados via Web Audio (sem arquivos): clique, conquista e level up.
- **Desligados por padrão**, com botão 🔇/🔊 no HUD e preferência salva.

### 6.8 Modo recrutador: "⏭ Pular o jogo"

- Desliga a fonte pixel, as animações, o HUD de XP, os toasts e os sons, e mostra o conteúdo limpo, quase um CV.
- Ativa sozinho com `prefers-reduced-motion: reduce`; dá pra voltar pro modo jogo.

## 7. Arquitetura técnica

- **HTML/CSS/JS puro**, sem build, sem framework, sem dependências externas em runtime (exceto as APIs do GitHub e do Formspree).
- **Conteúdo trilingue (PT/EN/ES)** num arquivo único: `js/data.js`. Editar o site = editar esse arquivo.
- **Idiomas por URL:** `/`, `/en/`, `/es/`. Cada página é uma casca com `<html lang>`, meta tags e
  Open Graph no idioma certo, e todas carregam o mesmo app. Cada uma tem `hreflang` pras outras e um `<noscript>` com o essencial.

```
/
├── index.html            # PT
├── en/index.html         # EN
├── es/index.html         # ES
├── 404.html              # "Game Over" com botão "Continue?"
├── favicon.svg
├── css/
│   ├── tokens.css        # paleta, fontes, medidas (temas claro/escuro)
│   ├── base.css          # reset, tipografia, layout, modo recrutador
│   ├── components.css    # caixa de diálogo, barras, botões, tela de título
│   ├── sections.css      # ficha, skill tree, campanha, raid, quests, grimório, conquistas, contato
│   └── game.css          # HUD, toasts, NPC, arena, batalha, CRT
├── js/
│   ├── data.js           # TODO o conteúdo, nos 3 idiomas
│   ├── sprite.js         # sprite pixel art gerado de um mapa de caracteres (skins trocáveis)
│   ├── app.js            # renderiza as seções, navegação, tema, idioma
│   ├── hud.js            # XP, conquistas, toasts, sons
│   ├── npc.js            # UniBot
│   ├── arena.js          # minigame Raid na Subestação
│   ├── battle.js         # batalha contra bugs
│   ├── secrets.js        # Konami, console, gatilhos
│   └── github.js         # Diário de bordo
├── img/                  # sprites SVG, og-image, foto (placeholder)
├── fonts/                # woff2 auto-hospedadas
└── cv/                   # CV público SEM telefone (PT, e EN/ES se houver)
```

- **Acessibilidade:** HTML semântico, foco visível, tudo jogável por teclado, `aria-live` pros toasts e diálogos,
  respeito a `prefers-reduced-motion`, contraste AA.
- **Responsivo:** funciona a partir de 360px; o HUD vira menu compacto no celular.
- **SEO/compartilhamento:** `og:image` em pixel art, JSON-LD `Person`, `sitemap.xml`, `robots.txt`.
- **Métricas:** GoatCounter (sem cookies), na **v1.1**.

## 8. Privacidade

- `Curriculum_Vitae.pdf` original (tem telefone) fica **fora do git** (`.gitignore`).
- Vai pro site só uma versão do CV **sem telefone**, em `cv/`.
- E-mail público: `guilhermemundt2@gmail.com`.

## 9. Deploy

1. Renomear o repo `doffyGC/portfolio` → `doffyGC/doffyGC.github.io`.
2. Tornar o repo **público** (Pages grátis exige isso).
3. Settings → Pages → Deploy from branch `main`, pasta `/ (root)`.
4. O site fica em `https://doffygc.github.io/`.

## 10. Pendências

- [ ] Foto do Guilherme pra Ficha (espaço reservado até lá).
- [ ] ID do formulário no Formspree (criar conta grátis).
- [ ] CV sem telefone (gerar a partir do LaTeX/fonte original, ou redigir o PDF).
- [ ] Link do Lattes (opcional, depois).
- [ ] Decidir se torna públicos o ERENO-AI-LAB e outros repos privados (aí eles ganham link).
- [ ] Revisar a lista final de easter eggs.

## 11. Roadmap

- **v1.0:** tudo das seções 4 a 8 (incluindo Arena, Batalha, NPC, XP, sons, modo recrutador, PT/EN/ES, Formspree).
- **v1.1:** GoatCounter, ajustes finos depois do feedback.
- **Ordem de construção sugerida:** tokens + base + tela de título → seções de conteúdo → HUD/XP/conquistas →
  UniBot → Arena → Batalha + segredos → i18n EN/ES → SEO/deploy.
