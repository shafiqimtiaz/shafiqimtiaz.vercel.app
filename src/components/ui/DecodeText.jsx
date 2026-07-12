import { useEffect, useRef } from 'react';
import { scrambleText } from '../../lib/scramble';
import { prefersReducedMotion } from '../../lib/gsapConfig';

/**
 * Renders text that decodes from scrambled glyphs on mount.
 * Accessible: real text lives in aria-label, animated glyphs are aria-hidden.
 */
export default function DecodeText({ text, delay = 0, duration = 600, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      el.textContent = text;
      return undefined;
    }

    let cancel = null;
    const timer = setTimeout(() => {
      cancel = scrambleText(el, text, { duration });
    }, delay);

    return () => {
      clearTimeout(timer);
      if (cancel) cancel();
    };
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text} role="text">
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
