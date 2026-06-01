import { homeStats } from '../../data/stats';
import { Reveal } from '../../components/ui';

export default function StatsSection() {
  return (
    <section className="relative border-y border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)]">
      <div className="mx-auto grid w-[min(100%-2rem,var(--container-width))] divide-y divide-[var(--theme-outline-variant)] sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4">
        {homeStats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className="group flex flex-col gap-2 px-2 py-9 sm:border-l sm:border-[var(--theme-outline-variant)] sm:px-8 sm:first:border-l-0 xl:px-8"
          >
            <div
              className={`font-headline text-[clamp(2.4rem,4.5vw,3.4rem)] leading-none font-extrabold tracking-[-0.03em] ${stat.accent} transition-transform duration-300 group-hover:-translate-y-0.5`}
            >
              {stat.value}
            </div>
            <div className="font-body text-[0.64rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
