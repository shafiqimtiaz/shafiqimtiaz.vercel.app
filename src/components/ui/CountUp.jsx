import { useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView';
import { gsap, prefersReducedMotion } from '../../lib/gsapConfig';

const NUMERIC_PATTERN = /^([^0-9]*)([\d,]+)(.*)$/;

/**
 * Animates numeric stat values (e.g. "2,500+", "89%", "$1K") counting up
 * when scrolled into view. Non-numeric values render as-is.
 */
export default function CountUp({ value, className = '' }) {
  const { ref: viewRef, inView } = useInView();
  const numberRef = useRef(null);

  const match = typeof value === 'string' ? value.match(NUMERIC_PATTERN) : null;
  const prefix = match ? match[1] : '';
  const target = match ? Number(match[2].replace(/,/g, '')) : 0;
  const suffix = match ? match[3] : '';
  const hasComma = match ? match[2].includes(',') : false;

  useEffect(() => {
    const el = numberRef.current;
    if (!match || !inView || !el) return undefined;

    if (prefersReducedMotion()) {
      el.textContent = match[2];
      return undefined;
    }

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: target,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => {
        const rounded = Math.round(counter.n);
        el.textContent = hasComma ? rounded.toLocaleString('en-US') : String(rounded);
      },
    });

    return () => tween.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={viewRef} className={className} aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        <span ref={numberRef}>0</span>
        {suffix}
      </span>
    </span>
  );
}
