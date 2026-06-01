import { techStack } from '../../data/experience';
import { Reveal } from '../../components/ui';

export default function TechStackSection() {
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
          <h2 className="font-headline mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
            Tech <span className="text-[var(--theme-secondary)]">stack</span>
          </h2>
        </div>
        <div className="font-body inline-flex items-center gap-2 text-[0.62rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
          <span className="h-2 w-2 rounded-full bg-[var(--theme-primary)]"></span>
          Production-grade
        </div>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-outline-variant)] md:grid-cols-2 xl:grid-cols-3">
        {techStack.map((category, i) => (
          <Reveal
            key={category.title}
            delay={(i % 3) * 80}
            className="group relative flex flex-col bg-[var(--theme-surface-low)] p-7 transition-colors duration-200 hover:bg-[var(--theme-surface)]"
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className={`material-symbols-outlined text-[1.6rem] ${category.accent}`}
                aria-hidden="true"
              >
                {category.icon}
              </span>
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
