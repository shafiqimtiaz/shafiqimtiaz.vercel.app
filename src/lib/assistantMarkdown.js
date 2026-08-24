const BLOCK_START = /^( {0,3}#{1,3}\s+|\s*[-*+]\s+|\s*\d+[.)]\s+| {0,3}(```+|~~~+))/;
const INLINE_MARKDOWN =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_/g;

export function parseAssistantMarkdown(markdown) {
  const lines = String(markdown ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^ {0,3}(```+|~~~+)\s*([\w-]*)\s*$/);

    if (fence) {
      const content = [];
      const closingFence = new RegExp(`^ {0,3}${fence[1]}\\s*$`);

      index += 1;
      while (index < lines.length && !closingFence.test(lines[index])) {
        content.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) index += 1;

      blocks.push({ type: 'code', language: fence[2], content: content.join('\n') });
      continue;
    }

    const heading = line.match(/^ {0,3}(#{1,3})\s+(.+?)\s*#*$/);

    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, content: heading[2] });
      index += 1;
      continue;
    }

    const unorderedItem = line.match(/^\s*[-*+]\s+(.+)$/);

    if (unorderedItem) {
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*[-*+]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: 'list', ordered: false, items });
      continue;
    }

    const orderedItem = line.match(/^\s*\d+[.)]\s+(.+)$/);

    if (orderedItem) {
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*\d+[.)]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: 'list', ordered: true, items });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !BLOCK_START.test(lines[index])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: 'paragraph', content: paragraph.join('\n') });
  }

  return blocks;
}

export function parseAssistantInlineMarkdown(text) {
  const value = String(text ?? '');
  const tokens = [];
  let lastIndex = 0;

  for (const match of value.matchAll(INLINE_MARKDOWN)) {
    const [raw, linkContent, href, codeContent, strongA, strongB, emphasisA, emphasisB] = match;
    const start = match.index ?? 0;

    if (start > lastIndex) {
      tokens.push({ type: 'text', content: value.slice(lastIndex, start) });
    }

    if (href) {
      tokens.push({ type: 'link', content: linkContent, href });
    } else if (codeContent) {
      tokens.push({ type: 'code', content: codeContent });
    } else if (strongA || strongB) {
      tokens.push({ type: 'strong', content: strongA || strongB });
    } else {
      tokens.push({ type: 'emphasis', content: emphasisA || emphasisB });
    }

    lastIndex = start + raw.length;
  }

  if (lastIndex < value.length) {
    tokens.push({ type: 'text', content: value.slice(lastIndex) });
  }

  return tokens.length > 0 ? tokens : [{ type: 'text', content: value }];
}
