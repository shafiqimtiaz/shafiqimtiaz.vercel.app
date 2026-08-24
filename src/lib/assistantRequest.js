const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;
const VALID_ROLES = new Set(['user', 'assistant']);

export function validateAssistantMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: 'Send a message to start the conversation.' };
  }

  if (messages.length > MAX_MESSAGES) {
    return { error: 'Conversation is too long.' };
  }

  const sanitizedMessages = messages.map((message) => ({
    role: message?.role,
    content: typeof message?.content === 'string' ? message.content.trim() : '',
  }));

  if (
    sanitizedMessages.some(
      ({ role, content }) =>
        !VALID_ROLES.has(role) || !content || content.length > MAX_MESSAGE_LENGTH
    )
  ) {
    return { error: 'Invalid message.' };
  }

  return { messages: sanitizedMessages };
}
