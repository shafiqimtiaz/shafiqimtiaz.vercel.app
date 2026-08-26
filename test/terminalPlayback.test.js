import assert from 'node:assert/strict';
import test from 'node:test';
import { HOME_TERMINAL_PLAYBACK } from '../src/data/terminalPlayback.js';

test('current status output uses the concise shipping status', () => {
  const currentStatus = HOME_TERMINAL_PLAYBACK.actions.find(({ id }) => id === 'current_status');

  assert.ok(currentStatus);
  assert.deepEqual(currentStatus.output, ['> status: online, caffeinated, and shipping 🚀.']);
});
