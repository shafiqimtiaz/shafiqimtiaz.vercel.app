# src/pages/Contact/

## Responsibility

The Contact page serves as the primary communication hub for the portfolio website. It provides multiple channels for visitors to establish direct contact for software development inquiries, cloud modernization projects, backend engineering work, and AI-focused collaboration opportunities.

The page functions as a "Direct Channel / Open Port" in the system's terminal-themed architecture, enabling prospective clients, collaborators, and employers to reach out through:

- An integrated contact form with direct submission
- External communication nodes (email, LinkedIn, GitHub)
- Real-time system status indicators showing availability and response times

This module is critical for conversion — it transforms passive portfolio visitors into active contacts by lowering friction in the initial communication step.

## Design

### Layout Structure

The Contact page uses a two-column responsive grid layout on large screens (`lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]`):

```
+-----------------------------------+-------------------+
|         HEADER SECTION            |                   |
|  (Badge + Title + Description)    |                   |
+-----------------------------------+                   |
|                                   |  EXTERNAL_NODES   |
|       CONTACT_FORM                |  (Email, LinkedIn)|
|       (TerminalPanel)              |  GitHub, Website |
|                                   |                   |
|                                   +-------------------+
|                                   |  SYSTEM_STATUS   |
|                                   |  (Live updates)   |
+-----------------------------------+-------------------+
|         INFO_COLUMNS_SECTION                         |
|  (Direct Comms, Office HQ, System Clock)             |
+------------------------------------------------------+
```

### Visual Theme

The entire page adopts a terminal/CLI aesthetic consistent with the portfolio's design system:

- **TerminalPanel** wrapper with title `ssh root@614.514.183 > CONTACT_FORM`
- Form input prefixes styled as shell prompts: `guest@system:~$`, `visitor@portfolio:~$`
- Command-style button labels: `EXECUTE_SEND`, `IN_PROCESS...`, `SEND_COMPLETE`, `RETRY_SEND`
- Monospace font for system status displays
- Grid pattern backgrounds with 8% opacity on panel sections

### Component Architecture

| Component             | File                     | Responsibility                                         |
| --------------------- | ------------------------ | ------------------------------------------------------ |
| `Contact` (default)   | `index.jsx`              | Page orchestrator, layout composition                  |
| `ContactFormSection`  | `ContactFormSection.jsx` | Form state, submission logic, validation               |
| `ExternalNodeSection` | `StatusSection.jsx`      | External link cards (Email, LinkedIn, GitHub, Website) |
| `StatusSection`       | `StatusSection.jsx`      | Live system status with 3-second update interval       |
| `InfoColumnsSection`  | `StatusSection.jsx`      | System info with live clock (1-second tick)            |

### Form Design

The contact form consists of three fields defined in `data/contactForm.js`:

| Field     | Type              | Required | Shell Prompt Prefix    |
| --------- | ----------------- | -------- | ---------------------- |
| `name`    | text              | yes      | `guest@system:~$`      |
| `email`   | email             | yes      | `visitor@portfolio:~$` |
| `message` | textarea (4 rows) | yes      | `visitor@portfolio:~$` |

Form inputs use a border-bottom style with focus states that transition the border color to `--theme-primary`. The textarea and input fields share identical styling with transparent backgrounds and no outline/ring on focus.

### Status Displays

**System Status** (updates every 3 seconds):

- `AVAILABILITY`: Shows "ONLINE [OPEN]" with pulsing green dot
- `LOC_COORDINATES`: Displays "OTTAWA, ON"
- `RESPONSE_LATENCY`: Randomly generates values between 12-23 hours

**System Clock** (updates every 1 second):

- `UTC_ZULU`: Current UTC timestamp formatted as `YYYY-MM-DD HH:MM:SS UTC`
- `UPTIME`: Duration since page load in `XXd HHh MMm SSs` format

### Color System

The page uses CSS custom properties for theming:

- `--theme-primary`: Main accent color (used for highlights, links, focus states)
- `--theme-secondary`: Secondary accent (LinkedIn link, availability indicator)
- `--theme-tertiary`: Tertiary accent (GitHub link, response latency)
- `--theme-text`: Primary text color
- `--theme-text-muted`: Muted/secondary text
- `--theme-surface`: Panel background
- `--theme-surface-low`: Lower contrast surface for nested panels

## Flow

### Contact Form Submission Flow

