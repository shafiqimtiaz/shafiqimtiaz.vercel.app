import { useEffect, useRef, useState } from 'react';
import { timeline } from '../../data/experience';
import { Icon, Reveal, ScrambleOnHover } from '../../components/ui';
import { gsap, prefersReducedMotion } from '../../lib/gsapConfig';

const VISIBLE_DETAILS = 3;

export default function TimelineSection() {
  const [expanded, setExpanded] = useState(() => new Set());
  const trackRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !lineRef.current || !trackRef.current) return undefined;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 78%',
          end: 'bottom 65%',
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section>
      <Reveal as="header" className="mb-12">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-tertiary)] uppercase">
          // Experience Log
        </p>
        <ScrambleOnHover
          as="h2"
          reserveWidth
          className="font-headline mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-[var(--theme-text)]"
        >
          Career <span className="text-[var(--theme-tertiary)]">timeline</span>
        </ScrambleOnHover>
      </Reveal>

      <div ref={trackRef} className="relative">
        <div
          className="pointer-events-none absolute top-2 bottom-2 left-[15px] w-px bg-[var(--theme-outline-variant)] md:left-[19px]"
          aria-hidden="true"
        ></div>
        <div
          ref={lineRef}
          className="pointer-events-none absolute top-2 bottom-2 left-[15px] w-px bg-[var(--theme-primary)] shadow-[var(--glow-primary)] md:left-[19px]"
          style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
          aria-hidden="true"
        ></div>

        <div className="grid gap-8">
          {timeline.map((entry, index) => {
            const [company, ...location] = entry.org.split(' | ');
            const entryKey = `${entry.date}-${entry.title}`;
            const isExpanded = expanded.has(entryKey);
            const hiddenCount = entry.details.length - VISIBLE_DETAILS;
            const shownDetails = isExpanded
              ? entry.details
              : entry.details.slice(0, VISIBLE_DETAILS);
            const toggle = () =>
              setExpanded((current) => {
                const next = new Set(current);
                if (next.has(entryKey)) next.delete(entryKey);
                else next.add(entryKey);
                return next;
              });

            return (
              <Reveal
                key={entryKey}
                delay={Math.min(index, 3) * 70}
                className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-5 md:grid-cols-[40px_minmax(0,1fr)] md:gap-7"
              >
                <div
                  className={`relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[var(--theme-bg)] md:h-10 md:w-10 ${entry.accent}`}
                >
                  <Icon name={entry.icon} size={18} className="text-[var(--theme-primary)]" />
                </div>

                <article className="min-w-0 rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] p-6 transition-colors duration-200 hover:border-[var(--theme-outline)] md:p-7">
                  <time className="font-body text-[0.7rem] tracking-[0.16em] text-[var(--theme-primary)] uppercase">
                    {entry.date}
                  </time>
                  <h3 className="font-headline mt-2 text-xl font-bold tracking-[-0.02em] text-[var(--theme-text)] md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="font-body mt-1 text-[0.78rem] tracking-[0.06em] text-[var(--theme-text-muted)]">
                    <a
                      href={entry.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[var(--theme-outline)] decoration-dotted underline-offset-4 transition-colors hover:text-[var(--theme-secondary)] hover:decoration-[var(--theme-secondary)]"
                    >
                      {company}
                    </a>
                    {location.length > 0 && ` | ${location.join(' | ')}`}
                  </p>
                  <ul id={`timeline-details-${index}`} className="mt-4 grid gap-2.5">
                    {shownDetails.map((detail) => (
                      <li
                        key={detail}
                        className="relative pl-5 text-[0.9rem] leading-relaxed text-[var(--theme-text-muted)] before:absolute before:left-0 before:text-[var(--theme-primary)] before:content-['›']"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {hiddenCount > 1 && (
                    <button
                      type="button"
                      onClick={toggle}
                      aria-expanded={isExpanded}
                      aria-controls={`timeline-details-${index}`}
                      className="font-body mt-4 inline-flex min-h-11 items-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] text-[var(--theme-primary)] uppercase transition-colors hover:text-[var(--theme-secondary)]"
                    >
                      {isExpanded ? 'Show less' : `Show ${hiddenCount} more`}
                      <Icon
                        name="plus"
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-45' : ''}`}
                      />
                    </button>
                  )}
                  {entry.credentialUrl && (
                    <a
                      href={entry.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.12em] text-[var(--theme-primary)] uppercase transition-colors hover:text-[var(--theme-secondary)]"
                    >
                      View credential
                      <Icon name="arrow_outward" size={16} />
                    </a>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
