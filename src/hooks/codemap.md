# src/hooks/

<!-- Explorer: Fill in this section with architectural understanding -->

## Responsibility

This directory contains three custom React hooks that encapsulate reusable stateful logic for the portfolio application:

1. **`useTheme.js`** - Theme management hook that provides light/dark mode toggle functionality with localStorage persistence and automatic CSS class application to the document root.

2. **`useTerminalPlayback.js`** - Terminal playback hook that implements a state machine for simulating interactive CLI sessions, managing command execution, suggestion visibility, and timed output rendering.

3. **`useScrollProgress.js`** - Scroll tracking hook that provides scroll progress percentage and active section detection for single-page navigation.

---

## Design

### useTheme Hook

**State Management Pattern**: Single source of truth with synchronized persistence.

- **Primary State**: `theme` (string: `'light'` | `'dark'`)
- **Derived State**: `isDark` (boolean) computed from theme value
- **Persistence**: localStorage key `'portfolio-theme'` with graceful fallback to `'dark'` on error
- **Side Effects**: CSS class toggling on `document.documentElement` via `classList` and `data-theme` attribute

**Key Design Decisions**:
- Normalization function ensures only `'light'` or `'dark'` values are stored
- Error swallowing on localStorage read/write to prevent SSR/incognito mode crashes
- CSS classes applied: `theme-light` / `dark` (mutually exclusive), plus `data-theme` attribute for CSS variable targeting

**Returned API**:
```javascript
{
  theme: string,           // 'light' | 'dark'
  isDark: boolean,        // theme === 'dark'
  setTheme: function,      // direct setter
  toggleTheme: function   // convenience toggle
}
```

### useTerminalPlayback Hook

**State Management Pattern**: Finite state machine with timer-based transitions.

**State Machine** (4 states):
| State | Description |
|-------|-------------|
| `idle` | Initial state, no interaction |
| `suggesting` | User hovering/focusing terminal, showing action buttons |
| `executing` | Command triggered, waiting for delay |
| `rendered` | Output displayed after delay |

**Internal State**:
- `state`: Current playback state (PLAYBACK_STATES enum)
- `activeCommand`: Currently executing command string
- `outputLines`: Array of output strings to display

**Key Design Decisions**:
- **Action Lookup**: Memoized hash map (`actionLookup`) for O(1) command-to-action resolution
- **Timer Management**: Ref-based timer with cleanup to prevent memory leaks and race conditions
- **Delay Configuration**: Per-action `delayMs` (default 2000ms) for variable timing
- **Fallback Output**: Default message when command not found in lookup

**Exported Utilities**:
- `PLAYBACK_STATES` - Enum object for state constants
- `createActionLookup(actions)` - Pure function to build command lookup table

**Returned API**:
```javascript
{
  actions: array,              // original actions config
  state: string,               // current PLAYBACK_STATES value
  activeCommand: string,       // currently executing command
  outputLines: array,          // rendered output lines
  revealSuggestions: function, // show action buttons (onMouseEnter/onFocus)
  hideSuggestions: function,   // hide action buttons (onMouseLeave)
  executeCommand: function     // trigger command execution
}
```

---

## Flow

### useTheme Flow

```
Component Mounts
       │
       ▼
readStoredTheme() ──► localStorage.getItem('portfolio-theme')
       │                         │
       ▼                         ▼ (if null/error)
normalizeTheme()            returns 'dark'
       │
       ▼
useState(initialTheme)
       │
       ▼
useEffect([theme])
       │
       ├─► applyTheme(theme)
       │       │
       │       ▼
       │   document.documentElement
       │   ├── classList.toggle('theme-light', theme === 'light')
       │   ├── classList.toggle('dark', theme === 'dark')
       │   └── setAttribute('data-theme', theme)
       │
       └─► localStorage.setItem('portfolio-theme', theme)

User Clicks Toggle
       │
       ▼
toggleTheme() ──► setTheme(current => current === 'dark' ? 'light' : 'dark')
       │
       ▼
useEffect triggers ──► applyTheme + persist to localStorage
```

### useTerminalPlayback Flow

```
Component Mounts + sessionConfig passed
       │
       ▼
useMemo creates actionLookup from actions array
       │
       ▼
User hovers/focuses terminal area
       │
       ▼
revealSuggestions() ──► setState('suggesting')
       │
       ▼
Action buttons render (if state === 'suggesting')

User clicks action button
       │
       ▼
executeCommand(command)
       │
       ├─► Lookup: actionLookup[command]
       ├─► Determine: nextOutput (action.output || fallbackOutput)
       ├─► Determine: delayMs (action.delayMs || 2000)
       ├─► clearTimer() ──► clear any existing timeout
       ├─► setActiveCommand(command)
       ├─► setOutputLines([])
       ├─► setState('executing')
       │
       ▼
setTimeout(delayMs) ──► on callback:
       │
       ├─► setOutputLines(nextOutput)
       ├─► setState('rendered')
       └─► timerRef.current = null

User hovers away
       │
       ▼
hideSuggestions() ──► setState('idle') (only if currently 'suggesting')

Component unmounts
       │
       ▼
useEffect(() => clearTimer, [clearTimer]) ──► cleanup timeout
```

