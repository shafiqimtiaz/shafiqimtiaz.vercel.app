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
├── main.jsx              # React 18 entry point with BrowserRouter
├── App.jsx              # Root component with route definitions
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   ├── layout/
│   │   └── PageShell.jsx
│   └── ui/
│       ├── TerminalPlayback.jsx
│       ├── TerminalPanel.jsx
│       ├── SectionHeader.jsx
│       └── Button.jsx
├── pages/               # Route-level page components
│   ├── Home/index.jsx
│   ├── About/index.jsx
│   ├── Projects/index.jsx
│   └── Contact/index.jsx
├── hooks/               # Custom React hooks
│   ├── useTheme.js
│   └── useTerminalPlayback.js
├── data/                # Static data (content source)
│   ├── experience.js
│   ├── projects.js
│   ├── stats.js
│   ├── terminalPlayback.js
│   ├── links.js
│   └── contactForm.js
└── styles/             # CSS (via TailwindCSS)
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

### 2. React Router v7 Client-Side Routing

Routes are defined in `App.jsx` using `react-router` v7:

```jsx
// src/App.jsx lines 22-28
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<Home />} />
</Routes>
```

Client-side routing eliminates server-round trips; all navigation is handled client-side.

### 3. TailwindCSS 4.x Styling

TailwindCSS is configured via `@tailwindcss/vite` plugin in `vite.config.js`:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [tailwindcss(), react()],
});
```

Custom theme variables are injected via CSS in `src/styles/theme.css`:

```css
/* src/styles/theme.css (imported in main.jsx) */
:root {
  --theme-primary: #...;
  --theme-secondary: #...;
  /* etc. */
}
```

All styling uses TailwindCSS utility classes with custom CSS variables for theming:

```jsx
className="text-[var(--theme-primary)] bg-[var(--theme-surface)]"
```

### 4. PageShell Layout Pattern

All pages wrap content in a `PageShell` layout component:

```jsx
// src/components/layout/PageShell.jsx
export default function PageShell({ children, className = '' }) {
  const pageShell = 'relative mx-auto w-[min(100%-2rem,var(--container-width))] pt-[calc(var(--header-height)+var(--page-top-spacing))]';
  return <main className={`${pageShell} ${className}`.trim()}>{children}</main>;
}
```

This ensures consistent page structure, spacing, and container width across all routes.

### 5. Custom Hooks for Stateful Logic

**useTheme** (`src/hooks/useTheme.js`):

```javascript
// src/hooks/useTheme.js lines 24-40
export default function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, isDark, setTheme, toggleTheme };
}
```

- Persists theme preference to `localStorage` under key `portfolio-theme`
- Applies theme via CSS classes on `document.documentElement`
- Supports toggle between light and dark modes

**useTerminalPlayback** (`src/hooks/useTerminalPlayback.js`):

```javascript
// src/hooks/useTerminalPlayback.js lines 17-75
export default function useTerminalPlayback(sessionConfig) {
  const [state, setState] = useState(PLAYBACK_STATES.idle);
  // State machine: idle → suggesting → executing → rendered
  // ...
  return { state, outputLines, executeCommand, revealSuggestions, hideSuggestions };
}
```

- Manages interactive terminal simulation on the Home page
- State machine with 4 states: `idle`, `suggesting`, `executing`, `rendered`
- Looks up actions by command string, executes with configurable `delayMs`
- Reveals command suggestions on hover/focus

### 6. Data-Driven Content Architecture

All content lives in static JavaScript files under `src/data/`:

| File | Content |
|------|---------|
| `experience.js` | Tech stack categories, career timeline |
| `projects.js` | Case studies, mini-projects, public repos |
| `stats.js` | Numeric metrics (uptime, deployments, etc.) |
| `terminalPlayback.js` | Terminal commands and outputs |
| `links.js` | Navigation links, external nodes, contact info |

Components import and render this data:

```jsx
// src/pages/Contact/index.jsx lines 1-4
import { contactPageText } from '../../data/links';
// ...
<h1>{contactPageText.title}</h1>
```

This separates content from presentation, enabling updates without component changes.

### 7. Component Composition

Pages compose from reusable sections:

```jsx
// src/pages/Home/index.jsx
export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <TerminalSection />
      <HistorySection />
      <StatsSection />
    </PageShell>
  );
}
```

Each section is a dedicated component file (e.g., `HeroSection.jsx`, `TerminalSection.jsx`).

### 8. Terminal/CLI Design Motif

The entire site uses a terminal/command-line aesthetic:

- **TerminalPlayback** component simulates interactive CLI
- **TerminalPanel** provides macOS-style window chrome with traffic light buttons
- Font: `font-headline` (custom font family via CSS)
- Styling: Monospace typography, uppercase labels, tracking letter-spacing
- Animated cursor block: `<span className="cursor-block">█</span>`

---

## Data Flow

### 1. Application Boot

```
index.html
  └── <div id="root"></div>
        ↓
