import { caseStudies } from '../../data/projects';
import { Icon, Reveal, ScrambleOnHover } from '../../components/ui';

const FEATURED_COUNT = 4;

export default function CaseStudiesSection() {
  const featured = caseStudies.slice(0, FEATURED_COUNT);
  const more = caseStudies.slice(FEATURED_COUNT);

  return (
    <>
      <Reveal as="header">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-primary)] uppercase">
          // Selected Work
        </p>
        <ScrambleOnHover
          as="h2"
          reserveWidth
          className="font-headline mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-[var(--theme-text)]"
        >
          Career <span className="text-[var(--theme-primary)]">milestones</span>
        </ScrambleOnHover>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--theme-text-muted)]">
          Full-stack product work spanning React interfaces, APIs, services, AI platforms, data, and
          event-driven cloud systems.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 110}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] p-7 transition-[color,background-color,border-color,box-shadow,transform,opacity,filter] duration-300 hover:-translate-y-1 hover:border-[var(--theme-primary)] hover:shadow-[var(--shadow-primary)] md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--theme-primary),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-80"></div>

            <div className="flex items-center justify-between gap-4">
              <span className="font-body inline-flex rounded-full border border-[var(--theme-outline-variant)] px-3 py-1 text-[0.7rem] tracking-[0.16em] text-[var(--theme-secondary)] uppercase">
                {project.label}
              </span>
              <span className="font-body text-[0.7rem] tracking-[0.18em] text-[var(--theme-text-muted)]">
                {project.code}
              </span>
            </div>

            <h3 className="font-headline mt-6 text-[clamp(1.8rem,3vw,2.4rem)] leading-none font-bold tracking-[-0.04em] text-[var(--theme-text)] transition-colors duration-200 group-hover:text-[var(--theme-primary)]">
              {project.title}
            </h3>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--theme-text-muted)]">
              {project.description}
            </p>

            <ul className="mt-6 grid gap-2.5 border-l-2 border-[var(--theme-primary)] pl-4">
              {project.details.map((detail) => (
                <li key={detail} className="font-body text-[0.84rem] text-[var(--theme-text)]">
                  <span className="text-[var(--theme-primary)]">›</span> {detail}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body rounded bg-[var(--theme-surface-high)] px-2.5 py-1 text-[0.7rem] tracking-[0.1em] text-[var(--theme-text-muted)] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.link && (
              <div className="mt-auto pt-7">
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] text-[var(--theme-primary)] uppercase transition-colors hover:text-[var(--theme-secondary)]"
                >
                  {project.link.label}
                  <Icon name="arrow_outward" size={17} />
                </a>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-text-muted)] uppercase">
          // More work <span className="text-[var(--theme-primary)]">({more.length})</span>
        </p>

        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-outline-variant)]">
          {more.map((project) => (
            <details key={project.title} className="case-row group bg-[var(--theme-surface-low)]">
              <summary className="grid cursor-pointer grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[var(--theme-surface)] md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,14rem)_auto] md:px-7 md:py-5">
                <span className="font-body text-[0.72rem] tracking-[0.12em] text-[var(--theme-text-muted)]">
                  {project.code}
                </span>
                <h3 className="font-headline text-lg leading-tight font-bold tracking-[-0.02em] text-[var(--theme-text)] transition-colors duration-200 group-hover:text-[var(--theme-primary)] md:text-xl">
                  {project.title}
                </h3>
                <span className="font-body hidden text-[0.7rem] tracking-[0.14em] text-[var(--theme-secondary)] uppercase md:block">
                  {project.label}
                </span>
                <Icon
                  name="plus"
                  size={20}
                  className="case-row-toggle text-[var(--theme-primary)]"
                />
              </summary>

              <div className="grid gap-6 border-t border-[var(--theme-outline-variant)] px-5 pt-5 pb-6 md:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-8 md:px-7">
                <span className="hidden md:block" aria-hidden="true"></span>
                <p className="text-[0.95rem] leading-relaxed text-[var(--theme-text-muted)]">
                  {project.description}
                </p>
                <div className="grid content-start gap-5">
                  <ul className="grid gap-2.5 border-l-2 border-[var(--theme-primary)] pl-4">
                    {project.details.map((detail) => (
                      <li
                        key={detail}
                        className="font-body text-[0.84rem] text-[var(--theme-text)]"
                      >
                        <span className="text-[var(--theme-primary)]">›</span> {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body rounded bg-[var(--theme-surface-high)] px-2.5 py-1 text-[0.7rem] tracking-[0.1em] text-[var(--theme-text-muted)] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
