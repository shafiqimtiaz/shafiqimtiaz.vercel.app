import assert from 'node:assert/strict';
import test from 'node:test';
import {
  parseAssistantInlineMarkdown,
  parseAssistantMarkdown,
} from '../src/lib/assistantMarkdown.js';

test('parseAssistantMarkdown preserves headings, lists, and inline markdown', () => {
  assert.deepEqual(
    parseAssistantMarkdown(
      '## AI experience\n\n* **AI Integration Assembly Line:** Led the assembly line.\n* **Webhook Templates:** Built reusable templates.\n\nHe ships reliable systems.'
    ),
    [
      { type: 'heading', level: 2, content: 'AI experience' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**AI Integration Assembly Line:** Led the assembly line.',
          '**Webhook Templates:** Built reusable templates.',
        ],
      },
      { type: 'paragraph', content: 'He ships reliable systems.' },
    ]
  );
});

test('parseAssistantInlineMarkdown identifies safe inline formatting', () => {
  assert.deepEqual(
    parseAssistantInlineMarkdown('**AI** ships `reliable` [systems](https://example.com).'),
    [
      { type: 'strong', content: 'AI' },
      { type: 'text', content: ' ships ' },
      { type: 'code', content: 'reliable' },
      { type: 'text', content: ' ' },
      { type: 'link', content: 'systems', href: 'https://example.com' },
      { type: 'text', content: '.' },
    ]
  );
});
