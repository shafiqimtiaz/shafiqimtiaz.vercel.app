# src/pages/

## Responsibility

The `src/pages/` directory contains **route-level React page components** that serve as the top-level entry points for each URL route in the portfolio application. Each page folder represents a distinct route in the application (Home, About, Projects, Contact) and composes multiple **section components** to form complete page layouts. The pages folder implements the **view layer** of the application architecture, handling presentation logic and user interface composition.

### Directory Structure

```
src/pages/
├── About/
│   ├── index.jsx              # Route component: /about
│   ├── ProfileSection.jsx    # Developer profile with avatar and stats
│   ├── TechStackSection.jsx  # Technology capabilities matrix
│   └── TimelineSection.jsx  # Chronological experience timeline
├── Contact/
│   ├── index.jsx              # Route component: /contact
│   ├── ContactFormSection.jsx # Interactive contact form with TerminalPanel
│   └── StatusSection.jsx     # Exports: ExternalNodeSection, StatusSection, InfoColumnsSection
├── Home/
│   ├── index.jsx              # Route component: /
│   ├── HeroSection.jsx       # Personal branding hero
│   ├── TerminalSection.jsx    # Terminal playback component
│   ├── HistorySection.jsx     # Deployment/project history cards
│   └── StatsSection.jsx      # Quantitative statistics display
├── Projects/
│   ├── index.jsx              # Route component: /projects
│   ├── CaseStudiesSection.jsx  # Professional achievements
│   ├── PublicRepositoriesSection.jsx  # GitHub repositories grid
│   └── MiniProjectsSection.jsx       # Standalone HTML projects
└── codemap.md
```

## Design

### Routing Architecture

The application uses **React Router v7** for client-side routing. Routes are defined in `src/App.jsx` using the `<Routes>` component with path-based route matching:

| Route Path | Page Component | Route Handler |
|------------|----------------|----------------|
| `/` | `Home` | `src/pages/Home/index.jsx` |
| `/about` | `About` | `src/pages/About/index.jsx` |
| `/projects` | `Projects` | `src/pages/Projects/index.jsx` |
| `/contact` | `Contact` | `src/pages/Contact/index.jsx` |
| `*` (catch-all) | `Home` | Wildcard fallback to Home |

```jsx
// src/App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<Home />} />
</Routes>
```

### Component Composition Pattern

Each page follows a consistent composition pattern:

1. **Route Component** (`index.jsx`): Imports the layout component and section components
2. **PageShell Layout**: Wraps all sections with common page styling via `<PageShell>`
3. **Section Components**: Individual functional components that render specific content areas
4. **Data Layer**: Static data imported from `src/data/*.js` modules

```jsx
// Page composition pattern (Projects/index.jsx)
export default function Projects() {
  return (
    <PageShell>
      <CaseStudiesSection />
      <PublicRepositoriesSection />
      <MiniProjectsSection />
    </PageShell>
  );
}
```

### PageShell Layout Component

The `PageShell` component (`src/components/layout/PageShell.jsx`) provides the common page wrapper:

```jsx
export default function PageShell({ children, className = '' }) {
  const pageShell =
    'relative mx-auto w-[min(100%-2rem,var(--container-width))] pt-[calc(var(--header-height)+var(--page-top-spacing))]';
  return <main className={`${pageShell} ${className}`.trim()}>{children}</main>;
}
```

Key responsibilities:
- Sets maximum content width via CSS custom property `--container-width`
- Applies top padding accounting for fixed header height
- Provides consistent page-level spacing

### Section Component Types

Each section component is a **pure functional React component** that:
- Receives no props (fully data-driven from static imports)
- Returns JSX with semantic HTML elements (`<section>`, `<article>`, `<div>`)
- Uses CSS custom properties for theming (e.g., `var(--theme-primary)`, `var(--theme-surface)`)
- Uses Tailwind CSS utility classes for layout and styling
- Implements responsive design with `clamp()`, breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`)

### Data Layer Architecture

Pages consume static data from `src/data/` modules:

| Data File | Consumed By | Data Type |
|----------|-------------|-----------|
| `src/data/stats.js` | `ProfileSection`, `StatsSection` | Profile statistics (years, projects, etc.) |
| `src/data/projects.js` | `CaseStudiesSection`, `PublicRepositoriesSection`, `MiniProjectsSection`, `HistorySection` | Projects, repositories, case studies |
| `src/data/links.js` | `Contact/index.jsx`, `StatusSection` | External links, page text, system status |
| `src/data/experience.js` | `TimelineSection`, `TechStackSection` | Timeline entries, tech stack categories |
| `src/data/terminalPlayback.js` | `TerminalSection` | Terminal playback session configuration |
| `src/data/contactForm.js` | `ContactFormSection` | Form field definitions |

### Visual Design System

Pages implement a **terminal/cyberpunk aesthetic** with:

- **Typography**: `font-headline` custom font, monospace accents
- **Color Tokens**: CSS custom properties for theme colors (`--theme-primary`, `--theme-secondary`, `--theme-tertiary`, `--theme-surface-*`)
- **Border Styles**: Left border accents (4px), subtle borders with rgba transparency
- **Animations**: Hover transitions (`-translate-y-0.5`), pulse animations for status indicators
- **Grid Patterns**: Background `grid-pattern-panel` utility with 8% opacity

## Flow

### Page Render Flow

```
1. URL Change (React Router)
       ↓
