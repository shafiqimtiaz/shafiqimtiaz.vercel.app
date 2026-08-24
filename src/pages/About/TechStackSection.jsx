import { useEffect, useRef } from 'react';
import { techStack } from '../../data/experience';
import { Icon, Reveal, ScrambleOnHover } from '../../components/ui';
import { gsap, prefersReducedMotion } from '../../lib/gsapConfig';

export default function TechStackSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-scroll-card]', {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.08,
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
    <section className="mb-24">
      <Reveal
        as="header"
        className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-secondary)] uppercase">
            // Capabilities
          </p>
          <ScrambleOnHover
            as="h2"
            reserveWidth
            className="font-headline mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-[var(--theme-text)]"
          >
            Tech <span className="text-[var(--theme-secondary)]">stack</span>
          </ScrambleOnHover>
        </div>
        <div className="font-body inline-flex items-center gap-2 text-[0.62rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
          <span className="h-2 w-2 rounded-full bg-[var(--theme-primary)]"></span>
          Production-grade
        </div>
      </Reveal>

      <div
        ref={gridRef}
        className="grid gap-px overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-outline-variant)] md:grid-cols-2 xl:grid-cols-3"
      >
        {techStack.map((category) => (
          <article
            key={category.title}
            data-scroll-card=""
            className="group relative flex flex-col bg-[var(--theme-surface-low)] p-7 transition-colors duration-200 hover:bg-[var(--theme-surface)]"
          >
            <div className="flex items-center justify-between gap-4">
              <Icon name={category.icon} size={25} className={category.accent} />
              <span className="font-body text-[0.62rem] tracking-[0.18em] text-[var(--theme-outline)]">
                {category.code}
              </span>
            </div>
            <h3 className="font-headline mt-5 text-lg font-bold tracking-[-0.01em] text-[var(--theme-text)]">
              {category.title}
            </h3>
            <ul className="mt-4 grid gap-2.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="font-body text-[0.86rem] text-[var(--theme-text-muted)] transition-colors group-hover:text-[var(--theme-text)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
