export const caseStudies = [
  {
    code: '007',
    label: 'Product Feature',
    highlights: 'Studio Lifecycle',
    details: [
      'Lifecycle board with stage-based card rendering, status-aware indicators, and streamlined data model',
      'CSC metadata display with dash-as-default fallback',
      'Requirements modals gated behind feature flags with placeholder UI',
    ],
    title: 'Studio Lifecycle',
    description:
      'Delivered the Lifecycle management feature in Flexspring Studio — a stage-based board that tracks integration projects from kickoff to production. Built status-aware lifecycle cards, CSC metadata display, requirements modals gated behind feature flags, and simplified the data model by removing planned dates and dead code paths.',
    tags: ['React', 'Feature Flags', 'UI/UX', 'Studio'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '006',
    label: 'Transaction Intelligence',
    highlights: 'Integration Review',
    details: [
      'Prettified transaction view — XML, URL query, and JSON parsed into searchable cards with field-level rendering',
      'IntegrationReviewCard with search highlighting and defensive raw fallback when transformation fails',
      'Dark mode support and responsive two-column layout with sticky detail pane adapted via media queries',
    ],
    title: 'Transaction Intelligence',
    description:
      "Redesigned Monitor's transaction detail experience with an intelligent Integration Review card — parsing raw XML, URL query strings, and nested JSON into a structured, searchable Prettified view. Added dark mode, in-card search highlighting, responsive breakpoints, and a defensive raw fallback that preserves data when transformation fails.",
    tags: ['React', 'XML Parsing', 'UI/UX', 'Dark Mode'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '001',
    label: 'AI Platform',
    highlights: 'Data Mapping',
    details: [
      'AI-powered field recommendations per target with bulk suggestion mode',
      'Cached recommendations with automatic fallback for reliability',
      'Read-only governance enforced on Technical Review sign-off',
    ],
    title: 'Data Mapping',
    description:
      'A self-service specification tool powered by AI field recommendations — replacing manual, spreadsheet-based mapping workflows. Per-target suggestions, bulk recommendation, and role-based AI gating with cancellable frontend requests.',
    tags: ['AI', 'Recommendations', 'Caching', 'React'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '005',
    label: 'AI Automation',
    highlights: 'AI Assembly Line',
    details: [
      'AI-driven data integration automation across analysis, design, and development phases',
      'Intelligent transaction analysis with model selection, caching, and LLM-powered insights',
      'Service integrations powering the end-to-end automated Assembly pipeline',
    ],
    title: 'AI Assembly Line',
    description:
      "Spearheaded Flexspring's AI Assembly Line — an AI-driven data integration automation platform spanning Monitor, Studio, and the agentic AI library. Delivered AI-powered transaction analysis, LLM integration, and foundational infrastructure that underpins the automated pipeline.",
    tags: ['AI Agents', 'LLM', 'Automation', 'Full-Stack'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '002',
    label: 'AI Infrastructure',
    highlights: 'Agent Core Library',
    details: [
      'Model-agnostic LLM orchestration across multiple providers',
      'Spec-defined API contracts with controlled tool access boundaries',
      'Reusable agent library adopted across services',
    ],
    title: 'Agent Core',
    description:
      "The platform's foundational agentic AI library — integrating model-agnostic LLM orchestration so agents operate against defined API contracts with safe, scalable tool use.",
    tags: ['TypeScript', 'LLM', 'API Contracts', 'Spec-Driven'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '003',
    label: 'Microservice Ownership',
    highlights: 'File Manager Service',
    details: [
      'Sole engineer across backend service, API gateway, and frontend UI',
      'Multi-region cloud storage with per-item access permissions',
      'Event-driven reconciliation and single sign-on authentication',
    ],
    title: 'File Manager',
    description:
      'Built a standalone file management microservice from scratch with multi-region cloud storage, a metadata layer, per-item permissions, event-driven reconciliation, and observability. Sole engineer across backend, API gateway, and frontend.',
    tags: ['Microservice', 'Cloud Storage', 'Permissions', 'Observability'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '004',
    label: 'Platform Modernisation',
    highlights: 'Migrations',
    details: [
      'Led major framework migration of a production service — zero regression',
      'Multi-stage runtime and framework upgrades across services',
      'Modernised frontend stack with updated libraries and build tooling',
    ],
    title: 'Platform Modernisation',
    description:
      'Led framework and runtime migrations for production services and modernised the frontend stack — establishing the foundation for platform-wide AI integration.',
    tags: ['Migration', 'Framework Upgrade', 'Frontend', 'Build Tooling'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
];

export const publicRepositories = [
  {
    title: 'fetch-markdown',
    description:
      'Chrome extension that converts any web page to clean, structured Markdown. Confidence-scored site detection adapts extraction for blogs, docs, GitHub, and more — with code-aware formatting that preserves code blocks untouched.',
    repoUrl: 'https://github.com/shafiqimtiaz/fetch-markdown',
    techStack: ['TypeScript', 'Chrome Extension', 'DOM'],
  },
  {
    title: 'nexus-ai',
    description:
      'AI-powered academic organizer that centralises announcements, calendar events, resources, and agentic AI chat into a unified workspace. Integrates Google Classroom, Discord, and Slack.',
    demoUrl: 'https://nexus-ai-tool.vercel.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/nexus-ai',
    techStack: ['Next.js', 'AI Agents', 'OAuth', 'Full-Stack'],
  },
  {
    title: 'diet-workout-plan',
    description:
      'AI-powered 7-day diet and workout planner. Set a calorie target, and Google Gemini generates a personalised meal plan and home-gym routine — bilingual in English and Bengali.',
    demoUrl: 'https://diet-workout-plan.vercel.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/diet-workout-plan',
    techStack: ['React', 'Vite', 'Gemini AI', 'Bilingual'],
  },
  {
    title: 'pokégent',
    description:
      'Terminal dashboard that scans your machine to show AI coding agents as Pokémon species, MCP servers as TMs/HMs, and token burn as PP. Fully local — zero telemetry, zero network calls.',
    repoUrl: 'https://github.com/shafiqimtiaz/pokegent',
    techStack: ['TypeScript', 'Ink', 'Terminal UI', 'Node.js'],
  },
  {
    title: 'ctx-handoff',
    description:
      "Agent-agnostic CLI to hand off AI coding-agent sessions between developers via encrypted, ephemeral links. Distills context on your machine and injects it straight into the recipient's agent.",
    repoUrl: 'https://github.com/shafiqimtiaz/ctx-handoff',
    techStack: ['TypeScript', 'CLI', 'Encryption', 'Deno'],
  },
  {
    title: 'clean-bookmarks',
    description:
      'Chrome extension that transforms a messy bookmark collection into clean, categorised folders with AI. Proposes categories for you to tune, then sorts everything. No backend, no account, no data store.',
    repoUrl: 'https://github.com/shafiqimtiaz/clean-bookmarks',
    techStack: ['TypeScript', 'Chrome Extension', 'Browser AI'],
  },
  {
    title: 'RecycleVision',
    description:
      'Computer vision application that identifies and categorizes recyclable materials. Built image classification models to improve automated sorting efficiency.',
    repoUrl: 'https://github.com/shafiqimtiaz/RecycleVision',
    techStack: ['Python', 'TensorFlow', 'Computer Vision'],
  },
  {
    title: 'birdhaus',
    description:
      'Interactive web application focused on a responsive, content-rich experience with a clean, decoupled UI component structure.',
    demoUrl: 'https://birdhaus.netlify.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/birdhaus',
    techStack: ['Frontend', 'UI/UX', 'CSS'],
  },
];
