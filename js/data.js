/* Todo o conteúdo do site fica aqui, nos três idiomas.
   Texto traduzível = objeto { pt, en, es }. Texto igual em todos = string simples.
   Para editar o site, normalmente basta mexer neste arquivo. */
window.PORTFOLIO = {
  profile: {
    name: "Guilherme Chagas Mundt",
    shortName: "Guilherme Mundt",
    // Início do curso: o nível do personagem sobe a cada semestre a partir daqui
    startYear: 2023,
    startSemester: 1,
    location: "Alegrete, RS · Brasil",
    email: "guilhermemundt2@gmail.com",
    github: "https://github.com/doffyGC",
    linkedin: null, // TODO: URL do LinkedIn
    lattes: null, // TODO: adicionar depois
    cv: null, // TODO: caminho do CV sem telefone, ex.: "cv/guilherme-mundt-cv.pdf"
    photo: null, // TODO: caminho da foto, ex.: "img/foto.jpg"
    available: true,
  },

  // Ordem das seções no site e no menu. "id" vira a âncora (#id).
  sections: [
    { id: "ficha", game: { pt: "Ficha do personagem", en: "Character Sheet", es: "Hoja de personaje" }, legend: { pt: "Sobre", en: "About", es: "Sobre mí" } },
    { id: "skills", game: { pt: "Skill Tree", en: "Skill Tree", es: "Árbol de habilidades" }, legend: { pt: "Competências", en: "Skills", es: "Competencias" } },
    { id: "campanha", game: { pt: "Campanha", en: "Campaign", es: "Campaña" }, legend: { pt: "Experiência e formação", en: "Experience & education", es: "Experiencia y formación" } },
    { id: "raid", game: { pt: "Raid: Ecossistema ERENO", en: "Raid: ERENO Ecosystem", es: "Raid: Ecosistema ERENO" }, legend: { pt: "Projeto de pesquisa", en: "Research project", es: "Proyecto de investigación" } },
    { id: "quests", game: { pt: "Quest Log", en: "Quest Log", es: "Registro de misiones" }, legend: { pt: "Projetos", en: "Projects", es: "Proyectos" } },
    { id: "grimorio", game: { pt: "Grimório", en: "Grimoire", es: "Grimorio" }, legend: { pt: "Pesquisa", en: "Research", es: "Investigación" } },
    { id: "arena", game: { pt: "Arena", en: "Arena", es: "Arena" }, legend: { pt: "Minigame", en: "Minigame", es: "Minijuego" } },
    { id: "conquistas", game: { pt: "Conquistas", en: "Achievements", es: "Logros" }, legend: { pt: "Certificados", en: "Certificates", es: "Certificados" } },
    { id: "diario", game: { pt: "Diário de bordo", en: "Logbook", es: "Bitácora" }, legend: { pt: "Atividade no GitHub", en: "GitHub activity", es: "Actividad en GitHub" } },
    { id: "contato", game: { pt: "Recrutar para a party", en: "Recruit to the party", es: "Reclutar para el grupo" }, legend: { pt: "Contato", en: "Contact", es: "Contacto" } },
  ],

  title: {
    kicker: { pt: "1 Player · Portfolio", en: "1 Player · Portfolio", es: "1 Jugador · Portafolio" },
    classLabel: { pt: "Classe", en: "Class", es: "Clase" },
    className: { pt: "Dev Full-stack & IA", en: "Full-stack & AI Dev", es: "Dev Full-stack e IA" },
    classDetail: { pt: "Engenharia de Software · UNIPAMPA", en: "Software Engineering · UNIPAMPA", es: "Ingeniería de Software · UNIPAMPA" },
    status: { pt: "Procurando party: vaga júnior / web", en: "Looking for a party: junior / web dev role", es: "Buscando grupo: vacante junior / web" },
    semester: { pt: "semestre", en: "semester", es: "semestre" },
    tagline: {
      pt: "Desenvolvo software web full-stack (React, Node.js, NestJS) e sistemas de IA aplicada: pipelines RAG, agentes com LLM e machine learning explicável. Hoje sou bolsista no PET-Saúde, construindo software para uma unidade de saúde pública.",
      en: "I build full-stack web software (React, Node.js, NestJS) and applied AI systems: RAG pipelines, LLM agents and explainable machine learning. Right now I'm a scholarship developer at PET-Saúde, building software for a public health unit.",
      es: "Desarrollo software web full-stack (React, Node.js, NestJS) y sistemas de IA aplicada: pipelines RAG, agentes con LLM y machine learning explicable. Hoy soy becario en PET-Saúde, construyendo software para una unidad de salud pública.",
    },
    start: { pt: "Press Start", en: "Press Start", es: "Press Start" },
    save: { pt: "Save file (CV)", en: "Save file (CV)", es: "Save file (CV)" },
    saveSoon: { pt: "CV disponível em breve", en: "CV coming soon", es: "CV disponible pronto" },
    scroll: { pt: "▼ role para jogar", en: "▼ scroll to play", es: "▼ desliza para jugar" },
  },

  ui: {
    skipLink: { pt: "Pular para o conteúdo", en: "Skip to content", es: "Saltar al contenido" },
    menu: { pt: "Menu", en: "Menu", es: "Menú" },
    sectionsNav: { pt: "Seções", en: "Sections", es: "Secciones" },
    language: { pt: "Idioma", en: "Language", es: "Idioma" },
    toLight: { pt: "Mudar para tema claro", en: "Switch to light theme", es: "Cambiar a tema claro" },
    toDark: { pt: "Mudar para tema escuro", en: "Switch to dark theme", es: "Cambiar a tema oscuro" },
    soundOn: { pt: "Ligar som", en: "Turn sound on", es: "Activar sonido" },
    soundOff: { pt: "Desligar som", en: "Turn sound off", es: "Desactivar sonido" },
    skipGame: { pt: "Pular o jogo", en: "Skip the game", es: "Saltar el juego" },
    playGame: { pt: "Modo jogo", en: "Game mode", es: "Modo juego" },
    skipGameHint: { pt: "Mostra o conteúdo sem animações nem elementos de jogo", en: "Shows the content without animations or game elements", es: "Muestra el contenido sin animaciones ni elementos de juego" },
    visitorXp: { pt: "Sua XP", en: "Your XP", es: "Tu XP" },
    wip: {
      pt: "<strong>🚧 Área em construção.</strong> Volte no próximo patch!",
      en: "<strong>🚧 Under construction.</strong> Check back next patch!",
      es: "<strong>🚧 En construcción.</strong> ¡Vuelve en el próximo parche!",
    },
    footer: {
      pt: "Feito à mão, sem framework, por Guilherme Mundt",
      en: "Handmade, framework-free, by Guilherme Mundt",
      es: "Hecho a mano, sin framework, por Guilherme Mundt",
    },
  },

  languages: [
    { code: "pt", label: "PT", name: "Português", path: "" },
    { code: "en", label: "EN", name: "English", path: "en/" },
    { code: "es", label: "ES", name: "Español", path: "es/" },
  ],
};
