export const caseStudies = [
  {
    code: '001',
    label: 'Microservice Ownership',
    highlights: 'File Manager Service',
    title: 'File Manager',
    description:
      'Sole engineer from empty repo to production. S3 has no folders and no cross-key transactions, yet the product needs folder trees, recursive delete, rollup sizes, and inherited permissions — so a materialised tree in MongoDB is kept true by two independent writers.',
    details: [
      'S3 event sync repairs Mongo when files land outside the API entirely',
      'EU-region bucket for data-residency clients; roles resolved from Agora',
      'S3 and SQS readiness probes keep health checks honest',
    ],
    tags: ['Quarkus', 'AWS S3', 'Event-Driven', 'MongoDB'],
  },
  {
    code: '002',
    label: 'Developer Tooling',
    highlights: 'Agent Core',
    title: 'Agent Core',
    description:
      "Sole author. Every engineer's AI coding setup — agents, MCP servers, skills, routing policy — is mutable local state that silently diverges per machine. Turned it into a versioned, schema-validated artifact with an idempotent apply.",
    details: [
      'Tiered agent roster — opus for tech lead, haiku for scout and intern',
      'PR and main pipelines publish releases through release-it',
      'Installs without VPN; non-destructive merge into .mcp.json and CLAUDE.md',
    ],
    tags: ['TypeScript', 'CLI', 'Dev Tooling', 'CI/CD'],
  },
  {
    code: '003',
    label: 'AI Platform',
    highlights: 'Data Mapping',
    title: 'Data Mapping',
    description:
      'Mapping specs in Monitor replace spreadsheet-and-email field mapping. One source field can face 5,000 target candidates, so the recommendation engine answers cheaply when obvious and degrades gracefully.',
    details: [
      'Cheapest-first cascade; LLM only as tie-breaker, never the default path',
      'Temperature 0 + positive-only cache keyed on the candidate set — repeat questions answer identically',
      'LLM output validated against real candidate ids; a hallucinated pick falls back instead of returning',
    ],
    tags: ['Embeddings', 'LiteLLM', 'Redisson', 'Spring Boot'],
  },
  {
    code: '004',
    label: 'AI Automation',
    highlights: 'Integration Wizard',
    title: 'Wizard Provisioning',
    description:
      'When a Studio design proposal is confirmed, source and target are already known — so credentials and mapping tables provision deterministically rather than probabilistically. Lookup tables are the one artifact the design cannot determine, and stay AI-generated.',
    details: [
      'ConnectorResolver maps connector names to service ids at provision time',
      'Provisioning reordered ahead of integration creation so failures surface first',
      'Placeholder credentials encrypted before creation; existing ones reused and renamed',
    ],
    tags: ['AI Pipeline', 'Quarkus', 'Orchestration', 'Studio'],
  },
  {
    code: '005',
    label: 'Cross-Service Feature',
    highlights: 'Webhook Templates',
    title: 'Webhook Templates',
    description:
      "A consultant hand-configuring a webhook in Monitor after every deployment is a step that shouldn't exist. Templates now author in Studio and configure themselves in Monitor on deploy — one artifact that five services have to agree on, built across two years.",
    details: [
      'Template ID propagated through Studio, Webhook Core, Explorer, Engine, Onboard',
      'Sync state surfaced at global and per-project level',
      'Paused at the Engine on a dynamic-lifecycle dependency, resumed once it landed',
    ],
    tags: ['Cross-Service', 'Spring Boot', 'React', 'Webhooks'],
  },
  {
    code: '006',
    label: 'Team Feature',
    highlights: 'Credentials Manager',
    title: 'Credentials Manager',
    description:
      'Integration credentials are the one thing a client hands over that you cannot afford to mishandle. Team-built across Studio and the credential-manager service — connector-specific forms, encryption before the value leaves the browser, expiry tracking, and a request workflow for renewals.',
    details: [
      'AES encryption client-side, so plaintext secrets never reach the transport',
      'ConnectorHub drives per-connector field rendering; expiry flagged before it lapses',
      'Credential requests notify clients by email and track completion state',
    ],
    tags: ['Spring Boot', 'React', 'Encryption', 'ConnectorHub'],
  },
  {
    code: '008',
    label: 'Platform Modernisation',
    highlights: 'Migrations',
    title: 'Platform Modernisation',
    description:
      'Led runtime and framework migrations on production services and kept them green. Upgrades of this kind rarely break at the framework line — they break in the messaging and health infrastructure wired around it, which is where the work actually went.',
    details: [
      'Alcatraz Java 8→17 and Spring Boot 2→3.0.6; JMS/ActiveMQ and HealthChecker breaks',
      'Studio to Spring Boot 3, its UI runtime to Node 22 across nvmrc, Docker, Jenkins',
      'Monitor UI to React 18.3, Router v7, Vite 7, @tanstack/react-query v5',
    ],
    tags: ['Java 17', 'Spring Boot 3', 'React 18', 'Migration'],
  },
  {
    code: '010',
    label: 'Transaction Intelligence',
    highlights: 'Integration Review',
    title: 'Transaction Intelligence',
    description:
      "A transaction payload's format is unknown at render time. Built a view that guesses the shape from bytes alone and never loses data on a wrong guess.",
    details: [
      'Four heuristic-gated paths: nested JSON, badgerfish XML, raw XML, URL query',
      'Hand-rolled XML parser, no DOMParser dependency; every transform caught individually',
      'Raw fallback at payload and field level, in-card match highlighting',
    ],
    tags: ['React', 'XML Parsing', 'Monitor', 'Dark Mode'],
  },
  {
    code: '011',
    label: 'Product Feature',
    highlights: 'Studio Lifecycle',
    title: 'Studio Lifecycle',
    description:
      'Eight-stage delivery board from sale to live support. The stage vocabulary is owned by another service and was renamed mid-flight, so the board renders a fixed ordered pipeline against labels it neither controls nor can trust to stay stable.',
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
