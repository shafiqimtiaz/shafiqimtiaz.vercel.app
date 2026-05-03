import { techStack } from '../../data/experience';

export default function TechStackSection() {
  return (
    <section className="mb-20">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-headline text-[clamp(2rem,3.8vw,2.4rem)] font-bold tracking-[-0.04em] uppercase">
            TECH_STACK.EXE
          </h2>
          <p className="font-headline mt-2 text-[0.62rem] tracking-[0.18em] text-[var(--theme-text-muted)] uppercase">
            CAPABILITIES_MATRIX / RUN_ANALYSIS
          </p>
        </div>
        <div className="font-headline text-[0.62rem] tracking-[0.18em] text-[var(--theme-text-muted)] uppercase">
          STATUS: STABLE
        </div>
      </div>

      <div className="grid gap-px bg-[var(--theme-surface-highest)] md:grid-cols-2 xl:grid-cols-3">
        {techStack.map((category) => (
          <article
            key={category.title}
            className="relative overflow-hidden bg-[var(--theme-surface-low)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--theme-surface)]"
          >
            <div className="grid-pattern-panel pointer-events-none absolute inset-0 opacity-[0.08]"></div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className={`material-symbols-outlined ${category.accent}`} aria-hidden="true">
                  {category.icon}
                </span>
                <span className="font-headline text-[0.62rem] tracking-[0.18em] text-[var(--theme-text-muted)] uppercase">
                  {category.code}
                </span>
              </div>
              <h3 className="font-headline mb-4 text-lg font-bold tracking-[0.02em] uppercase">
                {category.title}
              </h3>
              <div className="grid gap-3 text-base text-[var(--theme-text-muted)]">
                {category.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
