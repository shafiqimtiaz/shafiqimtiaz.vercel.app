export const DEFAULT_PLAYBACK_DELAY_MS = 2000;

export const HOME_TERMINAL_PLAYBACK = {
  id: 'home',
  session: 'HOME_TERMINAL_PLAYBACK',
  prompt: 'shafiq@flexspring:~$',
  label: 'CLI Header',
  fallbackOutput: 'command not found: only predefined session actions are executable',
  actions: [
    {
      id: 'whoami',
      label: 'Who Am I',
      command: 'whoami',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'Senior Software Engineer at Flexspring — building AI platform infrastructure and enterprise microservices.',
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
      id: 'hex_payload',
      label: 'Cat Hex Payload',
      command: 'cat hex_payload.bin',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '',
        '22 57 61 73 74 65 20 6E 6F 20 6D 6F 72 65',
        '20 74 69 6D 65 20 61 72 67 75',
        '69 6E 67 20 77 68 61 74 20 61 20 67 6F 6F 64',
        '20 6D 61 6E 20 73 68 6F 75 6C 64',
        '6C 64 20 62 65 2C 20 42 65 20 4F 6E 65 22',
        '20 62 79 20 4D 61 72 63 75 73',
        '20 41 75 72 65 6C 69 75 73',
        '',
      ],
    },
  ],
};
