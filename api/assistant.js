import { createGateway, streamText } from 'ai';
import { buildAssistantInstructions } from '../src/lib/assistantContext.js';
import { validateAssistantMessages } from '../src/lib/assistantRequest.js';

export const maxDuration = 30;

export default async function handler(request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  const token = process.env.VERCEL_AI_TOKEN;
  const model = process.env.VERCEL_AI_MODEL;

  if (!token || !model) {
    return Response.json({ error: 'Assistant configuration is unavailable.' }, { status: 503 });
  }

  try {
    const { messages, error } = validateAssistantMessages((await request.json()).messages);

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    const gateway = createGateway({ apiKey: token });
    const result = streamText({
      model: gateway(model),
      system: buildAssistantInstructions(),
      messages,
    });

    return result.toTextStreamResponse();
  } catch {
    return Response.json(
      { error: 'Shafiq’s AI Assistant is unavailable right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}
