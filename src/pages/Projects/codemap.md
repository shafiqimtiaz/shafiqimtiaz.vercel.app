# src/pages/Projects/

## Responsibility

The Projects page serves as the primary portfolio showcase for the personal website, presenting three distinct categories of work in a unified, visually cohesive interface:

1. **Case Studies** — Professional achievements from employment, demonstrating on-the-job delivery, engineering impact, and measurable product outcomes across enterprise environments. These represent career milestones and real-world problem-solving.

2. **Public Repositories** — Open-source GitHub projects showcasing technical breadth across multiple technology stacks (Python, MERN, Java/Android, AI/ML). Demonstrates self-directed learning and diverse implementation capabilities.

3. **Mini Projects** — Standalone HTML/CSS/Vanilla JS demos for simple interactive tools and UI experiments. These are lightweight, browser-based projects demonstrating front-end fundamentals without framework dependencies.

The page functions as a technical resume complement, allowing visitors to explore work samples across varying complexity levels — from production microservices to simple standalone demos.

---

## Design

### Component Architecture

The Projects module follows a **section-based composition pattern** with three dedicated section components, each responsible for rendering one project category:

```
src/pages/Projects/
├── index.jsx                    # Page entry point, composes all sections
├── CaseStudiesSection.jsx       # Professional case studies (4 projects)
├── PublicRepositoriesSection.jsx # GitHub repositories (11 repos)
├── MiniProjectsSection.jsx      # Standalone demos (7 mini-projects)
└── codemap.md                   # This documentation
```

### Section Component Patterns

Each section component follows an identical structural pattern:

1. **Header Block** — Contains category label (uppercase, tracked) and section title
2. **Grid Container** — Responsive CSS grid with breakpoints: `sm:grid-cols-2`, `xl:grid-cols-3`
3. **Project Cards** — Mapped from data arrays, each card displays:
   - Index number (zero-padded, e.g., `001`, `002`)
   - Title (uppercase, headline font)
   - Description (muted text color)
   - Tech stack / tags (border-left accent with `#` prefix)
   - Action buttons (primary/secondary variants)

### Visual Design System

The components leverage a consistent design vocabulary:

- **Typography**: `font-headline` with tight tracking (`0.18em` for labels, `-0.05em` for titles)
- **Color Theming**: CSS custom properties (`var(--theme-primary)`, `var(--theme-secondary)`, `var(--theme-tertiary)`, `var(--theme-text-muted)`)
- **Card Styling**:
  - Border: `rgba(73,72,71,0.22)` default, changes on hover (cyan for repos, green for mini-projects)
  - Background: `var(--theme-surface-low)` default, elevates to `var(--theme-surface)` on hover
  - Transform: `hover:-translate-y-0.5` for subtle lift effect
- **Decorative Elements**: `grid-pattern-panel` overlay with `opacity-[0.08]` for texture
- **Accent Borders**: Left border on tech stack tags (`border-l-2 border-[var(--theme-tertiary)]`)

### Data Structures

Each project category uses a distinct data shape:

**Case Studies** (`caseStudies` array):
```javascript
{
  code: '001',                    // Zero-padded identifier
  label: 'MICROSERVICE_OWNERSHIP', // Category tag
  highlights: 'FILE_MANAGER_SERVICE', // Highlight label
  details: [...],                // Array of detail strings
  title: 'Flexspring_File_Manager',
  description: '...',
  tags: ['QUARKUS', 'AWS_S3', ...],
  primary: { label, href, external?, to? },
  secondary: { label, href, external?, to? }
}
```

**Public Repositories** (`publicRepositories` array):
```javascript
{
  title: 'RecycleVision',
  description: '...',
  repoUrl: 'https://github.com/...',
  demoUrl?: 'https://...',       // Optional live demo
  techStack: ['Python', 'TensorFlow', ...]
}
```

**Mini Projects** (`miniProjects` array):
```javascript
{
  name: 'Task List',
  description: '...',
  href: '/projects/1%20Task%20List/index.html',
  tags: ['HTML', 'CSS', 'Vanilla JS']
}
```

---

## Flow

### Rendering Pipeline

```
1. Route Match: /projects → index.jsx
                    │
                    ▼
2. PageShell Layout Wrapper
   (provides page container, metadata)
                    │
                    ▼
3. Sequential Section Rendering:
   ┌─────────────────────────────────┐
   │ CaseStudiesSection              │
   │   ├─ Header (title + intro)    │
   │   └─ Grid → caseStudies.map()  │
   │       └─ Project Cards (4)     │
   ├─────────────────────────────────┤
   │ PublicRepositoriesSection       │
   │   ├─ Header (title only)       │
   │   └─ Grid → publicRepos.map()  │
   │       └─ Project Cards (11)     │
   ├─────────────────────────────────┤
   │ MiniProjectsSection             │
   │   ├─ Header (title only)       │
   │   └─ Grid → miniProjects.map() │
   │       └─ Project Cards (7)     │
   └─────────────────────────────────┘
```

