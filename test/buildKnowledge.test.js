import assert from 'node:assert/strict';
import test from 'node:test';
import { cleanReadme, collectKnowledge, htmlToText } from '../scripts/build-knowledge.js';

const silent = { info() {}, warn() {} };

const respond = (body, status = 200) => ({
  ok: status < 400,
  status,
  json: async () => body,
  text: async () => body,
});

test('cleanReadme drops images, HTML and comments', () => {
  assert.equal(
    cleanReadme('# Title\n\n![badge](x.svg)<p align="center">Hi</p>\n<!-- hidden -->\n\n\n\nBody'),
    '# Title\n\nHi\n\nBody'
  );
});

test('htmlToText keeps readable text only', () => {
  assert.equal(
    htmlToText(
      '<html><head><title>x</title></head><body><nav>Menu</nav><h1>Rate &amp; review</h1><script>bad()</script><p>Professors</p></body></html>'
    ),
    'Rate & review\nProfessors'
  );
});

test('collectKnowledge gathers public repositories and skips forks', async () => {
  const fetchImpl = async (url) => {
    if (url.includes('/users/shafiqimtiaz/repos')) {
      return respond([
        {
          name: 'dash-reader',
          full_name: 'shafiqimtiaz/dash-reader',
          description: 'RSVP speed reading',
          language: 'TypeScript',
          topics: ['chrome-extension'],
          html_url: 'https://github.com/shafiqimtiaz/dash-reader',
          pushed_at: '2026-10-01T00:00:00Z',
        },
        { name: 'forked', full_name: 'shafiqimtiaz/forked', fork: true },
      ]);
    }
    if (url.endsWith('/dash-reader/readme')) return respond('# dash-reader\nReads fast.');
    return respond('', 503);
  };

  const knowledge = await collectKnowledge({ fetchImpl, log: silent });

  assert.match(knowledge, /### dash-reader\nRSVP speed reading/);
  assert.match(knowledge, /Topics: chrome-extension/);
  assert.match(knowledge, /README:\n# dash-reader\nReads fast\./);
  assert.doesNotMatch(knowledge, /forked/);
  assert.doesNotMatch(knowledge, /Public web pages/);
});

test('collectKnowledge returns nothing when every source is unreachable', async () => {
  const fetchImpl = async () => {
    throw new Error('offline');
  };

  assert.equal(await collectKnowledge({ fetchImpl, log: silent }), '');
});
