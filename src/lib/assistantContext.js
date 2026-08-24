import { readFileSync } from 'node:fs';
import { credentials, techStack, timeline } from '../data/experience.js';
import { caseStudies, publicRepositories } from '../data/projects.js';
import { externalNodes } from '../data/links.js';

const resumeContext = readFileSync(
  new URL('../../public/docs/Resume-Shafiq-Imtiaz.md', import.meta.url),
  'utf8'
).trim();

const publishedContact = externalNodes
  .filter(({ label }) => label === 'Email' || label === 'LinkedIn')
  .map(({ label, handle }) => `- ${label}: ${handle}`)
  .join('\n');

const formatItems = (items) =>
  items
    .map((item) => {
      const details = [
        item.date,
        item.title,
        item.org,
        item.description,
        ...(item.details || []),
        ...(item.items || []),
        ...(item.tags || []),
        ...(item.techStack || []),
      ]
        .filter(Boolean)
        .join(' — ');

      return `- ${details}`;
    })
    .join('\n');

export function buildAssistantInstructions() {
  return `You are Shafiq's AI Assistant. Answer questions about Shafiq's public portfolio directly, concisely, and professionally. Keep every response to 1-3 short sentences or up to 3 bullets, under 80 words. Lead with the answer. Do not add preambles, repetition, filler, or long explanations. If the portfolio does not contain the answer, say that you do not know rather than guessing. Use only the published facts below. Do not claim to be Shafiq or provide private contact or compensation details. Do not invent current availability; say when the portfolio does not state it. Published contact options may be shared. Do not repeat the phone number from the resume.

Published contact options:
- Portfolio contact section: #contact
${publishedContact}

Published resume:
${resumeContext}

Career timeline:
${formatItems(timeline)}

Case studies:
${formatItems(caseStudies)}

Public repositories:
${formatItems(publicRepositories)}

Technical skills:
${formatItems(techStack)}

Credentials:
${formatItems(credentials)}`;
}
