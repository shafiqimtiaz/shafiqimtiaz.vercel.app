# src/components/ui/

Universal reusable UI component library. Provides consistent styling primitives and interactive elements across the entire application through CSS custom properties (theme variables) and Tailwind CSS utilities.

## Responsibility

Core responsibility: Provide low-level UI primitives and interactive components that enforce consistent design language (fonts, colors, spacing, animations) throughout the portfolio.

### Component Inventory

| Component | File | Purpose |
|-----------|------|---------|
| **Button** | `Button.jsx` | Multivariant navigation/action button with Link, anchor, and button rendering modes |
| **TerminalPanel** | `TerminalPanel.jsx` | Terminal window container with window chrome (traffic lights), CRT scanline overlay |
| **TerminalPlayback** | `TerminalPlayback.jsx` | Interactive terminal command simulator with suggestion dropdown and output display |
| **SectionHeader** | `SectionHeader.jsx` | Page/section heading with label, title, description, and optional action link |

### File Structure

```
src/components/ui/
├── Button.jsx           # 54 lines - Button component
├── SectionHeader.jsx   # 49 lines - Section heading component
├── TerminalPanel.jsx    # 31 lines - Terminal container
├── TerminalPlayback.jsx # 63 lines - Terminal interaction
├── index.js             # 4 lines - Barrel export
└── codemap.md          # This file
```

## Design

### Architectural Patterns

#### 1. Theme Integration (CSS Custom Properties)

All components reference CSS variables defined in `:root` or theme providers:

```css
/* Core theme colors */
--theme-primary          /* Brand accent */
--theme-secondary        /* Secondary accent */
--theme-tertiary         /* Tertiary/highlight accent */
--theme-text             /* Primary text */
--theme-text-muted       /* Muted text */
--theme-surface          /* Surface backgrounds */
--theme-surface-low     /* Low surface */
--theme-surface-highest   /* Highest surface */
--theme-outline-variant /* Borders */
--shadow-primary        /* Shadows */
```

These variables are consumed as Tailwind arbitrary values: `bg-[var(--theme-primary)]`, `text-[var(--theme-text)]`.

#### 2. Font System

All components use `font-headline` (custom font class) with standardized tracking:

- Letter spacing: `tracking-[0.18em]`, `tracking-[0.22em]`, `tracking-[0.12em]`
- Font sizes: `text-[0.64rem]`, `text-[0.72rem]`, `text-[0.9rem]`

#### 3. Button Variant Pattern

```jsx
// Button.jsx lines 14-23
const variants = {
  primary: 'on-primary-text bg-[var(--theme-primary)] hover:-translate-y-px hover:brightness-105',
  secondary: 'border border-[var(--theme-secondary)] bg-transparent ...',
  orange: 'bg-[var(--theme-tertiary)] ...',
  ghost: 'border border-[rgba(73,72,71,0.22)] bg-[var(--theme-surface-low)] ...',
  info: 'bg-[var(--theme-secondary)] ...',
};
```

| Variant | Use Case |
|---------|----------|
| `primary` | Primary CTAs, call-to-action buttons |
| `secondary` | Secondary actions, navigation |
| `orange` | Highlight/special actions |
| `ghost` | Subtle actions, inline buttons |
| `info` | Informational buttons |

#### 4. CRT Overlay Effect

```jsx
// TerminalPanel.jsx line 11
<div className="crt-overlay pointer-events-none absolute inset-0 z-10"></div>
```

The CRT overlay adds terminal authenticity - likely styled via global CSS with scanline/re flicker effects.

#### 5. State Machine Pattern (TerminalPlayback)

```
PLAYBACK_STATES (from ../../hooks/useTerminalPlayback.js)

idle → suggesting → executing → rendered
         ↑_______________↓ (transitions)
```

States:
- `idle` - Default state, showing prompt with placeholder "focus_or_hover_for_suggestions"
- `suggesting` - Shows action buttons on hover/focus
- `executing` - Shows "executing_command ..." with delay
- `rendered` - Displays output lines

### Styling Conventions

- **Animations**: `transition-all duration-200`, hover transforms (`-translate-y-px`)
- **Borders**: Semi-transparent `rgba(73,72,71,0.22)` for subtle borders
- **Shadows**: Theme variable `shadow-[var(--shadow-primary)]`
- **Z-index layering**: `z-10` (CRT overlay), `z-20` (content)

### Component Props Interfaces

#### Button

```jsx
Button({
  variant: 'primary' | 'secondary' | 'orange' | 'ghost' | 'info',
  href: string,           // Anchor href
  to: string,            // React Router path
  className: string,     // Tailwind overrides
  children: ReactNode,   // Button content
  ...props               // Spread to rendered element
})
```

Renders as `<Link>` (React Router) if `to` provided, `<a>` if `href` provided, otherwise `<button>`.

#### TerminalPanel

```jsx
TerminalPanel({
  title: string,           // Window title bar text
  className: string,       // Panel wrapper classes
  bodyClassName: string,   // Body content classes
  children: ReactNode       // Panel content
})
```

#### TerminalPlayback

```jsx
TerminalPlayback({
  sessionConfig: {
    prompt: string,        // Shell prompt (e.g., "ssh user@host")
    label: string,         // Optional label
    actions: [{            // Command options
      id: string,
      label: string,
      command: string,
      output: string[],
      delayMs: number
    }]
  }
})
```

#### SectionHeader

