export const caseStudies = [
  {
    code: '001',
    label: 'AI Platform Foundation',
    highlights: 'Claude Code Team Plugin',
    title: 'Claude Code Team Plugin',
    description:
      "Designed and built my team's base library for AI agents, packaged as a shared Claude Code plugin with agents, MCP servers and skills. New-agent setup went from days to hours, with a model chosen per agent role.",
    details: [
      'Claude Code orchestration with a model per agent role',
      'Tests grown from 81 to 132 (+63%)',
      'CI/CD and versioned releases',
    ],
    tags: ['Claude Code', 'LiteLLM', 'MCP', 'Spec Driven Development'],
  },
  {
    code: '002',
    label: 'Agentic AI Platform',
    highlights: 'Agentic Integration Builder',
    title: 'Agentic Integration Builder',
    description:
      'Designed and drive end to end a multi-agent AI system that reads everything a client shares, turns it into structured requirements that specialists accept or reject, then builds the credentials, data mappings and integration process. Integration setup went from 2 weeks to 2 hours, 99% less, across 2,500+ client configurations.',
    details: [
      'Multi-agent system that plans, builds and checks its own work',
      'Integration setup from 2 weeks to 2 hours (99%)',
      'Specialists accept or reject every requirement',
    ],
    tags: ['Multi-Agent', 'LLM APIs', 'RAG', 'Cost Tracking'],
  },
  {
    code: '003',
    label: 'Developer Experience',
    highlights: 'One-Command Dev Stack',
    title: 'One-Command Dev Stack',
    description:
      'A one-command local development environment for the whole platform, with per-service logs and a terminal UI built on OpenTUI with guided onboarding and saved service profiles. Replaced hand-built Docker setups for new engineers.',
    details: [
      'One command starts the platform locally',
      'Terminal UI with saved service profiles',
      'Per-service logs and guided onboarding',
    ],
    tags: ['Docker Compose', 'Terminal UI', 'Developer Tooling', 'Onboarding'],
  },
  {
    code: '004',
    label: 'AI Platform',
    highlights: 'AI Field Recommendations',
    title: 'AI Field Recommendations',
    description:
      'AI field suggestions for data mapping, built on embeddings and reranking with an LLM fallback and caching, reducing manual review time by 50%. Made the output the same on every run, raised the confidence threshold from 0.55 to 0.80, and added AI import of whole workbooks.',
    details: [
      'Embeddings and reranking with an LLM fallback',
      'Deterministic output, confidence threshold 0.55 to 0.80',
      'AI import of whole workbooks',
    ],
    tags: ['Embeddings', 'Reranking', 'LiteLLM', 'Redis'],
  },
  {
    code: '005',
    label: 'AI Product Platform',
    highlights: 'AI Integration Review',
    title: 'AI Integration Review',
    description:
      'Built end to end an AI review of integration processes on Amazon Bedrock that evaluated 50,000+ integrations, with persona-based prompts and blocking when sensitive data is present. Later added pre-deployment risk and impact checks.',
    details: [
      'Persona-based review on Amazon Bedrock',
      'Sensitive-data blocking',
      'Pre-deployment risk and impact checks',
    ],
    tags: ['Amazon Bedrock', 'Guardrails', 'Spring Boot', 'React'],
  },
  {
    code: '006',
    label: 'Full-Stack Product',
    highlights: 'Data Mapping Service',
    title: 'Data Mapping Service',
    description:
      "The full data mapping experience across the platform's web apps: approval and sign-off flows with role-based permissions, mappings with several sources, change requests, templates and re-import.",
    details: [
      'Approval, sign-off and role-based permissions',
      'Multi-source mappings and change requests',
      'Templates and re-import',
    ],
    tags: ['Spring Boot', 'React', 'API Gateway', 'Permissions'],
  },
  {
    code: '007',
    label: 'Cross-Service Feature',
    highlights: 'Webhook Templates',
    title: 'Webhook Templates',
    description:
      "Built webhook templates across the platform's designer, runtime and customer apps, including shared management, synchronization and migration tooling. Moved template data from PostgreSQL to MongoDB and replaced admin-only access with project-level permissions.",
    details: [
      'PostgreSQL to MongoDB data migration',
      'Project-level permissions instead of admin-only',
      'Global and internal template split',
    ],
    tags: ['Cross-Service', 'MongoDB', 'Spring Boot', 'React'],
  },
  {
    code: '008',
    label: 'Full-Stack Product',
    highlights: 'Integration Lifecycle',
    title: 'Integration Lifecycle',
    description:
      'Designed and implemented lifecycle tracking across project and integration flows, with an eight-stage delivery lifecycle and events stored for traceability and debugging. Migrated existing data and built the lifecycle dashboards.',
    details: [
      'Eight-stage delivery lifecycle',
      'Existing data migrated into lifecycle tracking',
      'Lifecycle dashboards',
    ],
    tags: ['React', 'Feature Flags', 'Dashboards', 'Spring Boot'],
  },
  {
    code: '009',
    label: 'Platform Feature',
    highlights: 'Integration Version History',
    title: 'Integration Version History',
    description:
      'Every integration change is versioned with its secrets encrypted, and users compare and restore versions from a history view.',
    details: [
      'Versioned history of every change',
      'Secrets encrypted in every version',
      'Compare and restore from a history view',
    ],
    tags: ['Versioning', 'Encryption', 'React', 'Spring Boot'],
  },
  {
    code: '010',
    label: 'Product & Upgrades',
    highlights: 'Customer Reports',
    title: 'Customer Reports',
    description:
      'Built an account performance report with return on investment and a transaction failure report with CSV export, and upgraded the customer app to React 18.3, Vite 7 and TanStack Query.',
    details: [
      'Account performance report with return on investment',
      'Transaction failure report with CSV export',
      'React 18.3, Vite 7, TanStack Query',
    ],
    tags: ['React 18', 'Vite 7', 'TanStack Query', 'Reporting'],
  },
  {
    code: '011',
    label: 'Full-Stack Ownership',
    highlights: 'File Manager',
    title: 'File Manager',
    description:
      'TypeScript, Node.js, PostgreSQL, AWS S3. Built from scratch as the sole engineer: a production file service with regional storage, event-driven synchronization, permissions, authentication and observability. Later made permissions cascade to every subfolder and added whole-folder download and health checks.',
    details: [
      'Sole-engineer service ownership',
      'Permissions that cascade to every subfolder',
      'Whole-folder download, S3 and SQS health checks',
    ],
    tags: ['Node.js', 'AWS S3', 'SQS', 'PostgreSQL'],
  },
  {
    code: '012',
    label: 'Platform Modernisation',
    highlights: 'Platform Modernisation',
    title: 'Platform Modernisation',
    description:
      'Led the Spring Boot 3 migration for 5 core microservices, reducing API latency by 20%, with Redis caching, faster MongoDB queries, API docs and Node 22.',
    details: [
      'Java 8 to Java 17, Spring Boot 2 to Spring Boot 3',
      'Redis, faster MongoDB queries, Node 22',
      '20% API latency reduction',
    ],
    tags: ['Java 17', 'Spring Boot 3', 'Redis', 'Migration'],
  },
  {
    code: '013',
    label: 'Full-Stack Delivery',
    highlights: 'Credentials Manager',
    title: 'Credentials Manager',
    description:
      'Delivered a credentials manager full-stack for 8,000+ active client integrations: API, connector integration, React UI, secure field handling, notifications and request lifecycle management.',
    details: [
      'API, connector integration and React UI',
      'Secure field handling and notifications',
      'Request lifecycle management for 8,000+ integrations',
    ],
    tags: ['Spring Boot', 'React', 'Encryption', 'Security'],
  },
];

