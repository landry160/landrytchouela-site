// SEUL fichier à modifier pour mettre le site à jour.
// Chaque texte existe en français (fr) et en anglais (en).

export const site = {
  url: 'https://landrytchouela.com',
  updated: { fr: 'novembre 2026', en: 'November 2026' },
  email: 'junior.landry.tchuente.tchouela@usherbrooke.ca',
  linkedin: 'https://www.linkedin.com/in/landrytchouela/',
  github: 'https://github.com/landry160',
  availability: { fr: 'Disponible pour un stage à l’été 2027', en: 'Available for a summer 2027 internship' },
  thesis: { fr: 'Du capteur à l’IA, je bâtis le logiciel entre les deux.', en: 'From sensor to AI, I build the software in between.' },
  intro: {
    fr: 'Étudiant en génie informatique à l’Université de Sherbrooke. Je suis présentement stagiaire en développement logiciel chez Intelligence Industrielle, à Montréal, où je développe des applications et des fonctions d’IA générative pour le secteur manufacturier.',
    en: 'Computer engineering student at Université de Sherbrooke. I am currently a software development intern at Intelligence Industrielle in Montréal, building applications and generative AI features for the manufacturing sector.',
  },
};

export const jobs = [
  {
    company: 'Intelligence Industrielle', current: true,
    when: { fr: 'Sept. – déc. 2026', en: 'Sept. – Dec. 2026' },
    role: { fr: 'Stagiaire en développement logiciel', en: 'Software Development Intern' },
    place: 'Montréal',
    points: [
      { fr: 'Développement de fonctionnalités full-stack pour des applications du secteur manufacturier, avec React, Node.js/Express et MongoDB.', en: 'Developing full-stack features for applications serving the manufacturing sector, using React, Node.js/Express and MongoDB.' },
      { fr: 'Conception et intégration d’API REST et de fonctions d’IA générative dans ces applications.', en: 'Designing and integrating REST APIs and generative AI capabilities into these applications.' },
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'REST', { fr: 'IA générative', en: 'Generative AI' }],
  },
  {
    company: 'Thales', detail: 'TRT / TDS',
    when: { fr: 'Sept. – déc. 2025', en: 'Sept. – Dec. 2025' },
    role: { fr: 'Stagiaire en développement logiciel', en: 'Software Development Intern' },
    place: 'Québec',
    points: [
      { fr: 'Conception, programmation et tests de services backend et d’applications console et web.', en: 'Designed, programmed and tested backend services and console and web applications.' },
      { fr: 'Développement et maintenance de composants soutenant la chaîne MLOps du groupe.', en: 'Developed and maintained software components supporting the group’s MLOps pipeline.' },
      { fr: 'Tests unitaires et d’intégration pour valider la fiabilité et la conformité des solutions, en équipe Agile.', en: 'Wrote unit and integration tests to validate reliability and compliance, working in an Agile team.' },
    ],
    tags: ['Backend', 'MLOps', { fr: 'Tests', en: 'Testing' }, 'Agile'],
  },
  {
    company: 'GE Aerospace',
    when: { fr: 'Janv. – avr. 2025', en: 'Jan. – Apr. 2025' },
    role: { fr: 'Stagiaire en robotique et programmation', en: 'Robotics & Programming Intern' },
    place: 'Bromont',
    points: [
      { fr: 'Programmation d’interfaces humain-machine et de modules de contrôle en C# avec WPF pour la robotique industrielle.', en: 'Programmed human-machine interfaces and control modules in C# with WPF for industrial robotics.' },
      { fr: 'Contribution à des projets de vision artificielle (HDevelop) pour le positionnement précis des pièces et la détection d’erreurs.', en: 'Contributed to machine vision projects (HDevelop) for precise part positioning and error detection.' },
      { fr: 'Prototypage et essais en atelier avec des robots FANUC.', en: 'Prototyped and tested solutions on the shop floor with FANUC robots.' },
    ],
    tags: ['C#', 'WPF', 'HDevelop', 'FANUC'],
  },
  {
    company: 'Iridis Technologies',
    when: { fr: 'Juin – août 2024', en: 'June – Aug. 2024' },
    role: { fr: 'Stagiaire en optoélectronique et développeur logiciel', en: 'Optoelectronics & Software Developer Intern' },
    place: 'Montréal',
    points: [
      { fr: 'Outils en Python, Qt et LabVIEW pour traiter et analyser des données spectrales et des images THz.', en: 'Built Python, Qt and LabVIEW tools to process and analyze spectral and THz image data.' },
      { fr: 'Collaboration avec le laboratoire d’optoélectronique de l’ÉTS sur la détection de contaminants plastiques dans les aliments par ondes THz.', en: 'Collaborated with the ÉTS optoelectronics lab on detecting plastic contaminants in food with THz waves.' },
    ],
    tags: ['Python', 'Qt', 'LabVIEW', 'THz'],
  },
  {
    company: 'Randstad',
    when: { fr: 'Mai 2022 – août 2023', en: 'May 2022 – Aug. 2023' },
    role: { fr: 'Stagiaire bilingue en assistance technique', en: 'Bilingual Technical Support Intern' },
    place: 'Montréal',
    points: [
      { fr: 'Diagnostic de problèmes logiciels et matériels sur plusieurs canaux et suivi des incidents jusqu’à leur résolution.', en: 'Diagnosed software and hardware issues across support channels and followed incidents through to resolution.' },
    ],
    tags: [{ fr: 'Soutien technique', en: 'Technical support' }],
  },
];

