import { caseStudies } from '../../data/projects';
import { Reveal } from '../../components/ui';

export default function CaseStudiesSection() {
  return (
    <>
      <Reveal as="header" className="max-w-3xl">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-primary)] uppercase">
          // Selected Work
        </p>
        <h2 className="font-headline mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
          Career <span className="text-[var(--theme-primary)]">milestones</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[var(--theme-text-muted)]">
          Production work backed by on-the-job delivery — AI platform infrastructure, microservice
          ownership, and major platform modernisation across enterprise systems.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudies.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 110}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--theme-primary)] hover:shadow-[var(--shadow-primary)] md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--theme-primary),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-80"></div>

            <div className="flex items-center justify-between gap-4">
              <span className="font-body inline-flex rounded-full border border-[var(--theme-outline-variant)] px-3 py-1 text-[0.62rem] tracking-[0.16em] text-[var(--theme-secondary)] uppercase">
                {project.label}
              </span>
              <span className="font-body text-[0.7rem] tracking-[0.18em] text-[var(--theme-outline)]">
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
                  className="font-body rounded bg-[var(--theme-surface-high)] px-2.5 py-1 text-[0.62rem] tracking-[0.1em] text-[var(--theme-text-muted)] uppercase"
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
                  <span className="material-symbols-outlined text-[1.05rem]" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </>
  );
}