```
User Input → handleChange → formData state update
                    ↓
            User clicks submit
                    ↓
         handleSubmit triggered
                    ↓
    ┌───────────────────────────────┐
    │  Validate required fields    │
    │  (name, email, message)       │
    └───────────────────────────────┘
            ↓ (validation fails)
        setStatus('error')
            ↓ (validation passes)
    ┌───────────────────────────────┐
    │  Check VITE_CONTACT_FORM_     │
    │  ENDPOINT environment variable │
    └───────────────────────────────┘
            ↓ (endpoint configured)
    ┌───────────────────────────────┐
    │  POST to endpoint with JSON   │
    │  { name, email, message,      │
    │    recipient }                │
    └───────────────────────────────┘
            ↓ (HTTP error)
        setStatus('error')
            ↓ (HTTP success)
        setStatus('sent')
        setFormData(initialFormData)
            ↓ (no endpoint configured)
    ┌───────────────────────────────┐
    │  Construct mailto: URL        │
    │  subject: "New contact form   │
    │   message from {name}"        │
    │  body: formatted message      │
    └───────────────────────────────┘
        window.location.href = mailto
            ↓
        setStatus('sent')
        setFormData(initialFormData)
```

### Status State Machine

```
idle → sending → sent (success)
               └→ error (failure)
```

The button displays different labels based on status:

- `idle`: "EXECUTE_SEND"
- `sending`: "IN_PROCESS..." (disabled)
- `sent`: "SEND_COMPLETE"
- `error`: "RETRY_SEND"

### Live Update Intervals

1. **StatusSection**: `setInterval` every 3000ms
   - Randomizes RESPONSE_LATENCY value
   - Maintains AVAILABILITY as "ONLINE [OPEN]"
   - Cleanup on unmount via `clearInterval`

2. **InfoColumnsSection**: `setInterval` every 1000ms
   - Updates `now` state to trigger re-render
   - Recalculates uptime duration from `startAtRef`
   - Formats UTC timestamp and uptime string

## Integration

### Component Dependencies

| Import          | Source              | Purpose                                        |
| --------------- | ------------------- | ---------------------------------------------- |
| `PageShell`     | `components/layout` | Page wrapper with consistent layout structure  |
| `TerminalPanel` | `components/ui`     | Styled container for the contact form          |
| `Button`        | `components/ui`     | Submit button with variant and disabled states |

### Data Dependencies

| Data Export         | Source File           | Usage                                                                    |
| ------------------- | --------------------- | ------------------------------------------------------------------------ |
| `contactPageText`   | `data/links.js`       | Page header: badge, title, highlight, description                        |
| `externalNodes`     | `data/links.js`       | External link array: label, icon, href, accent                           |
| `systemStatus`      | `data/links.js`       | Status items: label, value, accent                                       |
| `infoColumns`       | `data/links.js`       | Info column sections: heading, lines                                     |
| `contactFormFields` | `data/contactForm.js` | Form field definitions: name, label, prefix, type, placeholder, required |

### Environment Variables

| Variable                      | Required | Default                  | Purpose                                   |
| ----------------------------- | -------- | ------------------------ | ----------------------------------------- |
| `VITE_CONTACT_FORM_RECIPIENT` | No       | `shafiqimtiaz@gmail.com` | Email address for form submissions        |
| `VITE_CONTACT_FORM_ENDPOINT`  | No       | (empty string)           | External API endpoint for form processing |

When `VITE_CONTACT_FORM_ENDPOINT` is set, the form POSTs JSON to that endpoint. When unset, the form falls back to a `mailto:` link with pre-filled subject and body.

### External Links

The ExternalNodeSection renders four external communication channels:

1. **EMAIL**: `mailto:shafiqimtiaz@gmail.com` — accent: `--theme-primary-dim`
2. **LINKEDIN**: `https://linkedin.com/in/shafiqimtiaz` — accent: `--theme-secondary`
3. **GITHUB**: `https://github.com/shafiqimtiaz` — accent: `--theme-primary`
4. **WEBSITE**: `https://shafiqimtiaz.vercel.app` — accent: `--theme-tertiary`

Each link opens in a new tab (`target="_blank"`) with `rel="noreferrer"` for security. External links display an `arrow_outward` icon on hover.

### CSS/Tailwind Integration

The page uses Tailwind CSS with custom design tokens:

- `font-headline`: Custom headline font family
- `font-mono`: Monospace for system displays
- `tracking-[0.18em]`: Wide letter spacing for labels
- `text-[clamp(3rem,6vw,5.4rem)]`: Fluid typography for title
- `border-l-4`: Left border accent on badge
- `animate-pulse`: Pulsing animation on availability indicator
- `grid-pattern-panel`: Custom background pattern (referenced in CSS)

### Routing

The Contact page is mounted at the `/contact` route. Navigation links are defined in `data/links.js`:

```js
export const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'ABOUT', to: '/about' },
  { label: 'CONTACT', to: '/contact' },
];
```

The footer also includes a contact link:

```js
export const footerLinks = [
  { label: 'GITHUB', href: 'https://github.com/shafiqimtiaz' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/shafiqimtiaz' },
  { label: 'RESUME', href: '/docs/Shafiq-Imtiaz-Resume.pdf' },
  { label: 'CONTACT', to: '/contact' },
];
```
