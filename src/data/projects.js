export const caseStudies = [
  {
    code: '001',
    label: 'AI Platform',
    highlights: 'Data Mapping',
    details: [
      'AI field recommendations: embedding reranking + cosine similarity',
      'Redisson caching with LiteLLM fallback',
      'Read-only governance enforced on Technical Review sign-off',
    ],
    title: 'Data Mapping',
    description:
      'A self-service specification tool powered by AI field recommendations — replacing manual, spreadsheet-based mapping workflows. Per-target suggestions, bulk recommendation, and role-based AI gating, with a debounced/abortable frontend hook.',
    tags: ['LiteLLM', 'Embeddings', 'Redisson', 'React'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '002',
    label: 'AI Infrastructure',
    highlights: 'flexspring-agent-core',
    details: [
      'Model-agnostic LLM orchestration via LiteLLM',
      'MCP server schemas + Spec-Driven access boundaries',
      'Reusable agent library adopted across services',
    ],
    title: 'Agent Core',
    description:
      "The platform's foundational TypeScript/Node.js agentic AI library — integrating LiteLLM for model-agnostic LLM orchestration so agents operate against defined API contracts, with MCP server schemas for safe, scalable tool use.",
    tags: ['TypeScript', 'LiteLLM', 'MCP', 'Spec-Driven'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '003',
    label: 'Microservice Ownership',
    highlights: 'File Manager Service',
    details: [
      'Sole engineer: Quarkus service + API gateway + React UI',
      'Multi-region AWS S3 (US/EU) + per-item READ/WRITE/DELETE permissions',
      'SQS event reconciliation; OIDC auth via AWS Cognito',
    ],
    title: 'File Manager',
    description:
      'Built flexspring-file-manager from scratch — a standalone Quarkus microservice with multi-region AWS S3 storage (US/EU), a MongoDB metadata layer, per-item permissions, SQS event reconciliation, and Sentry observability. Sole engineer across service, API gateway, and React UI.',
    tags: ['Quarkus', 'AWS S3', 'MongoDB', 'Sentry'],
    link: { label: 'View Résumé', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  },
  {
    code: '004',
    label: 'Platform Modernisation',
    highlights: 'Migrations',
    details: [
      'Led Spring Boot 3 migration of Studio — zero regression',
      'Java 8 → 17 and Spring Boot 2 → 3 (Alcatraz)',
      'Monitor UI to React 18.3, React Router v7, Vite',
    ],
    title: 'Platform Modernisation',
    description:
      "Led Spring Boot 3 / Java 17 migrations for production services and modernised Monitor's front-end stack (React 18.3, React Router v7, Vite) — establishing the runtime foundation for platform-wide LLM integration.",
    tags: ['Java 17', 'Spring Boot 3', 'React 18', 'Vite'],
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
