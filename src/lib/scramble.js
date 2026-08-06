const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%&';

/**
 * Scrambles every non-empty text node inside an element while preserving its
 * structure (nested spans, line breaks). Returns a cancel function that
 * restores the original text.
 */
export function scrambleTextNodes(el, { duration = 400, pickGlyph } = {}) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim()) nodes.push(walker.currentNode);
  }
  const finals = nodes.map((node) => node.textContent);
  let frame = null;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    nodes.forEach((node, index) => {
      const text = finals[index];
      const resolved = Math.floor(progress * text.length);
      let output = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i++) {
        const ch = text[i];
        output +=
          ch === ' '
            ? ' '
            : pickGlyph
              ? pickGlyph(text, i)
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      node.textContent = output;
    });
    if (progress < 1) frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    nodes.forEach((node, index) => {
      node.textContent = finals[index];
    });
  };
}

/**
 * Builds a glyph picker that keeps each scrambled char within ~12% of the
 * original character's width in the element's own font — the line never
 * visibly expands or contracts, and the font face never changes.
 */
export function createWidthStableGlyphPicker(el) {
  const style = getComputedStyle(el);
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;';
  probe.style.font = style.font;
  document.body.appendChild(probe);
  const measure = (s) => probe.getBoundingClientRect().width;
  const glyphs = GLYPHS.split('');
  const glyphWidths = glyphs.map(measure);
  const charWidthCache = new Map();
  probe.remove();

  return (text, index) => {
    const original = text[index];
    if (!charWidthCache.has(original)) charWidthCache.set(original, measure(original));
    const target = charWidthCache.get(original);
    const lo = target * 0.88;
    const hi = target * 1.12;
    let bucket = [];
    let nearest = 0;
    let nearestDiff = Infinity;
    glyphWidths.forEach((w, i) => {
      const diff = Math.abs(w - target);
      if (diff < nearestDiff) {
        nearestDiff = diff;
        nearest = i;
      }
      if (w >= lo && w <= hi) bucket.push(i);
    });
    return glyphs[bucket.length ? bucket[Math.floor(Math.random() * bucket.length)] : nearest];
  };
}
