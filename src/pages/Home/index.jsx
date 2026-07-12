import { useEffect, useRef } from 'react';
import HeroSection from './HeroSection';
import TerminalSection from './TerminalSection';
import StatsSection from './StatsSection';
import ProfileSection from '../About/ProfileSection';
import TechStackSection from '../About/TechStackSection';
import TimelineSection from '../About/TimelineSection';
import CaseStudiesSection from '../Projects/CaseStudiesSection';
import PublicRepositoriesSection from '../Projects/PublicRepositoriesSection';
import ContactFormSection from '../Contact/ContactFormSection';
import { Reveal } from '../../components/ui';
import { externalNodes } from '../../data/links';
import { gsap, prefersReducedMotion } from '../../lib/gsapConfig';

const container = 'mx-auto w-[min(100%-2rem,var(--container-width))]';

export default function Home() {
  const heroTerminalRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !heroTerminalRef.current) return undefined;

    const tween = gsap.to(heroTerminalRef.current, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <main className="pt-[var(--header-height)]">
      {/* Hero */}
      <section id="hero" className="py-16 lg:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <HeroSection />
          <div ref={heroTerminalRef}>
            <TerminalSection />
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Projects */}
      <section id="projects" className="py-24 md:py-28">
        <div className={container}>
          <CaseStudiesSection />
          <PublicRepositoriesSection />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-28">
        <div className={container}>
          <ProfileSection />
          <TechStackSection />
          <TimelineSection />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-2 lg:items-start`}>
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="font-body text-[0.7rem] tracking-[0.2em] text-[var(--theme-primary)] uppercase">
                // Open Channel
              </p>
              <h2 className="font-headline mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
                Let&apos;s <span className="text-[var(--theme-primary)]">connect</span>
              </h2>
              <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-[var(--theme-text-muted)]">
                Open to senior engineering roles and collaboration on AI platform infrastructure,
                backend systems, and cloud modernisation. The form opens your mail app with the
                message ready to send.
              </p>
            </Reveal>

            <Reveal delay={120} className="grid gap-3">
              {externalNodes.map((node) => (
                <a
                  key={node.label}
                  href={node.href}
                  target={node.href.startsWith('http') ? '_blank' : undefined}
                  rel={node.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-lg border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)] px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--theme-primary)]"
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${node.accent}`}
                    aria-hidden="true"
                  >
                    {node.icon}
                  </span>
                  <span className="grid gap-0.5">
                    <span className="font-body text-[0.62rem] tracking-[0.18em] text-[var(--theme-text-muted)] uppercase">
                      {node.label}
                    </span>
                    <span className="font-headline text-sm font-semibold text-[var(--theme-text)]">
                      {node.handle}
                    </span>
                  </span>
                  <span
                    className="material-symbols-outlined ml-auto text-[var(--theme-outline)] transition-colors group-hover:text-[var(--theme-primary)]"
                    aria-hidden="true"
                  >
                    arrow_outward
                  </span>
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ContactFormSection />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
