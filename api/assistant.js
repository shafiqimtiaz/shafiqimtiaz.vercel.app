import { createGateway, streamText } from 'ai';
import { buildAssistantInstructions } from '../src/lib/assistantContext.js';
import { validateAssistantMessages } from '../src/lib/assistantRequest.js';

export const maxDuration = 30;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const token = process.env.AI_GATEWAY_API_KEY;
  const model = process.env.AI_GATEWAY_MODEL;

  if (!token || !model) {
    return response.status(503).json({ error: 'Assistant configuration is unavailable.' });
  }

  try {
    const { messages, error } = validateAssistantMessages(request.body?.messages);

    if (error) {
      return response.status(400).json({ error });
    }

    const gateway = createGateway({ apiKey: token });
    const result = streamText({
      model: gateway(model),
      system: buildAssistantInstructions(),
      messages,
    });

    return result.pipeTextStreamToResponse(response);
  } catch {
    return response
      .status(500)
      .json({ error: 'Shafiq’s AI Assistant is unavailable right now. Please try again shortly.' });
  }
}
