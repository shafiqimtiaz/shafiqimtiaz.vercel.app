# src/data/

## Responsibility

The `src/data/` directory serves as the **centralized static data layer** for the portfolio application. It contains all hardcoded content, configuration constants, and structured data that drives the UI across all pages. This folder acts as the single source of truth for content that does not require dynamic fetching or API integration — essentially the "content database" for a statically generated portfolio site.

The data folder is responsible for:

- **Content Management**: All visible text, labels, and messaging that appears on the site
- **Configuration**: Navigation structure, theme-aware styling tokens, playback timing constants
- **Structured Data**: Complex nested objects representing career history, projects, tech stack, and statistics
- **Theme Integration**: CSS variable references (`var(--theme-primary)`, etc.) embedded directly in data for accent styling

This approach decouples content from component logic, enabling non-developers to update portfolio content by editing JavaScript objects without touching React components.

---

## Design

### Data Structures and Constants

The folder contains 6 JavaScript modules, each serving a distinct content domain:

#### 1. `experience.js` — Career and Technical Skills Data

**Exports:**

- `techStack` (Array): 6-category technical skills taxonomy
- `timeline` (Array): Chronological career/education entries

**Structure — techStack:**

```javascript
{
  icon: string,           // Material Icon name
  accent: string,        // CSS class for theme color (e.g., 'text-[var(--theme-primary)]')
  code: string,          // Three-digit identifier (e.g., '001')
  title: string,         // Category label (e.g., 'LANGUAGE_CORE')
  items: string[]        // Array of technology/skill names
}
```

**Structure — timeline:**

```javascript
{
  date: string,          // Date range or single date
  title: string,         // Position/certification title
  org: string,          // Organization name + location
  accent: string,        // Theme-aware border/text classes
  icon: string,          // Material Icon identifier
  details: string[],     // Bullet points describing responsibilities
  credentialUrl?: string // Optional URL for certifications
}
```

**Design Rationale**: The `code` field enables deterministic ordering and referencing. The `accent` field embeds theme coupling directly in data, allowing per-entry color customization without component logic.

---

#### 2. `projects.js` — Project Portfolio Data

**Exports:**

- `caseStudies` (Array): Major work achievements (4 entries)
- `miniProjects` (Array): Small standalone demos (7 entries)
- `publicRepositories` (Array): GitHub repositories (12 entries)
- `historyCards` (Array): Highlight cards for home page (6 entries)

**Structure — caseStudies:**

```javascript
{
  code: string,                    // Identifier (e.g., '001')
  label: string,                   // Category tag
  highlights: string,              // Short highlight label
  details: string[],               // Bullet points
  title: string,                   // Project title
  description: string,             // Full description
  tags: string[],                  // Technology tags
  primary: { label, href?, to?, external? },  // Primary CTA
  secondary: { label, href?, to? } // Secondary CTA
}
```

**Structure — miniProjects:**

```javascript
{
  name: string,
  description: string,
  href: string,           // Relative URL to static HTML file
  tags: string[]
}
```

**Structure — publicRepositories:**

```javascript
{
  title: string,
  description: string,
  repoUrl: string,        // GitHub repository URL
  demoUrl?: string,      // Optional live demo URL
  techStack: string[]    // Technology tags
}
```

**Structure — historyCards:**

```javascript
{
  type: 'compact' | 'split',  // Layout variant
  accent: string,             // Theme-aware border class
  icon: string,               // Material Icon name
  label: string,              // Category tag
  title: string,              // Card title
  description: string,        // Body text
  metrics?: string[],         // For 'split' type: key metrics
  tags?: string[]            // Optional hashtags
}
```

**Design Rationale**: Multiple exports allow granular importing — pages only import what they need. The `type` field in `historyCards` enables component-level layout variation without separate data structures.

---

#### 3. `stats.js` — Quantitative Metrics Data

**Exports:**

- `homeStats` (Array): Stats displayed on home page (4 entries)
- `aboutStats` (Array): Stats displayed on about page (3 entries)
- `profileStats` (Array): Stats displayed in profile section (3 entries)

**Structure:**

```javascript
{
  value: string,      // Display value (e.g., '500+', '99.97%')
  label: string,     // Metric description
  accent: string     // Theme-aware text class
}
```

**Design Rationale**: Duplicated across pages with slight variations — `homeStats` includes revenue metric not relevant to About page. This avoids conditional rendering logic in components.

---

#### 4. `terminalPlayback.js` — Terminal Animation Data

**Exports:**

- `DEFAULT_PLAYBACK_DELAY_MS` (Number): Global timing constant (2000ms)
- `HOME_TERMINAL_PLAYBACK` (Object): Terminal session configuration

**Structure:**

