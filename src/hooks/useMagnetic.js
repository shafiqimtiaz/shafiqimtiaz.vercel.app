import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsapConfig';

/**
 * Uniform hover lift for buttons — desktop (fine pointer) only, no-op otherwise.
 *
 * Deliberately vertical-only and upward-only: it gently pulls the button
 * straight up as the cursor approaches its top edge, so every hover motion on
 * the page goes in the SAME direction (up), matching the reveal/rise and card
 * hover lifts. It never drifts left or right.
 *
 * Uses `gsap.quickTo` (one retargetable tween, no per-pointermove churn) and is
 * reduced-motion safe.
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) {
      return undefined;
    }

    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' });

    const MAX_LIFT_PX = 12; // full lift once the cursor is this far above the button

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const above = rect.top - event.clientY; // > 0 when the cursor is above the button
      // Upward only: no (up/down) or (left/right) bidirectionality.
      yTo(above > 0 ? -Math.min(above, MAX_LIFT_PX) * strength : 0);
    };

    const snapBack = () => yTo(0);

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', snapBack, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', snapBack);
      snapBack();
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return ref;
}
