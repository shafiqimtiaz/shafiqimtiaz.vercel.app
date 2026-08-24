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

test('buildAssistantInstructions includes published contact options', () => {
  const instructions = buildAssistantInstructions();

  assert.match(instructions, /portfolio contact section/i);
  assert.match(instructions, /shafiqimtiaz@gmail\.com/);
  assert.match(instructions, /linkedin\.com\/in\/shafiqimtiaz/);
  assert.match(instructions, /do not repeat the phone number/i);
});

test('buildAssistantInstructions distinguishes contact facts from availability', () => {
  const instructions = buildAssistantInstructions();

  assert.match(instructions, /published contact options may be shared/i);
  assert.match(instructions, /do not invent current availability/i);
});

test('buildAssistantInstructions includes the public resume context', () => {
  const instructions = buildAssistantInstructions();

  assert.match(instructions, /Published resume:/);
  assert.match(instructions, /Senior Software Engineer \| Flexspring/);
  assert.match(instructions, /2,500\+/);
  assert.match(instructions, /RAG Chatbot/);
});
