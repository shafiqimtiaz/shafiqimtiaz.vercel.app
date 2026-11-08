export const caseStudies = [
  {
    code: '001',
    label: 'AI Platform Foundation',
    highlights: 'Agent Core',
    title: 'Agent Core',
    description:
      "Designed and built Flexspring's base library for AI agents in March 2026, with LiteLLM, Spec Driven Development and a layer that coordinates Claude Code across 3 product surfaces, reducing new-agent setup from days to hours. Rebuilt the installer with MCP setup, a skill registry and releases, then made it Claude Code only with an agent roster that picks Opus, Sonnet or Haiku per role. In October 2026 it shipped as a shared Claude plugin with a review step before every commit and pinned MCP server versions.",
    details: [
      'Claude Code orchestration with a model per agent role',
      'Tests grown from 81 to 132 over v0.4.0 to v0.4.3',
      'CI/CD with Nexus publishing and a shared team plugin',
    ],
    tags: ['Claude Code', 'LiteLLM', 'MCP', 'Spec Driven Development'],
  },
  {
    code: '002',
    label: 'Agentic AI Platform',
    highlights: 'FlexForge',
    title: 'FlexForge',
    description:
      'Designed and drive FlexForge end to end: a multi-agent AI system that reads everything a client shares, turns it into structured requirements that specialists accept or reject, then builds the credentials, data mappings and integration process. Integration setup went from 2 weeks to 2 hours, 99% less, across 2,500+ client configurations.',
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
    highlights: 'Local Stack',
    title: 'Local Stack',
    description:
      'A one-command local development environment for the whole platform, built in September and October 2026: the AI project, Mapping Service, File Manager, Workflow Approval, Webhook Explorer and Billing Manager, with per-service logs and a terminal dashboard with a live theme, guided onboarding and saved service profiles. Added optional S3 and SQS endpoint overrides so File Manager runs locally.',
    details: [
      'One command starts the platform locally',
      'Terminal dashboard with saved service profiles',
      'Per-service logs and onboarding-driven setup',
    ],
    tags: ['Developer Tooling', 'Terminal Dashboard', 'Onboarding', 'AWS S3'],
  },
  {
    code: '004',
    label: 'AI Platform',
    highlights: 'AI Field Recommendations',
    title: 'AI Field Recommendations',
    description:
      'AI field suggestions for Monitor Data Mapping, built on embeddings and reranking with LiteLLM as a fallback and Redis caching, reducing manual review time by 50%. Made the output the same on every run, raised the confidence threshold from 0.55 to 0.80, and added AI import of whole workbooks.',
    details: [
      'Embeddings and reranking, LiteLLM fallback, Redis cache',
      'Deterministic output, confidence threshold 0.55 to 0.80',
      'AI import of whole workbooks',
    ],
    tags: ['Embeddings', 'Reranking', 'LiteLLM', 'Redis'],
  },
  {
    code: '005',
    label: 'AI Product Platform',
    highlights: 'AI Integration Analysis',
    title: 'AI Integration Analysis',
    description:
      'Built AI Integration Analysis end-to-end to evaluate 50,000+ integrations: AI review of integration processes on Amazon Bedrock with a prompt for each persona and blocking when sensitive data is present. In 2026 added Blueprints analysis and risk and impact checks before deployment.',
    details: [
      'Persona-specific review on Bedrock',
      'Sensitive-data blocking',
      'Blueprints analysis and pre-deployment risk checks',
    ],
    tags: ['Amazon Bedrock', 'Guardrails', 'Spring Boot', 'React'],
  },
  {
    code: '006',
    label: 'Full-Stack Product',
    highlights: 'Mapping Service',
    title: 'Mapping Service',
    description:
      'The full data mapping experience in Monitor and Studio: approval and sign-off flows with role-based permissions, mappings with several sources, change-request and support workflows, fields pre-set from blueprints, templates, re-import, and API gateway routes.',
    details: [
      'Approval, sign-off and role-based permissions',
      'Multi-source mappings and change requests',
      'Blueprint presets, templates and re-import',
    ],
    tags: ['Spring Boot', 'React', 'API Gateway', 'Permissions'],
  },
  {
    code: '007',
    label: 'Cross-Service Feature',
    highlights: 'Webhook Templates',
    title: 'Webhook Templates',
    description:
      'Built Webhook Templates across Webhook Explorer, the Modeler, Studio and Monitor, including shared management, synchronization, deployment-driven configuration, and migration tooling. Moved template data from PostgreSQL to MongoDB, replaced the Super Admin requirement with project-level permissions, and in 2026 split templates into Global and Internal.',
    details: [
      'PostgreSQL to MongoDB data migration',
      'Project-level permissions instead of Super Admin',
      'Global and Internal template split',
    ],
    tags: ['Cross-Service', 'MongoDB', 'Spring Boot', 'React'],
  },
  {
    code: '008',
    label: 'Full-Stack Product',
    highlights: 'Studio Lifecycle',
    title: 'Studio Lifecycle',
    description:
      'Designed and implemented Monitor and Studio Lifecycle across project and integration flows, with an eight-stage delivery lifecycle and lifecycle events stored on the integration entity for traceability and debugging. Migrated existing data and built the Lifecycle Dashboard and the Assembly Line boards.',
    details: [
      'Eight-stage delivery lifecycle',
      'Existing data migrated into lifecycle tracking',
      'Lifecycle Dashboard and Assembly Line boards',
    ],
    tags: ['React', 'Feature Flags', 'Studio', 'Dashboards'],
  },
  {
    code: '009',
    label: 'Platform Feature',
    highlights: 'Integration Snapshots',
    title: 'Integration Snapshots',
    description:
      'Every integration change is saved to Bitbucket with its secrets encrypted, and users compare and restore versions from a History tab.',
    details: [
      'Version history stored in Bitbucket',
      'Secrets encrypted in every snapshot',
      'Compare and restore from a History tab',
    ],
    tags: ['Bitbucket', 'Encryption', 'Versioning', 'React'],
  },
  {
    code: '010',
    label: 'Product & Upgrades',
    highlights: 'Monitor Reports',
    title: 'Monitor Reports',
    description:
      'Built an Account Performance report with return on investment and a transaction failure report with CSV export, and upgraded Monitor to React 18.3, Vite 7 and TanStack Query, replacing Hotjar with OpenReplay.',
    details: [
      'Account Performance report with return on investment',
      'Transaction failure report with CSV export',
      'React 18.3, Vite 7, TanStack Query, OpenReplay',
    ],
    tags: ['React 18', 'Vite 7', 'TanStack Query', 'Reporting'],
  },
  {
    code: '011',
    label: 'Full-Stack Ownership',
    highlights: 'File Manager Service',
    title: 'File Manager',
    description:
      'TypeScript, Node.js, PostgreSQL, AWS S3. Built from scratch as sole engineer: a production full-stack service with regional storage, event-driven synchronization, permissions, authentication, observability, and Monitor integration. Later reworked the permissions logic so changes apply to every subfolder, added whole-folder download through KrakenD, and S3 and SQS health checks with critical production tests.',
    details: [
      'Sole-engineer service ownership',
      'Permissions that cascade to every subfolder',
      'Whole-folder download, S3 and SQS health checks',
    ],
    tags: ['Node.js', 'AWS S3', 'SQS', 'KrakenD'],
  },
  {
    code: '012',
    label: 'Platform Modernisation',
    highlights: 'Migrations',
    title: 'Platform Modernisation',
    description:
      'Led the Spring Boot 3 migration for 5 core microservices, reducing API latency by 20%. Moved Studio to Spring Boot 3 with Redis, faster MongoDB queries, Swagger docs, Node 22, and a Mitigation Dashboard.',
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
      'Delivered Credentials Manager full-stack for 8,000+ active client integrations, spanning API, ConnectorHub integration, React UI, secure field handling, notifications, and request lifecycle management.',
    details: [
      'API, ConnectorHub, and React UI',
      'Secure field handling and notifications',
      'Request lifecycle management for 8,000+ integrations',
    ],
    tags: ['Spring Boot', 'React', 'Encryption', 'ConnectorHub'],
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
