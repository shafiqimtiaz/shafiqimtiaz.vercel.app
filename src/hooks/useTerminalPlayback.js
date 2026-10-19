import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const PLAYBACK_STATES = {
  idle: 'idle',
  suggesting: 'suggesting',
  executing: 'executing',
  rendered: 'rendered',
};

export function createActionLookup(actions = []) {
  return actions.reduce((accumulator, action) => {
    accumulator[action.command] = action;
    return accumulator;
  }, {});
}

export default function useTerminalPlayback(sessionConfig) {
  const { actions = [], fallbackOutput = '' } = sessionConfig;
  const [state, setState] = useState(PLAYBACK_STATES.idle);
  const [activeCommand, setActiveCommand] = useState('');
  const [outputLines, setOutputLines] = useState([]);
  const timerRef = useRef(null);

  const actionLookup = useMemo(() => createActionLookup(actions), [actions]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const revealSuggestions = useCallback(() => {
    setState((current) =>
      current === PLAYBACK_STATES.executing ? current : PLAYBACK_STATES.suggesting
    );
  }, []);

  const hideSuggestions = useCallback(() => {
    setState((current) =>
      current === PLAYBACK_STATES.suggesting ? PLAYBACK_STATES.idle : current
    );
  }, []);

  const executeCommand = useCallback(
    (command) => {
      const action = actionLookup[command];
      const nextOutput = action ? action.output : [fallbackOutput];
      const delayMs = action?.delayMs ?? 2000;

      clearTimer();
      setActiveCommand(command);
      setOutputLines([]);
      setState(PLAYBACK_STATES.executing);

      timerRef.current = setTimeout(() => {
        setOutputLines(nextOutput);
        setState(PLAYBACK_STATES.rendered);
        timerRef.current = null;
      }, delayMs);
    },
    [actionLookup, clearTimer, fallbackOutput]
  );

  useEffect(() => clearTimer, [clearTimer]);

  return {
    actions,
    state,
    activeCommand,
    outputLines,
    revealSuggestions,
    hideSuggestions,
    executeCommand,
  };
}
