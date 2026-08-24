# Shafiq's AI Assistant

## Purpose

Let visitors ask concise questions about Shafiq's professional background, experience, projects, skills, and credentials without leaving the portfolio.

## User experience

- A fixed, click-to-open bubble appears on every page view.
- The bubble is labelled `Shafiq's AI Assistant` and opens a compact chat panel above it.
- The panel includes a brief introduction, suggested portfolio questions, a message field, streaming replies, and a close control.
- Conversation state exists only in the visitor's browser and is reset on refresh.

## Architecture

- The React chat component sends the current conversation to a Vercel serverless endpoint.
- The endpoint uses the AI SDK with the AI Gateway model supplied by `VERCEL_AI_MODEL`; its initial value is `poolside/laguna-s-2.1-free`.
- It reads `VERCEL_AI_TOKEN` exclusively from the server environment and explicitly passes it to the AI Gateway client. The browser never receives this value.
- The assistant's system instruction is generated from the portfolio's existing static experience, project, and credential data. It answers only from this published context and says when the portfolio does not contain the answer.

## Request handling

- Only `POST` requests with a non-empty, bounded message history are accepted.
- The endpoint streams the model's text response to the client.
- Invalid requests, missing configuration, rate-limit responses, and provider failures return a safe message for the chat panel.
- The client prevents duplicate submissions while a response is streaming.

## Verification

- Add focused tests for portfolio context construction and request validation.
- Verify the failing tests before implementation and passing tests afterward.
- Run the production build after the implementation.

## Configuration

- Add `VERCEL_AI_TOKEN` and `VERCEL_AI_MODEL=poolside/laguna-s-2.1-free` in Vercel for Production, Preview, and Development.
- Add a tracked environment example that documents the variable name without a value.
