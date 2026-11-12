# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website deployed as a Cloudflare Worker (`portfolio`)

## Build Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server (Vite)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

## Architecture

**Stack**: React 18 + Vite + Tailwind CSS v4 (used by the assistant chat) + three.js + Lenis

**Key Files**:

- [src/pages/Portfolio.jsx](src/pages/Portfolio.jsx) - The whole one-page site: case study chapters, Why me, Also built, More work, Experience, Contact
- [src/lib/story.js](src/lib/story.js) - Scroll-driven three.js particle film (one shape per `[data-s]` chapter) and number count-up; lazy-loaded
- [src/styles/portfolio.css](src/styles/portfolio.css) - Page styles: pastel palette led by brand green `#a8e6a1`, Bricolage Grotesque + JetBrains Mono
- [src/components/AssistantChat.jsx](src/components/AssistantChat.jsx) - AI assistant widget backed by [worker/assistant.js](worker/assistant.js) (Cloudflare Worker, `wrangler.jsonc`; `npm run deploy`)
- [src/data/](src/data/) - Content the assistant answers from (keep in sync with the page and résumé)
- [src/data/notes.md](src/data/notes.md) - Shafiq's own public notes for the assistant
- [scripts/build-knowledge.js](scripts/build-knowledge.js) - Runs in `npm run build`: fetches public GitHub READMEs, the Kaggle write-up and kemonporay.com into `src/data/knowledge.generated.md` (gitignored) for the assistant. Optional `GITHUB_TOKEN` avoids GitHub rate limits
- [public/docs/](public/docs/) - Résumé PDF (single page) and Markdown source

**Content rules** (NDA): never use Flexspring's internal product or code names, client names, or describe how internal systems work. Use descriptive titles: Agentic Integration Builder, Claude Code team plugin, one-command dev stack, AI integration review. Metrics are fine; the headline is 2 weeks to 2 hours (99%). Keep the page, `src/data/` and the résumé consistent.