### Data Flow

1. **Import Phase**: Each section component imports its data directly from `src/data/projects.js`:
   - `CaseStudiesSection` imports `caseStudies`
   - `PublicRepositoriesSection` imports `publicRepositories`
   - `MiniProjectsSection` imports `miniProjects`

2. **Mapping Phase**: Each section uses `.map()` to transform the data array into React elements:
   - Key generation: `key={project.title}` or `key={project.name}`
   - Index tracking: `String(index + 1).padStart(3, '0')` for display numbers

3. **Interaction Flow**:
   - **Case Studies**: Primary button links to external PDF (`/docs/Shafiq-Imtiaz-Resume.pdf`) or internal route (`/about`); secondary button routes to `/contact`
   - **Public Repositories**: LIVE_DEMO_ button (if `demoUrl` exists) opens external URL; VIEW_REPO_ always links to GitHub
   - **Mini Projects**: VIEW_PROJECT_ opens the standalone HTML file in a new tab

### Component Lifecycle

- **Mount**: PageShell wraps content → renders header → renders three sections in DOM order
- **Interaction**: Hover states trigger CSS transitions (border color, background, translate)
- **Navigation**: Button clicks route to external URLs (GitHub, Netlify, YouTube) or internal React Router paths

---

## Integration

### External Dependencies

| Dependency | Source | Usage |
|------------|--------|-------|
| `PageShell` | `src/components/layout/index.jsx` | Page wrapper providing layout structure, metadata |
| `Button` | `src/components/ui/index.jsx` | Action buttons with variant support (`primary`, `secondary`, `ghost`) |
| `caseStudies` | `src/data/projects.js` | Professional project data (4 entries) |
| `publicRepositories` | `src/data/projects.js` | GitHub repository data (11 entries) |
| `miniProjects` | `src/data/projects.js` | Standalone demo data (7 entries) |

### CSS/Tailwind Integration

The components use Tailwind CSS extensively:

- **Layout**: `grid`, `flex`, `gap-6`, `mt-24`, `pb-8`
- **Responsive**: `sm:grid-cols-2`, `xl:grid-cols-3`
- **Typography**: `font-headline`, `text-[clamp(...)]`, `tracking-[0.18em]`, `uppercase`
- **Theming**: `var(--theme-*)` custom properties throughout
- **Hover Effects**: `hover:-translate-y-0.5`, `hover:border-[...]`, `hover:bg-[...]`
- **Decorative**: `grid-pattern-panel` class for background texture

### Routing Integration

- **Internal Routes**: Case study buttons use React Router via `to` prop (`/about`, `/contact`)
- **External URLs**: GitHub repos, Netlify demos, PDF resume use `href` with `target="_blank"` and `rel="noreferrer"`
- **Standalone Files**: Mini projects link to static HTML files in `/public/projects/`

### Theme System

The components depend on CSS custom properties defined at the theme level:

- `--theme-primary` — Cyan accent (case studies, primary buttons)
- `--theme-secondary` — Green accent (mini projects)
- `--theme-tertiary` — Purple/tertiary accent (tech tags, repo borders)
- `--theme-text` — Primary text color
- `--theme-text-muted` — Secondary text color
- `--theme-surface` — Card background
- `--theme-surface-low` — Card background (lower elevation)
- `--theme-surface-high` — Elevated surface
- `--theme-surface-lowest` — Lowest elevation
- `--theme-outline-variant` — Subtle border color

---

## Key Architectural Decisions

1. **Data Co-location**: All project data lives in a single `src/data/projects.js` file, enabling easy maintenance and overview of the entire portfolio in one place.

2. **Section Decomposition**: Each project category is isolated in its own component, allowing independent updates without affecting other sections.

3. **Consistent Card Pattern**: Despite different data shapes, all project cards follow the same visual pattern (header → title → description → tags → actions), creating visual uniformity.

4. **No State Management**: The Projects page is purely presentational — no local state, no context consumption, no side effects. Data flows one-way from static imports to rendered output.

5. **Accessibility Considerations**: External links use `rel="noreferrer"` for security; buttons have clear labels; semantic `<article>` elements wrap each project card.

6. **Performance**: Static data import means zero runtime data fetching — the page renders immediately with pre-bundled content.