export const flagship = {
  name: 'Performia',
  status: { fr: 'En cours', en: 'In progress' },
  kicker: { fr: 'Projet de maîtrise en conception, Équipe 29', en: 'Capstone design project, Team 29' },
  summary: {
    fr: 'Une machine fixe d’entraînement au traîneau, avec résistance électromagnétique ajustable et suivi de la performance en temps réel. Je suis chef d’équipe et responsable du sous-système informatique : architecture logicielle, acquisition des capteurs de force, communication entre sous-systèmes et interface tactile.',
    en: 'A stationary sled training machine with adjustable electromagnetic resistance and real-time performance tracking. I lead the team and own the software subsystem: architecture, force sensor acquisition, communication between subsystems and the touchscreen interface.',
  },
  metrics: [
    { v: '~18', u: 'kbit/s', l: { fr: 'de débit utile', en: 'useful throughput' } },
    { v: '5', l: { fr: 'phases de protocole', en: 'protocol phases' } },
    { v: '5', l: { fr: 'tâches sur 2 cœurs', en: 'tasks on 2 cores' } },
    { v: '7', l: { fr: 'membres dans l’équipe', en: 'team members' } },
  ],
  fixedTitle: { fr: 'Bogues réels résolus', en: 'Real bugs I fixed' },
  fixed: [
    { fr: 'Plantage du watchdog : le Core 0 était affamé par le bit-banging.', en: 'Watchdog crash: bit-banging was starving Core 0.' },
    { fr: 'Désalignement de phase dans PHY_RX, causé par la latence des interruptions.', en: 'Phase misalignment in PHY_RX caused by interrupt latency.' },
    { fr: 'Préambule erroné : huit bits à zéro au lieu du motif alterné 0x55.', en: 'Wrong preamble: eight zero bits instead of the alternating 0x55 pattern.' },
  ],
  tags: ['ESP32', 'FreeRTOS', 'Manchester', 'CRC16', 'ARQ', 'HX711', 'Nextion'],
};