main.jsx (ReactDOM.createRoot)
        ├── React.StrictMode
        ├── BrowserRouter
        │     ↓
        │   App.jsx
        │     ├── Navbar (persistent)
        │     ├── Routes
        │     │   ├── Home → (HeroSection, TerminalSection, HistorySection, StatsSection)
        │     │   ├── About → (ProfileSection, TechStackSection, TimelineSection)
        │     │   ├── Projects → (CaseStudiesSection, PublicRepositoriesSection, MiniProjectsSection)
        │     │   └── Contact → (ContactFormSection, Status, ExternalNodes, InfoColumns)
        │     └── Footer (persistent)
        │
        ���── ./styles/theme.css
        └── ./styles/global.css
```

### 2. Theme System Flow

```
useTheme hook
  ├── readStoredTheme() → localStorage.getItem('portfolio-theme')
  │     ↓
  ├── Initial state: 'dark' (fallback)
  │     ↓
  ├── useEffect → applyTheme(theme)
  │     ├── document.documentElement.classList.toggle('dark')
  │     ├── document.documentElement.setAttribute('data-theme', theme)
  │     ↓
  └── localStorage.setItem('portfolio-theme', theme)
```

Theme state bubbles through React context implicitly via the `useTheme` hook in any component that needs it.

### 3. Terminal Playback Flow

```
TerminalSection.jsx
  ↓ (imports session config)
HOME_TERMINAL_PLAYBACK (data/terminalPlayback.js)
  ↓
useTerminalPlayback(sessionConfig)
  ├── actionLookup = createActionLookup(actions)
  │     ↓
  ├── User interaction: hover/focus → revealSuggestions()
  │     ↓
  ├── Click command → executeCommand(command)
  │     ├── Timer starts (delayMs)
  │     ├── State: executing → rendered
  │     ↓
  └── Output displayed in terminal block
```

### 4. Navigation Flow

```
Navbar Component
  ├── navLinks = [{ label: 'HOME', to: '/' }, ...]
  ├── <Link to={path}> (react-router)
  │     ↓
  ├── BrowserRouter handles history.push
  │     ↓
  ├── Routes match path to element
  │     ↓
  ├── PageShell wraps content
  │     ↓
  ├── Component renders with data imports
```

---

## Integration with Project

### Root-Level Configuration

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite + React + TailwindCSS plugins |
| `package.json` | Dependencies (react, react-router, tailwindcss v4, vite) |
| `index.html` | Entry HTML with `<div id="root">` |

### Vercel Integration

`@vercel/analytics` and `@vercel/speed-insights` are integrated in `App.jsx`:

```jsx
// src/App.jsx lines 30-31
<Analytics />
<SpeedInsights />
```

These components automatically track web vitals and analytics without additional code.

### Static Assets

The `public/` directory contains 8 standalone mini-projects linked from the portfolio:

- `public/projects/1 Task List/index.html`
- `public/projects/2 Book List/index.html`
- `public/projects/3 GitHub Finder/index.html`
- `public/projects/Ex1 Shopping Cart/index.html`
- `public/projects/Ex2 REG-EX Validator/index.html`
- `public/projects/Ex3 Number Game/index.html`
- `public/projects/UI Colorize GlassNeo/index.html`

These are direct HTML files (not React) served as static routes.

### CSS Variables Architecture

The theming system uses CSS custom properties:

```css
:root {
  --theme-primary: #10b981;      /* Emerald */
  --theme-secondary: #f59e0b;   /* Amber */
  --theme-tertiary: #f97316;     /* Orange */
  --theme-surface: #1a1a1a;
  --theme-surface-low: #242424;
  --theme-text: #fafafa;
  --theme-text-muted: #a1a1aa;
  --container-width: 1280px;
  --header-height: 4.5rem;
  --page-top-spacing: 2rem;
}
```

These are defined in `src/styles/theme.css` and consumed via TailwindCSS arbitrary values: `bg-[var(--theme-surface)]`.

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18.3.1 | UI library |
| `react-router` | 7.13.2 | Client-side routing |
| `tailwindcss` | 4.2.2 | Styling |
| `@tailwindcss/vite` | 4.2.2 | Tailwind integration |
| `vite` | 5.4.19 | Build tool |
| `@vercel/analytics` | 2.0.1 | Vercel analytics |
| `@vercel/speed-insights` | 2.0.0 | Vercel speed insights |

---

## Summary

The `src/` directory is a **self-contained React 18 portfolio application** that follows these patterns:

1. **Client-side SPA** — React Router handles all routes without server round-trips
2. **Data-driven** — Static JavaScript files separate content from presentation
3. **Themed** — CSS variables + TailwindCSS enable dark/light mode with localStorage persistence
4. **Interactive** — Custom hooks (`useTheme`, `useTerminalPlayback`) manage state
5. **Terminal aesthetic** — CLI motif runs through the entire design
6. **Vercel-optimized** — Built with Vercel analytics and speed insights integration

The application is built with Vite, styled with TailwindCSS 4.x, and deployed on Vercel — a modern, performant, static-first portfolio site.