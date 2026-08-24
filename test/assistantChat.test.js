import assert from 'node:assert/strict';
import test from 'node:test';
import { appendAssistantText, scrollAssistantToBottom } from '../src/lib/assistantChat.js';

test('appendAssistantText appends streamed text to the pending assistant reply', () => {
  const messages = [
    { role: 'user', content: 'Tell me about Shafiq.' },
    { role: 'assistant', content: '' },
  ];

  assert.deepEqual(appendAssistantText(messages, 'He is a senior engineer.'), [
    { role: 'user', content: 'Tell me about Shafiq.' },
    { role: 'assistant', content: 'He is a senior engineer.' },
  ]);
});

test('scrollAssistantToBottom moves the message viewport to its content end', () => {
  const container = { scrollTop: 0, scrollHeight: 640 };

  scrollAssistantToBottom(container);

  assert.equal(container.scrollTop, 640);
});

test('scrollAssistantToBottom ignores an unavailable viewport', () => {
  assert.doesNotThrow(() => scrollAssistantToBottom(null));
});
