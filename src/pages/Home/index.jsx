import HeroSection from './HeroSection';
import TerminalSection from './TerminalSection';
import HistorySection from './HistorySection';
import StatsSection from './StatsSection';
import ProfileSection from '../About/ProfileSection';
import TechStackSection from '../About/TechStackSection';
import CaseStudiesSection from '../Projects/CaseStudiesSection';
import ContactFormSection from '../Contact/ContactFormSection';

export default function Home() {
  return (
    <main className="pt-[var(--header-height)]">
      {/* Hero Section */}
      <section id="hero" className="py-16 lg:py-20">
        <div className="mx-auto grid w-[min(100%-2rem,1100px)] gap-12 lg:grid-cols-2 lg:items-start">
          <HeroSection />
          <TerminalSection />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Projects Section */}
      <section id="projects" className="px-4 py-20">
        <div className="mx-auto w-[min(100%-2rem,var(--container-width))]">
          <CaseStudiesSection />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20">
        <div className="mx-auto w-[min(100%-2rem,var(--container-width))]">
          <ProfileSection />
          <TechStackSection />
          <HistorySection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-16 pb-20 md:pb-32">
        <div className="mx-auto grid w-[min(100%-2rem,var(--container-width))] gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: Header */}
          <div className="grid gap-6">
            <div className="font-headline inline-flex w-fit border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-high)] px-3 py-2 text-[0.72rem] tracking-[0.16em] text-[var(--theme-primary)] uppercase">
              Direct_Channel / Open_Port
            </div>
            <h2 className="font-headline text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-[var(--theme-text)]">
              Establish <span className="text-[var(--theme-primary)]">Connection</span>
            </h2>
            <p className="max-w-[38rem] text-base text-[var(--theme-text-muted)]">
              Open a direct channel for software development, cloud modernization, backend
              engineering, or AI-focused collaboration. The fastest routes are email and LinkedIn.
            </p>

            {/* External Links */}
            <div className="mt-8 grid gap-4">
              <a
                href="mailto:shafiqimtiaz@gmail.com"
                className="group inline-flex items-center gap-4 border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-low)] px-5 py-4 transition-all hover:-translate-y-0.5 hover:bg-[var(--theme-surface)]"
              >
                <span className="material-symbols-outlined text-2xl text-[var(--theme-primary-dim)]">
                  alternate_email
                </span>
                <div className="grid gap-1">
                  <span className="font-headline text-[0.62rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
                    EMAIL
                  </span>
                  <span className="font-headline text-sm text-[var(--theme-text-muted)]">
                    shafiqimtiaz@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/shafiqimtiaz"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 border-l-4 border-[var(--theme-secondary)] bg-[var(--theme-surface-low)] px-5 py-4 transition-all hover:-translate-y-0.5 hover:bg-[var(--theme-surface)]"
              >
                <span className="material-symbols-outlined text-2xl text-[var(--theme-secondary)]">
                  share_reviews
                </span>
                <div className="grid gap-1">
                  <span className="font-headline text-[0.62rem] tracking-[0.18em] text-[var(--theme-secondary)] uppercase">
                    LINKEDIN
                  </span>
                  <span className="font-headline text-sm text-[var(--theme-text-muted)]">
                    linkedin.com/in/shafiqimtiaz
                  </span>
                </div>
              </a>

              <a
                href="https://github.com/shafiqimtiaz"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-low)] px-5 py-4 transition-all hover:-translate-y-0.5 hover:bg-[var(--theme-surface)]"
              >
                <span className="material-symbols-outlined text-2xl text-[var(--theme-primary)]">
                  terminal
                </span>
                <div className="grid gap-1">
                  <span className="font-headline text-[0.62rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
                    GITHUB
                  </span>
                  <span className="font-headline text-sm text-[var(--theme-text-muted)]">
                    github.com/shafiqimtiaz
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <ContactFormSection />
        </div>
      </section>
    </main>
  );
}
