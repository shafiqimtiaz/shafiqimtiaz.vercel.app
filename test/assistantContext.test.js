import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { buildAssistantInstructions } from '../src/lib/assistantContext.js';
import { timeline } from '../src/data/experience.js';
import { publicRepositories } from '../src/data/projects.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const sources = {
  resume: read('../public/docs/Resume-Shafiq-Imtiaz.md'),
  notes: read('../src/data/notes.md'),
  knowledge: '',
};

test('buildAssistantInstructions includes published portfolio facts', () => {
  const instructions = buildAssistantInstructions(sources);

  assert.match(instructions, /Claude Code Team Plugin/);
  assert.match(instructions, /AWS Certified AI Practitioner/);
  assert.match(instructions, /Shafiq's public portfolio/);
});

test('buildAssistantInstructions keeps the assistant within portfolio context', () => {
  const instructions = buildAssistantInstructions(sources);

  assert.match(instructions, /do not know/);
  assert.match(instructions, /concise/);
});

test('buildAssistantInstructions requires short direct responses', () => {
  const instructions = buildAssistantInstructions(sources);

  assert.match(instructions, /1-3 short sentences or up to 3 bullets/);
  assert.match(instructions, /under 80 words/);
  assert.match(instructions, /Lead with the answer/);
});

test('buildAssistantInstructions includes published contact options', () => {
  const instructions = buildAssistantInstructions(sources);

  assert.match(instructions, /portfolio contact section/i);
  assert.match(instructions, /shafiqimtiaz@gmail\.com/);
  assert.match(instructions, /linkedin\.com\/in\/shafiqimtiaz/);
  assert.match(instructions, /github\.com\/shafiqimtiaz/);
  assert.match(instructions, /do not repeat the phone number/i);
});

test('buildAssistantInstructions distinguishes contact facts from availability', () => {
  const instructions = buildAssistantInstructions(sources);

  assert.match(instructions, /published contact options may be shared/i);
  assert.match(instructions, /do not invent current availability/i);
});

test('buildAssistantInstructions includes the public resume context', () => {
  const instructions = buildAssistantInstructions(sources);

  assert.match(instructions, /Published resume:/);
  assert.match(instructions, /Senior Software Engineer - Principal \| Flexspring/);
  assert.match(instructions, /2,500\+/);
  assert.match(instructions, /KemonPoray - Professor and University Ratings for Bangladesh/);
});

test('timeline publishes the current Flexspring role titles', () => {
  assert.equal(timeline[0].title, 'Senior Software Engineer - Principal');
  assert.equal(timeline[1].title, 'Software Engineer - R&D and AI');
  assert.equal(timeline[0].org, 'Flexspring | Remote | Toronto, ON');
  assert.equal(timeline[1].org, 'Flexspring | Remote | Ottawa, ON');
  assert.equal(timeline[2].org, 'Flexspring | Remote | Montreal, QC');
  assert.equal(timeline[0].orgUrl, 'https://www.flexspring.com/');
  assert.equal(timeline[1].orgUrl, 'https://www.flexspring.com/');
  assert.equal(timeline[2].orgUrl, 'https://www.flexspring.com/');
  assert.equal(timeline[3].orgUrl, 'https://bsrm.com/');
  assert.doesNotMatch(
    timeline[0].details.join(' '),
    /Flexspring is a B2B content management and delivery platform serving 2,500\+ client configurations\./
  );
});

test('Nexus AI publishes its Kaggle write-up', () => {
  const nexus = publicRepositories.find(({ title }) => title === 'nexus-ai');

  assert.ok(nexus);
  assert.equal(
    nexus.writeUpUrl,
    'https://www.kaggle.com/competitions/vibecoding-agents-capstone-project/writeups/new-writeup-1783377933664'
  );
});

test('public repositories are ordered by portfolio impact', () => {
  assert.deepEqual(
    publicRepositories.map(({ title }) => title),
    [
      'KemonPoray',
      'nexus-ai',
      'dash-reader',
      'portfolio',
      'ctx-handoff',
      'clean-bookmarks',
      'pokégent',
      'fetch-markdown',
      'diet-workout-plan',
    ]
  );
});

test('portfolio repository publishes its live project links', () => {
  const portfolio = publicRepositories.find(({ title }) => title === 'portfolio');

  assert.ok(portfolio);
  assert.equal(portfolio.repoUrl, 'https://github.com/shafiqimtiaz/portfolio');
  assert.equal(portfolio.demoUrl, 'https://portfolio.shafiqimtiaz.workers.dev/');
});

test('buildAssistantInstructions leaves out the notes template comment', () => {
  assert.doesNotMatch(
    buildAssistantInstructions(sources),
    /HTML comments like this one are ignored/
  );
});