2. Route Matching (App.jsx routes)
       ↓
3. Page Component Mount
       ↓
4. PageShell Layout Applied
       ↓
5. Section Components Render
       ↓
6. Data Imports Resolved
       ↓
7. JSX Output to DOM
```

### Data Flow Types

#### 1. Static Data Flow (Read-Only)

Most sections import static data at render time. No state management:

```jsx
// ProfileSection.jsx
import { profileStats } from '../../data/stats';

export default function ProfileSection() {
  return (
    <section>
      {profileStats.map((stat) => (
        // render stat
      ))}
    </section>
  );
}
```

#### 2. Interactive State Flow (Forms)

`ContactFormSection` maintains form state with React hooks:

```jsx
const [formData, setFormData] = useState(initialFormData);
const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setStatus('sending');
  // ... API call or mailto fallback
};
```

Form submission flow:
1. User fills form fields
2. `handleChange` updates `formData` state
3. User submits → `handleSubmit` triggered
4. Status transitions: `idle` → `sending` → (`sent` | `error`)
5. On success, form resets to `initialFormData`
6. Fallback: `mailto:` link if no endpoint configured

#### 3. Live State Flow (Status Updates)

`StatusSection` uses `useEffect` with intervals for live updates:

```jsx
export function StatusSection() {
  const [liveSystemStatus, setLiveSystemStatus] = useState(systemStatus);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveSystemStatus((prev) =>
        prev.map((item) => {
          if (item.label === 'RESPONSE_LATENCY') {
            // Random latency 12-23 hours
            return { ...item, value: `< ${Math.floor(Math.random() * 12) + 12}_HOURS` };
          }
          if (item.label === 'AVAILABILITY') {
            return { ...item, value: 'ONLINE [OPEN]', accent: 'text-[var(--theme-primary)]' };
          }
          return item;
        })
      );
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, []);

  return /* ... */;
}
```

`InfoColumnsSection` uses `useEffect` with 1-second timer for system clock:

```jsx
export function InfoColumnsSection() {
  const startAtRef = useRef(Date.now());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timerId);
  }, []);

  const systemClockLines = useMemo(() => {
    const duration = Date.now() - startAtRef.current;
    return [`UTC_ZULU: ${formatUtc(now)}`, `UPTIME: ${formatDuration(duration)}`];
  }, [now]);

  return /* ... */;
}
```

#### 4. Terminal Playback Flow

`TerminalSection` uses a playback session configuration:

```jsx
import { HOME_TERMINAL_PLAYBACK } from '../../data/terminalPlayback';

export default function TerminalSection() {
  return (
    <TerminalPanel title="ssh root@614.514.183 > developer details">
      <TerminalPlayback sessionConfig={HOME_TERMINAL_PLAYBACK} />
    </TerminalPanel>
  );
}
```

The `TerminalPlayback` component (from `src/components/ui/TerminalPlayback.jsx`) handles animated text output. Configuration is statically defined in `data/terminalPlayback.js`.

### Navigation Flow

Pages link to each other using React Router's `<Link>` component:

```jsx
// HistorySection.jsx
import { Link } from 'react-router';

export default function HistorySection() {
  return (
    <Link to="/projects">View_All_Logs</Link>
  );
}
```

External links use standard `<a>` tags with `target="_blank"` and `rel="noreferrer"`:

```jsx
// PublicRepositoriesSection.jsx
<Button variant="primary" href={repo.demoUrl} target="_blank" rel="noreferrer">
  LIVE_DEMO_
</Button>
```

### Page-Specific Flows

#### Home Page Flow (`/`)

1. `HeroSection` renders personal branding with CTA buttons (Resume PDF, Contact link)
2. `TerminalSection` displays animated terminal with developer details
3. `HistorySection` shows selected project cards (clickable to `/projects`)
4. `StatsSection` displays quantitative metrics in horizontal band

#### About Page Flow (`/about`)

1. `ProfileSection` displays developer avatar, mission statement, credentials, stats
2. `TechStackSection` renders categorized technology grid
3. `TimelineSection` renders chronological experience (alternating left/right on desktop)

#### Projects Page Flow (`/projects`)

1. `CaseStudiesSection` renders professional achievement cards
2. `PublicRepositoriesSection` renders GitHub repository grid with tech tags
3. `MiniProjectsSection` renders standalone project cards

#### Contact Page Flow (`/contact`)

1. Header section with page title from `links.js`
2. `ContactFormSection` renders form in TerminalPanel with validation
3. Side panel: `ExternalNodeSection` (external links) + `StatusSection` (live status)
4. Footer: `InfoColumnsSection` (system clock, timezone info)

## Integration

### Upstream Dependencies

Pages depend on:

| Category | Modules | Purpose |
|----------|---------|--------|
| **Routing** | `react-router` (`Route`, `Routes`, `Link`) | Client-side navigation |
| **Layout** | `PageShell` from `components/layout` | Page wrapper |
| **UI Components** | `Button`, `TerminalPanel`, `TerminalPlayback` from `components/ui` | Reusable UI |
| **Data** | All files in `src/data/` | Static content |

### Downstream Consumers

The pages are consumed by:

1. **App.jsx**: Route definitions that mount page components
2. **main.jsx**: BrowserRouter wraps App, enabling router context

```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Component Dependency Graph

