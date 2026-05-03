# Repository Atlas: shafiqimtiaz.vercel.app

## Project Responsibility
Personal portfolio website built with React + Vite, deployed on Vercel. Showcases professional identity, technical skills, career history, and projects with a terminal/CLI-inspired aesthetic targeting technical audiences.

## System Entry Points
| File | Purpose |
|------|---------|
| `src/main.jsx` | React DOM entry, wraps app with context |
| `src/App.jsx` | Single-page layout rendering all sections sequentially with hash nav |
| `package.json` | Dependencies: React 18, React Router v7, Vite, Tailwind v4, Vercel analytics/speed-insights |
| `vite.config.js` | Vite + React plugin + Tailwind v4 plugin |
| `vercel.json` | SPA fallback routing (all routes → index.html) |
| `index.html` | SPA entry point |

## Directory Map (Aggregated)

| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `src/components/` | Visual layer: UI primitives (Button, TerminalPanel), domain components (Navbar, Footer, ThemeToggle), layout shells (PageShell) | [View Map](src/components/codemap.md) |
| `src/components/ui/` | Reusable UI primitives: Button (multi-variant), TerminalPanel (CRT overlay), SectionHeader | [View Map](src/components/ui/codemap.md) |
| `src/components/layout/` | PageShell wrapper providing consistent page structure with max-width constraint | [View Map](src/components/layout/codemap.md) |
| `src/data/` | Centralized static content: experience, projects, stats, links, contactForm, terminalPlayback sequences | [View Map](src/data/codemap.md) |
| `src/hooks/` | Custom React hooks: useTheme, useTerminalPlayback, useScrollProgress | [View Map](src/hooks/codemap.md) |
| `src/pages/` | Layout modules combining section components | [View Map](src/pages/codemap.md) |
| `src/pages/Home/` | Landing page: HeroSection, TerminalSection, HistorySection, StatsSection | [View Map](src/pages/Home/codemap.md) |
| `src/pages/About/` | About page: ProfileSection, TechStackSection, TimelineSection | [View Map](src/pages/About/codemap.md) |
| `src/pages/Projects/` | Projects showcase: CaseStudiesSection, PublicRepositoriesSection, MiniProjectsSection | [View Map](src/pages/Projects/codemap.md) |
| `src/pages/Contact/` | Contact page: ContactFormSection, StatusSection, external links | [View Map](src/pages/Contact/codemap.md) |
| `src/styles/` | Global CSS (theme.css, global.css) with CSS custom properties theming system | (inline) |

## Architecture

```
index.html
  └── src/main.jsx
        └── src/App.jsx
              ├── Navbar (persistent, sticky, scroll progress)
              ├── Home/index.jsx (Single Page Shell)
              │     ├── #hero → HeroSection, TerminalSection
              │     ├── StatsSection
              │     ├── #projects → CaseStudiesSection
              │     ├── #about → ProfileSection, TechStackSection, HistorySection
              │     └── #contact → ContactFormSection, StatusSection
              ├── Footer (persistent)
              ├── Analytics + SpeedInsights (Vercel)
              └── scroll hash routing
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18.3 |
| Router | Hash navigation (Single Page) |
| Bundler | Vite 5 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Deployment | Vercel (SPA fallback) |
| Analytics | @vercel/analytics, @vercel/speed-insights |

## Design System

- **Theming**: CSS custom properties in `theme.css`, light/dark mode toggled via `useTheme` hook
- **Typography**: `font-headline` class with fluid clamp sizing, standardized letter-spacing
- **Visual Identity**: Terminal/CLI aesthetic with CRT overlay effects, monospace accents
- **Component Pattern**: Barrel exports (`index.js`), dual-button variants (internal nav + external link)