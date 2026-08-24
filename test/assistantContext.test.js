import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAssistantInstructions } from '../src/lib/assistantContext.js';

test('buildAssistantInstructions includes published portfolio facts', () => {
  const instructions = buildAssistantInstructions();

  assert.match(instructions, /Agent Core/);
  assert.match(instructions, /AWS Certified AI Practitioner/);
  assert.match(instructions, /Shafiq's public portfolio/);
});

test('buildAssistantInstructions keeps the assistant within portfolio context', () => {
  const instructions = buildAssistantInstructions();

  assert.match(instructions, /do not know/);
  assert.match(instructions, /concise/);
});
