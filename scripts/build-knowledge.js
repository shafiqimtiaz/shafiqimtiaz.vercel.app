// Runs before `vite build`: gathers public material about Shafiq into one Markdown file
// that the assistant reads with the résumé. A source that cannot be reached is skipped,
// so a GitHub or website outage never breaks a deploy.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const GITHUB_USER = 'shafiqimtiaz';
const WEB_PAGES = [
  {
    title: 'Nexus AI write-up on Kaggle',
    url: 'https://www.kaggle.com/competitions/vibecoding-agents-capstone-project/writeups/new-writeup-1783377933664',
  },
  { title: 'KemonPoray website', url: 'https://www.kemonporay.com/' },
];
const MAX_SOURCE_LENGTH = 6000;
const MIN_PAGE_TEXT = 300;
const OUTPUT = new URL('../src/data/knowledge.generated.md', import.meta.url);

const truncate = (text) =>
  text.length > MAX_SOURCE_LENGTH ? `${text.slice(0, MAX_SOURCE_LENGTH)}…` : text;

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(\w+);/g, (match, name) => entities[name] ?? match);

export function cleanReadme(markdown) {
  return truncate(
    markdown
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^\s*\[\s*\]\([^)]*\)\s*$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export function htmlToText(html) {
  return truncate(
    decodeEntities(
      html
        .replace(/<(script|style|noscript|svg|nav|footer|head)[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<\/(p|div|li|h[1-6]|section|article|br)>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
    )
      .replace(/[ \t]+/g, ' ')
      .replace(/\s*\n\s*/g, '\n')
      .trim()
  );
}

async function fetchRepositories(fetchImpl, token) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'shafiqimtiaz-portfolio-build',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const response = await fetchImpl(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
    { headers }
  );
  if (!response.ok) throw new Error(`GitHub repository list returned ${response.status}`);

  const repositories = (await response.json()).filter((repo) => !repo.fork && !repo.private);

  return Promise.all(
    repositories.map(async (repo) => {
      const readme = await fetchImpl(`https://api.github.com/repos/${repo.full_name}/readme`, {
        headers: { ...headers, Accept: 'application/vnd.github.raw+json' },
      });
      const details = [
        repo.description,
        repo.language && `Main language: ${repo.language}`,
        repo.topics?.length && `Topics: ${repo.topics.join(', ')}`,
        repo.homepage && `Website: ${repo.homepage}`,
        `Repository: ${repo.html_url}`,
        repo.pushed_at && `Last updated: ${repo.pushed_at.slice(0, 10)}`,
      ].filter(Boolean);
      const body = readme.ok ? cleanReadme(await readme.text()) : '';

      return `### ${repo.name}\n${details.join('\n')}${body ? `\n\nREADME:\n${body}` : ''}`;
    })
  );
}

async function fetchPage(fetchImpl, { title, url }) {
  const response = await fetchImpl(url, {
    headers: { 'User-Agent': 'shafiqimtiaz-portfolio-build', Accept: 'text/html' },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);

  const text = htmlToText(await response.text());
  if (text.length < MIN_PAGE_TEXT) throw new Error(`${url} had no readable text`);

  return `### ${title}\nSource: ${url}\n\n${text}`;
}

export async function collectKnowledge({ fetchImpl = fetch, token, log = console } = {}) {
  const sections = [];

  try {
    const repositories = await fetchRepositories(fetchImpl, token);
    sections.push(
      `## Public GitHub repositories (github.com/${GITHUB_USER})\n\n${repositories.join('\n\n')}`
    );
    log.info(`knowledge: ${repositories.length} GitHub repositories`);
  } catch (error) {
    log.warn(`knowledge: skipped GitHub (${error.message})`);
  }

  const pages = [];
  for (const page of WEB_PAGES) {
    try {
      pages.push(await fetchPage(fetchImpl, page));
      log.info(`knowledge: ${page.title}`);
    } catch (error) {
      log.warn(`knowledge: skipped ${page.title} (${error.message})`);
    }
  }
  if (pages.length) sections.push(`## Public web pages\n\n${pages.join('\n\n')}`);

  return sections.join('\n\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const knowledge = await collectKnowledge({ token: process.env.GITHUB_TOKEN });
  writeFileSync(OUTPUT, knowledge ? `${knowledge}\n` : '');
  console.info(`knowledge: wrote ${knowledge.length} characters`);
}