```
App.jsx (Routes)
  ├── Home (index.jsx)
  │   ├── PageShell (layout)
  │   ├── HeroSection
  │   │   └── Button (ui)
  │   ├── TerminalSection
  │   │   ├── TerminalPanel (ui)
  │   │   └── TerminalPlayback (ui)
  │   ├── HistorySection
  │   │   └── Link (react-router)
  │   │   └── data/projects.js
  │   └── StatsSection
  │       └── data/stats.js
  │
  ├── About (index.jsx)
  │   ├── PageShell
  │   ├── ProfileSection
  │   │   └── data/stats.js
  │   ├── TechStackSection
  │   │   └── data/experience.js
  │   └── TimelineSection
  │       └── data/experience.js
  │
  ├── Projects (index.jsx)
  │   ├── PageShell
  │   ├── CaseStudiesSection
  │   │   ├── Button (ui)
  │   │   └── data/projects.js
  │   ├── PublicRepositoriesSection
  │   │   ├── Button (ui)
  │   │   └── data/projects.js
  │   └── MiniProjectsSection
  │       ├── Button (ui)
  │       └── data/projects.js
  │
  └── Contact (index.jsx)
      ├── PageShell
      ├── ContactFormSection
      │   ├── TerminalPanel (ui)
      │   ├── Button (ui)
      │   └── data/contactForm.js
      ├── StatusSection (exports)
      │   ├── data/links.js
      │   └── React hooks (useState, useEffect, useRef, useMemo)
      └── data/links.js
```

### Environment Variable Integration

The contact form uses environment variables for configuration:

```jsx
const CONTACT_FORM_RECIPIENT = import.meta.env.VITE_CONTACT_FORM_RECIPIENT || 'shafiqimtiaz@gmail.com';
const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';
```

- `VITE_CONTACT_FORM_RECIPIENT`: Override default recipient email
- `VITE_CONTACT_FORM_ENDPOINT`: Optional API endpoint for form submission (if not set, falls back to `mailto:`)

### Theme Integration

Pages use CSS custom properties for theming:

| Property | Usage | Examples |
|----------|-------|----------|
| `--theme-primary` | Main accent color | `#00E5FD` (cyan) |
| `--theme-secondary` | Secondary accent | `#9CFF93` (green) |
| `--theme-tertiary` | Tertiary accent | `#FFD600` (yellow) |
| `--theme-text` | Primary text | `#F5F5F5` |
| `--theme-text-muted` | Muted text | `rgba(245, 245, 245, 0.7)` |
| `--theme-surface` | Card backgrounds | varies by depth |
| `--theme-surface-low` | Card background (lowest) | `#1A1A1A` |
| `--shadow-soft` | Soft shadow | `0 4px 24px rgba(0, 0, 0, 0.4)` |
| `--container-width` | Max content width | `1400px` |
| `--header-height` | Fixed header height | `72px` |
| `--page-top-spacing` | Additional top spacing | `32px` |

### File Path Aliases

The codebase uses relative imports with the pattern `../../components/` and `../../data/` to access shared modules:

```jsx
// From src/pages/Home/index.jsx
import { PageShell } from '../../components/layout';
import HeroSection from './HeroSection';

// From src/pages/About/ProfileSection.jsx
import { profileStats } from '../../data/stats';
```

### Build Output Integration

Pages are bundled by Vite into the production build:

- Entry point: `src/main.jsx`
- Route-based code splitting: Each page imports its own sections
- Static data: Bundled as JavaScript modules (not separate JSON)
- Assets: Referenced via `/docs/` path for public assets (e.g., `/docs/developer-avatar.jpg`)

## Summary

The `src/pages/` directory implements a **section-based page composition model** where each route is a page component that assembles multiple specialized section components within a common `PageShell` layout. The architecture emphasizes:

- **Separation of concerns**: Routes (App.jsx), Pages (index.jsx files), Sections (individual components), Data (static JS modules)
- **Consistent composition**: All pages follow the same `<PageShell>` + section components pattern
- **Data-driven rendering**: Sections are pure functional components consuming static data
- **Interactive state**: Minimal state management (forms, live status updates)
- **Terminal aesthetic**: Uniform visual design system using CSS custom properties and Tailwind utilities
- **Responsive design**: Tailwind breakpoint prefixes for mobile-first responsive layouts