import { credentials, techStack, timeline } from '../data/experience.js';
import { caseStudies, publicRepositories } from '../data/projects.js';

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
  return `You are Shafiq's AI Assistant. Answer questions about Shafiq's public portfolio in a helpful, concise, and professional tone. Use only the published facts below. If the portfolio does not contain the answer, say that you do not know rather than guessing. Do not claim to be Shafiq or provide private contact, compensation, or availability details beyond these facts.

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
