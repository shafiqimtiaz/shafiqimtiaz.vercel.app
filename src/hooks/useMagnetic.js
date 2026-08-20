import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsapConfig';

/**
 * Magnetic hover pull — desktop (fine pointer) only, no-op otherwise.
 *
 * Uses `gsap.quickTo`: a single, retargetable tween drives the transform
 * on a per-frame basis, so pointer-follow is instant and fluid instead of
 * queueing a new tween per pointermove (the cause of laggy, swimmy magnets).
 *
 * The element's CSS transitions exclude `transform` (see Button), so GSAP's
 * transform updates are never intercepted by a transition delay.
 * Strength is a small, subtle pull by default — best practice keeps it
 * noticeable but not gimmicky.
 */
export default function useMagnetic(strength = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) {
      return undefined;
    }

    const xTo = gsap.quickTo(el, 'x', { duration: 0.28, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.28, ease: 'power3.out' });

    // Quick, deterministic return — no elastic bounce on leave.
    const snapBack = () => {
      xTo(0);
      yTo(0);
    };

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

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
