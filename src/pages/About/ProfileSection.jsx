import { profileStats } from '../../data/stats';
import { Reveal } from '../../components/ui';

export default function ProfileSection() {
  return (
    <section className="mb-24">
      <Reveal as="header" className="max-w-3xl">
        <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-primary)] uppercase">
          // Profile
        </p>
        <h2 className="font-headline mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
          About <span className="text-[var(--theme-primary)]">me</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-stretch">
        <Reveal className="relative overflow-hidden rounded-xl border-l-2 border-[var(--theme-primary)] bg-[var(--theme-surface-low)] p-7 md:p-9">
          <p className="font-body text-[0.66rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
            // mission
          </p>
          <p className="mt-5 text-base leading-relaxed text-[var(--theme-text-muted)]">
            I&apos;m a{' '}
            <span className="font-semibold text-[var(--theme-text)]">Senior Software Engineer</span>{' '}
            and{' '}
            <span className="font-semibold text-[var(--theme-primary)]">
              AWS Certified AI Practitioner
            </span>{' '}
            building production{' '}
            <span className="font-semibold text-[var(--theme-secondary)]">
              AI platform infrastructure
            </span>{' '}
            and enterprise microservices at Flexspring, a B2B HR integration platform serving 2,500+
            client configurations.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--theme-text-muted)]">
            I architect LLM integration layers and agentic frameworks, harden AI features for
            production with caching, fallback, and governance, and own services end-to-end — from
            Spring Boot APIs and event-driven consumers through React UIs. I&apos;ve led major
            platform migrations (Java 8→17, Spring Boot 2→3, React Router v7, Vite) and resolved
            critical production incidents under live conditions.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="profile-avatar-card relative flex flex-col overflow-hidden rounded-xl p-5"
        >
          <div className="font-body relative z-10 text-[0.58rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
            ./avatar
          </div>
          <div className="profile-avatar-frame relative z-10 mt-4 min-h-[230px] flex-1 overflow-hidden rounded-lg border">
            <img
              src="/docs/developer-avatar.jpg"
              alt="Shafiq Imtiaz"
              className="h-full w-full rounded-lg object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="font-body relative z-10 mt-3 inline-flex self-start rounded bg-[var(--theme-primary)] px-3 py-1 text-[0.58rem] tracking-[0.13em] text-[var(--theme-on-primary)] uppercase">
            Ottawa, ON
          </div>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[var(--theme-outline-variant)] bg-[var(--theme-outline-variant)] sm:grid-cols-3">
        {profileStats.map((stat) => (
          <article key={stat.label} className="bg-[var(--theme-surface-low)] px-6 py-6">
            <p
              className={`font-headline text-4xl font-extrabold tracking-[-0.03em] ${stat.accent}`}
            >
              {stat.value}
            </p>
            <p className="font-body mt-2 text-[0.58rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
