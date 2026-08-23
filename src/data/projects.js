export const caseStudies = [
  {
    code: '001',
    label: 'Backend Systems',
    highlights: 'File Manager Service',
    title: 'File Manager',
    description:
      'Built as sole engineer across storage, sync, permissions, auth, observability, and monitoring integration for a multi-region event-driven file sync platform.',
    details: [
      'Designed multi-region file synchronization',
      'Implemented permissions and authentication',
      'Integrated observability and monitoring',
    ],
    tags: ['Quarkus', 'AWS S3', 'Event-Driven', 'MongoDB'],
  },
  {
    code: '002',
    label: 'AI Developer Tooling',
    highlights: 'Agent Core',
    title: 'Agent Core',
    description:
      'Created a reusable AI-agent foundation with TypeScript, Node.js, LLM APIs, MCP, RAG, and embeddings. Standardized agent development across 3 product surfaces and reduced new-agent setup from days to hours.',
    details: [
      'Tiered agent roster — opus for tech lead, haiku for scout and intern',
      'PR and main pipelines publish releases through release-it',
      'Installs without VPN; non-destructive merge into .mcp.json and CLAUDE.md',
    ],
    tags: ['TypeScript', 'CLI', 'Dev Tooling', 'CI/CD'],
  },
  {
    code: '003',
    label: 'Applied AI',
    highlights: 'Data Mapping',
    title: 'Data Mapping',
    description:
      'Built AI-powered data mapping that reduced manual review time by 50% and improved recommendation accuracy.',
    details: [
      'AI-powered field mapping',
      'Reduced manual review time by 50%',
      'Improved recommendation accuracy',
    ],
    tags: ['Embeddings', 'LiteLLM', 'Redisson', 'Spring Boot'],
  },
  {
    code: '005',
    label: 'Product Integration',
    highlights: 'Webhook Templates',
    title: 'Webhook Templates',
    description: 'Built reusable webhook templates shared between Studio and Monitor.',
    details: [
      'Template ID propagated through Studio, Webhook Core, Explorer, Engine, Onboard',
      'Sync state surfaced at global and per-project level',
      'Paused at the Engine on a dynamic-lifecycle dependency, resumed once it landed',
    ],
    tags: ['Cross-Service', 'Spring Boot', 'React', 'Webhooks'],
  },
  {
    code: '006',
    label: 'Platform Feature',
    highlights: 'Credentials Manager',
    title: 'Credentials Manager',
    description:
      'Built Credentials Manager for storing third-party API keys across 8,000+ active client integrations.',
    details: [
      'Third-party API key storage',
      'Credentials Manager delivery',
      '8,000+ active client integrations',
    ],
    tags: ['Spring Boot', 'React', 'Encryption', 'ConnectorHub'],
  },
  {
    code: '007',
    label: 'Applied AI',
    highlights: 'Studio AI Analysis',
    title: 'Studio AI Analysis',
    description: 'Built AI-based quality assessments in Studio to evaluate 50,000+ integrations.',
    details: [
      'AI-based quality assessments',
      '50,000+ integrations evaluated',
      'Studio analysis delivery',
    ],
    tags: ['AI Analysis', 'Spring Boot', 'React', 'Role-Based Access'],
  },
  {
    code: '008',
    label: 'Service Migration',
    highlights: 'Migrations',
    title: 'Platform Modernisation',
    description:
      'Modernized 5 core microservices through Java 17 and Spring Boot 3 migration, reducing API latency by 20%.',
    details: [
      'Alcatraz Java 8→17 and Spring Boot 2→3.0.6; JMS/ActiveMQ and HealthChecker breaks',
      'Studio to Spring Boot 3, its UI runtime to Node 22 across nvmrc, Docker, Jenkins',
      'Monitor UI to React 18.3, Router v7, Vite 7, @tanstack/react-query v5',
    ],
    tags: ['Java 17', 'Spring Boot 3', 'React 18', 'Migration'],
  },
  {
    code: '011',
    label: 'Product Delivery',
    highlights: 'Studio Lifecycle',
    title: 'Studio Lifecycle',
    description:
      'Built a React delivery board for tracking projects across an eight-stage lifecycle.',
    details: [
      'Phase aliases and tolerant index resolution absorb renamed or unknown stages',
      'Column-level drag-and-drop; requirements shipped behind Flagsmith flags',
      'Mongo backfill for historical projects; cache degrades to empty, never fails the page',
    ],
    tags: ['React', 'Feature Flags', 'Studio', 'UI/UX'],
  },
];

export const publicRepositories = [
  {
    title: 'fetch-markdown',
    description:
      'Chrome extension that converts any page to clean Markdown. Confidence-scored site detection picks an extraction strategy per page type — blogs, docs, GitHub — while code-aware formatting leaves code blocks byte-identical and tracking params get stripped on the way out.',
    repoUrl: 'https://github.com/shafiqimtiaz/fetch-markdown',
    techStack: ['TypeScript', 'Chrome MV3', 'DOM Parsing'],
  },
  {
    title: 'nexus-ai',
    description:
      'AI academic organizer that merges Google Classroom, Discord, and Slack into one workspace — announcements, calendar, and resources unified, with agentic chat running over the merged data rather than each source separately.',
    demoUrl: 'https://nexus-ai-tool.vercel.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/nexus-ai',
    techStack: ['Next.js', 'AI Agents', 'OAuth', 'Full-Stack'],
  },
  {
    title: 'diet-workout-plan',
    description:
      'Calorie-targeted 7-day diet and workout generator backed by Google Gemini. Routines are constrained to home-gym equipment, and the same generation produces bilingual output in English and Bengali.',
    demoUrl: 'https://diet-workout-plan.vercel.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/diet-workout-plan',
    techStack: ['React', 'Vite', 'Gemini AI', 'Bilingual'],
  },
  {
    title: 'pokégent',
    description:
      'Terminal dashboard that scans your machine and maps the local AI coding ecosystem onto Pokémon — agents as species, MCP servers as TMs/HMs, token burn as PP. Fully local: zero telemetry, zero network calls. Published on npm.',
    repoUrl: 'https://github.com/shafiqimtiaz/pokegent',
    techStack: ['TypeScript', 'Ink', 'Node.js', 'CLI'],
  },
  {
    title: 'ctx-handoff',
    description:
      "Agent-agnostic CLI that hands a live AI coding session to another developer. Context is distilled on your machine, encrypted with AES-256-GCM, and served as a link that expires in 24 hours — the recipient's agent ingests it directly.",
    repoUrl: 'https://github.com/shafiqimtiaz/ctx-handoff',
    techStack: ['TypeScript', 'AES-256-GCM', 'Deno Deploy', 'CLI'],
  },
  {
    title: 'clean-bookmarks',
    description:
      'Chrome extension that categorises a messy bookmark tree with AI. Two-pass categorisation proposes the taxonomy for you to tune before anything moves, running on-device through Gemini Nano with multi-provider streaming as fallback. No backend, no account.',
    repoUrl: 'https://github.com/shafiqimtiaz/clean-bookmarks',
    techStack: ['TypeScript', 'Chrome MV3', 'Gemini Nano', 'On-Device AI'],
  },
  {
    title: 'RecycleVision',
    description:
      'Waste-sorting mobile app built with a team for the SOEN 6751 HCI course — image recognition classifies waste types, with visual cues and gamification to build sorting confidence.',
    repoUrl: 'https://github.com/shafiqimtiaz/RecycleVision',
    techStack: ['JavaScript', 'Mobile App', 'Image Recognition', 'HCI'],
  },
];
