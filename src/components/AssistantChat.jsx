import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui';
import AssistantMarkdown from './AssistantMarkdown';
import {
  appendAssistantText,
  parseStoredMessages,
  scrollAssistantToBottom,
} from '../lib/assistantChat';

const STORAGE_KEY = 'assistant-messages';
const MAX_LENGTH = 1200;

const suggestions = [
  { text: 'How did he cut setup from 2 weeks to 2 hours?', color: 'var(--acc)' },
  { text: 'What agentic AI work has he shipped?', color: 'var(--butter)' },
  { text: 'What is his technical stack?', color: 'var(--sky)' },
  { text: 'How can I get in touch?', color: 'var(--peach)' },
];

const iconButton =
  'grid h-9 w-9 place-items-center rounded-full text-[var(--mut)] transition-colors hover:bg-white/[0.06] hover:text-[var(--fg)]';

const readStoredMessages = () => {
  try {
    return parseStoredMessages(window.sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

const getErrorMessage = async (response) => {
  try {
    return (await response.json()).error || 'The assistant could not respond.';
  } catch {
    return 'The assistant could not respond.';
  }
};

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(readStoredMessages);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const controllerRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    scrollAssistantToBottom(messagesContainerRef.current);
  }, [error, isLoading, isOpen, messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    else if (wasOpenRef.current) launcherRef.current?.focus();
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isLoading) return;

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage is unavailable (private mode); the chat still works for this page view.
    }
  }, [isLoading, messages]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 140)}px`;
  }, [draft, isOpen]);

  const ask = async (history) => {
    const question = history[history.length - 1].content;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort('timeout'), 30000);
    let received = '';

    controllerRef.current = controller;
    setMessages([...history, { role: 'assistant', content: '' }]);
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok || !response.body) {
        throw new Error(await getErrorMessage(response));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        received += text;
        setMessages((currentMessages) => appendAssistantText(currentMessages, text));
      }
    } catch (requestError) {
      if (controller.signal.reason === 'reset') return;

      if (controller.signal.reason === 'stop') {
        if (!received) {
          setMessages(history.slice(0, -1));
          setDraft(question);
        }
      } else {
        setMessages(history);
        setError(
          controller.signal.reason === 'timeout'
            ? 'The assistant timed out.'
            : requestError.message || 'The assistant could not respond.'
        );
      }
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
      setIsLoading(false);
    }
  };

  const sendMessage = (message) => {
    const content = message.trim();
    if (!content || isLoading) return;

    setDraft('');
    ask([...messages, { role: 'user', content }]);
  };

  const stop = () => controllerRef.current?.abort('stop');

  const startOver = () => {
    controllerRef.current?.abort('reset');
    setMessages([]);
    setError('');
    setDraft('');
    inputRef.current?.focus();
  };

  return (
    <>
      {isOpen && (
        <section
          role="dialog"
          aria-label="Ask about Shafiq"
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
          className={`fixed inset-2 z-50 flex animate-[assistant-in_0.32s_cubic-bezier(0.16,1,0.3,1)] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(14,17,15,0.9)] text-[var(--fg)] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(168,230,161,0.05)] backdrop-blur-xl backdrop-saturate-150 sm:inset-auto sm:right-6 sm:bottom-6 ${
            isExpanded
              ? 'sm:h-[calc(100svh-3rem)] sm:w-[min(760px,calc(100vw-3rem))]'
              : 'sm:h-[min(640px,calc(100svh-3rem))] sm:w-[400px]'
          }`}
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/[0.08] py-3 pr-3 pl-5">
            <div className="min-w-0">
              <p className="mono flex items-center gap-2 text-[11px] tracking-[0.08em] text-[var(--mut)] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--acc)] shadow-[0_0_10px_var(--acc)]" />
                AI assistant
              </p>
              <h2 className="mt-0.5 truncate text-[17px] font-bold tracking-[-0.02em]">
                Ask about Shafiq
              </h2>
            </div>
            <div className="flex items-center">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={startOver}
                  aria-label="Start a new conversation"
                  title="New conversation"
                  className={iconButton}
                >
                  <Icon name="refresh" size={17} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                aria-label={isExpanded ? 'Restore assistant size' : 'Expand assistant'}
                title={isExpanded ? 'Restore' : 'Expand'}
                className={`${iconButton} max-sm:hidden`}
              >
                <Icon name={isExpanded ? 'minimize' : 'maximize'} size={17} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                title="Close"
                className={iconButton}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </header>

          <div
            ref={messagesContainerRef}
            data-lenis-prevent
            role="log"
            aria-live="polite"
            aria-busy={isLoading}
            className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain px-5 py-6"
          >
            {messages.length === 0 ? (
              <div className="mt-auto">
                <p className="text-[clamp(26px,4vw,32px)] leading-[1.02] font-bold tracking-[-0.04em]">
                  What would you like to know?
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--mut)]">
                  Answers come from his résumé, case studies and projects.
                </p>
                <ul className="mt-6 border-t border-white/[0.08]">
                  {suggestions.map(({ text, color }) => (
                    <li key={text} className="border-b border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => sendMessage(text)}
                        className="group flex w-full items-center gap-3 py-3.5 text-left text-[15px] text-[#c7c8c1] transition-colors hover:text-[var(--fg)]"
                      >
                        <i
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: color }}
                        />
                        <span className="flex-1">{text}</span>
                        <Icon
                          name="arrow_outward"
                          size={16}
                          className="text-[var(--mut)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--acc)]"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              messages.map((message, index) =>
                message.role === 'user' ? (
                  <p
                    key={`user-${index}`}
                    className="ml-auto max-w-[85%] rounded-[18px] rounded-br-md border border-[var(--acc)]/25 bg-[var(--acc)]/10 px-4 py-2.5 text-[15px] leading-relaxed break-words whitespace-pre-wrap"
                  >
                    {message.content}
                  </p>
                ) : (
                  <div key={`assistant-${index}`} className="flex gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--acc)]/40 text-[var(--acc)]">
                      <Icon name="sparkle" size={14} />
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5 text-[15px] leading-7 break-words text-[#d9dad4]">
                      {message.content ? (
                        <AssistantMarkdown content={message.content} />
                      ) : (
                        <span
                          className="mono inline-flex items-center gap-1.5 text-xs text-[var(--mut)]"
                          aria-label="Thinking"
                        >
                          {[0, 150, 300].map((delay) => (
                            <i
                              key={delay}
                              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--acc)]"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                          <span className="ml-1.5">thinking</span>
                        </span>
                      )}
                    </div>
                  </div>
                )
              )
            )}
            {error && (
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--rose)]/30 bg-[var(--rose)]/[0.07] px-4 py-3 text-sm text-[var(--rose)]">
                <span className="flex-1">{error}</span>
                <button
                  type="button"
                  onClick={() => {
                    inputRef.current?.focus();
                    ask(messages);
                  }}
                  className="mono rounded-full border border-current px-3 py-1 text-xs transition-colors hover:bg-[var(--rose)] hover:text-[var(--bg)]"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <form
            className="px-3 pb-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <label className="sr-only" htmlFor="assistant-message">
              Ask a question about Shafiq
            </label>
            <div className="flex items-end gap-2 rounded-[18px] border border-white/10 bg-black/30 p-1.5 pl-4 transition-colors focus-within:border-[var(--acc)]/60">
              <textarea
                ref={inputRef}
                id="assistant-message"
                rows={1}
                value={draft}
                maxLength={MAX_LENGTH}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    sendMessage(draft);
                  }
                }}
                placeholder="Ask anything about his work…"
                autoComplete="off"
                className="min-w-0 flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-[var(--fg)] outline-none! placeholder:text-[var(--mut)]"
              />
              {isLoading ? (
                <button
                  key="stop"
                  type="button"
                  onClick={stop}
                  aria-label="Stop answering"
                  title="Stop"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-[var(--fg)] transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
                >
                  <Icon name="stop" size={16} />
                </button>
              ) : (
                <button
                  key="send"
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label="Send question"
                  title="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--acc)] text-[var(--bg)] transition-[opacity,transform] hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Icon name="arrow_up" size={18} strokeWidth={2} />
                </button>
              )}
            </div>
            <p className="mono mt-2 flex justify-between gap-3 px-2 text-[11px] whitespace-nowrap text-[var(--mut)]">
              <span>
                AI can be wrong ·{' '}
                <a
                  href="/docs/Resume-Shafiq-Imtiaz.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/20 underline-offset-2 hover:text-[var(--fg)]"
                >
                  résumé
                </a>
              </span>
              {draft.length > MAX_LENGTH - 200 ? (
                <span>
                  {draft.length}/{MAX_LENGTH}
                </span>
              ) : (
                <span className="max-sm:hidden">Shift+Enter for a new line</span>
              )}
            </p>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen(true)}
        hidden={isOpen}
        aria-label="Any Questions? Ask the AI assistant about Shafiq"
        aria-haspopup="dialog"
        className="mono fixed right-4 bottom-4 z-50 inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/15 bg-[rgba(14,17,15,0.82)] py-2 pr-5 pl-4 text-[13px] text-[var(--fg)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[var(--acc)] sm:right-6 sm:bottom-6"
      >
        <Icon name="sparkle" size={18} className="text-[var(--acc)]" />
        Any Questions?
      </button>
    </>
  );
}
