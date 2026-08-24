import { parseAssistantInlineMarkdown, parseAssistantMarkdown } from '../lib/assistantMarkdown';

function InlineMarkdown({ content }) {
  return parseAssistantInlineMarkdown(content).map((token, index) => {
    const key = `${token.type}-${index}`;

    if (token.type === 'strong') {
      return (
        <strong key={key} className="font-semibold text-[var(--theme-text)]">
          {token.content}
        </strong>
      );
    }

    if (token.type === 'emphasis') {
      return <em key={key}>{token.content}</em>;
    }

    if (token.type === 'code') {
      return (
        <code
          key={key}
          className="rounded bg-[var(--theme-surface-high)] px-1.5 py-0.5 text-[0.84em] text-[var(--theme-secondary)]"
        >
          {token.content}
        </code>
      );
    }

    if (token.type === 'link') {
      return (
        <a
          key={key}
          href={token.href}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--theme-secondary)] underline decoration-[var(--theme-secondary)]/50 underline-offset-2 hover:text-[var(--theme-text)]"
        >
          {token.content}
        </a>
      );
    }

    return <span key={key}>{token.content}</span>;
  });
}

export default function AssistantMarkdown({ content }) {
  return (
    <div className="space-y-3">
      {parseAssistantMarkdown(content).map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'heading') {
          return (
            <h3
              key={key}
              className="font-headline text-[0.95rem] font-semibold text-[var(--theme-text)]"
            >
              <InlineMarkdown content={block.content} />
            </h3>
          );
        }

        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul';

          return (
            <List
              key={key}
              className={`space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>
                  <InlineMarkdown content={item} />
                </li>
              ))}
            </List>
          );
        }

        if (block.type === 'code') {
          return (
            <pre
              key={key}
              className="overflow-x-auto rounded-md border border-[var(--theme-outline-variant)] bg-[var(--theme-bg)] p-3 text-[0.8rem] leading-relaxed text-[var(--theme-secondary)]"
            >
              <code>{block.content}</code>
            </pre>
          );
        }

        return (
          <p key={key} className="whitespace-pre-wrap">
            <InlineMarkdown content={block.content} />
          </p>
        );
      })}
    </div>
  );
}
