# Portfolio-RPG · Guilherme Mundt

Portfolio pessoal em formato de RPG pixel art, em português, inglês e espanhol.
HTML, CSS e JavaScript puro: sem framework, sem build, pronto para o GitHub Pages.

As decisões de design estão em [`DESIGN.md`](DESIGN.md).

## Rodar localmente

```bash
npm run serve        # ou: python -m http.server 8765
```

Depois abra <http://localhost:8765>. As versões em inglês e espanhol ficam em `/en/` e `/es/`.

## Testes

```bash
npm ci
npm run test:unit    # dados e links (node:test, sem dependências)
npm run test:e2e     # Playwright: abre as páginas no desktop e no celular
```

- **Dados e links:** traduções completas em PT/EN/ES, ids únicos, referências da skill tree e do grimório,
  conquistas e tipos de XP usados no código, arquivos citados nas páginas, no CSS, no `data.js` e no sitemap.
- **Ponta a ponta:** cada página monta sem erro no console e sem rolagem horizontal; tema, modo recrutador, menu,
  UniBot, batalha, Konami code, prints ampliados e o caminho até o estudo de caso funcionam.

O workflow [`ci.yml`](.github/workflows/ci.yml) roda tudo a cada push e PR.

## Editar o conteúdo

Quase tudo fica em [`js/data.js`](js/data.js): perfil, quests, campanha, skills, textos do UniBot, da batalha e dos segredos.
Texto traduzível é um objeto `{ pt, en, es }`.

| Quero mudar… | Onde |
|---|---|
| Foto, CV, LinkedIn, Lattes, e-mail | `profile` em `js/data.js` |
| ID do formulário (Formspree) | `profile.formspree` em `js/data.js` |
| Projetos | `quests.list` em `js/data.js` |
| Cores e fontes | `css/tokens.css` |

### Pendências

- [ ] **Foto:** salvar em `img/` e preencher `profile.photo` (ex.: `"img/foto.jpg"`).
- [ ] **CV sem telefone:** salvar em `cv/` e preencher `profile.cv`. O `Curriculum_Vitae.pdf` original está no `.gitignore`.
- [ ] **Formspree:** criar um formulário em <https://formspree.io> e colocar o ID em `profile.formspree`. Sem ele, o formulário abre o app de e-mail do visitante.
- [ ] **Lattes:** preencher `profile.lattes` (opcional).

## Publicação

O site fica em <https://doffygc.github.io/>. A publicação é automática: a cada push na `main`, o workflow
roda os testes e, se tudo passar, envia **só os arquivos do site** para o GitHub Pages
(Settings → Pages → Source: *GitHub Actions*). Versão quebrada não vai para o ar.

Depois de publicar, vale testar a prévia do link no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Segredos

Tem alguns escondidos. O UniBot dá umas dicas. 🤫