```jsx
SectionHeader({
  label: string,           // Eyebrow label (small caps above title)
  title: string,          // Main heading
  description: string,    // Body text
  actionLink: {           // Optional action
    label: string,
    href: string,         // External link
    to: string            // Internal route
  },
  className: string       // Wrapper classes
})
```

The action link displays conditionally on the right (desktop) with responsive behavior: stacked on mobile, inline on desktop.

## Flow

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Page/Route                            │
│  (HeroSection, TerminalSection, ContactFormSection, etc.)  │
└─────────────────────────┬─────────────────────────────────────┘
                          │ imports
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   src/components/ui/                         │
│  ┌──────────┐ ┌──────────────┐ ┌───────────────────────┐     │
│  │  Button  │ │ TerminalPanel│ │ TerminalPlayback     │     │
│  └────┬─────┘ └──────┬───────┘ └───────────┬───────────┘     │
│       │               │                    │                 │
│       │               │         ┌───────────┴───────────┐     │
│       │               │         │ useTerminalPlayback   │     │
│       │               │         │ (hook/state machine) │     │
│       │               │         └───────────────────────┘     │
���  ┌────┴──────┐ ┌──────┴──────┐                               │
│  │ Link/     │ │  CRT        │                               │
│  │ <a>/      │ │  Overlay    │                               │
│  └──────────┘ └─────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

### Control Flow

#### Button
1. `to` prop → renders `<Link>` (React Router)
2. `href` prop → renders `<a>` (anchor)
3. Neither → renders `<button>` (native)

#### TerminalPlayback
1. User hovers/focuses → reveals suggestions (state: `suggesting`)
2. User clicks action button → `executeCommand(action.command)`
3. State transitions to `executing` → timeout delay → `rendered` with output
4. User hovers away → state returns to `idle` or keeps `rendered` if output exists

### CSS Custom Properties Usage

All visual styling derives from theme variables, enabling:
- Single-source theme changes (global CSS update affects all components)
- Consistent brand colors across all UI elements
- Easy dark/light mode transitions through different variable values

## Integration

### Consumer Pages/Components

| UI Component | Consumer | Usage |
|--------------|----------|-------|
| **Button** | `src/pages/Home/HeroSection.jsx` | Primary CTA button |
| **Button** | `src/pages/Projects/CaseStudiesSection.jsx` | Project navigation buttons |
| **Button** | `src/pages/Projects/PublicRepositoriesSection.jsx` | Repo links |
| **Button** | `src/pages/Projects/MiniProjectsSection.jsx` | Mini project buttons |
| **Button** | `src/pages/Contact/ContactFormSection.jsx` | Form actions |
| **TerminalPanel** | `src/pages/Home/TerminalSection.jsx` | Terminal demo container |
| **TerminalPanel** | `src/pages/Contact/ContactFormSection.jsx` | Contact form panel |
| **TerminalPlayback** | `src/pages/Home/TerminalSection.jsx` | Interactive terminal session |
| **SectionHeader** | (Not currently exported to consumers) | Reserved for future use |

### Dependency Graph

```
src/
├── components/ui/
│   ├── Button.jsx
│   │   └── react-router (Link component)
│   ├── TerminalPanel.jsx
│   │   └── (no external deps - pure presentational)
│   ├── TerminalPlayback.jsx
│   │   └── hooks/useTerminalPlayback.js
│   │       └── react (useState, useCallback, useEffect, useMemo, useRef)
│   ├── SectionHeader.jsx
│   │   └── react-router (Link component)
│   └── index.js (barrel export)
│
└── pages/
    ├── Home/
    │   ├── HeroSection.jsx ────────► Button (primary)
    │   └── TerminalSection.jsx ─► TerminalPanel, TerminalPlayback
    ├── Projects/
    │   ├── CaseStudiesSection.jsx ──► Button
    │   ├── PublicRepositoriesSection.jsx ► Button
    │   └── MiniProjectsSection.jsx ────► Button
    └── Contact/
        └── ContactFormSection.jsx ──► TerminalPanel, Button
```

### Hook Integration: useTerminalPlayback

The `useTerminalPlayback` hook (lines 17-76 in `src/hooks/useTerminalPlayback.js`) is the core state manager for terminal interaction:

```javascript
// Exported from hook
export const PLAYBACK_STATES = {
  idle: 'idle',
  suggesting: 'suggesting',
  executing: 'executing',
  rendered: 'rendered',
};

// Hook returns
{
  state,           // Current PLAYBACK_STATES
  activeCommand,  // Currently selected command
  outputLines,    // Array of output strings to display
  revealSuggestions,  // () => void - show action buttons
  hideSuggestions,    // () => void - hide action buttons
  executeCommand,     // (command) => void - execute and show output
}
```

This hook is the **only external React hook dependency** in the ui components.

### Not Currently Used

- **SectionHeader**: Defined but not consumed by any page/component. Likely reserved for future section additions or refactoring.

### Global CSS Dependencies

The UI components rely on CSS defined elsewhere (likely `src/app.css` or Tailwind config):

- `font-headline` - Custom font family
- `.crt-overlay` - CRT scanline/terminal effect
- Theme CSS custom properties in `:root`

### Design System Alignment

These components enforce the portfolio's design system:

1. **Typography**: `font-headline`, specific tracking values, consistent sizes
2. **Spacing**: Standardized with Tailwind utilities (`p-6`, `gap-3`, etc.)
3. **Interactivity**: Hover states (`-translate-y-px`, brightness changes)
4. **Theming**: All colors via CSS variables for consistent branding