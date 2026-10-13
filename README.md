# Portfolio-RPG · Guilherme Mundt

Portfolio pessoal em formato de RPG pixel art, em português, inglês e espanhol.
HTML, CSS e JavaScript puro: sem framework, sem build, pronto para o GitHub Pages.

As decisões de design estão em [`DESIGN.md`](DESIGN.md).

## Rodar localmente

```bash
python -m http.server 8765
```

Depois abra <http://localhost:8765>. As versões em inglês e espanhol ficam em `/en/` e `/es/`.

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

## Publicar no GitHub Pages

1. Renomear o repositório para `doffyGC.github.io` (Settings → General → Repository name).
2. Deixar o repositório **público** (Settings → General → Danger Zone → Change visibility). No plano gratuito, o Pages exige isso.
3. Atualizar o remoto local:
   ```bash
   git remote set-url origin https://github.com/doffyGC/doffyGC.github.io.git
   git push origin main
   ```
4. Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`.
5. Em alguns minutos o site fica em <https://doffygc.github.io/>.

Depois de publicar, vale testar a prévia do link no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Segredos

Tem alguns escondidos. O UniBot dá umas dicas. 🤫
