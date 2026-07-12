import { Button, DecodeText } from '../../components/ui';

export default function HeroSection() {
  return (
    <div className="rise min-w-0">
      <div className="font-body inline-flex items-center gap-2.5 rounded-full border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)] px-4 py-1.5 text-[0.68rem] tracking-[0.14em] text-[var(--theme-text-muted)] uppercase">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--theme-primary)] opacity-60"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--theme-primary)]"></span>
        </span>
        Senior Software Engineer · Open to work
      </div>

      <h1 className="font-headline mt-7 text-[clamp(3.2rem,7vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--theme-text)]">
        <DecodeText text="Shafiq" delay={150} duration={550} />
        <br />
        <DecodeText
          text="Imtiaz"
          delay={350}
          duration={550}
          className="text-glow text-[var(--theme-primary)]"
        />
      </h1>

      <p className="font-body mt-6 text-sm tracking-[0.06em] text-[var(--theme-text-muted)]">
        <span className="text-[var(--theme-primary)]">&gt;</span> AI Platform Infrastructure{'  '}
        <span className="text-[var(--theme-outline-variant)]">//</span> Enterprise Microservices
      </p>

      <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-[var(--theme-text-muted)]">
        I architect LLM integration layers, agentic frameworks, and event-driven systems — and
        productionize AI features with caching, fallback, and governance. Currently building AI
        platform infrastructure at Flexspring, serving 2,500+ client configurations.
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Button
          variant="primary"
          href="/docs/Shafiq-Imtiaz-Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="min-h-13 px-6 text-[0.72rem]"
        >
          <span>View Résumé</span>
          <span className="material-symbols-outlined text-[1.1rem]" aria-hidden="true">
            description
          </span>
        </Button>
        <Button
          variant="secondary"
          href="#contact"
          className="min-h-13 px-6 text-[0.72rem]"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Get in touch</span>
          <span className="material-symbols-outlined text-[1.1rem]" aria-hidden="true">
            arrow_outward
          </span>
        </Button>
      </div>

      <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--theme-outline-variant)] pt-6 text-sm">
        <div>
          <dt className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
            Location
          </dt>
          <dd className="font-headline mt-1 font-semibold text-[var(--theme-text)]">Ottawa, ON</dd>
        </div>
        <div>
          <dt className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
            Certified
          </dt>
          <dd className="font-headline mt-1 font-semibold text-[var(--theme-text)]">
            AWS AI Practitioner
          </dd>
        </div>
        <div>
          <dt className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
            Focus
          </dt>
          <dd className="font-headline mt-1 font-semibold text-[var(--theme-text)]">
            LLM · Java · React
          </dd>
        </div>
      </dl>
    </div>
  );
}