export const publicRepositories = [
  {
    title: 'KemonPoray',
    description:
      'Anonymous professor and university ratings for Bangladesh (কেমন পড়ায়?): a catalogue of 180+ universities and 21,000+ professors, Google sign-in with one permanent affiliation, rating limits, and AI-screened written reviews.',
    demoUrl: 'https://www.kemonporay.com/',
    techStack: ['Next.js 16', 'PostgreSQL', 'Drizzle ORM', 'Upstash Redis'],
  },
  {
    title: 'nexus-ai',
    description:
      'Agent-first academic workspace unifying Google Classroom, Discord, Slack, and Google Calendar.',
    demoUrl: 'https://nexus-ai-tool.vercel.app/',
    writeUpUrl:
      'https://www.kaggle.com/competitions/vibecoding-agents-capstone-project/writeups/new-writeup-1783377933664',
    repoUrl: 'https://github.com/shafiqimtiaz/nexus-ai',
    techStack: ['Gemini', 'Vercel AI SDK', 'MCP', 'Google Calendar'],
  },
  {
    title: 'dash-reader',
    description:
      'Chrome extension for RSVP speed reading: one word at a time at a fixed point, with punctuation-aware timing, multi-word chunks, and read-aloud.',
    demoUrl: 'https://shafiqimtiaz.github.io/dash-reader/',
    storeUrl: 'https://chromewebstore.google.com/detail/mbbngcffdgincdjlpkekhhppeaappaee',
    repoUrl: 'https://github.com/shafiqimtiaz/dash-reader',
    techStack: ['TypeScript', 'Chrome MV3', 'Text-to-Speech', 'RSVP'],
  },
  {
    title: 'shafiqimtiaz.vercel.app',
    description:
      'Personal portfolio with an AI assistant, animated case studies, and a terminal-inspired interface.',
    demoUrl: 'https://shafiqimtiaz.vercel.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/shafiqimtiaz.vercel.app',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'AI Assistant'],
  },
  {
    title: 'ctx-handoff',
    description: 'Agent-agnostic CLI for handing off live AI coding sessions.',
    repoUrl: 'https://github.com/shafiqimtiaz/ctx-handoff',
    techStack: ['TypeScript', 'AES-256-GCM', 'Deno Deploy', 'CLI'],
  },
  {
    title: 'clean-bookmarks',
    description: 'Chrome extension organizing bookmark trees with on-device AI.',
    demoUrl: 'https://shafiqimtiaz.github.io/clean-bookmarks/',
    storeUrl: 'https://chromewebstore.google.com/detail/akjmeddnbohjephmppkmifnljehfhkpb',
    repoUrl: 'https://github.com/shafiqimtiaz/clean-bookmarks',
    techStack: ['TypeScript', 'Chrome MV3', 'Gemini Nano', 'On-Device AI'],
  },
  {
    title: 'pokégent',
    description:
      'Terminal dashboard mapping a local AI coding setup to Pokémon: agents as species, MCP servers as TMs/HMs, and token usage as PP.',
    repoUrl: 'https://github.com/shafiqimtiaz/pokegent',
    techStack: ['TypeScript', 'Ink', 'Node.js', 'CLI'],
  },
  {
    title: 'fetch-markdown',
    description:
      'Chrome extension turning a page, selection, link, or image into clean Markdown, processed entirely on-device.',
    demoUrl: 'https://shafiqimtiaz.github.io/fetch-markdown/',
    storeUrl: 'https://chromewebstore.google.com/detail/akijdplhjdijpcjkgkhhnlhhjopldoml',
    repoUrl: 'https://github.com/shafiqimtiaz/fetch-markdown',
    techStack: ['JavaScript', 'Chrome MV3', 'DOM Parsing'],
  },
  {
    title: 'diet-workout-plan',
    description: 'Google Gemini meal and workout generator with bilingual English/Bengali output.',
    demoUrl: 'https://diet-workout-plan.vercel.app/',
    repoUrl: 'https://github.com/shafiqimtiaz/diet-workout-plan',
    techStack: ['React', 'Vite', 'Gemini AI', 'Bilingual'],
  },
];