export const projects = [
  {
    name: 'Industrial RAG Assistant', tone: 'violet',
    status: { fr: 'En développement', en: 'In development' },
    desc: {
      fr: 'Une application qui répond aux questions techniques à partir de manuels, de procédures et de fiches techniques, en citant les passages sources.',
      en: 'An app that answers technical questions from manuals, procedures and datasheets, with citations to the source passages.',
    },
    tags: ['Next.js', 'FastAPI', 'pgvector', 'Docker'],
    link: { href: 'https://github.com/landry160/industrial-rag-assistant', label: { fr: 'Voir le dépôt GitHub', en: 'View the GitHub repo' } },
  },
  {
    name: 'GeoForce', tone: 'green',
    status: { fr: 'Projet universitaire', en: 'University project' },
    desc: {
      fr: 'Un système IoT distribué de suivi de présence : un ESP32 scanne des balises iBeacon, les événements passent par MQTT, puis sont archivés et affichés dans une interface Angular.',
      en: 'A distributed IoT presence tracker: an ESP32 scans iBeacons, events flow through MQTT, then get archived and shown in an Angular interface.',
    },
    tags: ['BLE', 'MQTT', 'CoAP', 'Node.js', 'Angular'],
  },
  {
    name: 'Mini-Machine', tone: 'slate',
    status: { fr: 'Projet personnel', en: 'Personal project' },
    desc: {
      fr: 'Un système d’analyse vidéo et audio : détection de personnes et de mouvement, analyse de contexte, score de risque, journal d’événements et mémoire contextuelle.',
      en: 'A video and audio analysis system: person and motion detection, context analysis, risk scoring, event logging and contextual memory.',
    },
    tags: ['Python', 'OpenCV', 'Streamlit'],
  },
];

export const others = [
  {
    name: { fr: 'Mesure de très hautes températures', en: 'High-temperature measurement system' },
    when: { fr: 'Projet universitaire', en: 'University project' },
    desc: { fr: 'Mesure jusqu’à 1420 °C par thermocouples J, K et S, compensation de soudure froide et transmission Wi-Fi par ESP32.', en: 'Measurement up to 1420 °C with type J, K and S thermocouples, cold junction compensation and ESP32 Wi-Fi transmission.' },
  },
  {
    name: { fr: 'Organisateur de fichiers', en: 'File organizer' },
    when: { fr: 'Janv. – févr. 2025', en: 'Jan. – Feb. 2025' },
    desc: { fr: 'Application Python et Tkinter pour classer, trier et gérer des fichiers depuis une interface graphique.', en: 'Python and Tkinter app to categorize, sort and manage files from a graphical interface.' },
  },
  {
    name: 'CovéoBlitz',
    when: { fr: 'Janv. 2025', en: 'Jan. 2025' },
    desc: { fr: 'Compétition de programmation : participation à la conception d’un jeu en C#, sous contrainte de temps.', en: 'Programming competition: took part in designing and building a game in C# under time constraints.' },
  },
  {
    name: { fr: 'Plateforme e-commerce de livres', en: 'Online bookstore platform' },
    when: { fr: 'Sept. – déc. 2022', en: 'Sept. – Dec. 2022' },
    desc: { fr: 'Gestion des utilisateurs, des livres et des commandes en C#, avec paiement par Stripe.', en: 'User, book and order management in C#, with Stripe payments.' },
  },
];

// La chaîne : l'ordre est le vrai parcours d'une donnée, du capteur au produit.
export const chain = [
  { icon: 'cpu', title: { fr: 'Capter', en: 'Sense' }, text: { fr: 'Firmware et temps réel', en: 'Firmware and real time' }, items: ['C', 'C++', 'ESP32', 'FreeRTOS', 'HX711', 'VHDL'] },
  { icon: 'radio-tower', title: { fr: 'Transmettre', en: 'Transmit' }, text: { fr: 'Protocoles et API', en: 'Protocols and APIs' }, items: ['MQTT', 'CoAP', 'BLE', 'UART', 'REST', 'Go'] },
  { icon: 'database', title: { fr: 'Structurer', en: 'Structure' }, text: { fr: 'Données et traitement', en: 'Data and processing' }, items: ['Python', 'SQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Java'] },
  { icon: 'brain-circuit', title: { fr: 'Comprendre', en: 'Understand' }, text: { fr: 'IA et vision', en: 'AI and vision' }, items: ['RAG', 'pgvector', 'MLOps', 'OpenCV', 'HDevelop', { fr: 'IA générative', en: 'Generative AI' }] },
  { icon: 'layout-dashboard', title: { fr: 'Livrer', en: 'Ship' }, text: { fr: 'Produit et déploiement', en: 'Product and delivery' }, items: ['TypeScript', 'React', 'Next.js', 'Angular', 'Vue.js', 'Node.js', 'FastAPI', 'C#', 'WPF', 'Docker'] },
];

