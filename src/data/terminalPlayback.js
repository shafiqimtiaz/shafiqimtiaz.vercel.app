export const DEFAULT_PLAYBACK_DELAY_MS = 800;

export const HOME_TERMINAL_PLAYBACK = {
  id: 'home',
  session: 'HOME_TERMINAL_PLAYBACK',
  prompt: 'shafiq@portfolio:~$',
  label: 'CLI Header',
  fallbackOutput: 'command not found — try one of the suggestions below',
  actions: [
    {
      id: 'current_status',
      label: 'Current Status',
      command: 'cat current_status',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: ['> status: online, caffeinated, and shipping 🚀.'],
      media: {
        type: 'gif',
        src: '/current-status.gif',
        alt: 'Current status',
      },
      cta: { label: "ping me — let's build something", target: 'contact' },
    },
    {
      id: 'hobbies',
      label: 'What I Like',
      command: 'ls ~/hobbies/',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'movies/       → sci-fi, thrillers, and anything with a great script',
        'photography/  → street photography — light, composition, candid moments',
        'cooking/      → bangladeshi comfort classics and weekend experiments',
        'coding/       → the hobby that became a career — and still is one',
      ],
    },
    {
      id: 'why_me',
      label: 'Why Hire Me',
      command: 'cat why_me.txt',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        {
          label: 'Calm under fire',
          value: 'Kept production running while fixing corrupted data under live load.',
        },
        {
          label: 'Comfortable across the whole stack',
          value: 'Backend internals, frontend UIs, and AI systems.',
        },
        {
          label: 'Shipped production systems',
          value: 'Serving 2,500+ B2B client configurations.',
        },
        {
          label: 'Low ego, high curiosity',
          value: 'AWS AI certified and always learning the next thing.',
        },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      command: 'cat community.md',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        {
          label: 'ConUHacks VII',
          value: "Organized Quebec's biggest hackathon for 800+ hackers from 97 universities.",
        },
        {
          label: 'Flexspring hackathon',
          value: 'Runner-up with a RAG chatbot and a $1,000 prize.',
        },
        {
          label: 'HackConcordia',
          value: 'Served as Director of Sponsorship.',
        },
        {
          label: 'IPDC Awards 2019',
          value: 'Nominated for Young Supply Chain Talent of the Year.',
        },
        '> I show up for the dev community, not just the codebase.',
      ],
    },
  ],
};