```javascript
{
  id: string,
  session: string,
  prompt: string,           // Shell prompt prefix
  label: string,            // Component label
  fallbackOutput: string,   // Error message for invalid commands
  actions: [
    {
      id: string,
      label: string,
      command: string,       // Simulated CLI command
      delayMs: number,      // Per-action delay
      output: string[]      // Lines of simulated output
    }
  ]
}
```

**Design Rationale**: The `actions` array defines a linear sequence of simulated terminal commands. Each action has its own delay, enabling staggered animation timing. The `fallbackOutput` provides user feedback if they attempt to run undefined commands.

---

#### 5. `links.js` — Navigation and External References

**Exports:**

- `navLinks` (Array): Primary navigation items
- `externalNodes` (Array): Social/external link icons
- `systemStatus` (Array): Status indicators for contact page
- `infoColumns` (Array): Info blocks for contact page
- `contactPageText` (Object): Contact page content
- `footerLinks` (Array): Footer navigation links

**Structure — navLinks:**

```javascript
{ label: string, to: string }  // React Router path
```

**Structure — externalNodes:**

```javascript
{
  label: string,
  icon: string,
  href: string,           // External URL (mailto, https)
  accent: string          // Theme-aware color class
}
```

**Structure — systemStatus:**

```javascript
{ label: string, value: string, accent: string }
```

**Structure — infoColumns:**

```javascript
{
  heading: string,
  lines: string[]         // Array of text lines
}
```

**Structure — contactPageText:**

```javascript
{
  badge: string,
  title: string,
  highlight: string,      // Word to highlight in title
  description: string
}
```

**Design Rationale**: Centralizes all navigation and link configuration in one module. The `accent` field pattern mirrors `experience.js` for consistent theme integration.

---

#### 6. `contactForm.js` — Form Field Configuration

**Exports:**

- `contactFormFields` (Array): Form input definitions

**Structure:**

```javascript
{
  name: string,           // Input name attribute
  label: string,          // Field label
  prefix: string,         // Terminal-style prefix (e.g., 'guest@system:~$')
  type: string,          // Input type ('text', 'email', 'textarea')
  placeholder: string,
  required: boolean,
  rows?: number           // For textarea only
}
```

**Design Rationale**: Form configuration is data-driven, allowing field changes without component modification. The `prefix` field maintains the terminal aesthetic across form inputs.

---

### Content Organization Patterns

**Common Patterns Across All Modules:**

1. **Theme Coupling via `accent` Field**: Most data objects include an `accent` property containing CSS classes like `text-[var(--theme-primary)]`. This embeds theme-aware styling directly in content data.

2. **Code/ID Fields**: Projects and tech categories use string codes (`'001'`, `'002'`) for deterministic ordering and potential cross-referencing.

3. **Optional URL Fields**: Objects with optional `href`, `to`, `repoUrl`, `demoUrl`, or `credentialUrl` fields use optional chaining (`?`) in data structure.

4. **Material Icons**: All icon references use Google Material Icons string identifiers (e.g., `'terminal'`, `'work'`, `'groups'`).

5. **Underscore Naming**: Labels and titles use underscore casing (e.g., `HOME_TERMINAL_PLAYBACK`, `LANGUAGE_CORE`) for terminal/CLI aesthetic consistency.

---

## Flow

### Data Consumption Pipeline

```
src/data/*.js (Static Data)
        │
        ▼
    Direct Import
        │
        ▼
  React Components
        │
        ▼
   Rendered Pages
```

**No intermediate layer**: Data is imported directly into React components using ES6 named exports. There is no data transformation layer, API abstraction, or state management integration — data flows directly from module to component props.

### Import Relationships

| Data Module           | Imported By                                                                                                | Usage Context                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `experience.js`       | `TechStackSection.jsx`, `TimelineSection.jsx`                                                              | About page — tech skills grid and career timeline                                |
| `projects.js`         | `CaseStudiesSection.jsx`, `MiniProjectsSection.jsx`, `PublicRepositoriesSection.jsx`, `HistorySection.jsx` | Projects page (case studies, mini projects, repos) and Home page (history cards) |
| `stats.js`            | `StatsSection.jsx` (Home), `ProfileSection.jsx` (About)                                                    | Home and About page metric displays                                              |
| `terminalPlayback.js` | `TerminalSection.jsx`                                                                                      | Home page terminal animation                                                     |
| `links.js`            | `Navbar.jsx`, `Footer.jsx`, `StatusSection.jsx` (Contact), `Contact/index.jsx`                             | Global navigation, footer, and contact page content                              |
| `contactForm.js`      | `ContactFormSection.jsx`                                                                                   | Contact page form field configuration                                            |

### Data Flow Example: Home Page

