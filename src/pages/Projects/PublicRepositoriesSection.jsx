import { publicRepositories } from '../../data/projects';
import { Reveal } from '../../components/ui';

export default function PublicRepositoriesSection() {
  return (
    <section className="mt-24">
      <Reveal as="header" className="max-w-3xl">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-tertiary)] uppercase">
          // Open Source
        </p>
        <h2 className="font-headline mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
          Public <span className="text-[var(--theme-tertiary)]">repositories</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[var(--theme-text-muted)]">
          Developer tooling, browser extensions, and AI-powered utilities — from CLI agents to
          Chrome extensions.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-outline-variant)] sm:grid-cols-2 xl:grid-cols-3">
        {publicRepositories.map((repo, index) => (
          <article
            key={repo.title}
            className="group relative flex h-full flex-col bg-[var(--theme-surface-low)] p-6 transition-colors duration-200 hover:bg-[var(--theme-surface)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-outline)] uppercase">
                repo
              </span>
              <span className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-secondary)]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="font-headline mt-4 text-xl font-bold tracking-[-0.02em] text-[var(--theme-text)] transition-colors group-hover:text-[var(--theme-tertiary)]">
              {repo.title}
            </h3>

            <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-[var(--theme-text-muted)]">
              {repo.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {repo.techStack.map((tech) => (
                <span
                  key={`${repo.title}-${tech}`}
                  className="font-body text-[0.58rem] tracking-[0.1em] text-[var(--theme-outline)] uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--theme-outline-variant)] pt-4">
              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-body inline-flex items-center gap-1.5 text-[0.66rem] font-bold tracking-[0.12em] text-[var(--theme-text)] uppercase transition-colors hover:text-[var(--theme-primary)]"
              >
                <span className="material-symbols-outlined text-[1rem]" aria-hidden="true">
                  code
                </span>
                Code
              </a>
              {repo.demoUrl && (
                <a
                  href={repo.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body inline-flex items-center gap-1.5 text-[0.66rem] font-bold tracking-[0.12em] text-[var(--theme-text-muted)] uppercase transition-colors hover:text-[var(--theme-secondary)]"
                >
                  <span className="material-symbols-outlined text-[1rem]" aria-hidden="true">
                    arrow_outward
                  </span>
                  Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
