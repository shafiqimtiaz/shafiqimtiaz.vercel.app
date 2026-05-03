# src/components/

Component library for the portfolio application. Houses all React UI primitives, layout shells, and navigation elements.

---

## Responsibility

The `src/components/` directory is the **visual layer** of the application. It translates application state and data into rendered HTML elements, handling:

1. **UI Primitives** — Reusable, generic components (Button, SectionHeader) that can appear anywhere
2. **Domain Components** — Terminal-themed components (TerminalPanel, TerminalPlayback) that embody the site's "cli-like" aesthetic
3. **Layout Shells** — Structural containers (PageShell) that establish page geometry
4. **Navigation** — Global elements (Navbar, Footer, ThemeToggle) that provide site-wide structure

This layer sits between the **page layer** (src/app/) and the **data layer** (src/data/, src/hooks/). Pages import components, pass data as props, and components render that data. No business logic lives here —only presentational concerns and user interaction handlers.

---

## Design

### Component Organization

```
src/components/
├── ui/                    # Reusable UI primitives
│   ├── Button.jsx         # Multi-variant button component
│   ├── SectionHeader.jsx  # Section title + meta component
│   ├── TerminalPanel.jsx # Terminal window container
│   ├── TerminalPlayback.jsx # Interactive terminal CLI simulator
│   └── index.js          # Barrel export
├── layout/                # Layout shells
│   ├── PageShell.jsx     # Main content container
│   └── index.js          # Barrel export
├── Navbar.jsx             # Fixed header with navigation
├── Footer.jsx            # Site footer
└── ThemeToggle.jsx       # Light/dark mode switcher
```

### React Patterns

**Component Composition**: Components are composed through explicit children or data props. No context dependencies in UI components—the Navbar reads link data from `../data/links`, but all other components receive everything via props.

**Props Interface**: Each component exposes a clear props interface:

```jsx
// Example: Button.jsx
{
  variant?: 'primary' | 'secondary' | 'orange' | 'ghost' | 'info',
  href?: string,           // External link
  to?: string,            // Internal React Router link
  className?: string,     // Additional classes
  children: ReactNode,
  ...props                // Forwarded to root element
}
```

**Barrel Exports**: The ui/ and layout/ directories each have an index.js exporting all components. Consumers import like:

```jsx
import { Button, TerminalPanel, PageShell } from '../components/ui';
import { PageShell } from '../components/layout';
```

**Dual-Link Support**: The Button and SectionHeader components support both external links (`href`) and internal React Router routes (`to`). The component chooses the appropriate element (anchor vs. Link) based on which prop is provided.

### Styling Approach

**Tailwind CSS + CSS Custom Properties**: The component library uses a hybrid styling approach:

- **Tailwind** utilities for layout, spacing, typography, transitions
- **CSS custom properties** for theming (light/dark mode)

All colors reference CSS variables like `var(--theme-primary)`, `var(--theme-surface)`, `var(--theme-text-muted)`. The theme system is defined in the global CSS and switched via a class on the root element (handled by useTheme hook).

**Theme Variables** (defined in global CSS):
- `--theme-primary` — Main accent color (cyan/teal)
- `--theme-secondary` — Secondary accent (orange/amber)
- `--theme-tertiary` — Tertiary accent (orange)
- `--theme-text` / `--theme-text-muted` — Text colors
- `--theme-surface` / `--theme-surface-low` / `--theme-surface-high` — Background layers
- `--theme-outline-variant` — Border/dividers
- `--theme-error-dim` — Window control red

**Typography**: Uses Google Fonts "Headline" font family throughout via the `.font-headline` custom class. Consistent sizing (0.65rem–0.72rem), letter-spacing (0.18em–0.22em), uppercase transformation.

**Component Styling Patterns**:

- Fixed min-heights for interactive elements (min-h-11, min-h-12)
- Horizontal padding (px-3.5, px-5) for tap targets
- Letter-spacing and uppercase for "terminal" aesthetic
- Hover states with subtle Y translation (`hover:-translate-y-px`)
- Border styling for depth (`border-[rgba(73,72,71,0.35)]`)

---

