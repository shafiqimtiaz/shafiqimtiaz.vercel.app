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

test('buildAssistantInstructions requires short direct responses', () => {
  const instructions = buildAssistantInstructions();

  assert.match(instructions, /1-3 short sentences or up to 3 bullets/);
  assert.match(instructions, /under 80 words/);
  assert.match(instructions, /Lead with the answer/);
});
