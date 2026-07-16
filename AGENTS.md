## shafiqimtiaz.vercel.app — Portfolio Site Guide

### Build & Dev

| Command | Action |
|---------|--------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Prettier format + Vite production build |
| `npm run preview` | Serve built assets locally |
| `npm run lint` | Prettier check + ESLint src |

### Architecture

Single-page SPA. One page (`src/pages/Home/index.jsx`) assembles all sections:
Hero → Terminal → Stats → Projects (Case Studies + Public Repos) → About (Profile + Tech Stack + Timeline + Credentials) → Contact.

Data is entirely static — all content lives in `src/data/` files. No API, no CMS, no state management.

### Directory structure

```
src/
├── main.jsx                    # Entry: ReactDOM, BrowserRouter, CSS imports
├── App.jsx                     # Layout: Navbar → Home → Footer
├── components/
│   ├── Navbar.jsx, Footer.jsx
│   └── ui/                     # Reusable: Button, Reveal, DecodeText, CountUp,
│                               #   TerminalPanel, TerminalPlayback, SectionHeader
├── data/                       # ALL content lives here (edit these to update the site)
│   ├── projects.js             # caseStudies[] + publicRepositories[]
│   ├── experience.js           # techStack[] + timeline[] + credentials[]
│   ├── stats.js                # homeStats[] + profileStats[]
│   ├── links.js                # externalNodes[] + footerLinks[]
│   ├── contactForm.js          # contactFormFields[]
│   └── terminalPlayback.js     # CLI session on hero
├── hooks/                      # useLenis, useInView, useScrollProgress, useMagnetic
├── lib/                        # gsapConfig, scramble.js, scroll.js
├── pages/
│   ├── Home/                   # HeroSection, TerminalSection, StatsSection
│   ├── About/                  # ProfileSection, TechStackSection, TimelineSection,
│   │                           #   CredentialsSection
│   ├── Projects/               # CaseStudiesSection, PublicRepositoriesSection
│   └── Contact/                # ContactFormSection
└── styles/
    ├── theme.css               # CSS vars: colors, shadows, fonts, container
    └── global.css              # Tailwind import, reset, bg patterns, animations
```

### How to update the site

Do NOT read codemap files (they don't exist). Instead:

#### Update Career Timeline
Edit `src/data/experience.js` → `timeline[]`. Each entry: `{date, title, org, accent, icon, details[], credentialUrl?}`. Also has `techStack[]` and `credentials[]`.

#### Update Case Studies / Repos
Edit `src/data/projects.js` → `caseStudies[]` (7 entries) and `publicRepositories[]` (8 entries). Case study: `{code, label, highlights, details[3], title, description, tags[], link}`. Repo: `{title, description, repoUrl, demoUrl?, techStack[]}`.

#### Update Bio / Intro
Edit `src/pages/About/ProfileSection.jsx` (first `<p>` after `// mission`).
Also edit `src/pages/Home/HeroSection.jsx` (the `<p>` below the subtitle).

#### Update Resume
Edit `/home/shafiq.imtiaz/Documents/resume/Shafiq-Imtiaz-Resume.md` then cp to `public/docs/Shafiq-Imtiaz-Resume.md`.

#### Update Avatar
Replace `public/docs/developer-avatar.jpg`.

#### Before committing
- Run `npm run build` — this runs prettier + vite build. Must pass.
- Use `workdir: "."` for all bash commands.

### Styling conventions
- Tailwind CSS v4 + CSS vars from `theme.css`
- Dark-only theme (`color-scheme: dark`)
- Fonts: `Bricolage Grotesque` (headline), `JetBrains Mono` (body)
- Animation: GSAP + ScrollTrigger + Lenis (smooth scroll)
- Colors use CSS var tokens: `--theme-primary`, `--theme-secondary`, `--theme-tertiary`, `--theme-text`, `--theme-text-muted`, `--theme-surface`, `--theme-surface-low`, `--theme-outline-variant`, `--theme-bg`

### Component patterns
- `Reveal` wraps sections for scroll-triggered fade/slide-up animation
- `Button` is polymorphic (a/Link/button) with 5 variants
- `CountUp` animates stat numbers (handles "2,500+" format)
- All section components are default exports, imported in `Home/index.jsx`

### Notes
- React Router v7 is installed but only used for Link/location in Navbar. Site is a single page.
- Vercel Analytics + Speed Insights wired in App.jsx.
- No tests in this project.