## Flow

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  src/data/links.js                                           │
│  (navLinks, footerLinks arrays)                              │
└──────────────────────┬──────────────────────────────────┘
                       │ imports
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  src/components/Navbar.jsx                                   │
│  src/components/Footer.jsx                                   │
│  (renders navLinks/footerLinks via useLocation + mapping)    │
└──────────────────────┬──────────────────────────────────┘
                       │ renders
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  PageShell Layout (in page layouts)                          │
└──────────────────────┬──────────────────────────────────┘
                       │ wraps
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Page Content Components                                      │
│  (Home/Sections/+page.jsx, etc.)                             │
└──────────────────────┬──────────────────────────────────┘
                       │ imports
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  UI Components (Button, TerminalPanel, TerminalPlayback)    │
│  (receive sessionConfig/data as props, render output)       │
└──────────────────────┬──────────────────────────────────┘
                       │ uses
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  src/hooks/                                                  │
│  (useTheme for theming, useTerminalPlayback for terminal)  │
└───────────────────────────────────���─��───────────────────────┘
```

### Control Flow

**Page Rendering**:
1. Page component (e.g., /src/app/Sections/+page.jsx) renders
2. Imports UI components from src/components/ui/
3. Passes data (e.g., sessionConfig) as props
4. Page wraps content in PageShell from src/components/layout/
5. Layout wraps in _app.jsx which includes Navbar and Footer globally

**Navigation Interaction**:
1. User clicks Navbar link or internal Link
2. React Router handles route change
3. Navbar useEffect detects location change, closes mobile menu
4. New page renders with fresh data

**Terminal Playback Flow**:
1. TerminalPlayback receives sessionConfig (prompt, label, actions array)
2. Uses useTerminalPlayback hook internally
3. States: idle → suggesting (on hover/focus) → executing (on click)
4. Executes command, outputs lines render in TerminalPanel
5. Output displayed with left border accent

**Theme Toggle Flow**:
1. User clicks ThemeToggle button
2. Calls toggleTheme() from useTheme hook
3. Hook updates localStorage and document class
4. CSS custom properties swap to dark/light values
5. All components re-render with new color values

### Component Composition Examples

**Terminal Panel Composition**:
```jsx
<TerminalPanel title="ssh root@614.514.183">
  <TerminalPlayback sessionConfig={section.commands.one} />
  <TerminalPlayback sessionConfig={section.commands.two} />
</TerminalPanel>
```

**Section Composition**:
```jsx
<PageShell>
  <SectionHeader
    label="01"
    title="Projects"
    description="Full-stack applications..."
  />
  <TerminalPanel>
    {/* content */}
  </TerminalPanel>
</PageShell>
```

---

## Integration

### Page Layer Connection

Components connect to pages through direct imports. Pages in `src/app/` import what they need:

```jsx
// src/app/Sections/+page.jsx (example structure)
import { PageShell } from '../components/layout';
import { SectionHeader, TerminalPanel, TerminalPlayback } from '../components/ui';
import { projectsSession } from '../data/sessions';

export default function SectionsPage() {
  return (
    <PageShell>
      <SectionHeader
        label="01"
        title="Projects"
        description="Full-stack applications built with modern frameworks."
      />
      <TerminalPanel title="ssh root@614.514.183">
        {projectsSession.commands.map(cmd => (
          <TerminalPlayback key={cmd.id} sessionConfig={cmd} />
        ))}
      </TerminalPanel>
    </PageShell>
  );
}
```

### Data Layer Connection

Components pull data from `src/data/` directories:

- **Navbar.jsx**: Imports `navLinks` from `../data/links`
- **Footer.jsx**: Imports `footerLinks` from `../data/links`
- **TerminalPlayback.jsx**: Receives `sessionConfig` prop with prompt, label, actions array from page data

No direct database or API connections exist in components—they receive all data via props or static imports.

### Hook Integration

Two custom hooks provide core functionality:

| Hook | Used By | Purpose |
|------|---------|---------|
| `useTheme` | ThemeToggle | Manages light/dark mode, persists to localStorage |
| `useTerminalPlayback` | TerminalPlayback | State machine for terminal interaction (states: idle, suggesting, executing) |

These hooks live in `src/hooks/` and are the only non-component logic that components depend on.

### Layout Integration

The application uses a nested layout structure:

```
src/app/_app.jsx (root layout)
├── Navbar (fixed at top)
├── <Outlet /> (page content renders here)
└── Footer (at bottom)
```

Page content wraps in `PageShell` for consistent max-width and header offset. PageShell applies:

- `mx-auto` for centering
- `w-[min(100%-2rem,var(--container-width))]` for max-width constraints
- `pt-[calc(var(--header-height)+var(--page-top-spacing))]` for header clearance

### Global Elements

**Always Present**:
- Navbar (fixed header)
- Footer
- ThemeToggle (in Navbar)

These render in the root layout and persist across route changes.

### CSS Integration

Components rely on:

- **Tailwind CSS** (via Vite PostCSS configuration)
- **CSS Custom Properties** (defined in src/index.css)
- **Google Fonts** (Headline font loaded via HTML link)

The CRT overlay effect on TerminalPanel uses a custom `.crt-overlay` class with pointer-events disabled, creating a subtle scanline/glass effect over the terminal content.

---

## Key Dependencies

| Location | Purpose |
|----------|---------|
| `../data/links.js` | Navigation and footer link definitions |
| `../../hooks/useTerminalPlayback` | Terminal state management |
| `../hooks/useTheme` | Theme state and toggling |
| React Router | Link component for internal navigation |
| material-symbols-outlined | Icon font (Google Fonts) |

No external npm packages are directly imported in components—they rely on framework primitives (React, React Router) and tooling (Tailwind).