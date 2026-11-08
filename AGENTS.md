## shafiqimtiaz.vercel.app — Portfolio Site Guide

### Build & Dev

| Command           | Action                                  |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start Vite dev server                   |
| `npm run build`   | Prettier format + Vite production build |
| `npm run preview` | Serve built assets locally              |
| `npm run lint`    | Prettier check + ESLint src             |

### Architecture

Single-page site. `src/pages/Portfolio.jsx` holds all sections; `src/lib/flexforge.js` runs the scroll-driven particle film (lazy-loaded three.js) and the number count-up. `src/styles/portfolio.css` holds the page styles. The AI assistant (`src/components/AssistantChat.jsx` + `api/assistant.js`) answers from `src/data/` and the résumé Markdown.

### How to update the site

#### Update page copy and metrics

Edit `src/pages/Portfolio.jsx` (FlexForge chapters, `heroStats`, `why`, `work`, `experience`). Keep the same facts in `src/data/` and the résumé so the assistant and PDF agree with the page.

#### Update the particle film

Each chapter in `Portfolio.jsx` carries `data-s="<n>"`; `build()` in `src/lib/flexforge.js` returns one shape per chapter in the same order.

#### Update Resume

Update `public/docs/Resume-Shafiq-Imtiaz.pdf` (and its `.md` source) — the site links the PDF from the navbar and hero.

#### Update Avatar

Replace `public/docs/developer-avatar.jpg`.

#### Before committing

- Run `npm run build` — this runs prettier + vite build. Must pass.
- Use `workdir: "."` for all bash commands.

### Styling conventions

- Page styles live in `src/styles/portfolio.css`; tokens are the `:root` variables at its top (`--acc` brand green, `--peach`, `--butter`, `--sky`, `--rose`).
- Bricolage Grotesque for headings and body, JetBrains Mono for numbers and labels.
- Colour carries meaning (data types, agents, requirement kinds); avoid purple or indigo, cyan glows and decorative gradients. Gradient text is used only on "2 hours" and the email.
- Every animation has a `prefers-reduced-motion` fallback.

### Notes

- The particle engine is lazy-loaded from `Portfolio.jsx` so three.js never blocks first paint.
- `src/styles/theme.css` still supplies the `--theme-*` variables the assistant chat uses.
