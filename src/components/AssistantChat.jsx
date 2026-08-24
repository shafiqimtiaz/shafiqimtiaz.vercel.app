import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui';
import AssistantMarkdown from './AssistantMarkdown';
import { appendAssistantText, scrollAssistantToBottom } from '../lib/assistantChat';

const suggestions = [
  'What has Shafiq built?',
  'Tell me about his AI experience.',
  'What is his technical stack?',
];

const getErrorMessage = async (response) => {
  try {
    return (await response.json()).error || 'The assistant could not respond.';
  } catch {
    return 'The assistant could not respond.';
  }
};

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    scrollAssistantToBottom(messagesContainerRef.current);
  }, [error, isLoading, isOpen, messages]);

  const sendMessage = async (message) => {
    const content = message.trim();
    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setDraft('');
    setError('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error(await getErrorMessage(response));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        setMessages((currentMessages) =>
          appendAssistantText(currentMessages, decoder.decode(value, { stream: true }))
        );
      }
    } catch (requestError) {
      setMessages(nextMessages);
      setError(
        requestError.name === 'AbortError'
          ? 'The assistant timed out. Please try again.'
          : requestError.message || 'The assistant could not respond.'
      );
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-2 bottom-4 z-50 flex flex-col items-end sm:right-6 sm:bottom-6">
      {isOpen && (
        <section
          aria-label="Shafiq's AI Assistant"
          className={`mb-3 flex flex-col overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)] shadow-[0_18px_48px_color-mix(in_srgb,var(--theme-bg)_78%,transparent)] ${
            isExpanded
              ? 'h-[min(48rem,calc(100vh-var(--header-height)-6rem))] w-[min(48rem,calc(100vw-1rem))]'
              : 'h-[min(38rem,calc(100vh-7rem))] w-[min(23rem,calc(100vw-2rem))]'
          }`}
        >
          <header className="flex items-center justify-between border-b border-[var(--theme-outline-variant)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--theme-primary)] text-[var(--theme-on-primary)]">
                <Icon name="sparkle" size={18} />
              </span>
              <div>
                <h2 className="font-headline text-sm font-semibold text-[var(--theme-text)]">
                  Shafiq&apos;s AI Assistant
                </h2>
                <p className="font-body text-[0.6rem] tracking-[0.12em] text-[var(--theme-primary)] uppercase">
                  Portfolio guide
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                aria-label={isExpanded ? 'Restore assistant size' : 'Expand assistant'}
                className="grid h-8 w-8 place-items-center rounded-md text-[var(--theme-text-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--theme-surface)] hover:text-[var(--theme-text)]"
              >
                <Icon name={isExpanded ? 'minimize' : 'maximize'} size={17} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="grid h-8 w-8 place-items-center rounded-md text-[var(--theme-text-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--theme-surface)] hover:text-[var(--theme-text)]"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </header>

          <div
            ref={messagesContainerRef}
            data-lenis-prevent
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4"
          >
            {messages.length === 0 ? (
              <>
                <p className="text-sm leading-relaxed text-[var(--theme-text-muted)]">
                  Ask about Shafiq&apos;s experience, projects, technical stack, or credentials.
                </p>
                <div className="grid gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={isLoading}
                      onClick={() => sendMessage(suggestion)}
                      className="font-body rounded-md border border-[var(--theme-outline-variant)] px-3 py-2 text-left text-[0.68rem] leading-relaxed text-[var(--theme-text-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--theme-primary)] hover:text-[var(--theme-text)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[94%] rounded-lg px-4 py-3 text-[0.9rem] leading-7 break-words ${
                    message.role === 'user'
                      ? 'ml-auto bg-[var(--theme-primary)] text-[var(--theme-on-primary)]'
                      : 'border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] text-[var(--theme-text)]'
                  }`}
                >
                  {message.content ? (
                    message.role === 'assistant' ? (
                      <AssistantMarkdown content={message.content} />
                    ) : (
                      <span className="whitespace-pre-wrap">{message.content}</span>
                    )
                  ) : (
                    <span className="animate-pulse">Thinking…</span>
                  )}
                </div>
              ))
            )}
            {error && <p className="font-body text-xs text-[var(--theme-error-dim)]">{error}</p>}
          </div>

          <form
            className="border-t border-[var(--theme-outline-variant)] p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <label className="sr-only" htmlFor="assistant-message">
              Ask Shafiq&apos;s AI Assistant
            </label>
            <div className="flex items-center gap-2 rounded-md border border-[var(--theme-outline-variant)] bg-[var(--theme-bg)] px-3 focus-within:border-[var(--theme-primary)]">
              <input
                id="assistant-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask a question…"
                autoComplete="off"
                disabled={isLoading}
                className="font-body min-w-0 flex-1 bg-transparent py-3 text-sm text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-outline)] disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!draft.trim() || isLoading}
                aria-label="Send message"
                className="grid h-8 w-8 place-items-center rounded-md bg-[var(--theme-primary)] text-[var(--theme-on-primary)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Icon name="send" size={17} />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={`${isOpen ? 'Close' : 'Open'} Shafiq's AI Assistant`}
        aria-expanded={isOpen}
        aria-controls="assistant-message"
        className="grid h-13 w-13 place-items-center rounded-full border border-[var(--theme-primary)] bg-[var(--theme-primary)] text-[var(--theme-on-primary)] shadow-[var(--shadow-primary)] transition-all hover:-translate-y-0.5 hover:brightness-105"
      >
        <Icon name="sparkle" size={20} />
      </button>
    </div>
  );
}
