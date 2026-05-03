# src/components/layout/

## Responsibility

The layout module provides the foundational page wrapper component that ensures consistent visual structure across all pages in the application. Its single responsibility is to position page content correctly beneath the fixed header while constraining content width for readability.

**Components:**

- `PageShell` - The primary layout wrapper component

## Design

### Architecture

The layout module follows a minimal, focused design pattern with a single exported component:

```
src/components/layout/
├── PageShell.jsx    # Core layout wrapper
├── index.js         # Public API barrel export
└── codemap.md       # This documentation
```

### PageShell Component

**Location:** `src/components/layout/PageShell.jsx`

```jsx
export default function PageShell({ children, className = '' }) {
  const pageShell =
    'relative mx-auto w-[min(100%-2rem,var(--container-width))] pt-[calc(var(--header-height)+var(--page-top-spacing))]';
  return <main className={`${pageShell} ${className}`.trim()}>{children}</main>;
}
```

**Design Decisions:**

1. **CSS Custom Properties** - Uses theme-defined variables for consistent spacing:
   - `--container-width: 1180px` - Maximum content width
   - `--header-height: 88px` - Fixed header height
   - `--page-top-spacing: 2.5rem` - Additional breathing room below header

2. **Responsive Width Calculation** - `w-[min(100%-2rem,var(--container-width))]`:
   - On mobile: Full width minus 2rem horizontal padding
   - On desktop: Capped at 1180px container width

3. **Centered Layout** - `mx-auto` ensures horizontal centering

4. **Top Padding** - `pt-[calc(var(--header-height)+var(--page-top-spacing))]` accounts for:
   - Fixed header occupying 88px
   - Additional 2.5rem spacing for visual hierarchy

5. **Positioning** - `relative` enables future absolute positioning of children if needed

6. **Semantic HTML** - Renders as `<main>` element for accessibility

7. **Extension Support** - Accepts optional `className` prop for page-specific styling overrides

### Export Pattern

The module uses a barrel export in `index.js`:

```js
export { default as PageShell } from './PageShell';
```

This allows consumers to import via:

```js
import { PageShell } from '../../components/layout';
```

## Flow

### Control Flow

```
App/Router
    │
    ▼
┌─────────────────────┐
│   Page Component    │
│  (Home, About, etc) │
└──────────┬──────────┘
           │
           │ wraps content in
           ▼
┌─────────────────────┐
│     PageShell       │
│  - Adds padding     │
│  - Sets width       │
│  - Centers content  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   <main> element   │
│   in DOM           │
└─────────────────────┘
```

### Data Flow

- **Props Input:** `children` (React nodes), `className` (optional string)
- **DOM Output:** `<main>` element with computed classes
- **No internal state** - Pure presentational component

### CSS Variable Dependency Chain

```
theme.css
    │
    ├── --container-width: 1180px
    ├── --header-height: 88px
    └── --page-top-spacing: 2.5rem
              │
              ▼
        PageShell.jsx
              │
              ▼
        Computed padding: 88px + 2.5rem = ~108px top spacing
```

## Integration

### Consumer Pages

The `PageShell` component is used by **4 page components**:

| Page         | File Path                      | Usage                                |
| ------------ | ------------------------------ | ------------------------------------ |
| **Home**     | `src/pages/Home/index.jsx`     | Wraps hero section, content sections |
| **About**    | `src/pages/About/index.jsx`    | Wraps bio content, skills sections   |
| **Contact**  | `src/pages/Contact/index.jsx`  | Wraps contact form, info sections    |
| **Projects** | `src/pages/Projects/index.jsx` | Wraps project gallery/grid           |

### Import Pattern

All consuming pages use the same import pattern:

```jsx
import { PageShell } from '../../components/layout';

// Usage in render:
<PageShell>{/* page-specific content */}</PageShell>;
```

### Integration with Header

The `PageShell` is designed to work with a fixed header component (likely in `src/components/Header/` or similar). The header height (`88px`) is hardcoded as a CSS variable to ensure the padding calculation remains synchronized with the actual header implementation.

### Not Used By

- Any modal/dialog components (likely have own overlay layouts)
- Error pages (may use separate error layout)
- Admin/dashboard sections (if they exist, likely have different layout requirements)

### Extensibility

To add a new layout variant (e.g., `FullWidthPageShell` for landing pages):

1. Create `src/components/layout/FullWidthPageShell.jsx`
2. Add export to `index.js`
3. Consuming pages update import accordingly
