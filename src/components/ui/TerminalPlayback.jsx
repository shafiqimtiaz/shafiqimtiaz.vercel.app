import useTerminalPlayback, { PLAYBACK_STATES } from '../../hooks/useTerminalPlayback';

function actionTone(line) {
  return line.startsWith('>') ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-primary)]';
}

export default function TerminalPlayback({ sessionConfig }) {
  const { prompt, actions } = sessionConfig;
  const { state, activeCommand, outputLines, revealSuggestions, hideSuggestions, executeCommand } =
    useTerminalPlayback(sessionConfig);

  const suggestionVisible = state === PLAYBACK_STATES.suggesting;
  const isExecuting = state === PLAYBACK_STATES.executing;

  return (
    <div className="grid gap-3" onMouseEnter={revealSuggestions} onMouseLeave={hideSuggestions}>
      <button
        type="button"
        aria-label="Interactive terminal command zone"
        className="flex w-full flex-wrap items-center gap-3 text-left text-[0.9rem]"
        onFocus={revealSuggestions}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && actions.length > 0) {
            executeCommand(actions[0].command);
          }
        }}
      >
        <span className="text-[var(--theme-primary)]">{prompt}</span>
        <span className="text-[var(--theme-text)]">
          {activeCommand || 'focus_or_hover_for_suggestions'}
        </span>
        <span className="cursor-block inline-block text-[var(--theme-primary)]">█</span>
      </button>

      {suggestionVisible && (
        <div className="grid gap-2 sm:grid-cols-2">
          {actions.map((action) => (
            <button
              type="button"
              key={action.id}
              className="border border-[rgba(73,72,71,0.35)] bg-[var(--theme-surface-highest)] px-3 py-2 text-left text-[0.64rem] tracking-[0.12em] text-[var(--theme-primary)] uppercase transition-colors hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] focus-visible:border-[var(--theme-primary)] focus-visible:outline-none"
              onClick={() => executeCommand(action.command)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {isExecuting && <div className="text-[var(--theme-tertiary)]">executing_command ...</div>}

      {outputLines.length > 0 && (
        <div className="grid gap-2 border-l-2 border-[var(--theme-primary)] bg-[var(--theme-surface-lowest)] px-4 py-3 text-[0.9rem]">
          {outputLines.map((line, index) => (
            <div key={`${line}-${index}`} className={actionTone(line)}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
