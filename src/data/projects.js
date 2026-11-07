export const caseStudies = [
  {
    code: '001',
    label: 'Full-Stack Ownership',
    highlights: 'File Manager Service',
    title: 'File Manager',
    description:
      'TypeScript, Node.js, PostgreSQL, AWS S3. Built from scratch as sole engineer: a production full-stack service with regional storage, event-driven synchronization, permissions, authentication, observability, and Monitor integration.',
    details: [
      'Sole-engineer service ownership',
      'Regional storage and event-driven sync',
      'Permissions, observability, and Monitor integration',
    ],
    tags: ['Node.js', 'AWS S3', 'Event-Driven', 'PostgreSQL'],
  },
  {
    code: '002',
    label: 'AI Platform Foundation',
    highlights: 'Agent Core',
    title: 'Agent Core',
    description:
      'TypeScript, Node.js, LLM APIs, MCP, RAG, Embeddings. Reusable AI-agent foundation standardizing agent development across 3 product surfaces within the Flexspring ecosystem. Reduced new-agent setup from days to hours.',
    details: [
      'LLM APIs, MCP, RAG, and embeddings',
      'Standardized agent development across 3 product surfaces',
      'Reduced new-agent setup from days to hours',
    ],
    tags: ['TypeScript', 'MCP', 'RAG', 'LLM APIs'],
  },
  {
    code: '003',
    label: 'AI Platform',
    highlights: 'Data Mapping',
    title: 'Data Mapping',
    description:
      'Built production AI capabilities for Data Mapping and platform LLM integration, reducing manual review time by 50% while improving recommendation quality, reliability, and governance across Monitor and shared libraries.',
    details: [
      'AI-powered mapping recommendations',
      '50% reduction in manual review time',
      'AI-assisted review with stronger quality and governance',
    ],
    tags: ['Embeddings', 'LiteLLM', 'Redisson', 'Spring Boot'],
  },
  {
    code: '005',
    label: 'Cross-Service Feature',
    highlights: 'Webhook Templates',
    title: 'Webhook Templates',
    description:
      'Built core Webhook Template capabilities across Engine, Studio, Monitor, Webhook Core, Webhook Explorer, and Onboard, including shared management, permissions, synchronization, deployment-driven configuration, and migration tooling.',
    details: [
      'Cross-service template management',
      'Permissions and synchronization',
      'Deployment configuration and migration tooling',
    ],
    tags: ['Cross-Service', 'Spring Boot', 'React', 'Webhooks'],
  },
  {
    code: '006',
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
  {
    code: '007',
    label: 'AI Product Platform',
    highlights: 'Studio AI Analysis',
    title: 'Studio AI Analysis',
    description:
      'Built Studio AI Analysis end-to-end to evaluate 50,000+ integrations through role-based quality assessments and optimization recommendations.',
    details: [
      'Role-based integration assessments',
      '50,000+ integrations evaluated',
      'Optimization recommendations',
    ],
    tags: ['AI Analysis', 'Spring Boot', 'React', 'Role-Based Access'],
  },
  {
    code: '008',
    label: 'Platform Modernisation',
    highlights: 'Migrations',
    title: 'Platform Modernisation',
    description:
      'Led Spring Boot 3 migration for 5 core microservices, reducing API latency by 20%.',
    details: [
      'Java 8 to Java 17 modernization',
      'Spring Boot 2 to Spring Boot 3',
      '20% API latency reduction',
    ],
    tags: ['Java 17', 'Spring Boot 3', 'React 18', 'Migration'],
  },
  {
    code: '011',
    label: 'Full-Stack Product',
    highlights: 'Studio Lifecycle',
    title: 'Studio Lifecycle',
    description:
      'Designed and implemented Monitor and Studio Lifecycle across project and integration flows, with an eight-stage delivery lifecycle and lifecycle events stored on the integration entity for traceability and debugging.',
    details: [
      'Project and integration lifecycle flows',
      'Eight-stage delivery lifecycle',
      'Traceable lifecycle event history',
    ],
    tags: ['React', 'Feature Flags', 'Studio', 'UI/UX'],
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
