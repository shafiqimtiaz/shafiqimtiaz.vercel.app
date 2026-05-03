# src/ Codemap

## Responsibility

The `src/` directory contains the complete source code for **shafiqimtiaz.vercel.app** — a personal portfolio website built with React 18, serving as a digital CV and professional showcase for Shafiq Imtiaz, a software engineer specializing in cloud-native systems, AI infrastructure, and platform modernization.

The application serves four primary functions:

1. **Professional Identity** — Present work experience, technical skills, and career timeline
2. **Project Showcase** — Display case studies, public repositories, and mini-projects
3. **Contact Channel** — Provide direct communication pathways (email, LinkedIn, GitHub)
4. **Interactive Narrative** — Deliver content through terminal/CLI metaphors that reflect technical persona

---

## Architecture Overview

```
src/
├── main.jsx              # React 18 entry point
├── App.jsx              # Single-page shell with Navbar + Home + Footer
├── components/          # UI components
│   ├── Navbar.jsx        # Fixed header with scroll progress + section nav
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   ├── layout/
│   │   └── PageShell.jsx
│   └── ui/
│       ├── TerminalPlayback.jsx
│       ├── TerminalPanel.jsx
│       ├── SectionHeader.jsx
│       └── Button.jsx
├── pages/               # Section components (Home is main SPA shell)
│   ├── Home/
│   │   ├── index.jsx     # Single page with all sections
│   │   ├── HeroSection.jsx
│   │   ├── TerminalSection.jsx
│   │   ├── HistorySection.jsx
│   │   └── StatsSection.jsx
│   ├── About/
│   │   ├── ProfileSection.jsx
│   │   ├── TechStackSection.jsx
│   │   └── TimelineSection.jsx
│   ├── Projects/
│   │   ├── CaseStudiesSection.jsx
│   │   ├── PublicRepositoriesSection.jsx
│   │   └── MiniProjectsSection.jsx
│   └── Contact/
│       ├── ContactFormSection.jsx
│       └── StatusSection.jsx
├── hooks/               # Custom React hooks
│   ├── useTheme.js       # Light/dark mode with localStorage
│   ├── useTerminalPlayback.js  # Terminal playback state machine
│   └── useScrollProgress.js     # Scroll % + active section tracking
├── data/                # Static content
│   ├── experience.js
│   ├── projects.js
│   ├── stats.js
│   ├── terminalPlayback.js
│   ├── links.js
│   └── contactForm.js
└── styles/             # CSS (theme.css, global.css)
```

---

## Design Patterns

### 1. React 18 with Functional Components

All components use the functional component pattern with React hooks:

```jsx
// Component structure: src/components/Navbar.jsx
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // ...
}
```

React 18.3.1 is used with `React.StrictMode` enabled in development.

### 2. Single-Page Architecture with Hash Navigation

The application uses a single-page layout with hash-based navigation:

```jsx
// src/App.jsx
export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

Sections are identified by IDs: `#hero`, `#projects`, `#about`, `#contact`

### 3. Scroll Progress + Active Section Tracking

`useScrollProgress` hook provides:
- `progress`: 0-100 scroll percentage for progress bar
- `activeSection`: Current section ID based on scroll position

```jsx
// Navbar uses useScrollProgress
const { progress, activeSection } = useScrollProgress();

// Iterates: ['hero', 'projects', 'about', 'contact']
// Section active when rect.top <= 120px
```

### 4. CSS Custom Properties Theming

Theme system uses CSS variables defined in `theme.css`:

```css
:root {
  --theme-primary: #9cff93;
  --theme-text: #ffffff;
  --header-height: 88px;
  /* ... */
}
```

Light/dark mode toggled via `useTheme` hook which sets `html.theme-light` class.

### 5. Tailwind CSS v4 with Custom Properties

Tailwind utilities reference CSS custom properties:

```jsx
className="bg-[var(--theme-surface-low)] text-[var(--theme-primary)]"
```

---

## Data Flow

```
Static Data (src/data/*.js)
       │
       ▼
Section Components (src/pages/*/)
       │
       ▼
Home/index.jsx (composes all sections)
       │
       ▼
App.jsx (renders Home)
       │
       ▼
Navbar (uses useScrollProgress for active state)
```

---

## Integration Points

| Component | Depends On | Provides |
|-----------|------------|----------|
| `Navbar` | `useScrollProgress`, `useTheme` | Section nav, theme toggle |
| `Home/index.jsx` | All section components | Single-page layout |
| `ThemeToggle` | `useTheme` | Light/dark toggle |
| `TerminalSection` | `useTerminalPlayback`, `terminalPlayback.js` | Interactive terminal |

---

## Key Files

| File | Purpose |
|------|---------|
| `App.jsx` | Root component, renders Navbar + Home + Footer |
| `pages/Home/index.jsx` | Single-page shell with all sections |
| `hooks/useScrollProgress.js` | Scroll tracking for nav highlighting |
| `styles/theme.css` | CSS custom properties for theming |