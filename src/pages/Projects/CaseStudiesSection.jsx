import { caseStudies } from '../../data/projects';
import { Button } from '../../components/ui';

export default function CaseStudiesSection() {
  return (
    <>
      <section className="grid gap-6 py-10">
        <div className="font-headline inline-flex w-fit border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-high)] px-3 py-2 text-[0.72rem] tracking-[0.16em] text-[var(--theme-primary)] uppercase">
          Professional_Telemetry / Job_Results
        </div>
        <h1 className="font-headline text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-[var(--theme-text)]">
          Career <span className="text-[var(--theme-primary)]">Milestones</span>
        </h1>
        <p className="max-w-[38rem] text-base text-[var(--theme-text-muted)]">
          Professional project achievements backed by on-the-job delivery, engineering impact, and
          product outcomes across enterprise and academic environments.
        </p>
      </section>

      <section className="grid gap-8 pb-8 md:grid-cols-2">
        {caseStudies.map((project) => (
          <article
            key={project.title}
            className="group relative overflow-hidden border border-[rgba(73,72,71,0.25)] bg-[var(--theme-surface)] shadow-[var(--shadow-soft)]"
          >
            <div className="grid-pattern-panel pointer-events-none absolute inset-0 opacity-[0.08]"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--theme-primary),transparent)] opacity-70"></div>

            <div className="relative z-10 flex items-center justify-between gap-4 px-8 pt-8">
              <span className="font-headline inline-flex bg-[rgba(0,227,253,0.12)] px-3 py-2 text-[0.7rem] tracking-[0.18em] text-[var(--theme-secondary)] uppercase">
                {project.label}
              </span>
              <span className="font-headline text-[0.72rem] tracking-[0.18em] text-[var(--theme-text-muted)] uppercase">
                {project.code}
              </span>
            </div>

            <div className="relative z-10 px-8 pt-6 pb-8">
              <h2 className="font-headline text-[clamp(2rem,3vw,2.6rem)] font-bold tracking-[-0.05em] break-words whitespace-normal text-[var(--theme-text)] uppercase transition-colors duration-200 group-hover:text-[var(--theme-primary)]">
                {project.title}
              </h2>
              <p className="mt-4 text-base text-[var(--theme-text-muted)]">{project.description}</p>
              <div className="mt-6 w-full">
                <div className="w-full border border-[rgba(73,72,71,0.3)] bg-[var(--theme-surface-high)] p-6">
                  <div className="font-headline text-[0.72rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
                    {project.highlights}
                  </div>
                  <div className="font-headline mt-5 grid gap-3 text-[0.98rem] text-[var(--theme-secondary)]">
                    {project.details.map((detail) => (
                      <div key={detail}>&gt; {detail}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-l-2 border-[var(--theme-tertiary)] bg-[var(--theme-surface-lowest)] px-4 py-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-headline text-[0.66rem] font-semibold tracking-[0.14em] text-[var(--theme-tertiary)] uppercase"
                  >
                    # {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {project.primary && (
                  <Button
                    variant="primary"
                    href={project.primary.external ? project.primary.href : undefined}
                    to={!project.primary.external ? project.primary.to : undefined}
                    target={project.primary.external ? '_blank' : undefined}
                    rel={project.primary.external ? 'noreferrer' : undefined}
                  >
                    {project.primary.label}
                  </Button>
                )}
                {project.secondary && (
                  <Button
                    variant={project.secondary.to === '/contact' ? 'secondary' : 'ghost'}
                    href={project.secondary.external ? project.secondary.href : undefined}
                    to={!project.secondary.external ? project.secondary.to : undefined}
                    target={project.secondary.external ? '_blank' : undefined}
                    rel={project.secondary.external ? 'noreferrer' : undefined}
                  >
                    {project.secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