---

## Integration

### useTheme Integration

**Consumer Components**:
1. **`src/components/ThemeToggle.jsx`** (primary consumer)
   - Imports: `import useTheme from '../hooks/useTheme'`
   - Usage: `const { isDark, toggleTheme } = useTheme()`
   - Renders toggle button with icon/label based on theme state

2. **`src/components/Navbar.jsx`** (indirect consumer)
   - Imports: `import ThemeToggle from './ThemeToggle'`
   - Embeds ThemeToggle component in header navigation bar
   - Theme state affects entire application via CSS variables

### useScrollProgress Integration

**Consumer Components**:
1. **`src/components/Navbar.jsx`** (primary consumer)
   - Imports: `import useScrollProgress from '../hooks/useScrollProgress'`
   - Usage: `const { progress, activeSection } = useScrollProgress()`
   - Renders scroll progress bar in header
   - Highlights active nav link based on current section

**Navigation Features**:
- Progress bar shows scroll position (0-100%)
- Section-based nav links: HOME, PROJECTS, ABOUT, CONTACT
- Smooth scroll to sections via hash links
- Active state sync with scroll position

**CSS Integration**:
- Theme classes applied to `document.documentElement` (root element)
- CSS variables referenced throughout components: `var(--theme-primary)`, `var(--theme-surface)`, `var(--theme-text)`, etc.
- Theme-specific styles defined in global CSS (likely in `index.css` or Tailwind config)

### useTerminalPlayback Integration

**Consumer Components**:
1. **`src/components/ui/TerminalPlayback.jsx`** (primary consumer)
   - Imports: `import useTerminalPlayback, { PLAYBACK_STATES } from '../../hooks/useTerminalPlayback'`
   - Usage: `const { state, activeCommand, outputLines, revealSuggestions, hideSuggestions, executeCommand } = useTerminalPlayback(sessionConfig)`
   - Renders interactive terminal UI with suggestions, executing state, and output display

2. **`src/pages/Home/TerminalSection.jsx`** (page-level consumer)
   - Imports: `import TerminalPlayback from '../../components/ui/TerminalPlayback'`
   - Usage: `<TerminalPlayback sessionConfig={HOME_TERMINAL_PLAYBACK} />`
   - Embeds TerminalPlayback on the Home page hero section

**Data Configuration**:
- **`src/data/terminalPlayback.js`** provides session configuration
- `HOME_TERMINAL_PLAYBACK` object structure:
  ```javascript
  {
    id: 'home',
    prompt: 'guest@system:~$',
    label: 'cli_header',
    fallbackOutput: 'command not found: ...',
    actions: [
      { id, label, command, delayMs, output: [] }
    ]
  }
  ```

**Interaction Flow**:
- TerminalSection passes sessionConfig to TerminalPlayback component
- TerminalPlayback invokes useTerminalPlayback with config
- User interacts via hover/focus (revealSuggestions) and click (executeCommand)
- Output rendered after configurable delay, displayed in styled terminal panel

---

## Architecture Summary

| Hook | Purpose | State Type | Side Effects | Consumers |
|------|---------|------------|--------------|-----------|
| `useTheme` | Theme toggle | Single value (light/dark) | localStorage, DOM classes | ThemeToggle, Navbar |
| `useTerminalPlayback` | Terminal simulation | State machine (4 states) | setTimeout, state transitions | TerminalPlayback, TerminalSection |
| `useScrollProgress` | Scroll tracking | Progress % + active section | scroll event listener | Navbar |

### useScrollProgress Hook

**State Management Pattern**: Passive scroll listener with derived state.

**Returned State**:
- `progress` (number 0-100): Scroll percentage through entire document
- `activeSection` (string): Current section ID based on scroll position

**Section Detection Logic**:
- Iterates top-to-bottom: `['hero', 'projects', 'about', 'contact']`
- Section is active when its top edge ≤ 120px from viewport top
- Last qualifying section wins (current visible section)

**Key Design Decisions**:
- Passive scroll listener for performance
- Top-to-bottom iteration with running `active` variable
- Cleanup on unmount to prevent memory leaks

Both hooks follow React hooks conventions: return objects with state and functions, use useEffect for side effects, and encapsulate logic that would otherwise duplicate across components.