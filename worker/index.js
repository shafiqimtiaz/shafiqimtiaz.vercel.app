import resume from '../public/docs/Resume-Shafiq-Imtiaz.md';
import notes from '../src/data/notes.md';
import knowledge from '../src/data/knowledge.generated.md';
import { handleAssistant } from './assistant.js';

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === '/api/assistant') {
      return handleAssistant(request, env, { resume, notes, knowledge });
    }

    return env.ASSETS.fetch(request);
  },
};
