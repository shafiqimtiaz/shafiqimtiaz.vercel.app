import resume from '../public/docs/Resume-Shafiq-Imtiaz.md';
import notes from '../src/data/notes.md';
import knowledge from '../src/data/knowledge.generated.md';
import { handleAssistant } from './assistant.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/assistant') {
      return handleAssistant(request, env, { resume, notes, knowledge });
    }

    // Search Console needs a 200 at the exact .html path; assets would 307 to the extensionless URL.
    if (/^\/google[0-9a-f]+\.html$/.test(url.pathname)) {
      return env.ASSETS.fetch(new URL(url.pathname.slice(0, -5), url));
    }

    return env.ASSETS.fetch(request);
  },
};
