import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { buildAssistantInstructions } from '../src/lib/assistantContext.js';
import { validateAssistantMessages } from '../src/lib/assistantRequest.js';

const json = (body, status) => Response.json(body, { status });

export async function handleAssistant(request, env, sources) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  const token = env.GOOGLE_GENERATIVE_AI_API_KEY;
  const model = env.GOOGLE_GENERATIVE_AI_MODEL || 'gemini-2.5-flash-lite';

  if (!token) {
    return json({ error: 'Assistant configuration is unavailable.' }, 503);
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { messages, error } = validateAssistantMessages(body?.messages);

    if (error) {
      return json({ error }, 400);
    }

    const google = createGoogleGenerativeAI({ apiKey: token });
    const result = streamText({
      model: google(model),
      maxOutputTokens: 160,
      system: buildAssistantInstructions(sources),
      messages,
    });

    return result.toTextStreamResponse();
  } catch {
    return json(
      { error: 'Shafiq’s AI Assistant is unavailable right now. Please try again shortly.' },
      500
    );
  }
}
