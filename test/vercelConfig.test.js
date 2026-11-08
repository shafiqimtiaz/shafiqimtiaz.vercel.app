import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('assistant function includes the resume, notes and fetched knowledge', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

  assert.equal(
    config.functions['api/assistant.js'].includeFiles,
    '{public/docs/Resume-Shafiq-Imtiaz.md,src/data/*.md}'
  );
});
