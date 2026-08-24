import assert from 'node:assert/strict';
import test from 'node:test';
import { appendAssistantText } from '../src/lib/assistantChat.js';

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
