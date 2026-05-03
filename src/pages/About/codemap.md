# src/pages/About/

## Responsibility

The About page serves as the primary personal portfolio showcase, presenting the developer's professional identity, technical capabilities, and career trajectory in a cohesive narrative. It functions as a static informational page that communicates who the developer is, their core competencies, and their value proposition to potential employers or collaborators.

The page is designed with a terminal/cyberpunk aesthetic that reinforces the developer's brand identity as a full-stack engineer with cloud-native and AI expertise. It serves three primary purposes:

1. **Identity Presentation**: Establishes professional credentials, certifications (AWS Certified AI Practitioner), and core specializations (cloud-native systems, enterprise modernization, AI-driven delivery).
2. **Technical Showcase**: Displays the technology stack across six categories (Language Core, Framework Stack, Data & Cloud, Delivery Tooling, Engineering Practice, AI Emerging Tech).
3. **Career Chronology**: Documents professional experience from 2019 to present, including employment history, educational background, and notable achievements.

## Design

### Component Architecture

The About module consists of four primary components organized in a single directory:

| Component                | File                | Responsibility                                                                      |
| ------------------------ | ------------------- | ----------------------------------------------------------------------------------- |
| **index.jsx**            | Page entry point    | Orchestrates layout, wraps content in PageShell, applies global decorative elements |
| **ProfileSection.jsx**   | Hero/profile block  | Displays mission manifesto, developer avatar, and key statistics                    |
| **TechStackSection.jsx** | Skills matrix       | Renders six-category technology stack in a responsive grid                          |
| **TimelineSection.jsx**  | Experience timeline | Displays chronological career history with alternating layout                       |

### Visual Design Patterns

**Typography System**:

- Primary font: `font-headline` (monospace/terminal style)
- Responsive sizing via `clamp()` functions (e.g., `clamp(3rem,6vw,5.4rem)`)
- Letter-spacing: heavily tracked (`0.16em`, `0.18em`, `0.12em`) for terminal aesthetic
- Uppercase text throughout for code-like appearance

**Color System**:

- Uses CSS custom properties: `--theme-primary`, `--theme-secondary`, `--theme-tertiary`, `--theme-text`, `--theme-text-muted`, `--theme-surface`, `--theme-surface-low`, `--theme-surface-high`, `--theme-surface-highest`, `--theme-on-primary`
- Accent colors applied via inline classes (e.g., `text-[var(--theme-primary)]`)

**Layout Structure**:

- CSS Grid for primary layouts (`grid gap-6`, `lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]`)
- Responsive breakpoints: default (mobile), `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)
- Fixed decorative elements: `grid-pattern-panel` overlay with `opacity-[0.08]`, CRT scanline effect on avatar

**Decorative Elements**:

- Grid pattern background: `grid-pattern-panel pointer-events-none fixed inset-0 -z-10 opacity-[0.08]`
- CRT overlay on avatar: `crt-overlay absolute inset-0 opacity-25`
- Border accents: 4px left borders using `--theme-primary`

### Data Structures

**profileStats** (from `src/data/stats.js`):

```javascript
[
  { value: '05+', label: 'YEARS UPTIME', accent: 'text-[var(--theme-primary)]' },
  { value: '42', label: 'DEPLOYMENTS FINALIZED', accent: 'text-[var(--theme-secondary)]' },
  { value: '00', label: 'UNRESOLVED INCIDENTS', accent: 'text-[var(--theme-tertiary)]' },
];
```

**techStack** (from `src/data/experience.js`):

- 6 categories: Language Core, Framework Stack, Data & Cloud, Delivery Tooling, Engineering Practice, AI Emerging Tech
- Each category has: `icon` (Material Symbols name), `accent` (color class), `code` (numeric identifier), `title`, `items[]`

**timeline** (from `src/data/experience.js`):

- 6 entries spanning 2019-2025
- Each entry: `date`, `title`, `org`, `accent`, `icon`, `details[]`, optional `credentialUrl`

## Flow

### Page Composition Flow

```
index.jsx (About)
    │
    ├── PageShell (layout wrapper)
    │       │
    │       └── Fixed decorative grid-pattern-panel (z-index: -10)
    │
    ├── ProfileSection
    │       │
    │       ├── Section header: "Developer_Profile / Identity_Records"
    │       ├── Title: "Developer Profile_"
    │       │
    │       ├── Two-column grid (lg breakpoint)
    │       │       ├── Left: Mission manifesto (text content)
    │       │       └── Right: Avatar card with CRT overlay
    │       │
    │       └── Three-column stats row (sm breakpoint)
    │               └── profileStats.map() → 3 stat cards
    │
    ├── TechStackSection
    │       │
    │       ├── Section header: "TECH_STACK.EXE" + "CAPABILITIES_MATRIX"
    │       │
    │       └── Responsive grid (1 col → 2 col → 3 col)
    │               └── techStack.map() → 6 category cards
    │
    └── TimelineSection
            │
            ├── Section header: "SYSTEM_HISTORY_LOG"
            │
            ├── Vertical timeline line (left-aligned on mobile, centered on desktop)
            │
            └── timeline.map() → alternating left/right cards
                    └── Each card: date, title, org, details[], optional credential link
```

### Data Flow

1. **Static Data Import**: Components import data directly from `src/data/` modules at build time
2. **No Runtime State**: The page is entirely static with no React hooks or state management
3. **Component Rendering**: Data is mapped to JSX elements using standard `.map()` patterns with unique keys
4. **No External API Calls**: All content is pre-defined in local data files

### Responsive Behavior

- **Mobile-first**: Default styles target mobile viewport
- **ProfileSection**: Stacks vertically on mobile, two-column on `lg` breakpoint
- **TechStackSection**: Single column → 2 columns (`md`) → 3 columns (`xl`)
- **TimelineSection**: Left-aligned timeline on mobile, centered with alternating cards on `md+`

## Integration

### External Dependencies

**Layout Component**:

- Imports `PageShell` from `src/components/layout`
- Provides consistent page wrapper with navigation, footer, and theming

**Data Modules**:

- `src/data/stats.js`: Exports `profileStats` array for ProfileSection
- `src/data/experience.js`: Exports `techStack` and `timeline` arrays

**Styling System**:

- Tailwind CSS utility classes throughout
- CSS custom properties defined in global theme (likely in `src/styles/` or `tailwind.config.js`)
- Material Symbols icon font via `material-symbols-outlined` class

**Assets**:

- Developer avatar image: `/docs/developer-avatar.jpg` (loaded with `loading="lazy"` and `decoding="async"`)

### Theme Integration

The page relies on CSS custom properties for theming:

| Property                  | Usage                                          |
| ------------------------- | ---------------------------------------------- |
| `--theme-primary`         | Main accent color (borders, highlights, links) |
| `--theme-secondary`       | Secondary accent (statistics, icons)           |
| `--theme-tertiary`        | Tertiary accent (educational entries)          |
| `--theme-text`            | Primary text color                             |
| `--theme-text-muted`      | Secondary/muted text                           |
| `--theme-bg`              | Page background                                |
| `--theme-surface`         | Card backgrounds                               |
| `--theme-surface-low`     | Elevated surface backgrounds                   |
| `--theme-surface-high`    | Border/dividers                                |
| `--theme-surface-highest` | Timeline line                                  |
| `--theme-on-primary`      | Text on primary color                          |

### Routing

The About page is likely registered in a router configuration (likely React Router) at `/about` or `/` path. The component exports a default function `About` that serves as the route handler.

### No Server-Side Dependencies

This is a purely client-side static page with:

- No API calls
- No authentication
- No server-side data fetching
- No dynamic content personalization
