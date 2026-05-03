import { homeStats } from '../../data/stats';

export default function StatsSection() {
  const headline = 'font-headline';

  return (
    <section className="relative mt-8 bg-[var(--theme-surface-low)] py-10">
      <div className="mx-auto grid w-[min(100%-2rem,var(--container-width))] gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {homeStats.map((stat) => (
          <div key={stat.label} className="grid gap-2">
            <div className={`${headline} text-[clamp(2.2rem,4vw,3rem)] font-bold ${stat.accent}`}>
              {stat.value}
            </div>
            <div className="font-headline text-[0.62rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}