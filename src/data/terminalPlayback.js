export const DEFAULT_PLAYBACK_DELAY_MS = 800;

export const HOME_TERMINAL_PLAYBACK = {
  id: 'home',
  session: 'HOME_TERMINAL_PLAYBACK',
  prompt: 'shafiq@portfolio:~$',
  label: 'CLI Header',
  fallbackOutput: 'command not found — try one of the suggestions below',
  actions: [
    {
      id: 'hobbies',
      label: 'What I Like',
      command: 'ls ~/hobbies/',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'movies/       → sci-fi, thrillers, and anything with a great script',
        'photography/  → street photography — light, composition, candid moments',
        'cooking/      → bengali comfort classics and weekend experiments',
        'coding/       → the hobby that became a career — and still is one',
      ],
    },
    {
      id: 'why_me',
      label: 'Why Hire Me',
      command: 'cat why_me.txt',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> Calm under fire — kept production running while fixing corrupted data under live load.',
        '> Comfortable across the whole stack — backend internals, frontend UIs, and AI systems.',
        '> Shipped production systems serving 2,500+ B2B client configurations.',
        '> Low ego, high curiosity — AWS AI certified and always learning the next thing.',
      ],
    },
    {
      id: 'community',
      label: 'Community',
      command: 'git log --author=shafiq --grep=community',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        'commit 800c0de — organized ConUHacks VII: 800+ hackers, 97 universities (Quebec\u2019s biggest)',
        'commit c0ffee1 — runner-up @ Flexspring internal hackathon — RAG chatbot ($1,000)',
        'commit dec0ded — Director of Sponsorship @ HackConcordia',
        'commit a9e5c0d — nominated Young Supply Chain Talent of the Year (IPDC Awards 2019)',
        '> I show up for the dev community, not just the codebase.',
      ],
    },
    {
      id: 'current_status',
      label: '📟 Current Status',
      command: 'cat current_status',
      delayMs: DEFAULT_PLAYBACK_DELAY_MS,
      output: [
        '> status: online, caffeinated, and shipping 🚀',
        '> ☕ brewing — always up for a chat or a pairing session',
      ],
      media: {
        type: 'gif',
        src: '/current-status.gif',
        alt: 'Current status',
      },
      cta: { label: "ping me — let's build something →", target: 'contact' },
    },
  ],
};
