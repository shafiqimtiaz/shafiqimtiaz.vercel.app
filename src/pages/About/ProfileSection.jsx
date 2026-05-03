import { profileStats } from '../../data/stats';

export default function ProfileSection() {
  return (
    <section className="mb-16">
      <div className="grid gap-6 py-10">
        <div className="font-headline inline-flex w-fit border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-high)] px-3 py-2 text-[0.72rem] tracking-[0.16em] text-[var(--theme-primary)] uppercase">
          Developer_Profile / Identity_Records
        </div>
        <h2 className="font-headline text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-[var(--theme-text)]">
          Developer <span className="text-[var(--theme-primary)]">Profile</span>
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-stretch">
        <article className="relative overflow-hidden border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-low)] p-6 md:p-7">
          <div className="grid-pattern-panel pointer-events-none absolute inset-0 opacity-[0.08]"></div>
          <div className="relative z-10">
            <p className="font-headline text-[0.66rem] tracking-[0.17em] text-[var(--theme-primary)] uppercase">
              // MISSION_MANIFESTO
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--theme-text-muted)]">
              Full-stack software developer and{' '}
              <span className="font-semibold text-[var(--theme-primary)]">
                AWS Certified AI Practitioner
              </span>{' '}
              specializing in{' '}
              <span className="font-semibold text-[var(--theme-secondary)]">
                cloud-native systems
              </span>
              , enterprise modernization, and AI-driven delivery. I focus on ownership, technical
              leadership, and building reliable software across backend, frontend, and cloud layers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--theme-text-muted)]">
              Built and launched a Quarkus microservice with AWS S3 and MongoDB, cutting
              file-processing latency by 40% while scaling to 500+ concurrent requests. Led Java and
              Spring Boot modernization that improved CI/CD efficiency by 35%, reduced production
              incidents by 60%, and supported 99.97% uptime for core products.
            </p>
          </div>
        </article>

        <article className="profile-avatar-card relative flex flex-col overflow-hidden p-5">
          <div className="crt-overlay absolute inset-0 opacity-25" aria-hidden="true"></div>
          <div className="font-headline relative z-10 text-[0.56rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
            developer_avatar
          </div>
          <div className="profile-avatar-frame relative z-10 mt-4 min-h-[230px] flex-1 items-center justify-center rounded border">
            <img
              src="/docs/developer-avatar.jpg"
              alt="Developer Avatar"
              className="h-full w-full rounded object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="font-headline relative z-10 mt-3 inline-flex bg-[var(--theme-primary)] px-3 py-1 text-[0.58rem] tracking-[0.13em] text-[var(--theme-on-primary)] uppercase">
            ID: DEV_AVATAR_01
          </div>
        </article>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {profileStats.map((stat) => (
          <article
            key={stat.label}
            className="border border-[rgba(73,72,71,0.25)] bg-[var(--theme-surface-low)] px-5 py-4"
          >
            <p className={`font-headline text-4xl font-bold tracking-[-0.03em] ${stat.accent}`}>
              {stat.value}
            </p>
            <p className="font-headline mt-1 text-[0.56rem] tracking-[0.18em] text-[var(--theme-text-muted)] uppercase">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
