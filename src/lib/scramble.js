const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%&';

/**
 * Scrambles an element's text and resolves it left-to-right into finalText.
 * Returns a cancel function.
 */
export function scrambleText(el, finalText, { duration = 600 } = {}) {
  let frame = null;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const resolved = Math.floor(progress * finalText.length);
    let output = finalText.slice(0, resolved);

    for (let i = resolved; i < finalText.length; i++) {
      const char = finalText[i];
      output += char === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }

    el.textContent = output;

    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    }
  };

  frame = requestAnimationFrame(tick);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    el.textContent = finalText;
  };
}
