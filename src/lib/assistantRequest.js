const MAX_USER_MESSAGE_LENGTH = 1200;
const MAX_ASSISTANT_MESSAGE_LENGTH = 6000;
const VALID_ROLES = new Set(['user', 'assistant']);

export function validateAssistantMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: 'Send a message to start the conversation.' };
  }

  const sanitizedMessages = messages.map((message) => ({
    role: message?.role,
    content: typeof message?.content === 'string' ? message.content.trim() : '',
  }));

  if (
    sanitizedMessages.some(({ role, content }) => {
      const maxLength =
        role === 'assistant' ? MAX_ASSISTANT_MESSAGE_LENGTH : MAX_USER_MESSAGE_LENGTH;

      return !VALID_ROLES.has(role) || !content || content.length > maxLength;
    })
  ) {
    return { error: 'Invalid message.' };
  }

  return { messages: sanitizedMessages };
}