export const toolbox = {
  fr: 'Git, GitHub, GitLab, Linux, Windows, Active Directory, Visual Studio, VS Code, IntelliJ, PyCharm, Android Studio, Qt, LabVIEW, VirtualBox, SolidWorks, Altium, LTspice, AutoCAD, Bash, HTML, CSS',
  en: 'Git, GitHub, GitLab, Linux, Windows, Active Directory, Visual Studio, VS Code, IntelliJ, PyCharm, Android Studio, Qt, LabVIEW, VirtualBox, SolidWorks, Altium, LTspice, AutoCAD, Bash, HTML, CSS',
};

export const about = {
  title: { fr: 'Le terrain d’abord', en: 'Hands-on first' },
  body: [
    { fr: 'J’ai commencé par le soutien technique. J’ai ensuite collaboré avec un laboratoire d’optoélectronique, programmé des robots en atelier et travaillé sur une chaîne MLOps. Aujourd’hui, je développe des applications et des fonctions d’IA générative pour le secteur manufacturier.', en: 'I started in technical support. I then worked with an optoelectronics lab, programmed robots on the shop floor and contributed to an MLOps pipeline. Today I build applications and generative AI features for the manufacturing sector.' },
    { fr: 'Chaque étape m’a appris la même chose : un logiciel n’a de valeur que s’il tient sur le terrain. Je veux comprendre le problème, choisir l’architecture, bâtir la solution et expliquer clairement ce que j’ai fait.', en: 'Each step taught me the same thing: software only has value if it holds up in the field. I want to understand the problem, choose the architecture, build the solution and explain clearly what I did.' },
  ],
  facts: [
    { k: { fr: 'Formation', en: 'Education' }, v: { fr: 'Baccalauréat en génie informatique, régime coopératif, Université de Sherbrooke (fin prévue en déc. 2027)', en: 'B.Eng. in Computer Engineering, co-op program, Université de Sherbrooke (expected Dec. 2027)' } },
    { k: { fr: 'Avant', en: 'Before' }, v: { fr: 'DEC en techniques de l’informatique, Cégep de Granby (2023)', en: 'DEC in Computer Science Technology, Cégep de Granby (2023)' } },
    { k: { fr: 'Leadership', en: 'Leadership' }, v: { fr: 'Chef de l’Équipe 29 (7 personnes) et chef de quart chez McDonald’s depuis 2020, avec des équipes de 5 à 20 personnes', en: 'Lead of Team 29 (7 people) and shift manager at McDonald’s since 2020, with teams of 5 to 20 people' } },
    { k: { fr: 'Distinction', en: 'Award' }, v: { fr: 'Bourse de la Commission des partenaires du marché du travail (2022)', en: 'Commission des partenaires du marché du travail scholarship (2022)' } },
    { k: { fr: 'Langues', en: 'Languages' }, v: { fr: 'Français (langue maternelle), anglais technique (immersion à l’Université Brock, 2021)', en: 'French (native), technical English (immersion at Brock University, 2021)' } },
    { k: { fr: 'En dehors du code', en: 'Outside of code' }, v: { fr: 'Soccer, guitare, musculation et cybersécurité', en: 'Soccer, guitar, weight training and cybersecurity' } },
  ],
};

