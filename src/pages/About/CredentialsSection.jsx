import { useEffect, useRef } from 'react';
import { credentials } from '../../data/experience';
import { Icon, Reveal, ScrambleOnHover } from '../../components/ui';
import { gsap, prefersReducedMotion } from '../../lib/gsapConfig';

export default function CredentialsSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-scroll-card]', {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });
    }, gridRef);

    return () => context.revert();
  }, []);

  return (
    <section className="mt-24">
      <Reveal as="header" className="mb-10">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-secondary)] uppercase">
          // Education & Credentials
        </p>
        <ScrambleOnHover
          as="h2"
          reserveWidth
          className="font-headline mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-[var(--theme-text)]"
        >
          Beyond <span className="text-[var(--theme-secondary)]">the code</span>
        </ScrambleOnHover>
      </Reveal>

      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((entry) => (
          <article
            key={`${entry.date}-${entry.title}`}
            data-scroll-card=""
            className="group relative flex flex-col rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--theme-outline)]"
          >
            <div className="flex items-center gap-3">
              <Icon name={entry.icon} size={21} className={entry.accent} />
              <time className="font-body text-[0.6rem] tracking-[0.14em] text-[var(--theme-outline)] uppercase">
                {entry.date}
              </time>
            </div>

            <h3 className="font-headline mt-3 text-base font-bold tracking-[-0.02em] text-[var(--theme-text)] transition-colors group-hover:text-[var(--theme-secondary)]">
              {entry.title}
            </h3>
            <p className="font-body mt-1 text-[0.72rem] text-[var(--theme-text-muted)]">
              {entry.org}
            </p>

            {entry.details.length > 0 && (
              <ul className="mt-4 grid gap-2 border-t border-[var(--theme-outline-variant)] pt-3">
                {entry.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-[0.82rem] leading-relaxed text-[var(--theme-text-muted)]"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            {entry.credentialUrl && (
              <div className="mt-auto pt-4">
                <a
                  href={entry.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body inline-flex items-center gap-1.5 text-[0.66rem] font-bold tracking-[0.12em] text-[var(--theme-primary)] uppercase transition-colors hover:text-[var(--theme-secondary)]"
                >
                  View credential
                  <Icon name="arrow_outward" size={15} />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
