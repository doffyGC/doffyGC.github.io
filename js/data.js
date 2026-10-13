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
    linkedin: "https://www.linkedin.com/in/guilherme-mundt-5381602a6/",
    lattes: null, // TODO: adicionar depois
    cv: null, // TODO: caminho do CV sem telefone, ex.: "cv/guilherme-mundt-cv.pdf"
    photo: null, // TODO: caminho da foto, ex.: "img/foto.jpg"
    available: true,
    // ID do formulário no Formspree (ex.: "xabcdwyz"). Sem ID, o formulário abre o app de e-mail.
    formspree: null,
  },

  // ---------- Ficha do personagem ----------
  about: {
    bio: [
      {
        pt: "Sou estudante de Engenharia de Software na UNIPAMPA, em Alegrete (RS). Hoje desenvolvo software para a unidade de saúde de Jaguari como bolsista do PET-Saúde e, no estágio curricular, levei uma plataforma de gestão de gincanas para uso real numa escola.",
        en: "I'm a Software Engineering student at UNIPAMPA, in Alegrete (Brazil). Right now I build software for the public health unit of Jaguari as a PET-Saúde scholarship developer, and in my curricular internship I took a school-event management platform into real use at a public school.",
        es: "Soy estudiante de Ingeniería de Software en la UNIPAMPA, en Alegrete (Brasil). Hoy desarrollo software para la unidad de salud de Jaguari como becario de PET-Saúde y, en mis prácticas curriculares, llevé una plataforma de gestión de gincanas al uso real en una escuela.",
      },
      {
        pt: "Gosto de jogar nas duas pontas: desenvolvimento web full-stack (React, Node.js, NestJS, SvelteKit) e IA aplicada (pipelines RAG, agentes com LLM e machine learning explicável). Trabalho sempre em equipe, com Git Flow e pull requests, e estou procurando uma vaga de desenvolvedor júnior ou web.",
        en: "I like to play on both ends: full-stack web development (React, Node.js, NestJS, SvelteKit) and applied AI (RAG pipelines, LLM agents and explainable machine learning). I always work in teams, with Git Flow and pull requests, and I'm looking for a junior or web developer role.",
        es: "Me gusta jugar en los dos extremos: desarrollo web full-stack (React, Node.js, NestJS, SvelteKit) e IA aplicada (pipelines RAG, agentes con LLM y machine learning explicable). Siempre trabajo en equipo, con Git Flow y pull requests, y busco una vacante de desarrollador junior o web.",
      },
    ],
    info: [
      { k: { pt: "Nome", en: "Name", es: "Nombre" }, v: "Guilherme Chagas Mundt" },
      { k: { pt: "Guilda", en: "Guild", es: "Gremio" }, v: { pt: "UNIPAMPA · Engenharia de Software", en: "UNIPAMPA · Software Engineering", es: "UNIPAMPA · Ingeniería de Software" } },
      { k: { pt: "Base", en: "Home base", es: "Base" }, v: "Alegrete, RS · Brasil" },
      { k: { pt: "Idiomas", en: "Languages", es: "Idiomas" }, v: { pt: "Português (nativo) · Inglês (intermediário)", en: "Portuguese (native) · English (intermediate)", es: "Portugués (nativo) · Inglés (intermedio)" } },
      { k: { pt: "Interesses", en: "Interests", es: "Intereses" }, v: { pt: "IA explicável, cibersegurança, IoT, IA agêntica", en: "Explainable AI, cybersecurity, IoT, agentic AI", es: "IA explicable, ciberseguridad, IoT, IA agéntica" } },
    ],
    photoSoon: { pt: "Foto em breve", en: "Photo coming soon", es: "Foto pronto" },
    statsTitle: { pt: "Estatísticas", en: "Stats", es: "Estadísticas" },
    stats: {
      level: { pt: "Semestres", en: "Semesters", es: "Semestres" },
      quests: { pt: "Quests concluídas", en: "Quests completed", es: "Misiones completadas" },
      chapters: { pt: "Experiências", en: "Experiences", es: "Experiencias" },
      skills: { pt: "Tecnologias", en: "Technologies", es: "Tecnologías" },
    },
  },

  // ---------- Skill tree ----------
  // "used" aponta para ids de quests, capítulos da campanha ou andares da raid
  skills: {
    hint: { pt: "Escolha uma skill para ver onde ela foi usada.", en: "Pick a skill to see where it was used.", es: "Elige una habilidad para ver dónde se usó." },
    usedIn: { pt: "Usada em", en: "Used in", es: "Usada en" },
    noUse: { pt: "Usada em estudos e cursos.", en: "Used in studies and courses.", es: "Usada en estudios y cursos." },
    branches: [
      {
        icon: "⌨",
        name: { pt: "Linguagens", en: "Languages", es: "Lenguajes" },
        nodes: [
          { name: "Python", used: ["unibot", "graygoose", "hit", "insightminer", "erenoai", "knapsack"] },
          { name: "JavaScript", used: ["scavenger", "demeter", "rea", "estagio"] },
          { name: "TypeScript", used: ["unibot", "brisa", "petsaude"] },
          { name: "Java", used: ["ereno"] },
        ],
      },
      {
        icon: "◈",
        name: { pt: "Web & Frameworks", en: "Web & Frameworks", es: "Web y Frameworks" },
        nodes: [
          { name: "React", used: ["petsaude", "scavenger", "unibot", "estagio"] },
          { name: "NestJS", used: ["petsaude"] },
          { name: "Node.js / Express", used: ["scavenger", "demeter", "brisa", "estagio"] },
          { name: "SvelteKit", used: ["demeter"] },
          { name: "FastAPI", used: ["unibot"] },
          { name: "Vite", used: ["unibot", "ereno2"] },
          { name: "Tailwind CSS", used: [] },
          { name: "HTML5 / CSS3", used: ["rea"] },
        ],
      },
      {
        icon: "▤",
        name: { pt: "Bancos de dados", en: "Databases", es: "Bases de datos" },
        nodes: [
          { name: "PostgreSQL", used: [] },
          { name: "MySQL", used: [] },
          { name: "MongoDB", used: ["scavenger", "estagio"] },
          { name: "ChromaDB", used: ["unibot"] },
          { name: "Firebase", used: ["demeter", "ereno2"] },
        ],
      },
      {
        icon: "✦",
        name: { pt: "IA & Dados", en: "AI & Data", es: "IA y Datos" },
        nodes: [
          { name: "RAG", used: ["unibot"] },
          { name: { pt: "Agentes com LLM", en: "LLM agents", es: "Agentes con LLM" }, used: ["unibot", "erenoai", "insightminer"] },
          { name: "SHAP (XAI)", used: ["graygoose", "erenoai"] },
          { name: "scikit-learn", used: ["graygoose", "erenoai"] },
          { name: "Pandas", used: ["hit", "graygoose"] },
          { name: "Streamlit", used: ["hit"] },
        ],
      },
      {
        icon: "☁",
        name: { pt: "Cloud & DevOps", en: "Cloud & DevOps", es: "Cloud y DevOps" },
        nodes: [
          { name: "Docker", used: ["petsaude", "graygoose", "hit"] },
          { name: "Docker Compose", used: ["hit"] },
          { name: "AWS", used: [] },
          { name: "Azure", used: [] },
          { name: "Vercel / Render", used: ["scavenger"] },
        ],
      },
      {
        icon: "✓",
        name: { pt: "Versionamento & Testes", en: "Versioning & Testing", es: "Versionado y Pruebas" },
        nodes: [
          { name: "Git / Git Flow", used: ["estagio", "brisa", "petsaude", "unibot"] },
          { name: "Pytest", used: ["unibot"] },
          { name: "Jest", used: [] },
          { name: "JUnit", used: [] },
          { name: "Postman", used: ["brisa"] },
        ],
      },
    ],
  },

  // ---------- Campanha (ordem cronológica) ----------
  campaign: {
    chapter: { pt: "Capítulo", en: "Chapter", es: "Capítulo" },
    current: { pt: "Em andamento", en: "In progress", es: "En curso" },
    now: { pt: "▶ Você está aqui", en: "▶ You are here", es: "▶ Estás aquí" },
    chapters: [
      {
        id: "medio",
        kind: "edu",
        title: { pt: "Ensino Médio", en: "High school", es: "Educación secundaria" },
        org: "Carlos Drummond de Andrade",
        place: "Alvorada, RS",
        period: "— 12/2022",
        bullets: [],
      },
      {
        id: "unipampa",
        kind: "edu",
        title: { pt: "Bacharelado em Engenharia de Software", en: "B.Sc. in Software Engineering", es: "Grado en Ingeniería de Software" },
        org: "UNIPAMPA · Universidade Federal do Pampa",
        place: "Alegrete, RS",
        period: "03/2023 — …",
        current: true,
        bullets: [
          { pt: "Projetos de disciplina viraram produtos reais: UniBot, Scavenger Project, Demeter e outros.", en: "Course projects turned into real products: UniBot, Scavenger Project, Demeter and more.", es: "Proyectos de asignatura se volvieron productos reales: UniBot, Scavenger Project, Demeter y otros." },
          { pt: "Pesquisa em IA explicável e cibersegurança para smart grids (ecossistema ERENO).", en: "Research on explainable AI and cybersecurity for smart grids (ERENO ecosystem).", es: "Investigación en IA explicable y ciberseguridad para smart grids (ecosistema ERENO)." },
        ],
      },
      {
        id: "brisa",
        kind: "work",
        title: { pt: "Residente em Desenvolvimento de Software", en: "Software Development Resident", es: "Residente en Desarrollo de Software" },
        org: "BRISA · Residência em TIC",
        place: { pt: "Híbrido", en: "Hybrid", es: "Híbrido" },
        period: "03/2025 — 09/2025",
        bullets: [
          { pt: "Programa de residência de sete meses voltado ao mercado, desenvolvendo um sistema real em equipe.", en: "Seven-month, industry-focused residency program, building a real system as a team.", es: "Programa de residencia de siete meses orientado al mercado, desarrollando un sistema real en equipo." },
          { pt: "Serviços REST em TypeScript (Node.js/Express) com controllers, rotas e serviços separados.", en: "REST services in TypeScript (Node.js/Express) with separate controllers, routes and services.", es: "Servicios REST en TypeScript (Node.js/Express) con controllers, rutas y servicios separados." },
          { pt: "Git Flow com branches por desenvolvedor e pull requests para integrar o trabalho da equipe.", en: "Git Flow with per-developer branches and pull requests to integrate the team's work.", es: "Git Flow con ramas por desarrollador y pull requests para integrar el trabajo del equipo." },
        ],
      },
      {
        id: "pet",
        kind: "work",
        title: { pt: "Desenvolvedor de Software (bolsista)", en: "Software Developer (scholarship)", es: "Desarrollador de Software (becario)" },
        org: "Grupo PET-Saúde",
        place: { pt: "Híbrido", en: "Hybrid", es: "Híbrido" },
        period: "09/2025 — …",
        current: true,
        bullets: [
          { pt: "Soluções para a unidade de saúde de Jaguari (RS), com React.js no front-end e NestJS no back-end.", en: "Solutions for the public health unit of Jaguari (Brazil), with React.js on the front end and NestJS on the back end.", es: "Soluciones para la unidad de salud de Jaguari (Brasil), con React.js en el front-end y NestJS en el back-end." },
          { pt: "Entregou um sistema de comunicação com os cidadãos sobre a vacinação de gestantes e crianças.", en: "Shipped a citizen communication system about vaccination for pregnant women and children.", es: "Entregó un sistema de comunicación con la ciudadanía sobre la vacunación de embarazadas y niños." },
          { pt: "Desenvolve os módulos de transporte de pacientes e de exames; conteineriza os serviços com Docker e apoia o deploy.", en: "Building the patient transport and exams modules; containerizes services with Docker and supports deployment.", es: "Desarrolla los módulos de transporte de pacientes y de exámenes; contenedoriza los servicios con Docker y apoya el despliegue." },
        ],
      },
      {
        id: "estagio",
        kind: "work",
        title: { pt: "Desenvolvedor de Software (estágio curricular)", en: "Software Developer (curricular internship)", es: "Desarrollador de Software (prácticas curriculares)" },
        org: "Escola Demétrio Ribeiro",
        place: "Alegrete, RS",
        period: "03/2026 — 12/2026",
        current: true,
        bullets: [
          { pt: "Implantou na escola a plataforma de gincanas Scavenger Project, levando um sistema de disciplina para uso real por servidores e alunos.", en: "Deployed the Scavenger Project gymkhana platform at the school, taking a course project into real use by staff and students.", es: "Implantó en la escuela la plataforma de gincanas Scavenger Project, llevando un sistema de asignatura al uso real por funcionarios y alumnos." },
          { pt: "Stack completa: React, Node.js/Express e MongoDB Atlas, com rotas protegidas por JWT e e-mails transacionais.", en: "Full stack: React, Node.js/Express and MongoDB Atlas, with JWT-protected routes and transactional e-mails.", es: "Stack completo: React, Node.js/Express y MongoDB Atlas, con rutas protegidas por JWT y correos transaccionales." },
          { pt: "Maior contribuidor de código entre oito desenvolvedores: 70 commits e 23 dos 26 pull requests.", en: "Top code contributor among eight developers: 70 commits and 23 of the 26 pull requests.", es: "Mayor contribuidor de código entre ocho desarrolladores: 70 commits y 23 de los 26 pull requests." },
        ],
      },
    ],
  },

  // ---------- Raid: ecossistema ERENO ----------
  raid: {
    intro: {
      pt: "O ERENO é um gerador de tráfego sintético IEC 61850 / GOOSE para smart grids, usado para treinar e testar sistemas de detecção de intrusão (IDS) em subestações de energia. Participo do ecossistema em três frentes:",
      en: "ERENO is a synthetic IEC 61850 / GOOSE traffic generator for smart grids, used to train and test intrusion detection systems (IDS) for power substations. I contribute to the ecosystem on three fronts:",
      es: "ERENO es un generador de tráfico sintético IEC 61850 / GOOSE para smart grids, usado para entrenar y probar sistemas de detección de intrusos (IDS) en subestaciones eléctricas. Participo del ecosistema en tres frentes:",
    },
    floor: { pt: "Andar", en: "Floor", es: "Piso" },
    floors: [
      {
        id: "ereno",
        title: "ERENO",
        subtitle: { pt: "Simulador IEC 61850 (Java)", en: "IEC 61850 simulator (Java)", es: "Simulador IEC 61850 (Java)" },
        stack: ["Java"],
        bullets: [
          { pt: "Implementou os mecanismos de degradação benigna da rede (impairments, caso de uso UC01) e o suporte a eles no contexto de execução.", en: "Implemented benign network degradation mechanisms (impairments, use case UC01) and their run-context support.", es: "Implementó los mecanismos de degradación benigna de la red (impairments, caso de uso UC01) y su soporte en el contexto de ejecución." },
          { pt: "Adicionou colunas de metadados ao dataset: seed, configuração da subestação, loss_rate e outras.", en: "Added metadata columns to the dataset: seed, substation config, loss_rate and others.", es: "Agregó columnas de metadatos al dataset: seed, configuración de la subestación, loss_rate y otras." },
        ],
        links: [{ label: "sequincozes/ereno · refactor/fix-major-revision", url: "https://github.com/sequincozes/ereno/tree/refactor/fix-major-revision" }],
      },
      {
        id: "ereno2",
        title: "ERENO 2.0",
        subtitle: { pt: "Front-end e back-end desacoplados", en: "Decoupled front end and back end", es: "Front-end y back-end desacoplados" },
        stack: ["JavaScript", "Vite", "Firebase"],
        bullets: [
          { pt: "Construiu a primeira versão do front-end: telas de configuração de ataque (incluindo múltiplos ataques), de IED e de fluxo GOOSE.", en: "Built the first version of the front end: attack configuration (including multiple attacks), IED and GOOSE flow screens.", es: "Construyó la primera versión del front-end: pantallas de configuración de ataque (incluidos múltiples ataques), de IED y de flujo GOOSE." },
          { pt: "Upload de arquivos, download do dataset gerado, persistência no Firebase Realtime Database e deploy do front-end.", en: "File upload, generated-dataset download, Firebase Realtime Database persistence and front-end deployment.", es: "Carga de archivos, descarga del dataset generado, persistencia en Firebase Realtime Database y despliegue del front-end." },
        ],
        links: [{ label: "sequincozes/ereno-2.0 · dev-guilherme", url: "https://github.com/sequincozes/ereno-2.0/tree/dev-guilherme" }],
        image: "img/projects/ereno2.webp",
        alt: { pt: "Tela de configuração do fluxo GOOSE no front-end do ERENO 2.0", en: "GOOSE flow configuration screen in the ERENO 2.0 front end", es: "Pantalla de configuración del flujo GOOSE en el front-end de ERENO 2.0" },
      },
      {
        id: "erenoai",
        title: "ERENO AI",
        subtitle: { pt: "Laboratório adversarial com agentes", en: "Adversarial lab with agents", es: "Laboratorio adversarial con agentes" },
        stack: ["Python", "Agno", "scikit-learn", "SHAP"],
        bullets: [
          { pt: "Loop Red Team × Blue Team: um agente Estrategista propõe ataques parametrizados; o núcleo regenera o dataset e treina o IDS.", en: "Red Team × Blue Team loop: a Strategist agent proposes parametrized attacks; the core regenerates the dataset and retrains the IDS.", es: "Bucle Red Team × Blue Team: un agente Estratega propone ataques parametrizados; el núcleo regenera el dataset y entrena el IDS." },
          { pt: "Um agente Analista explica, com XAI, quais features enganaram o detector e recomenda mitigações.", en: "An Analyst agent explains, with XAI, which features fooled the detector and recommends mitigations.", es: "Un agente Analista explica, con XAI, qué features engañaron al detector y recomienda mitigaciones." },
          { pt: "Integrou o ERENO 2.0 ao ERENO AI como submódulo.", en: "Integrated ERENO 2.0 into ERENO AI as a submodule.", es: "Integró ERENO 2.0 en ERENO AI como submódulo." },
        ],
        links: [
          { label: "sequincozes/ereno-ai", url: "https://github.com/sequincozes/ereno-ai" },
          { label: "ERENO-AI-LAB", private: true },
        ],
      },
    ],
  },

  // ---------- Quest log ----------
  quests: {
    tiers: {
      main: { pt: "Main quests", en: "Main quests", es: "Misiones principales" },
      side: { pt: "Side quests", en: "Side quests", es: "Misiones secundarias" },
      wip: { pt: "Quest em andamento", en: "Quest in progress", es: "Misión en curso" },
    },
    repo: { pt: "Código", en: "Code", es: "Código" },
    demo: { pt: "Jogar demo", en: "Play demo", es: "Jugar demo" },
    private: { pt: "🔒 Código privado", en: "🔒 Private code", es: "🔒 Código privado" },
    details: { pt: "Ver missão", en: "View quest", es: "Ver misión" },
    team: { pt: "Party", en: "Party", es: "Grupo" },
    list: [
      {
        id: "unibot",
        tier: "main",
        title: "UniBot · Pampa Live Messenger",
        subtitle: { pt: "Assistente conversacional institucional (RAG)", en: "Institutional conversational assistant (RAG)", es: "Asistente conversacional institucional (RAG)" },
        period: "05/2026 — 06/2026",
        team: { pt: "4 devs", en: "4 devs", es: "4 devs" },
        stack: ["Python", "FastAPI", "Agno", "ChromaDB", "Groq", "React", "Vite", "TypeScript", "Pytest"],
        desc: {
          pt: "Assistente da UNIPAMPA inspirado no Windows Live Messenger: cursos, departamentos e serviços viram contatos de chat que respondem dúvidas sobre PPCs, resoluções, calendário e regulamentos.",
          en: "A UNIPAMPA assistant inspired by Windows Live Messenger: courses, departments and services become chat contacts that answer questions about course plans, resolutions, calendars and regulations.",
          es: "Asistente de la UNIPAMPA inspirado en Windows Live Messenger: carreras, departamentos y servicios se vuelven contactos de chat que responden dudas sobre planes de estudio, resoluciones, calendario y reglamentos.",
        },
        bullets: [
          { pt: "Pipeline RAG com recuperação híbrida sobre base vetorial ChromaDB.", en: "RAG pipeline with hybrid retrieval over a ChromaDB vector store.", es: "Pipeline RAG con recuperación híbrida sobre base vectorial ChromaDB." },
          { pt: "Orquestrador com fatos rápidos, geração por LLM, memória de conversa e fallback de busca externa.", en: "Orchestrator combining quick facts, LLM generation, conversation memory and external search fallback.", es: "Orquestador con datos rápidos, generación por LLM, memoria de conversación y fallback de búsqueda externa." },
          { pt: "Interface em React + Vite + TypeScript e testes com Pytest.", en: "React + Vite + TypeScript interface and Pytest tests.", es: "Interfaz en React + Vite + TypeScript y pruebas con Pytest." },
        ],
        repo: "https://github.com/doffyGC/UniBot",
        image: "img/projects/unibot.webp",
        alt: { pt: "Lista de contatos do Pampa Live Messenger: cursos e serviços da UNIPAMPA como contatos de chat", en: "Pampa Live Messenger contact list: UNIPAMPA courses and services as chat contacts", es: "Lista de contactos de Pampa Live Messenger: carreras y servicios de la UNIPAMPA como contactos de chat" },
      },
      {
        id: "scavenger",
        tier: "main",
        title: "Scavenger Project",
        subtitle: { pt: "Gestão de gincanas escolares", en: "School gymkhana management", es: "Gestión de gincanas escolares" },
        period: "2026",
        team: { pt: "8 devs", en: "8 devs", es: "8 devs" },
        stack: ["React", "Node.js", "Express", "MongoDB Atlas", "JWT"],
        desc: {
          pt: "Plataforma full-stack para gincanas escolares, implantada de verdade na Escola Demétrio Ribeiro: equipes, provas, penalidades, feedbacks e notificações.",
          en: "A full-stack platform for school gymkhanas, actually deployed at Escola Demétrio Ribeiro: teams, challenges, penalties, feedback and notifications.",
          es: "Plataforma full-stack para gincanas escolares, implantada de verdad en la Escuela Demétrio Ribeiro: equipos, pruebas, penalizaciones, feedback y notificaciones.",
        },
        bullets: [
          { pt: "Rotas protegidas por JWT e envio de e-mails transacionais.", en: "JWT-protected routes and transactional e-mails.", es: "Rutas protegidas por JWT y envío de correos transaccionales." },
          { pt: "Maior contribuidor (70 commits e 23 dos 26 PRs), com Git Flow e CI no GitHub Actions.", en: "Top contributor (70 commits and 23 of the 26 PRs), with Git Flow and CI on GitHub Actions.", es: "Mayor contribuidor (70 commits y 23 de los 26 PRs), con Git Flow y CI en GitHub Actions." },
        ],
        repo: "https://github.com/ScavengerProject/ScavengerProject-repo",
        demo: "https://drgincana.vercel.app",
        image: "img/projects/scavenger.webp",
        alt: { pt: "Painel do administrador do Scavenger Project com provas, equipes e ranking", en: "Scavenger Project admin dashboard with challenges, teams and ranking", es: "Panel del administrador de Scavenger Project con pruebas, equipos y ranking" },
      },
      {
        id: "petsaude",
        tier: "main",
        title: "PET-Saúde Tech IV",
        subtitle: { pt: "Comunicação de vacinação da Saúde de Jaguari", en: "Vaccination communication for Jaguari's health unit", es: "Comunicación de vacunación de la Salud de Jaguari" },
        period: "09/2025 — …",
        team: { pt: "Equipe de bolsistas", en: "Scholarship team", es: "Equipo de becarios" },
        stack: ["React", "NestJS", "GovBR-DS", "Docker"],
        desc: {
          pt: "Plataforma para a Secretaria de Saúde de Jaguari levar informações à população, começando pelo calendário de vacinação de gestantes e crianças.",
          en: "A platform for Jaguari's Health Department to reach the population with information, starting with the vaccination calendar for pregnant women and children.",
          es: "Plataforma para que la Secretaría de Salud de Jaguari lleve información a la población, empezando por el calendario de vacunación de embarazadas y niños.",
        },
        bullets: [
          { pt: "Interface com o design system do governo (GovBR-DS).", en: "Interface built on the Brazilian government design system (GovBR-DS).", es: "Interfaz con el design system del gobierno brasileño (GovBR-DS)." },
          { pt: "Em andamento: módulos de transporte de pacientes e de exames.", en: "In progress: patient transport and exams modules.", es: "En curso: módulos de transporte de pacientes y de exámenes." },
        ],
        repoPrivate: true,
      },
      {
        id: "graygoose",
        tier: "main",
        title: "Gray-GOOSE",
        subtitle: { pt: "ML explicável contra ataques na IEC 61850", en: "Explainable ML against IEC 61850 attacks", es: "ML explicable contra ataques en IEC 61850" },
        period: "08/2025 — 04/2026",
        team: { pt: "Pesquisa", en: "Research", es: "Investigación" },
        stack: ["Python", "scikit-learn", "SHAP", "Docker", "Jupyter"],
        desc: {
          pt: "Pipeline reprodutível que treina e avalia modelos de machine learning contra ataques grayhole DoS em tráfego GOOSE da norma IEC 61850.",
          en: "A reproducible pipeline that trains and evaluates machine learning models against grayhole DoS attacks on IEC 61850 GOOSE traffic.",
          es: "Pipeline reproducible que entrena y evalúa modelos de machine learning contra ataques grayhole DoS en tráfico GOOSE de la norma IEC 61850.",
        },
        bullets: [
          { pt: "Explicações com SHAP comparando execuções com e sem atributos delta.", en: "SHAP explanations comparing runs with and without delta features.", es: "Explicaciones con SHAP comparando ejecuciones con y sin atributos delta." },
          { pt: "Experimento inteiro em Docker: qualquer pesquisador reproduz os resultados com um comando.", en: "The whole experiment runs in Docker: any researcher can reproduce the results with one command.", es: "Todo el experimento en Docker: cualquier investigador reproduce los resultados con un comando." },
        ],
        repo: "https://github.com/doffyGC/explicability-GOOSE-research",
      },
      {
        id: "hit",
        tier: "side",
        title: { pt: "A Ciência por Trás do Hit", en: "The Science Behind the Hit", es: "La Ciencia Detrás del Hit" },
        subtitle: { pt: "Dashboard analítico de música", en: "Music analytics dashboard", es: "Dashboard analítico de música" },
        period: "06/2026 — 07/2026",
        stack: ["Python", "Pandas", "Streamlit", "Docker Compose"],
        desc: {
          pt: "Pipeline bronze/silver/gold sobre 2.000 faixas do Spotify (2000–2019) e um dashboard Streamlit que responde o que caracteriza um hit.",
          en: "A bronze/silver/gold pipeline over 2,000 Spotify tracks (2000–2019) and a Streamlit dashboard answering what makes a hit.",
          es: "Pipeline bronze/silver/gold sobre 2.000 canciones de Spotify (2000–2019) y un dashboard Streamlit que responde qué caracteriza a un hit.",
        },
        repo: "https://github.com/doffyGC/dashboard-icd",
        image: "img/projects/hit.webp",
        alt: { pt: "Visão geral do dashboard Streamlit com os indicadores do catálogo de músicas", en: "Streamlit dashboard overview with the music catalog indicators", es: "Vista general del dashboard Streamlit con los indicadores del catálogo de canciones" },
      },
      {
        id: "demeter",
        tier: "side",
        title: "Demeter",
        subtitle: { pt: "Marketplace de máquinas pesadas", en: "Heavy machinery marketplace", es: "Marketplace de maquinaria pesada" },
        period: "2025",
        stack: ["SvelteKit", "Node.js", "Express", "Firebase"],
        desc: {
          pt: "Aluguel de máquinas pesadas com fluxo de negociação modelado pelo padrão State, além de Builder e Decorator, chat, avaliações e notificações.",
          en: "Heavy machinery rental with a negotiation workflow modeled with the State pattern, plus Builder and Decorator, chat, reviews and notifications.",
          es: "Alquiler de maquinaria pesada con flujo de negociación modelado con el patrón State, además de Builder y Decorator, chat, reseñas y notificaciones.",
        },
        repoPrivate: true,
      },
      {
        id: "insightminer",
        tier: "side",
        title: "InsightMiner",
        subtitle: { pt: "Agente de análise de dados", en: "Data analysis agent", es: "Agente de análisis de datos" },
        period: "2026",
        stack: ["Python", { pt: "Agentes com LLM", en: "LLM agents", es: "Agentes con LLM" }],
        desc: {
          pt: "Agente de IA que explora datasets sozinho, gera insights e visualizações e responde perguntas em linguagem natural.",
          en: "An AI agent that explores datasets on its own, generates insights and charts, and answers questions in natural language.",
          es: "Agente de IA que explora datasets por su cuenta, genera insights y visualizaciones y responde preguntas en lenguaje natural.",
        },
        repo: "https://github.com/doffyGC/InsightMiner",
      },
      {
        id: "rea",
        tier: "side",
        title: { pt: "Recurso Educacional Aberto", en: "Open Educational Resource", es: "Recurso Educativo Abierto" },
        subtitle: { pt: "Acessibilidade e inclusão digital", en: "Accessibility and digital inclusion", es: "Accesibilidad e inclusión digital" },
        period: "2026",
        stack: ["JavaScript", "HTML5", "CSS3"],
        desc: {
          pt: "Material didático sobre acessibilidade na web, com simulador de leitor de tela e verificador de contraste.",
          en: "Teaching material on web accessibility, with a screen reader simulator and a contrast checker.",
          es: "Material didáctico sobre accesibilidad web, con simulador de lector de pantalla y verificador de contraste.",
        },
        repo: "https://github.com/doffyGC/Recurso-Educacional-Aberto",
        demo: "https://doffygc.github.io/Recurso-Educacional-Aberto/",
        image: "img/projects/rea.webp",
        alt: { pt: "Página inicial do recurso Documentos Digitais Acessíveis", en: "Home page of the Accessible Digital Documents resource", es: "Página inicial del recurso Documentos Digitales Accesibles" },
      },
      {
        id: "knapsack",
        tier: "side",
        title: "Multiple Knapsack Problem",
        subtitle: { pt: "Heurística específica", en: "Problem-specific heuristic", es: "Heurística específica" },
        period: "2025",
        stack: ["Python"],
        desc: {
          pt: "Heurística específica para o problema da mochila múltipla, desenvolvida para Teoria da Computação.",
          en: "A problem-specific heuristic for the multiple knapsack problem, built for a Theory of Computation course.",
          es: "Heurística específica para el problema de la mochila múltiple, desarrollada para Teoría de la Computación.",
        },
        repoPrivate: true,
      },
      {
        id: "mundthub",
        tier: "wip",
        title: "MundtHub",
        subtitle: { pt: "Gestão de colaboradores com IA explicável", en: "Workforce management with explainable AI", es: "Gestión de colaboradores con IA explicable" },
        period: "2026 — …",
        stack: [],
        desc: {
          pt: "Plataforma modular de gestão de colaboradores (ponto, RH, ausências e auditoria) com detecção de anomalias via IA explicável.",
          en: "A modular workforce management platform (time tracking, HR, absences and auditing) with anomaly detection through explainable AI.",
          es: "Plataforma modular de gestión de colaboradores (fichaje, RR. HH., ausencias y auditoría) con detección de anomalías mediante IA explicable.",
        },
        repo: "https://github.com/doffyGC/MundtHub",
      },
    ],
  },

  // ---------- Grimório ----------
  grimoire: {
    intro: {
      pt: "Os feitiços que eu estudo. Cada um aponta para onde ele já foi usado em batalha.",
      en: "The spells I study. Each one points to where it has already been used in battle.",
      es: "Los hechizos que estudio. Cada uno apunta a dónde ya se usó en batalla.",
    },
    usedIn: { pt: "Usado em", en: "Used in", es: "Usado en" },
    spells: [
      {
        icon: "◉",
        name: { pt: "IA Explicável (XAI)", en: "Explainable AI (XAI)", es: "IA Explicable (XAI)" },
        desc: { pt: "Fazer modelos de ML mostrarem por que tomaram uma decisão, para que dê para confiar (e corrigir) o que eles fazem.", en: "Making ML models show why they made a decision, so we can trust (and fix) what they do.", es: "Hacer que los modelos de ML muestren por qué tomaron una decisión, para poder confiar (y corregir) lo que hacen." },
        used: ["graygoose", "erenoai", "mundthub"],
      },
      {
        icon: "⛨",
        name: { pt: "Cibersegurança", en: "Cybersecurity", es: "Ciberseguridad" },
        desc: { pt: "Detecção de intrusão em subestações de energia: gerar ataques, medir o IDS e endurecer a defesa.", en: "Intrusion detection in power substations: generating attacks, measuring the IDS and hardening the defense.", es: "Detección de intrusos en subestaciones eléctricas: generar ataques, medir el IDS y endurecer la defensa." },
        used: ["ereno", "ereno2", "erenoai", "graygoose"],
      },
      {
        icon: "⌁",
        name: { pt: "Internet das Coisas", en: "Internet of Things", es: "Internet de las Cosas" },
        desc: { pt: "Redes industriais e smart grids: tráfego GOOSE, IEDs e a norma IEC 61850.", en: "Industrial networks and smart grids: GOOSE traffic, IEDs and the IEC 61850 standard.", es: "Redes industriales y smart grids: tráfico GOOSE, IEDs y la norma IEC 61850." },
        used: ["ereno", "ereno2", "graygoose"],
      },
      {
        icon: "✧",
        name: { pt: "IA Agêntica", en: "Agentic AI", es: "IA Agéntica" },
        desc: { pt: "Agentes com LLM que planejam, usam ferramentas e trabalham juntos: de assistentes RAG a times Red × Blue.", en: "LLM agents that plan, use tools and work together: from RAG assistants to Red × Blue teams.", es: "Agentes con LLM que planifican, usan herramientas y trabajan juntos: de asistentes RAG a equipos Red × Blue." },
        used: ["unibot", "erenoai", "insightminer"],
      },
    ],
  },

  // ---------- Conquistas (certificados) ----------
  certificates: [
    { icon: "🏆", title: { pt: "Desenvolvimento Web", en: "Web Development", es: "Desarrollo Web" }, issuer: "Udemy", date: "12/2022" },
    { icon: "🏆", title: { pt: "Machine Learning e Data Science", en: "Machine Learning & Data Science", es: "Machine Learning y Data Science" }, issuer: "Udemy", date: "12/2023" },
    { icon: "🏆", title: { pt: "Nivelação do Programa Residência em TIC", en: "ICT Residency Program Leveling", es: "Nivelación del Programa de Residencia en TIC" }, issuer: "BRISA", date: "01/2025" },
  ],

  // ---------- Contato ----------
  contact: {
    intro: {
      pt: "Procurando alguém para a sua party? Mande uma mensagem: respondo rápido.",
      en: "Looking for someone to join your party? Send a message: I reply fast.",
      es: "¿Buscas a alguien para tu grupo? Envía un mensaje: respondo rápido.",
    },
    name: { pt: "Seu nome", en: "Your name", es: "Tu nombre" },
    email: { pt: "Seu e-mail", en: "Your e-mail", es: "Tu correo" },
    message: { pt: "Mensagem", en: "Message", es: "Mensaje" },
    send: { pt: "Enviar", en: "Send", es: "Enviar" },
    sending: { pt: "Enviando…", en: "Sending…", es: "Enviando…" },
    sent: { pt: "Mensagem enviada! Obrigado, já já eu respondo.", en: "Message sent! Thanks, I'll reply soon.", es: "¡Mensaje enviado! Gracias, respondo pronto." },
    error: { pt: "Não deu para enviar. Tente pelo e-mail ao lado.", en: "Couldn't send it. Try the e-mail link instead.", es: "No se pudo enviar. Prueba con el correo." },
    mailtoNote: { pt: "Vai abrir o seu app de e-mail com a mensagem pronta.", en: "This will open your e-mail app with the message ready.", es: "Se abrirá tu app de correo con el mensaje listo." },
    links: { pt: "Ou me encontre em", en: "Or find me at", es: "O encuéntrame en" },
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
    zoom: { pt: "Ampliar imagem", en: "Enlarge image", es: "Ampliar imagen" },
    close: { pt: "Fechar", en: "Close", es: "Cerrar" },
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

  // ---------- Camada de jogo: XP e conquistas do visitante ----------
  game: {
    xpPerLevel: 100,
    // Quanto vale cada tipo de ação (cada ação só conta uma vez)
    xp: { visit: 10, quest: 8, skill: 3, cv: 30, contact: 60, theme: 5, sound: 5, lang: 10, secret: 40, start: 5, npc: 6, battle: 50, case: 25 },
    levelUp: { pt: "Level up!", en: "Level up!", es: "¡Subiste de nivel!" },
    levelUpText: { pt: "Você chegou ao Lv", en: "You reached Lv", es: "Llegaste al Lv" },
    unlocked: { pt: "Conquista desbloqueada", en: "Achievement unlocked", es: "Logro desbloqueado" },
    yours: { pt: "Suas conquistas nesta visita", en: "Your achievements on this visit", es: "Tus logros en esta visita" },
    yoursHint: { pt: "Explore o site para desbloquear. O progresso fica salvo no seu navegador.", en: "Explore the site to unlock them. Progress is saved in your browser.", es: "Explora el sitio para desbloquearlos. El progreso se guarda en tu navegador." },
    locked: { pt: "???", en: "???", es: "???" },
    reset: { pt: "Recomeçar progresso", en: "Reset progress", es: "Reiniciar progreso" },
    openPanel: { pt: "Ver suas conquistas", en: "See your achievements", es: "Ver tus logros" },
    achievements: [
      { id: "start", icon: "▶", name: { pt: "Press Start", en: "Press Start", es: "Press Start" }, desc: { pt: "Começou a aventura.", en: "Started the adventure.", es: "Empezaste la aventura." } },
      { id: "explorer", icon: "🗺", name: { pt: "Explorador(a)", en: "Explorer", es: "Explorador(a)" }, desc: { pt: "Visitou todas as seções.", en: "Visited every section.", es: "Visitaste todas las secciones." } },
      { id: "reader", icon: "📜", name: { pt: "Leitor(a) de quests", en: "Quest reader", es: "Lector(a) de misiones" }, desc: { pt: "Abriu os detalhes de 3 quests.", en: "Opened the details of 3 quests.", es: "Abriste los detalles de 3 misiones." } },
      { id: "scout", icon: "🔍", name: { pt: "Olheiro(a) de skills", en: "Skill scout", es: "Ojeador(a) de habilidades" }, desc: { pt: "Inspecionou 5 skills.", en: "Inspected 5 skills.", es: "Inspeccionaste 5 habilidades." } },
      { id: "save", icon: "💾", name: { pt: "Save file", en: "Save file", es: "Save file" }, desc: { pt: "Baixou o CV.", en: "Downloaded the CV.", es: "Descargaste el CV." } },
      { id: "party", icon: "🤝", name: { pt: "Convite para a party", en: "Party invite", es: "Invitación al grupo" }, desc: { pt: "Enviou uma mensagem.", en: "Sent a message.", es: "Enviaste un mensaje." } },
      { id: "theme", icon: "🌗", name: { pt: "Dia e noite", en: "Day and night", es: "Día y noche" }, desc: { pt: "Trocou o tema.", en: "Switched the theme.", es: "Cambiaste el tema." } },
      { id: "chiptune", icon: "🔊", name: { pt: "Chiptune", en: "Chiptune", es: "Chiptune" }, desc: { pt: "Ligou o som.", en: "Turned the sound on.", es: "Activaste el sonido." } },
      { id: "polyglot", icon: "🌐", name: { pt: "Poliglota", en: "Polyglot", es: "Políglota" }, desc: { pt: "Trocou de idioma.", en: "Switched languages.", es: "Cambiaste de idioma." } },
      { id: "npc", icon: "💬", name: { pt: "Papo com o UniBot", en: "Chat with UniBot", es: "Charla con UniBot" }, desc: { pt: "Fez 3 perguntas ao UniBot.", en: "Asked UniBot 3 questions.", es: "Le hiciste 3 preguntas a UniBot." } },
      { id: "lore", icon: "📖", name: { pt: "Leitor(a) de relatórios", en: "Lore reader", es: "Lector(a) de informes" }, desc: { pt: "Leu um estudo de caso inteiro.", en: "Read a full case study.", es: "Leíste un estudio de caso completo." } },
      { id: "debugger", icon: "🐞", name: { pt: "Debugger", en: "Debugger", es: "Debugger" }, desc: { pt: "Venceu os três bugs da Arena.", en: "Beat all three bugs in the Arena.", es: "Venciste los tres bugs de la Arena." } },
      { id: "lv5", icon: "⭐", name: { pt: "Veterano(a)", en: "Veteran", es: "Veterano(a)" }, desc: { pt: "Chegou ao Lv 5.", en: "Reached Lv 5.", es: "Llegaste al Lv 5." } },
      { id: "secret", icon: "🗝", secret: true, name: { pt: "Caçador(a) de segredos", en: "Secret hunter", es: "Cazador(a) de secretos" }, desc: { pt: "Achou um segredo escondido.", en: "Found a hidden secret.", es: "Encontraste un secreto escondido." } },
    ],
  },

  // ---------- Arena: batalha por turnos contra bugs ----------
  battle: {
    title: { pt: "Batalha contra bugs", en: "Bug battle", es: "Batalla contra bugs" },
    intro: {
      pt: "Três bugs invadiram o repositório. Use as skills da skill tree para derrotá-los em turnos. Cada bug tem uma fraqueza: descubra qual golpe é super efetivo contra ele.",
      en: "Three bugs have invaded the repository. Use skills from the skill tree to beat them in turns. Each bug has a weakness: find out which move is super effective against it.",
      es: "Tres bugs invadieron el repositorio. Usa las habilidades del árbol para vencerlos por turnos. Cada bug tiene una debilidad: descubre qué golpe es súper efectivo contra él.",
    },
    start: { pt: "Começar batalha", en: "Start battle", es: "Empezar batalla" },
    again: { pt: "Jogar de novo", en: "Play again", es: "Jugar de nuevo" },
    retry: { pt: "Continue?", en: "Continue?", es: "¿Continuar?" },
    wave: { pt: "Bug", en: "Bug", es: "Bug" },
    turns: { pt: "turnos", en: "turns", es: "turnos" },
    best: { pt: "Recorde", en: "Best", es: "Récord" },
    weakness: { pt: "Fraqueza", en: "Weakness", es: "Debilidad" },
    unknown: { pt: "???", en: "???", es: "???" },
    choose: { pt: "O que você vai fazer?", en: "What will you do?", es: "¿Qué vas a hacer?" },
    uses: { pt: "restam", en: "left", es: "quedan" },
    noMp: { pt: "MP insuficiente!", en: "Not enough MP!", es: "¡MP insuficiente!" },
    appears: { pt: "apareceu!", en: "appeared!", es: "¡apareció!" },
    used: { pt: "usou", en: "used", es: "usó" },
    damage: { pt: "de dano", en: "damage", es: "de daño" },
    healed: { pt: "recuperou", en: "recovered", es: "recuperó" },
    superEffective: { pt: "É super efetivo!", en: "It's super effective!", es: "¡Es súper efectivo!" },
    defeated: { pt: "foi corrigido!", en: "was fixed!", es: "¡fue corregido!" },
    win: { pt: "Vitória! Todos os bugs foram corrigidos.", en: "Victory! All bugs were fixed.", es: "¡Victoria! Todos los bugs fueron corregidos." },
    lose: { pt: "GAME OVER: os bugs foram para produção.", en: "GAME OVER: the bugs reached production.", es: "GAME OVER: los bugs llegaron a producción." },
    outro: {
      pt: "Na vida real os golpes são os mesmos: testes automatizados, Git Flow com pull requests e Docker para ambientes reprodutíveis.",
      en: "In real life the moves are the same: automated tests, Git Flow with pull requests and Docker for reproducible environments.",
      es: "En la vida real los golpes son los mismos: pruebas automatizadas, Git Flow con pull requests y Docker para entornos reproducibles.",
    },
    outroLink: { pt: "Ver a skill tree", en: "See the skill tree", es: "Ver el árbol" },
    // Equilibrado por simulação: quem segue as pistas das descrições quase sempre vence; quem joga no aleatório costuma perder
    player: { hp: 100, mp: 30, mpRegen: 3, between: { hp: 10, mp: 6 } },
    // power = dano base (varia ±2); heal = cura; uses = limite por batalha
    moves: [
      { id: "commit", icon: "⌨", name: "git commit", power: 10, mp: 0, desc: { pt: "Ataque básico. Pequeno, mas constante.", en: "Basic attack. Small but steady.", es: "Ataque básico. Pequeño pero constante." } },
      { id: "pytest", icon: "✓", name: "pytest", power: 16, mp: 6, desc: { pt: "Testes que acham o vazamento.", en: "Tests that find the leak.", es: "Pruebas que encuentran la fuga." } },
      { id: "rebase", icon: "⑂", name: "git rebase", power: 16, mp: 6, desc: { pt: "Reorganiza o histórico e resolve conflitos.", en: "Rewrites history and resolves conflicts.", es: "Reorganiza el historial y resuelve conflictos." } },
      { id: "rollback", icon: "↶", name: "docker rollback", power: 24, mp: 12, desc: { pt: "Volta para a imagem anterior em segundos.", en: "Restores the previous image in seconds.", es: "Vuelve a la imagen anterior en segundos." } },
      { id: "coffee", icon: "☕", name: { pt: "Café", en: "Coffee", es: "Café" }, heal: 30, mp: 0, uses: 2, desc: { pt: "Recupera 30 HP. Só 2 xícaras.", en: "Restores 30 HP. Only 2 cups.", es: "Recupera 30 HP. Solo 2 tazas." } },
    ],
    enemies: [
      {
        id: "leak",
        name: "Memory Leak",
        hp: 45,
        weak: "pytest",
        attacks: [
          { name: { pt: "consumiu sua RAM", en: "ate your RAM", es: "consumió tu RAM" }, power: 12 },
          { name: { pt: "travou o navegador", en: "froze the browser", es: "congeló el navegador" }, power: 14 },
        ],
        colors: { k: "#0d0b1f", g: "#5ee27a", d: "#1f9d4a", e: "#f4ecd8" },
        map: [
          "..k......k..",
          "...k....k...",
          "....kkkk....",
          "...kggggk...",
          "..kgegggek..",
          "..kggggggk..",
          ".kkggggggkk.",
          "k.kgddddgk.k",
          "..kgddddgk..",
          ".k.kggggk.k.",
          "k...kkkk...k",
          "............",
        ],
      },
      {
        id: "merge",
        name: "Merge Conflict",
        hp: 60,
        weak: "rebase",
        attacks: [
          { name: { pt: "jogou <<<<<<< HEAD no código", en: "dropped <<<<<<< HEAD in the code", es: "tiró <<<<<<< HEAD en el código" }, power: 14 },
          { name: { pt: "sobrescreveu seu trabalho", en: "overwrote your work", es: "sobrescribió tu trabajo" }, power: 17 },
        ],
        colors: { k: "#0d0b1f", r: "#ff5d7a", b: "#5aa9ff", e: "#f4ecd8" },
        map: [
          "..kkkkkkkk..",
          ".krrrrbbbbk.",
          "krrrrrbbbbbk",
          "krrerrbbebbk",
          "krrrrrbbbbbk",
          "krrkrkbkbbbk",
          "krrrrrbbbbbk",
          ".krrrrbbbbk.",
          "..kkkkkkkk..",
          "...kr..bk...",
          "..kk....kk..",
          "............",
        ],
      },
      {
        id: "friday",
        name: { pt: "Deploy na sexta às 18h", en: "Friday 6 PM Deploy", es: "Deploy el viernes a las 18h" },
        hp: 90,
        weak: "rollback",
        boss: true,
        attacks: [
          { name: { pt: "derrubou a produção", en: "took production down", es: "tiró producción" }, power: 20 },
          { name: { pt: "fez o cliente ligar", en: "made the client call", es: "hizo llamar al cliente" }, power: 16 },
          { name: { pt: "cancelou seu fim de semana", en: "cancelled your weekend", es: "canceló tu fin de semana" }, power: 23 },
        ],
        colors: { k: "#0d0b1f", d: "#ff5d7a", w: "#f4ecd8", y: "#ffd23f", o: "#ff7a3d" },
        map: [
          "..y..y..y...",
          ".yoy.yoy.yo.",
          "kkkkkkkkkkkk",
          "kddddddddddk",
          "kddddddddddk",
          "kwwwwwwwwwwk",
          "kwkkwwwwkkwk",
          "kwwwwwwwwwwk",
          "kwwkkkkkkwwk",
          "kwwwwwwwwwwk",
          "kkkkkkkkkkkk",
          "............",
        ],
      },
    ],
  },

  // ---------- Estudos de caso (textos fixos da página) ----------
  caseUi: {
    open: { pt: "Estudo de caso", en: "Case study", es: "Estudio de caso" },
    kicker: { pt: "Relatório da missão", en: "Mission report", es: "Informe de la misión" },
    back: { pt: "Voltar ao Quest Log", en: "Back to the Quest Log", es: "Volver al registro" },
    toc: { pt: "Nesta missão", en: "In this mission", es: "En esta misión" },
  },

  // ---------- Estudos de caso (conteúdo) ----------
  // Fatos verificados no GitHub (ScavengerProject-repo e ScavengerProject-doc) em 13/10/2026
  cases: {
    scavenger: {
      summary: {
        pt: "Uma plataforma full-stack que organiza uma gincana escolar de ponta a ponta (equipes, provas, resultados, penalidades e notificações) e que eu levei de projeto de disciplina para uso real numa escola, durante o estágio.",
        en: "A full-stack platform that runs a school gymkhana end to end (teams, challenges, results, penalties and notifications), which I took from a course project into real use at a school during my internship.",
        es: "Una plataforma full-stack que organiza una gincana escolar de principio a fin (equipos, pruebas, resultados, penalizaciones y notificaciones) y que llevé de proyecto de asignatura al uso real en una escuela, durante mis prácticas.",
      },
      facts: [
        { k: { pt: "Período", en: "Period", es: "Período" }, v: { pt: "08/2025 — 09/2026 · em produção desde 03/2026", en: "08/2025 — 09/2026 · in production since 03/2026", es: "08/2025 — 09/2026 · en producción desde 03/2026" } },
        { k: { pt: "Papel", en: "Role", es: "Rol" }, v: { pt: "Dev full-stack · maior contribuidor", en: "Full-stack dev · top contributor", es: "Dev full-stack · mayor contribuidor" } },
        { k: { pt: "Party", en: "Party", es: "Grupo" }, v: { pt: "8 desenvolvedores", en: "8 developers", es: "8 desarrolladores" } },
        { k: { pt: "Onde roda", en: "Runs on", es: "Dónde corre" }, v: "Vercel · Render · MongoDB Atlas" },
      ],
      stats: [
        { n: "70", label: { pt: "commits meus", en: "of my commits", es: "commits míos" } },
        { n: "23/26", label: { pt: "PRs abertos por mim", en: "PRs I opened", es: "PRs abiertos por mí" } },
        { n: "20", label: { pt: "modelos de dados", en: "data models", es: "modelos de datos" } },
        { n: "16", label: { pt: "deploys em produção", en: "production deploys", es: "deploys en producción" } },
      ],
      sections: [
        {
          id: "briefing",
          icon: "🗺",
          title: { pt: "Briefing: o problema", en: "Briefing: the problem", es: "Briefing: el problema" },
          body: [
            { p: { pt: "Uma gincana escolar envolve várias equipes, provas com regras próprias (quem pode participar, quantas vagas, quando começa), pontuação, penalidades e muita comunicação. Normalmente tudo isso vive em planilhas e grupos de mensagem, e quase sempre alguém fica sem saber o que está acontecendo.", en: "A school gymkhana involves several teams, challenges with their own rules (who can take part, how many spots, when they start), scoring, penalties and a lot of communication. Usually all of that lives in spreadsheets and chat groups, and someone is almost always left out of the loop.", es: "Una gincana escolar involucra varios equipos, pruebas con reglas propias (quién puede participar, cuántos cupos, cuándo empiezan), puntuación, penalizaciones y mucha comunicación. Normalmente todo eso vive en planillas y grupos de mensajes, y casi siempre alguien se queda sin saber qué pasa." } },
            { p: { pt: "A missão era um sistema em que cada pessoa acompanha a gincana em tempo real, com o que faz sentido para o seu perfil:", en: "The mission was a system where everyone follows the gymkhana in real time, seeing what makes sense for their role:", es: "La misión era un sistema en el que cada persona sigue la gincana en tiempo real, con lo que tiene sentido para su perfil:" } },
            {
              list: [
                { pt: "Administração da escola: cria gincanas, equipes e provas e lança resultados.", en: "School administration: creates gymkhanas, teams and challenges, and posts results.", es: "Administración de la escuela: crea gincanas, equipos y pruebas y publica resultados." },
                { pt: "Professores e coordenadores de equipe: definem quem participa de cada prova, pedem empréstimo de participantes e dão feedback.", en: "Teachers and team coordinators: choose who takes part in each challenge, request participant loans and give feedback.", es: "Profesores y coordinadores de equipo: definen quién participa en cada prueba, piden préstamo de participantes y dan feedback." },
                { pt: "Alunos e famílias: veem provas, ranking e notificações.", en: "Students and families: see challenges, ranking and notifications.", es: "Alumnos y familias: ven pruebas, ranking y notificaciones." },
              ],
            },
          ],
        },
        {
          id: "papel",
          icon: "⚔",
          title: { pt: "Meu papel na party", en: "My role in the party", es: "Mi rol en el grupo" },
          body: [
            { p: { pt: "Fui o maior contribuidor de código entre os oito desenvolvedores (70 commits, sem contar merges) e abri 23 dos 26 pull requests do repositório principal. Também fui quem colocou o sistema em produção e cuidou dele durante o estágio na escola.", en: "I was the top code contributor among the eight developers (70 commits, not counting merges) and opened 23 of the 26 pull requests in the main repository. I was also the one who put the system into production and looked after it during my internship at the school.", es: "Fui el mayor contribuidor de código entre los ocho desarrolladores (70 commits, sin contar merges) y abrí 23 de los 26 pull requests del repositorio principal. También fui quien puso el sistema en producción y lo cuidó durante mis prácticas en la escuela." } },
            {
              list: [
                { pt: "Deploy do front na Vercel e da API no Render, com bancos de produção e desenvolvimento separados no MongoDB Atlas.", en: "Deployed the front end on Vercel and the API on Render, with separate production and development databases on MongoDB Atlas.", es: "Deploy del front en Vercel y de la API en Render, con bases de producción y desarrollo separadas en MongoDB Atlas." },
                { pt: "Titulares e reservas por prova, auto-cadastro de alunos, códigos de convite e aprovação de vínculo.", en: "Starters and substitutes per challenge, student self-registration, invite codes and membership approval.", es: "Titulares y suplentes por prueba, auto-registro de alumnos, códigos de invitación y aprobación de vínculo." },
                { pt: "Notificações internas e por e-mail, com fila de envio.", en: "In-app and e-mail notifications, with a sending queue.", es: "Notificaciones internas y por correo, con cola de envío." },
                { pt: "A virada para várias gincanas e várias escolas no mesmo sistema (multi-tenant).", en: "The shift to multiple gymkhanas and multiple schools in the same system (multi-tenant).", es: "El paso a varias gincanas y varias escuelas en el mismo sistema (multi-tenant)." },
              ],
            },
            { img: "img/projects/scavenger.webp", alt: { pt: "Painel do administrador com provas, equipes e ranking", en: "Admin dashboard with challenges, teams and ranking", es: "Panel del administrador con pruebas, equipos y ranking" } },
          ],
        },
        {
          id: "mapa",
          icon: "🧭",
          title: { pt: "Mapa: a arquitetura", en: "Map: the architecture", es: "Mapa: la arquitectura" },
          body: [
            {
              flow: [
                { label: "React 19 + Vite", sub: { pt: "45 telas · Vercel", en: "45 screens · Vercel", es: "45 pantallas · Vercel" } },
                { label: "API Express 5", sub: { pt: "JWT · Render", en: "JWT · Render", es: "JWT · Render" } },
                { label: "MongoDB Atlas", sub: { pt: "20 modelos Mongoose", en: "20 Mongoose models", es: "20 modelos Mongoose" } },
                { label: "BullMQ + Redis", sub: { pt: "fila de e-mails", en: "e-mail queue", es: "cola de correos" } },
              ],
            },
            { p: { pt: "Toda requisição passa por uma cadeia de middlewares: proteger (valida o JWT) → resolverEscola → resolverGincana → autorizar (confere o perfil). É ela que garante que uma escola nunca enxergue os dados de outra.", en: "Every request goes through a middleware chain: proteger (checks the JWT) → resolverEscola → resolverGincana → autorizar (checks the role). That chain is what guarantees one school never sees another school's data.", es: "Cada petición pasa por una cadena de middlewares: proteger (valida el JWT) → resolverEscola → resolverGincana → autorizar (verifica el perfil). Esa cadena garantiza que una escuela nunca vea los datos de otra." } },
            { p: { pt: "As decisões importantes ficaram registradas em quatro ADRs: o worker de e-mail no mesmo processo da API, a fila BullMQ, a autenticação com JWT e o modelo de equipe por gincana.", en: "The key decisions are recorded in four ADRs: the e-mail worker in the same process as the API, the BullMQ queue, JWT authentication and the team-per-gymkhana model.", es: "Las decisiones importantes quedaron registradas en cuatro ADRs: el worker de correo en el mismo proceso de la API, la cola BullMQ, la autenticación con JWT y el modelo de equipo por gincana." } },
          ],
        },
        {
          id: "batalhas",
          icon: "🐉",
          title: { pt: "Batalhas: desafios e decisões", en: "Battles: challenges and decisions", es: "Batallas: desafíos y decisiones" },
          body: [
            { lead: { pt: "O e-mail que sumia em produção.", en: "The e-mail that vanished in production.", es: "El correo que desaparecía en producción." }, p: { pt: "No plano gratuito, o Render hiberna a API quando ela fica parada, e o worker de e-mail parava junto: as notificações simplesmente não saíam. A solução teve duas partes: os envios passaram por uma fila (BullMQ sobre Redis), para nada se perder, e criei um workflow no GitHub Actions que chama a rota /health a cada 10 minutos para a API não dormir.", en: "On the free plan, Render puts the API to sleep when it's idle, and the e-mail worker stopped with it: notifications just never went out. The fix had two parts: sending went through a queue (BullMQ on Redis), so nothing gets lost, and I created a GitHub Actions workflow that calls the /health route every 10 minutes so the API doesn't fall asleep.", es: "En el plan gratuito, Render hiberna la API cuando está inactiva, y el worker de correo se detenía con ella: las notificaciones simplemente no salían. La solución tuvo dos partes: los envíos pasaron por una cola (BullMQ sobre Redis), para que nada se pierda, y creé un workflow en GitHub Actions que llama a la ruta /health cada 10 minutos para que la API no se duerma." } },
            { lead: { pt: "De uma gincana para várias escolas.", en: "From one gymkhana to many schools.", es: "De una gincana a varias escuelas." }, p: { pt: "O sistema nasceu para uma gincana só. Para atender outras escolas, reorganizei os dados na hierarquia Escola → Gincana, com o isolamento feito nos middlewares, scripts de migração e um backup completo da produção antes de cada mudança de estrutura.", en: "The system was born for a single gymkhana. To serve other schools, I reorganized the data into a School → Gymkhana hierarchy, with isolation handled in the middlewares, migration scripts and a full production backup before every structural change.", es: "El sistema nació para una sola gincana. Para atender a otras escuelas, reorganicé los datos en la jerarquía Escuela → Gincana, con el aislamiento en los middlewares, scripts de migración y un backup completo de producción antes de cada cambio de estructura." } },
            { lead: { pt: "Regras que precisavam ser regras.", en: "Rules that had to be rules.", es: "Reglas que tenían que ser reglas." }, p: { pt: "O uso real mostrou atalhos que não deviam existir. Corrigi vários: o status da prova passou a seguir a data; um vínculo pendente só sai pela fila de aprovação; só o coordenador dá feedback; e há um limite de coordenadores por equipe. Também corrigi um loop de redirecionamento que prendia usuários com vínculo bloqueado.", en: "Real use exposed shortcuts that shouldn't exist. I fixed several: challenge status now follows the date; a pending membership can only leave through the approval queue; only coordinators give feedback; and there's a limit of coordinators per team. I also fixed a redirect loop that trapped users with a blocked membership.", es: "El uso real mostró atajos que no debían existir. Corregí varios: el estado de la prueba pasó a seguir la fecha; un vínculo pendiente solo sale por la cola de aprobación; solo el coordinador da feedback; y hay un límite de coordinadores por equipo. También corregí un bucle de redirección que atrapaba a usuarios con vínculo bloqueado." } },
          ],
        },
        {
          id: "testes",
          icon: "🧪",
          title: { pt: "Testes e qualidade", en: "Testing and quality", es: "Pruebas y calidad" },
          body: [
            {
              list: [
                { pt: "47 arquivos de teste automatizado: Jest, supertest e mongodb-memory-server na API, e Vitest com Testing Library no front.", en: "47 automated test files: Jest, supertest and mongodb-memory-server on the API, and Vitest with Testing Library on the front end.", es: "47 archivos de prueba automatizada: Jest, supertest y mongodb-memory-server en la API, y Vitest con Testing Library en el front." },
                { pt: "CI no GitHub Actions rodando testes e build a cada push (81 de 87 execuções com sucesso). O pipeline foi criado por um colega; eu subi os pisos mínimos de cobertura.", en: "CI on GitHub Actions running tests and the build on every push (81 of 87 runs successful). A teammate set up the pipeline; I raised the minimum coverage thresholds.", es: "CI en GitHub Actions corriendo pruebas y build en cada push (81 de 87 ejecuciones exitosas). Un compañero creó el pipeline; yo subí los pisos mínimos de cobertura." },
                { pt: "A equipe manteve também uma suíte E2E com Selenium, com 27 casos de teste (provas, equipes, ranking, funcionalidades, segurança e desempenho).", en: "The team also kept an E2E suite with Selenium, with 27 test cases (challenges, teams, ranking, features, security and performance).", es: "El equipo mantuvo también una suite E2E con Selenium, con 27 casos de prueba (pruebas, equipos, ranking, funcionalidades, seguridad y rendimiento)." },
              ],
            },
          ],
        },
        {
          id: "loot",
          icon: "💰",
          title: { pt: "Loot: o resultado", en: "Loot: the outcome", es: "Botín: el resultado" },
          body: [
            {
              list: [
                { pt: "Em produção desde março de 2026, com 16 deploys de produção até setembro.", en: "In production since March 2026, with 16 production deploys through September.", es: "En producción desde marzo de 2026, con 16 deploys de producción hasta septiembre." },
                { pt: "Usado de verdade por servidores e alunos da escola durante o meu estágio.", en: "Actually used by school staff and students during my internship.", es: "Usado de verdad por funcionarios y alumnos de la escuela durante mis prácticas." },
                { pt: "Pronto para mais de uma escola, com convites e aprovação de vínculo.", en: "Ready for more than one school, with invites and membership approval.", es: "Listo para más de una escuela, con invitaciones y aprobación de vínculo." },
                { pt: "Documentação de produto, arquitetura (ADRs) e um guia de instalação e deploy.", en: "Product and architecture documentation (ADRs), plus an installation and deploy guide.", es: "Documentación de producto, arquitectura (ADRs) y una guía de instalación y deploy." },
              ],
            },
          ],
        },
        {
          id: "xp",
          icon: "✨",
          title: { pt: "XP ganho: o que aprendi", en: "XP gained: what I learned", es: "XP ganada: lo que aprendí" },
          body: [
            {
              list: [
                { pt: "Colocar em produção muda o jogo: hibernação, e-mail, backup e migração de dados não aparecem no projeto de disciplina.", en: "Going to production changes the game: sleeping servers, e-mail, backups and data migrations never show up in a course project.", es: "Poner en producción cambia el juego: hibernación, correo, backups y migración de datos no aparecen en el proyecto de asignatura." },
                { pt: "Pensar em multi-tenant cedo sai mais barato do que reorganizar os dados depois.", en: "Thinking about multi-tenancy early is cheaper than reshaping the data later.", es: "Pensar en multi-tenant temprano sale más barato que reorganizar los datos después." },
                { pt: "Registrar decisões em ADRs ajuda quem chega depois, inclusive eu mesmo alguns meses depois.", en: "Recording decisions in ADRs helps whoever comes next, including me a few months later.", es: "Registrar decisiones en ADRs ayuda a quien llega después, incluso a mí mismo unos meses más tarde." },
              ],
            },
          ],
        },
      ],
    },
  },

  // ---------- Segredos ----------
  secrets: {
    crtOn: { pt: "Modo CRT ativado! Skin dourada desbloqueada.", en: "CRT mode on! Golden skin unlocked.", es: "¡Modo CRT activado! Skin dorada desbloqueada." },
    crtOff: { pt: "Modo CRT desligado.", en: "CRT mode off.", es: "Modo CRT desactivado." },
    konami: { pt: "Código Konami", en: "Konami code", es: "Código Konami" },
    bugLabel: { pt: "Um bug? Clique para corrigir", en: "A bug? Click to fix it", es: "¿Un bug? Haz clic para corregirlo" },
    bugFixed: { pt: "Bug do rodapé corrigido! Ninguém ia notar, mas você notou.", en: "Footer bug fixed! Nobody would notice, but you did.", es: "¡Bug del pie corregido! Nadie lo iba a notar, pero tú sí." },
    bugTitle: { pt: "Bug corrigido", en: "Bug fixed", es: "Bug corregido" },
    consoleTitle: { pt: "Console secreto", en: "Secret console", es: "Consola secreta" },
    consoleHi: {
      pt: "Olá, dev curioso(a)! Já que você abriu o DevTools: este site é HTML, CSS e JS puro, sem framework. Digite gm.secret() para pegar uma conquista.",
      en: "Hi, curious dev! Since you opened DevTools: this site is plain HTML, CSS and JS, no framework. Type gm.secret() to grab an achievement.",
      es: "¡Hola, dev curioso(a)! Ya que abriste DevTools: este sitio es HTML, CSS y JS puro, sin framework. Escribe gm.secret() para llevarte un logro.",
    },
    consoleReward: { pt: "🗝 Segredo encontrado! Agora me chama para uma entrevista: guilhermemundt2@gmail.com", en: "🗝 Secret found! Now invite me to an interview: guilhermemundt2@gmail.com", es: "🗝 ¡Secreto encontrado! Ahora invítame a una entrevista: guilhermemundt2@gmail.com" },
    consoleAgain: { pt: "Esse segredo você já pegou. 😉", en: "You already got this one. 😉", es: "Este secreto ya lo tienes. 😉" },
  },

  // ---------- NPC: UniBot ----------
  npc: {
    title: "Pampa Live Messenger",
    name: "UniBot",
    status: { pt: "Online · responde na hora", en: "Online · replies instantly", es: "En línea · responde al instante" },
    open: { pt: "Falar com o UniBot", en: "Talk to UniBot", es: "Hablar con UniBot" },
    close: { pt: "Fechar conversa", en: "Close chat", es: "Cerrar chat" },
    you: { pt: "Você", en: "You", es: "Tú" },
    pick: { pt: "Escolha uma pergunta:", en: "Pick a question:", es: "Elige una pregunta:" },
    skip: { pt: "Clique para pular", en: "Click to skip", es: "Haz clic para saltar" },
    hello: {
      pt: "Oi! Eu sou o UniBot. No mundo real eu respondo dúvidas sobre a UNIPAMPA; aqui, eu conto tudo sobre o Guilherme. O que você quer saber?",
      en: "Hi! I'm UniBot. In the real world I answer questions about UNIPAMPA; here, I tell you all about Guilherme. What do you want to know?",
      es: "¡Hola! Soy UniBot. En el mundo real respondo dudas sobre la UNIPAMPA; aquí, te cuento todo sobre Guilherme. ¿Qué quieres saber?",
    },
    questions: [
      {
        q: { pt: "Quem é o Guilherme?", en: "Who is Guilherme?", es: "¿Quién es Guilherme?" },
        a: {
          pt: "Um dev full-stack e de IA aplicada, no {lv}º semestre de Engenharia de Software da UNIPAMPA. Hoje ele é bolsista no PET-Saúde e estagiário numa escola, onde implantou um sistema de gincanas.",
          en: "A full-stack and applied AI developer in semester {lv} of Software Engineering at UNIPAMPA. Right now he's a scholarship developer at PET-Saúde and an intern at a school, where he deployed a gymkhana system.",
          es: "Un dev full-stack y de IA aplicada, en el {lv}º semestre de Ingeniería de Software en la UNIPAMPA. Hoy es becario en PET-Saúde y practicante en una escuela, donde implantó un sistema de gincanas.",
        },
        link: { href: "#ficha", label: { pt: "Abrir a ficha", en: "Open the sheet", es: "Abrir la hoja" } },
      },
      {
        q: { pt: "Ele está disponível para uma vaga?", en: "Is he available for a job?", es: "¿Está disponible para una vacante?" },
        a: {
          pt: "Sim! Ele procura uma vaga de desenvolvedor júnior ou web. Curte trabalho em equipe, Git Flow e pull requests bem descritos.",
          en: "Yes! He's looking for a junior or web developer role. He enjoys teamwork, Git Flow and well-described pull requests.",
          es: "¡Sí! Busca una vacante de desarrollador junior o web. Le gusta el trabajo en equipo, Git Flow y los pull requests bien descritos.",
        },
        link: { href: "#contato", label: { pt: "Recrutar para a party", en: "Recruit to the party", es: "Reclutar para el grupo" } },
      },
      {
        q: { pt: "Qual é o melhor projeto dele?", en: "What's his best project?", es: "¿Cuál es su mejor proyecto?" },
        a: {
          pt: "Eu sou suspeito para falar, porque o melhor sou eu. 😄 Fora isso, o Scavenger Project está em uso real numa escola, e a Raid do ERENO junta pesquisa, cibersegurança e IA explicável.",
          en: "I'm biased, because the best one is me. 😄 Apart from that, Scavenger Project is in real use at a school, and the ERENO raid mixes research, cybersecurity and explainable AI.",
          es: "No soy imparcial, porque el mejor soy yo. 😄 Aparte de eso, Scavenger Project se usa de verdad en una escuela, y la Raid de ERENO junta investigación, ciberseguridad e IA explicable.",
        },
        link: { href: "#quests", label: { pt: "Abrir o Quest Log", en: "Open the Quest Log", es: "Abrir el registro" } },
      },
      {
        q: { pt: "O que é esse tal de ERENO?", en: "What's this ERENO thing?", es: "¿Qué es eso de ERENO?" },
        a: {
          pt: "Um gerador de tráfego de rede de subestações de energia (IEC 61850 / GOOSE). Com ele dá para criar ataques de mentirinha e treinar sistemas que detectam intrusos de verdade.",
          en: "A network traffic generator for power substations (IEC 61850 / GOOSE). With it you can create make-believe attacks and train systems that detect real intruders.",
          es: "Un generador de tráfico de red de subestaciones eléctricas (IEC 61850 / GOOSE). Con él se crean ataques de mentira para entrenar sistemas que detectan intrusos de verdad.",
        },
        link: { href: "#raid", label: { pt: "Entrar na Raid", en: "Enter the Raid", es: "Entrar en la Raid" } },
      },
      {
        q: { pt: "Quais tecnologias ele usa?", en: "Which technologies does he use?", es: "¿Qué tecnologías usa?" },
        a: {
          pt: "No dia a dia: React, Node.js, NestJS e TypeScript na web; Python, FastAPI, RAG e agentes com LLM na IA; Docker para empacotar tudo.",
          en: "Day to day: React, Node.js, NestJS and TypeScript on the web; Python, FastAPI, RAG and LLM agents for AI; Docker to package it all.",
          es: "En el día a día: React, Node.js, NestJS y TypeScript en la web; Python, FastAPI, RAG y agentes con LLM en IA; Docker para empaquetarlo todo.",
        },
        link: { href: "#skills", label: { pt: "Ver a skill tree", en: "See the skill tree", es: "Ver el árbol" } },
      },
      {
        q: { pt: "Tem algum segredo neste site?", en: "Are there secrets on this site?", es: "¿Hay secretos en este sitio?" },
        a: {
          pt: "Dizem que os códigos antigos ainda funcionam por aqui... ↑ ↑ ↓ ↓ ← → ← → B A. E que um bug mora no rodapé. Mas você não ouviu isso de mim. 🤫",
          en: "They say the old codes still work around here... ↑ ↑ ↓ ↓ ← → ← → B A. And that a bug lives in the footer. But you didn't hear it from me. 🤫",
          es: "Dicen que los códigos antiguos todavía funcionan por aquí... ↑ ↑ ↓ ↓ ← → ← → B A. Y que un bug vive en el pie de página. Pero no lo escuchaste de mí. 🤫",
        },
      },
      {
        q: { pt: "Como eu falo com ele?", en: "How do I reach him?", es: "¿Cómo lo contacto?" },
        a: {
          pt: "Pelo formulário aqui do site, pelo e-mail guilhermemundt2@gmail.com ou pelo LinkedIn. Ele responde rápido!",
          en: "Through the form on this site, by e-mail at guilhermemundt2@gmail.com or on LinkedIn. He replies fast!",
          es: "Por el formulario de este sitio, por correo a guilhermemundt2@gmail.com o por LinkedIn. ¡Responde rápido!",
        },
        link: { href: "#contato", label: { pt: "Ir para o contato", en: "Go to contact", es: "Ir al contacto" } },
      },
    ],
  },

  // ---------- Diário de bordo (GitHub) ----------
  diary: {
    user: "doffyGC",
    intro: { pt: "O que eu andei commitando nos repositórios públicos, direto da API do GitHub.", en: "What I've been committing to public repositories, straight from the GitHub API.", es: "Lo que he estado commiteando en repositorios públicos, directo desde la API de GitHub." },
    loading: { pt: "Carregando o diário…", en: "Loading the logbook…", es: "Cargando la bitácora…" },
    error: { pt: "Não deu para carregar agora. Veja direto no GitHub:", en: "Couldn't load it right now. See it on GitHub:", es: "No se pudo cargar ahora. Míralo en GitHub:" },
    empty: { pt: "Nenhuma atividade pública recente.", en: "No recent public activity.", es: "Sin actividad pública reciente." },
    recentCommits: { pt: "Atividade recente", en: "Recent activity", es: "Actividad reciente" },
    // Rótulos de cada tipo de evento da API ({n} = quantidade)
    events: {
      push: { pt: "push em", en: "pushed to", es: "push en" },
      pushes: { pt: "{n} pushes em", en: "{n} pushes to", es: "{n} pushes en" },
      prOpened: { pt: "abriu o PR", en: "opened PR", es: "abrió el PR" },
      prClosed: { pt: "fechou o PR", en: "closed PR", es: "cerró el PR" },
      issueOpened: { pt: "abriu a issue", en: "opened issue", es: "abrió la issue" },
      issueClosed: { pt: "fechou a issue", en: "closed issue", es: "cerró la issue" },
      branch: { pt: "criou a branch", en: "created branch", es: "creó la rama" },
      repo: { pt: "criou o repositório", en: "created repository", es: "creó el repositorio" },
      public: { pt: "tornou público", en: "made public", es: "hizo público" },
      star: { pt: "deu estrela em", en: "starred", es: "dio estrella a" },
      in: { pt: "em", en: "in", es: "en" },
    },
    recentRepos: { pt: "Repos atualizados", en: "Updated repos", es: "Repos actualizados" },
    seeAll: { pt: "Ver perfil no GitHub", en: "See GitHub profile", es: "Ver perfil en GitHub" },
    ago: {
      pt: { now: "agora", m: "min", h: "h", d: "d", prefix: "há ", suffix: "" },
      en: { now: "now", m: "min", h: "h", d: "d", prefix: "", suffix: " ago" },
      es: { now: "ahora", m: "min", h: "h", d: "d", prefix: "hace ", suffix: "" },
    },
  },

  languages: [
    { code: "pt", label: "PT", name: "Português", path: "" },
    { code: "en", label: "EN", name: "English", path: "en/" },
    { code: "es", label: "ES", name: "Español", path: "es/" },
  ],
};