```
homeStats (stats.js) ──► StatsSection.jsx ──► Home Page
historyCards (projects.js) ──► HistorySection.jsx ──► Home Page
HOME_TERMINAL_PLAYBACK (terminalPlayback.js) ──► TerminalSection.jsx ──► Home Page
```

### Data Flow Example: About Page

```
techStack (experience.js) ──► TechStackSection.jsx ──► About Page
timeline (experience.js) ──► TimelineSection.jsx ──► About Page
profileStats (stats.js) ──► ProfileSection.jsx ──► About Page
```

### Data Flow Example: Contact Page

```
navLinks, externalNodes, systemStatus, infoColumns (links.js) ──► StatusSection.jsx ──► Contact Page
contactPageText (links.js) ──► Contact/index.jsx ──► Contact Page
contactFormFields (contactForm.js) ──► ContactFormSection.jsx ──► Contact Page
```

---

## Integration

### Consumer Components and Pages

#### Home Page (`/`)

- **StatsSection.jsx**: Consumes `homeStats` — displays 4 metric cards (concurrent requests, uptime, revenue, test coverage)
- **HistorySection.jsx**: Consumes `historyCards` — displays 6 highlight cards in a grid
- **TerminalSection.jsx**: Consumes `HOME_TERMINAL_PLAYBACK` — renders animated terminal with 4 sequential command outputs

#### About Page (`/about`)

- **TechStackSection.jsx**: Consumes `techStack` — renders 6-category skill grid with icons and technology lists
- **TimelineSection.jsx**: Consumes `timeline` — renders chronological career/education entries (5 positions + 1 certification)
- **ProfileSection.jsx**: Consumes `profileStats` — displays 3 profile metrics (years uptime, deployments, incidents)

#### Projects Page (`/projects`)

- **CaseStudiesSection.jsx**: Consumes `caseStudies` — renders 4 major work case studies with tags and CTAs
- **MiniProjectsSection.jsx**: Consumes `miniProjects` — renders 7 standalone demo project cards
- **PublicRepositoriesSection.jsx**: Consumes `publicRepositories` — renders 12 GitHub repository cards with tech stack tags

#### Contact Page (`/contact`)

- **StatusSection.jsx**: Consumes `externalNodes`, `systemStatus`, `infoColumns` — renders social links, availability status, and info columns
- **Contact/index.jsx**: Consumes `contactPageText` — renders page title, badge, and description
- **ContactFormSection.jsx**: Consumes `contactFormFields` — renders form with dynamically configured fields

#### Global Components

- **Navbar.jsx**: Consumes `navLinks` — renders primary navigation menu (Home, Projects, About, Contact)
- **Footer.jsx**: Consumes `footerLinks` — renders footer links (GitHub, LinkedIn, Resume, Contact)

### Integration Summary

| Page/Component | Route       | Data Imports                                                                           |
| -------------- | ----------- | -------------------------------------------------------------------------------------- |
| Home Page      | `/`         | `homeStats`, `historyCards`, `HOME_TERMINAL_PLAYBACK`                                  |
| About Page     | `/about`    | `techStack`, `timeline`, `profileStats`                                                |
| Projects Page  | `/projects` | `caseStudies`, `miniProjects`, `publicRepositories`                                    |
| Contact Page   | `/contact`  | `contactPageText`, `externalNodes`, `systemStatus`, `infoColumns`, `contactFormFields` |
| Navbar         | Global      | `navLinks`                                                                             |
| Footer         | Global      | `footerLinks`                                                                          |

### No-Build-Time Data

All data in this folder is **static at build time**. There is no:

- API fetching
- Database connection
- Environment variable interpolation
- Runtime configuration loading

This aligns with the portfolio's static site generation (SSG) architecture via Vercel. Content updates require a rebuild/deploy cycle.

---

## Architectural Notes

### Why This Structure Works

1. **Single Responsibility**: Each file handles one content domain (experience, projects, stats, etc.)
2. **Explicit Dependencies**: Components import only what they need
3. **Theme Isolation**: CSS variable references are encapsulated in data, not scattered across components
4. **Easy Maintenance**: Adding a new project, skill, or timeline entry requires only editing the relevant data file
5. **Type Safety Potential**: The structured objects could be enhanced with JSDoc or TypeScript interfaces for stricter validation

### Potential Improvements

- **TypeScript Migration**: Convert `.js` files to `.ts` with explicit interfaces for compile-time validation
- **Content Separation**: Move large text content (like `timeline` details) to separate `.json` files for easier non-developer editing
- **i18n Preparation**: The underscore-cased labels (`LANGUAGE_CORE`, `SOFTWARE_ENGINEER`) could be replaced with i18n keys for internationalization
