import { useEffect } from 'react';
import useTerminalPlayback, { PLAYBACK_STATES } from '../../hooks/useTerminalPlayback';

export default function TerminalPlayback({ sessionConfig }) {
  const { prompt, actions } = sessionConfig;
  const { state, activeCommand, outputLines, executeCommand } = useTerminalPlayback(sessionConfig);

  const isExecuting = state === PLAYBACK_STATES.executing;
  const activeAction = actions.find((action) => action.command === activeCommand);
  const media = state === PLAYBACK_STATES.rendered ? activeAction?.media : null;

  // Auto-run the first command on mount so the panel is never empty.
  useEffect(() => {
    if (actions.length > 0) executeCommand(actions[0].command);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-4">
      {/* Command line */}
      <div className="flex flex-wrap items-center gap-2 text-[0.9rem]">
        <span className="text-[var(--theme-primary)]">{prompt}</span>
        <span className="text-[var(--theme-text)]">{activeCommand || 'whoami'}</span>
        <span className="cursor-block inline-block text-[var(--theme-primary)]">█</span>
      </div>

      {/* Output */}
      <div className="grid min-h-[6.5rem] gap-1.5 border-l-2 border-[var(--theme-primary)] bg-[var(--theme-surface-lowest)] px-4 py-3 text-[0.88rem]">
        {isExecuting ? (
          <div className="text-[var(--theme-tertiary)]">
            running<span className="cursor-block">…</span>
          </div>
        ) : (
          <>
            {outputLines.map((line, index) => (
              <div
                key={`${line}-${index}`}
                className={
                  line.startsWith('>')
                    ? 'text-[var(--theme-primary)]'
                    : 'text-[var(--theme-text-muted)]'
                }
              >
                {line || ' '}
              </div>
            ))}
            {media?.type === 'gif' && (
              <img
                src={media.src}
                alt={media.alt || 'terminal output'}
                loading="lazy"
                className="mt-2 max-h-56 w-auto rounded border border-[var(--theme-outline-variant)]"
              />
            )}
          </>
        )}
      </div>

      {/* Suggestions — always visible for discoverability */}
      <div className="grid gap-2">
        <p className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
          // run a command
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {actions.map((action) => {
            const isActive = activeCommand === action.command;
            return (
              <button
                type="button"
                key={action.id}
                aria-pressed={isActive}
                onClick={() => executeCommand(action.command)}
                className={`rounded border px-3 py-2 text-left text-[0.66rem] tracking-[0.08em] uppercase transition-colors focus-visible:border-[var(--theme-primary)] focus-visible:outline-none ${
                  isActive
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-surface-high)] text-[var(--theme-primary)]'
                    : 'border-[var(--theme-outline-variant)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'
                }`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
