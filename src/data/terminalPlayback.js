export const DEFAULT_PLAYBACK_DELAY_MS = 2000;

export const HOME_TERMINAL_PLAYBACK = {
  id: 'home',
  session: 'HOME_TERMINAL_PLAYBACK',
  prompt: 'shafiq@flexspring:~$',
  label: 'CLI Header',
  fallbackOutput: 'command not found — try one of the suggestions below',
  actions: [
    {
      id: 'whoami',
      label: 'Who Am I',
      command: 'whoami',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'Senior Software and AI Engineer at Flexspring — building AI platform infrastructure, agentic frameworks, and enterprise microservices.',
      ],
    },
    {
      id: 'stack',
      label: 'Stack Matrix',
      command: 'cat stack.matrix',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> AI/LLM: LiteLLM, LangChain/LangGraph, RAG, MCP, pgvector',
        '> BACKEND: Java 17, Spring Boot 3, Quarkus, Node.js',
        '> FRONTEND: React 18, React Router v7, Vite, TanStack Query',
        '> DATA/CLOUD: PostgreSQL, MongoDB, Redis, AWS, Docker, K8s',
      ],
    },
    {
      id: 'impact',
      label: 'Tail Impact',
      command: 'tail -n 4 impact.log',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> Hardened platform-wide LLM integration across Monitor, Studio, shared libs.',
        '> Shipped Data Mapping — AI field recommendations replacing spreadsheet workflows.',
        '> Led Spring Boot 3 + Java 17 migrations; deployed to prod with zero regression.',
        '> Serving 2,500+ client integration configurations.',
      ],
    },
    {
      id: 'workstyle',
      label: 'How I Work',
      command: 'cat ~/.workstyle',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> Ownership: I take features greenfield → production and stay on the hook for them.',
        '> Collaboration: spec-driven, thorough PR reviews, docs so the team scales — not just me.',
        '> Mentorship: I level up junior engineers and pick clarity over cleverness.',
        '> Bias for shipping: pragmatic, test-backed, zero-drama migrations.',
      ],
    },
    {
      id: 'why_me',
      label: 'Why Hire Me',
      command: 'cat why_me.txt',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> I turn fuzzy AI ideas into production systems people actually use.',
        '> Calm under fire — fixed corrupted prod data under live load without breaking integrations.',
        '> Equally at home in Java internals, React UIs, and an LLM eval loop.',
        '> Low ego, high curiosity — AWS AI certified and always learning the next thing.',
      ],
    },
    {
      id: 'community',
      label: 'Community',
      command: 'git log --author=shafiq --grep=community',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'commit 800c0de — organized ConUHacks VII (800+ hackers, 97 universities)',
        'commit 1000$$$ — runner-up at Flexspring hackathon with a RAG chatbot',
        'commit dec0ded — Director of Sponsorship @ HackConcordia',
        '> I show up for the dev community, not just the codebase.',
      ],
    },
    {
      id: 'coffee',
      label: '☕ Coffee?',
      command: 'sudo make coffee',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '[sudo] password for recruiter: ********',
        '> permission granted ☕',
        '> brewing... I am always down for a coffee chat or a pairing session.',
      ],
      cta: { label: "ping me — let's build something →", target: 'contact' },
    },
    {
      id: 'current_status',
      label: '📟 Current Status',
      command: 'cat current_status',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: ['> status: online, caffeinated, and shipping 🚀'],
      media: {
        type: 'gif',
        src: '/current-status.gif',
        alt: 'Current status',
      },
    },
  ],
};
