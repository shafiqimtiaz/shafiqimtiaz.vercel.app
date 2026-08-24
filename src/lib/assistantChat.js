export function appendAssistantText(messages, text) {
  return messages.map((message, index) =>
    index === messages.length - 1 && message.role === 'assistant'
      ? { ...message, content: message.content + text }
      : message
  );
}
