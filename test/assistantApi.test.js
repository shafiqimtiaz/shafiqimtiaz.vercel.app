import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../api/assistant.js';

test('assistant API writes method errors to the Node response', async () => {
  const response = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  await handler({ method: 'GET' }, response);

  assert.equal(response.statusCode, 405);
  assert.deepEqual(response.body, { error: 'Method not allowed.' });
});
