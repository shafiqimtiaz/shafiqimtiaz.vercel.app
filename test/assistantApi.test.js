import assert from 'node:assert/strict';
import test from 'node:test';
import { handleAssistant } from '../worker/assistant.js';

test('assistant API rejects non-POST requests', async () => {
  const response = await handleAssistant(new Request('https://x/api/assistant'), {}, {});

  assert.equal(response.status, 405);
  assert.deepEqual(await response.json(), { error: 'Method not allowed.' });
});
