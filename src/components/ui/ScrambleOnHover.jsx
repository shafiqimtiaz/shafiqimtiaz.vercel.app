import { useEffect, useRef } from 'react';
import { scrambleTextNodes, createWidthStableGlyphPicker } from '../../lib/scramble';
import { prefersReducedMotion } from '../../lib/gsapConfig';

/**
 * Scrambles the element's text on hover, decoding back to the original while
 * preserving nested markup (colored spans, line breaks). Cancels and restores
 * on leave and on unmount.
 *
 * reserveWidth: swap each char with a width-matched glyph in the element's own
 * font, so proportional headings never expand or contract mid-scramble and
 * the font face never changes.
 */
export default function ScrambleOnHover({
  as: Tag = 'div',
  reserveWidth = false,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const cancelRef = useRef(null);
  const pickerRef = useRef(null);

  const handleEnter = () => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;
    if (cancelRef.current) cancelRef.current();

    if (reserveWidth && !pickerRef.current) {
      pickerRef.current = createWidthStableGlyphPicker(el);
    }

    cancelRef.current = scrambleTextNodes(el, {
      duration: 400,
      pickGlyph: reserveWidth ? pickerRef.current : undefined,
    });
  };

  const handleLeave = () => {
    cancelRef.current?.();
    cancelRef.current = null;
  };

  useEffect(() => () => cancelRef.current?.(), []);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
