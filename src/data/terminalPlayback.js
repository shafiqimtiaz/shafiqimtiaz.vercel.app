export const DEFAULT_PLAYBACK_DELAY_MS = 2000;

export const HOME_TERMINAL_PLAYBACK = {
  id: 'home',
  session: 'HOME_TERMINAL_PLAYBACK',
  prompt: 'guest@system:~$',
  label: 'CLI Header',
  fallbackOutput: 'command not found: only predefined session actions are executable',
  actions: [
    {
      id: 'whoami',
      label: 'Who Am I',
      command: 'whoami',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'Software developer at Flexspring delivering cloud-native systems and modernization initiatives.',
      ],
    },
    {
      id: 'stack',
      label: 'Stack Matrix',
      command: 'cat stack.matrix',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> LANGUAGES: Java, JavaScript, TypeScript, SQL',
        '> FRONTEND: React, Bootstrap, HTML, CSS',
        '> BACKEND: Spring Boot, Quarkus, NodeJS',
        '> CLOUD: AWS S3, SQS, Docker, MongoDB, PostgreSQL',
      ],
    },
    {
      id: 'impact',
      label: 'Tail Impact',
      command: 'tail -n 4 impact.log',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> File Manager microservice scaled to 500+ concurrent requests.',
        '> Platform uptime improved to 99.97% across core products.',
        '> Monitor Pilot helped generate $200K+ in upsell revenue.',
        '> Test coverage raised to 85%+ across backend services.',
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