export const nav = [
  { id: 'projets', icon: 'boxes', label: { fr: 'Projets', en: 'Projects' } },
  { id: 'parcours', icon: 'route', label: { fr: 'Parcours', en: 'Experience' } },
  { id: 'competences', icon: 'workflow', label: { fr: 'Compétences', en: 'Skills' } },
  { id: 'apropos', icon: 'user-round', label: { fr: 'À propos', en: 'About' } },
  { id: 'contact', icon: 'mail', label: { fr: 'Contact', en: 'Contact' } },
];

// Études de cas : uniquement des faits vérifiés, jamais de résultat inventé.
export const cases = {
  Performia: {
    id: 'performia', tone: 'orange',
    context: { fr: 'La machine doit mesurer la force de l’athlète et ajuster la résistance en temps réel, pendant que plusieurs sous-systèmes échangent des données sans en perdre.', en: 'The machine has to measure the athlete’s force and adjust resistance in real time, while several subsystems exchange data without losing any.' },
    flow: [
      { t: { fr: 'Capteurs de force', en: 'Force sensors' }, d: 'HX711' },
      { t: 'ESP32', d: { fr: 'FreeRTOS, 5 tâches sur 2 cœurs', en: 'FreeRTOS, 5 tasks on 2 cores' } },
      { t: { fr: 'Lien de données', en: 'Data link' }, d: 'Manchester, CRC16, ARQ' },
      { t: { fr: 'Écran tactile', en: 'Touchscreen' }, d: 'Nextion, UART' },
    ],
    decisions: [
      { fr: 'Déporter le rendu graphique sur l’écran Nextion pour ne pas surcharger l’ESP32, qui gère déjà les capteurs et la boucle de contrôle.', en: 'Offload graphics rendering to the Nextion screen so the ESP32, already running the sensors and control loop, is not overloaded.' },
      { fr: 'Protocole en cinq phases : initialisation, flux continu, détection de fautes, retransmission et fermeture.', en: 'Five-phase protocol: initialization, continuous flow, fault detection, retransmission and closure.' },
      { fr: 'Code de remplacement basé sur RMT pour les tâches PHY_TX et PHY_RX.', en: 'RMT-based replacement code for the PHY_TX and PHY_RX tasks.' },
    ],
    outcome: { fr: 'Débit utile calculé d’environ 18 kbit/s. Le projet est toujours en cours.', en: 'Calculated useful throughput of about 18 kbit/s. The project is still in progress.' },
  },
  'Industrial RAG Assistant': {
    id: 'rag', tone: 'violet',
    context: { fr: 'Dans une usine, la réponse existe souvent déjà, mais elle est perdue dans des manuels, des procédures de maintenance et des fiches techniques. L’assistant doit répondre en montrant ses sources.', en: 'In a factory, the answer often already exists, but it is buried in manuals, maintenance procedures and datasheets. The assistant has to answer and show its sources.' },
    flow: [
      { t: 'Documents', d: { fr: 'Manuels, procédures, fiches', en: 'Manuals, procedures, datasheets' } },
      { t: { fr: 'Ingestion', en: 'Ingestion' }, d: 'FastAPI' },
      { t: { fr: 'Recherche vectorielle', en: 'Vector search' }, d: 'PostgreSQL, pgvector' },
      { t: { fr: 'Réponse citée', en: 'Cited answer' }, d: 'Next.js' },
    ],
    decisions: [
      { fr: 'Définir d’abord les frontières des services, le modèle de données et les contrats d’API v1 : ingest, ask et health.', en: 'Define service boundaries, the data model and the v1 API contracts first: ingest, ask and health.' },
      { fr: 'Faire tourner tous les services avec Docker Compose.', en: 'Run all services through Docker Compose.' },
      { fr: 'Rendre chaque réponse vérifiable en citant les passages sources.', en: 'Make every answer verifiable by citing its source passages.' },
    ],
    outcome: { fr: 'Le pipeline d’ingestion, de recherche et de génération citée est en cours de développement. Le déploiement est visé pour décembre 2026.', en: 'The ingestion, retrieval and cited-generation pipeline is in development. Deployment is targeted for December 2026.' },
  },
  GeoForce: {
    id: 'geoforce', tone: 'green',
    context: { fr: 'Suivre la présence des employés à partir de balises iBeacon, avec des services séparés pour le relais, l’archive et le contrôle.', en: 'Track employee presence from iBeacons, with separate services for relay, archiving and control.' },
    flow: [
      { t: 'ESP32', d: { fr: 'Scan BLE des balises', en: 'BLE beacon scan' } },
      { t: { fr: 'Relais', en: 'Relay' }, d: 'Node.js, MQTT' },
      { t: 'Archive', d: 'SQLite, HTTP' },
      { t: { fr: 'Interface', en: 'Interface' }, d: 'Angular' },
    ],
    decisions: [
      { fr: 'Publier les arrivées et les départs sur un broker MQTT pour découpler le capteur de l’archive.', en: 'Publish arrivals and departures to an MQTT broker to decouple the sensor from the archive.' },
      { fr: 'Piloter une DEL à distance depuis l’interface, par un service de contrôle qui parle CoAP à l’ESP32.', en: 'Control an LED remotely from the interface, through a control service that speaks CoAP to the ESP32.' },
    ],
    challenges: [
      { fr: 'Rôles CoAP inversés : l’ESP32 devait être le serveur et le service de contrôle, le client.', en: 'Inverted CoAP roles: the ESP32 had to be the server and the control service the client.' },
      { fr: 'Chargement de Zone.js et erreurs de détection de changements dans Angular.', en: 'Zone.js loading and change detection errors in Angular.' },
    ],
  },
  'Mini-Machine': {
    id: 'minimachine', tone: 'slate',
    context: { fr: 'Un projet personnel pour explorer comment combiner plusieurs signaux afin d’interpréter une scène, plutôt que de se limiter à une seule détection.', en: 'A personal project exploring how to combine several signals to interpret a scene, rather than relying on a single detection.' },
    flow: [
      { t: { fr: 'Vidéo et audio', en: 'Video and audio' }, d: 'OpenCV' },
      { t: { fr: 'Détection', en: 'Detection' }, d: { fr: 'Personnes et mouvement', en: 'People and motion' } },
      { t: { fr: 'Analyse de contexte', en: 'Context analysis' }, d: { fr: 'Mémoire contextuelle', en: 'Contextual memory' } },
      { t: { fr: 'Score de risque', en: 'Risk score' }, d: 'Streamlit' },
    ],
    decisions: [
      { fr: 'Conserver une mémoire contextuelle et un journal d’événements pour interpréter ce qui se passe dans le temps.', en: 'Keep contextual memory and an event log to interpret what happens over time.' },
      { fr: 'Présenter le tout dans une interface Streamlit.', en: 'Present everything in a Streamlit interface.' },
    ],
  },
};

export const ask = {
  title: { fr: 'Posez une question à mon parcours', en: 'Ask my background a question' },
  lede: { fr: 'Le principe de mon assistant RAG, appliqué à ce site : votre question cherche les passages les plus pertinents, et chaque réponse cite sa source.', en: 'The idea behind my RAG assistant, applied to this site: your question retrieves the most relevant passages, and each answer cites its source.' },
  note: { fr: 'Recherche par mots-clés calculée dans votre navigateur, sans modèle de langue. Le texte affiché vient du site, mot pour mot.', en: 'Keyword search computed in your browser, with no language model. The text shown comes from this site, word for word.' },
  suggestions: {
    fr: ['Quelle expérience en IA ?', 'Que faisait-il chez Thales ?', 'A-t-il dirigé une équipe ?', 'Temps réel et embarqué ?'],
    en: ['What AI experience?', 'What did he do at Thales?', 'Has he led a team?', 'Real time and embedded?'],
  },
};
