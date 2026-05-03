# src/pages/

## Responsibility

The `src/pages/` directory contains **section components** and **layout modules** that compose the single-page portfolio application. The directory now follows a **single-page architecture** where `Home/index.jsx` serves as the main page shell that renders all sections sequentially, with hash-based navigation (`#hero`, `#projects`, `#about`, `#contact`).

### Directory Structure

```
src/pages/
├── Home/
│   ├── index.jsx              # Single Page Shell - renders all sections
│   ├── HeroSection.jsx       # Personal branding hero
│   ├── TerminalSection.jsx    # Terminal playback component
│   ├── HistorySection.jsx     # Deployment/project history cards
│   └── StatsSection.jsx      # Quantitative statistics display
├── About/
│   ├── index.jsx              # About page (standalone route, not in SPA)
│   ├── ProfileSection.jsx    # Developer profile with avatar and stats
│   ├── TechStackSection.jsx  # Technology capabilities matrix
│   └── TimelineSection.jsx  # Chronological experience timeline
├── Contact/
│   ├── index.jsx              # Contact page (standalone route, not in SPA)
│   ├── ContactFormSection.jsx # Interactive contact form with TerminalPanel
│   └── StatusSection.jsx     # Exports: ExternalNodeSection, StatusSection, InfoColumnsSection
├── Projects/
│   ├── index.jsx              # Projects page (standalone route, not in SPA)
│   ├── CaseStudiesSection.jsx  # Professional achievements
│   ├── PublicRepositoriesSection.jsx  # GitHub repositories grid
│   └── MiniProjectsSection.jsx       # Standalone HTML projects
└── codemap.md
```

## Design

### Single Page Architecture

The application uses **hash-based single-page navigation**. `Home/index.jsx` is the main entry point that renders all sections:

| Section ID | Component | Content |
|------------|-----------|---------|
| `#hero` | `HeroSection` + `TerminalSection` | Personal branding, terminal demo |
| (none) | `StatsSection` | Quantitative metrics |
| `#projects` | `CaseStudiesSection` | Professional achievements |
| `#about` | `ProfileSection` + `TechStackSection` + `HistorySection` | Profile, tech stack, history |
| `#contact` | `ContactFormSection` + links | Contact form and external links |

```jsx
// Home/index.jsx - Single Page Shell
export default function Home() {
  return (
    <main className="pt-[var(--header-height)]">
      <section id="hero">...</section>      {/* Hero + Terminal */}
      <StatsSection />                        {/* Full-width stats bar */}
      <section id="projects">...</section>    {/* Case studies */}
      <section id="about">...</section>      {/* Profile + Tech + History */}
      <section id="contact">...</section>    {/* Contact form + links */}
    </main>
  );
}
```

### Navigation Architecture

Navigation uses **hash links** with `scroll-behavior: smooth`:

- Navbar scrolls to section via `element.scrollIntoView({ behavior: 'smooth' })`
- `scroll-padding-top: var(--header-height)` ensures sections don't hide behind fixed header
- `useScrollProgress` hook tracks scroll position and updates active nav link

```jsx
// Navbar navigation
const navSections = [
  { id: 'hero', label: 'HOME', to: '/' },
  { id: 'projects', label: 'PROJECTS', to: '/#projects' },
  { id: 'about', label: 'ABOUT', to: '/#about' },
  { id: 'contact', label: 'CONTACT', to: '/#contact' },
];
```

### Component Composition Pattern

Sections are **pure functional React components** that:
- Receive no props (fully data-driven from static imports)
- Return JSX with semantic HTML elements (`<section>`, `<article>`, `<div>`)
- Use CSS custom properties for theming
- Use Tailwind CSS for layout and styling
- Implement responsive design with `clamp()` and breakpoint prefixes

### Data Layer Architecture

Sections consume static data from `src/data/` modules:

| Data File | Consumed By | Data Type |
|----------|-------------|-----------|
| `src/data/stats.js` | `ProfileSection`, `StatsSection` | Profile statistics (years, projects, etc.) |
| `src/data/projects.js` | `CaseStudiesSection`, `HistorySection` | Projects, case studies |
| `src/data/links.js` | `Home/contact section` | External links, contact text |
| `src/data/experience.js` | `TechStackSection` | Tech stack categories |
| `src/data/terminalPlayback.js` | `TerminalSection` | Terminal playback session config |
| `src/data/contactForm.js` | `ContactFormSection` | Form field definitions |

## Flow

### Single Page Render Flow

```
1. App.jsx Mounts
       ↓
2. Home/index.jsx Renders (main page shell)
       ↓
3. Sections Render Sequentially
       ├─► #hero: HeroSection + TerminalSection
       ├─► StatsSection (full-width band)
       ├─► #projects: CaseStudiesSection
       ├─► #about: ProfileSection + TechStackSection + HistorySection
       └─► #contact: ContactFormSection + links
       ↓
4. Navbar listens to scroll events
       ↓
5. useScrollProgress updates active section
       ↓
6. Hash navigation scrolls to section
```

### Scroll Detection Flow

```
User Scrolls
       ↓
useScrollProgress.handleScroll()
       ↓
Iterate: ['hero', 'projects', 'about', 'contact']
       │
       ▼
For each section, check: rect.top <= 120px
       │
       ▼
Last qualifying section → activeSection
       ↓
Navbar re-renders with updated active state
```

### Navigation Click Flow

```
User Clicks Nav Link
       │
       ▼
scrollToSection(e, sectionId)
       │
       ▼
document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
       │
       ▼
scroll-padding-top adjusts for header
       │
       ▼
useScrollProgress detects section at top → updates active nav
```

## Integration

### App.jsx Integration

```jsx
// src/App.jsx - Single Page Shell
export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

### Component Dependency Graph

```
App.jsx
  ├── Navbar (uses useScrollProgress)
  ├── Home/index.jsx (Single Page)
  │   ├── HeroSection
  │   │   └── Button (ui)
  │   ├── TerminalSection
  │   │   ├── TerminalPanel (ui)
  │   │   └── TerminalPlayback (ui)
  │   ├── StatsSection
  │   │   └── data/stats.js
  │   ├── CaseStudiesSection (#projects)
  │   │   └── Button (ui)
  │   ├── ProfileSection (#about)
  │   │   └── data/stats.js
  │   ├── TechStackSection (#about)
  │   │   └── data/experience.js
  │   ├── HistorySection (#about)
  │   │   └── data/projects.js
  │   └── ContactFormSection (#contact)
  │       └── data/contactForm.js
  ├── Footer
  └── Analytics + SpeedInsights
```

### Theme Integration

Sections use CSS custom properties for theming:

| Property | Usage | Examples |
|----------|-------|----------|
| `--theme-primary` | Main accent (green) | `#9CFF93` |
| `--theme-secondary` | Secondary accent (cyan) | `#00E3FD` |
| `--theme-text` | Primary text | `#FFFFFF` / `#0F172A` (light mode) |
| `--theme-surface` | Card backgrounds | varies by depth |
| `--header-height` | Fixed header height | `88px` |
| `--container-width` | Max content width | `1180px` |

## Summary

The `src/pages/` directory implements a **single-page section composition model** where `Home/index.jsx` serves as the main page shell. The architecture emphasizes:

- **Single-page navigation**: Hash-based scroll with `useScrollProgress` for active state
- **Section composition**: Multiple specialized components per page section
- **Data-driven rendering**: Sections are pure functional components consuming static data
- **Terminal aesthetic**: Uniform visual design system using CSS custom properties
- **Responsive design**: Tailwind breakpoint prefixes for mobile-first layouts