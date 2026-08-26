import { Button, DecodeText, Icon, ScrambleOnHover } from '../../components/ui';

export default function HeroSection() {
  return (
    <div className="rise min-w-0">
      <div className="font-body inline-flex items-center gap-2.5 rounded-full border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)] px-4 py-1.5 text-[0.68rem] tracking-[0.14em] text-[var(--theme-text-muted)] uppercase">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--theme-primary)] opacity-60"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--theme-primary)]"></span>
        </span>
        Senior Software Engineer
        <span className="hidden sm:inline"> · Full-Stack &amp; AI Platforms</span>
      </div>

      <ScrambleOnHover
        as="h1"
        reserveWidth
        className="font-headline mt-7 text-[clamp(3.2rem,7vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--theme-text)]"
      >
        <DecodeText text="Shafiq" delay={150} duration={550} />
        <br />
        <DecodeText
          text="Imtiaz"
          delay={350}
          duration={550}
          className="text-glow text-[var(--theme-primary)]"
        />
      </ScrambleOnHover>

      <p className="font-body mt-6 text-sm tracking-[0.06em] text-[var(--theme-text-muted)]">
        <span className="text-[var(--theme-primary)]">&gt;</span> React · TypeScript · Java · Spring
        Boot{'  '}
        <span className="text-[var(--theme-outline-variant)]">//</span> AI &amp; Agents
      </p>

      <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-[var(--theme-text-muted)]">
        Senior Software Engineer delivering full-stack products from React interfaces and
        TypeScript/Java APIs through data, AWS, event-driven workflows, and production AI
        capabilities. At Flexspring, I lead technical direction for an integration platform serving
        2,500+ B2B client configurations across 3 product surfaces.
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Button
          variant="primary"
          href="/docs/Resume-Shafiq-Imtiaz.pdf"
          target="_blank"
          rel="noreferrer"
          className="min-h-13 px-6 text-[0.72rem] transition-all hover:-translate-y-0.5"
        >
          <span>View Résumé</span>
        </Button>
        <Button
          variant="ghost"
          href="/docs/Resume-Shafiq-Imtiaz.md"
          download
          aria-label="Download Résumé as Markdown"
          className="min-h-13 w-13 p-0 transition-all hover:-translate-y-0.5"
        >
          <Icon name="description" size={24} />
        </Button>
        <Button
          variant="secondary"
          href="#contact"
          className="min-h-13 px-6 text-[0.72rem] transition-all hover:-translate-y-0.5"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Get in touch</span>
          <Icon name="arrow_outward" size={18} />
        </Button>
      </div>

      <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--theme-outline-variant)] pt-6 text-sm">
        <div>
          <dt className="font-body text-[0.6rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase">
            Location
          </dt>
          <dd className="font-headline mt-1 font-semibold text-[var(--theme-text)]">Toronto, ON</dd>
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
            React · TypeScript · Java · Spring Boot · AI Platforms
          </dd>
        </div>
      </dl>
    </div>
  );
}
