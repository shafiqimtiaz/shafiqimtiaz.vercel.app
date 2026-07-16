## shafiqimtiaz.vercel.app — Portfolio Site Guide

### Build & Dev

| Command           | Action                                  |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start Vite dev server                   |
| `npm run build`   | Prettier format + Vite production build |
| `npm run preview` | Serve built assets locally              |
| `npm run lint`    | Prettier check + ESLint src             |

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

---

### Data schema reference

#### experience.js → `timeline[]`

```
{ date, title, org, accent, icon, details[], credentialUrl? }
```

- `accent`: Tailwind class e.g. `text-[var(--theme-primary)] border-[var(--theme-primary)]`
- `icon`: Material Symbol name (24px, outlined), e.g. `'rocket_launch'`, `'work'`, `'school'`
- `details[]`: array of strings (displayed as bullet points)
- `credentialUrl`: optional external link rendered as "View credential"

#### experience.js → `techStack[]`

```
{ icon, accent, code, title, items[] }
```

- 6 categories: Languages, AI & LLM, Backend, Frontend, Data & Storage, Cloud & DevOps

#### experience.js → `credentials[]`

```
{ date, title, org, icon, accent, details[], credentialUrl? }
```

- 4 entries: certification, 2 education, volunteer work

#### projects.js → `caseStudies[]`

```
{ code, label, highlights, details[3], title, description, tags[], link }
```

- `code`: 3-digit string (`'001'`–`'007'`)
- `label`: category badge text
- `details[]`: exactly 3 bullet points — feature-based, no code names
- `link`: `{ label, href }` — always points to résumé PDF

#### projects.js → `publicRepositories[]`

```
{ title, description, repoUrl, demoUrl?, techStack[] }
```

- 8 entries, sorted newest → oldest by GitHub creation date

#### stats.js

```
{ value: string, label: string, accent: string }
```

- `value`: e.g. `"2,500+"`, `"5+"` — parsed by CountUp

#### links.js

```
externalNodes: { label, handle, icon, href, accent }
footerLinks: { label, href }
```

#### terminalPlayback.js

```
{ id, session, prompt, label, fallbackOutput, actions[] }
actions: { id, label, command, delayMs, output[], cta?, media? }
```

---

### CSS theme tokens (`src/styles/theme.css`)

All styling uses these CSS vars — never hardcode hex values.

| Token                     | Value      | Usage                                   |
| ------------------------- | ---------- | --------------------------------------- |
| `--theme-bg`              | `#0a0b0a`  | Page background                         |
| `--theme-surface-low`     | `#101210`  | Card backgrounds, section bg            |
| `--theme-surface`         | `#161916`  | Card hover states                       |
| `--theme-surface-high`    | `#1d201d`  | Elevated surfaces, tag pills            |
| `--theme-text`            | `#f4f7f3`  | Primary text                            |
| `--theme-text-muted`      | `#9aa39a`  | Body copy, descriptions                 |
| `--theme-outline`         | `#6f766f`  | Borders on hover                        |
| `--theme-outline-variant` | `#3c423c`  | Default borders, dividers               |
| `--theme-primary`         | `#8dff7a`  | Primary accent (green), highlights      |
| `--theme-primary-dim`     | `#16d65a`  | Dimmed primary                          |
| `--theme-secondary`       | `#4fd6ff`  | Secondary accent (cyan)                 |
| `--theme-tertiary`        | `#ffce6b`  | Tertiary accent (amber)                 |
| `--theme-error-dim`       | `#ff6b4a`  | Error states                            |
| `--theme-on-primary`      | `#03160a`  | Text on primary bg                      |
| `--theme-on-secondary`    | `#03161a`  | Text on secondary bg                    |
| `--theme-on-tertiary`     | `#1a1304`  | Text on tertiary bg                     |
| `--shadow-primary`        | green glow | Primary shadow with green tint          |
| `--glow-primary`          | green glow | Text glow, timeline accent              |
| `--container-width`       | `1180px`   | Max page width                          |
| `--header-height`         | `84px`     | Navbar height (used for scroll-padding) |

**Fonts**: `--font-headline` = Bricolage Grotesque, `--font-body` = JetBrains Mono.  
**Transitions**: `--transition-fast` (180ms), `--transition-base` (320ms).

---

### Component reference

#### Button

```jsx
<Button variant="primary|secondary|orange|ghost|info" href? to? className? />
```

- **Polymorphic**: `to` → `<Link>`, `href` → `<a>`, neither → `<button>`
- **5 variants**: `primary` (green), `secondary` (outline), `orange` (amber), `ghost` (subtle surface), `info` (cyan)
- Uses `useMagnetic` for hover pull effect
- Default: `min-h-12`, `px-5`, `text-[0.66rem]`, `uppercase`, `tracking-[0.14em]`

#### Reveal

```jsx
<Reveal as="div|header|article" delay={0} className? />
```

- Scroll-triggered fade + slide-up (22px). Uses `useInView` IntersectionObserver.
- `delay` in ms: applies `--reveal-delay` CSS var for staggered animations
- `as`: renders as any HTML tag (default `<div>`)

#### CountUp

```jsx
<CountUp value="2,500+" className? />
```

- Parses `<prefix><number><suffix>` — e.g. `"2,500+"` → prefix `""`, number `2500`, suffix `"+"`
- Animated with GSAP (`power3.out`, 1.4s). Respects `prefers-reduced-motion`.
- Renders `aria-label={value}` for screen readers

#### DecodeText

```jsx
<DecodeText text="Shafiq" delay={150} duration={550} className? />
```

- Scrambles text from random glyphs on mount. Accessible: real text in `aria-label`.
- Respects `prefers-reduced-motion` (renders text immediately)

#### SectionHeader

```jsx
<SectionHeader label? title? description? actionLink? className? />
```

- `actionLink`: `{ label, href? | to? }` — renders external `<a>` or internal `<Link>`

#### TerminalPanel

```
Windowed shell container: red/yellow/green traffic-light dots, CRT scanline overlay, border
```

#### TerminalPlayback

```
Interactive CLI: shows suggestions → user clicks → executes with delay → renders output
```

---

### Animation system

| Technology               | Purpose                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| **GSAP + ScrollTrigger** | Scroll-triggered animations (timeline line-reveal, count-up)       |
| **Lenis**                | Smooth scrolling (`lerp: 0.12`), synced with GSAP ScrollTrigger    |
| **`Reveal` component**   | Fade + slide-up on enter viewport (CSS transition, 0.7s ease-out)  |
| **`.rise` class**        | Staggered hero entrance on page load (keyframes, 5 children)       |
| **`scramble.js`**        | DecodeText scramble animation on mount                             |
| **`useMagnetic`**        | GSAP magnetic hover on fine-pointer devices (Button, Navbar links) |
| **`useInView`**          | IntersectionObserver → `{ref, inView}` used by Reveal, CountUp     |
| **`useScrollProgress`**  | Scroll % + active section hash tracking (Navbar progress bar)      |

**Reduced motion**: `prefersReducedMotion()` checks `window.matchMedia`. All animations skip when true — `Reveal` becomes visible immediately, `CountUp` shows static value, `DecodeText` renders instantly, Lenis is disabled.

**Tailwind breakpoints**: `sm:640`, `md:768`, `lg:1024`, `xl:1280`.  
**Grid**: `<section>` → `<div className="container">` (max-width: `--container-width`, centered).
