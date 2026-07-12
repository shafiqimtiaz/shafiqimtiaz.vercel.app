import { useEffect, useRef } from 'react';
import { timeline } from '../../data/experience';
import { Reveal } from '../../components/ui';
import { gsap, prefersReducedMotion } from '../../lib/gsapConfig';

export default function TimelineSection() {
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
      <Reveal as="header" className="mb-12 max-w-3xl">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-tertiary)] uppercase">
          // Experience Log
        </p>
        <h2 className="font-headline mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
          Career <span className="text-[var(--theme-tertiary)]">timeline</span>
        </h2>
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
          {timeline.map((entry, index) => (
            <Reveal
              key={`${entry.date}-${entry.title}`}
              delay={Math.min(index, 3) * 70}
              className="relative grid grid-cols-[32px_1fr] gap-5 md:grid-cols-[40px_1fr] md:gap-7"
            >
              <div
                className={`relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[var(--theme-bg)] md:h-10 md:w-10 ${entry.accent}`}
              >
                <span
                  className="material-symbols-outlined text-[1rem] text-[var(--theme-primary)] md:text-[1.15rem]"
                  aria-hidden="true"
                >
                  {entry.icon}
                </span>
              </div>

              <article className="rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] p-6 transition-colors duration-200 hover:border-[var(--theme-outline)] md:p-7">
                <time className="font-body text-[0.62rem] tracking-[0.16em] text-[var(--theme-primary)] uppercase">
                  {entry.date}
                </time>
                <h3 className="font-headline mt-2 text-xl font-bold tracking-[-0.02em] text-[var(--theme-text)] md:text-2xl">
                  {entry.title}
                </h3>
                <p className="font-body mt-1 text-[0.78rem] tracking-[0.06em] text-[var(--theme-text-muted)]">
                  {entry.org}
                </p>
                <ul className="mt-4 grid gap-2.5">
                  {entry.details.map((detail) => (
                    <li
                      key={detail}
                      className="relative pl-5 text-[0.9rem] leading-relaxed text-[var(--theme-text-muted)] before:absolute before:left-0 before:text-[var(--theme-primary)] before:content-['›']"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
                {entry.credentialUrl && (
                  <a
                    href={entry.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.12em] text-[var(--theme-primary)] uppercase transition-colors hover:text-[var(--theme-secondary)]"
                  >
                    View credential
                    <span className="material-symbols-outlined text-[1rem]" aria-hidden="true">
                      arrow_outward
                    </span>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
