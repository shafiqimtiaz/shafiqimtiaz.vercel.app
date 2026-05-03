import { Button } from '../../components/ui';

export default function HeroSection() {
  return (
    <div className="min-w-0">
      <div className="font-headline ml-0 inline-flex items-center border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface-high)] px-3 py-2 text-[0.72rem] tracking-[0.16em] text-[var(--theme-primary)] uppercase">
        System Status: Shipping Cloud-Native Software
      </div>
      <h1 className="font-headline mt-6 ml-0 text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-[var(--theme-text)]">
        Shafiq <span className="text-[var(--theme-primary)]">Imtiaz</span>
      </h1>
      <p className="mt-6 ml-0 text-base font-medium tracking-[0.08em] text-[var(--theme-text-muted)] uppercase">
        Developer by Passion, Engineer by Mind
      </p>
      <p className="mt-5 text-base text-[var(--theme-text-muted)]">
        Full-stack Software Engineer and AWS Certified AI Practitioner focused on scalable backend
        systems, enterprise modernization, and AI-driven product delivery across Java, React, cloud,
        and microservice ecosystems.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          variant="primary"
          href="/docs/Shafiq-Imtiaz-Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="min-h-14 px-6 text-[0.76rem]"
        >
          <span>VIEW_RESUME_</span>
          <span className="material-symbols-outlined" aria-hidden="true">
            description
          </span>
        </Button>
        <Button
          variant="secondary"
          href="#contact"
          className="min-h-14 px-6 text-[0.76rem]"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>OPEN_CONTACT_</span>
          <span className="material-symbols-outlined" aria-hidden="true">
            mail
          </span>
        </Button>
      </div>
    </div>
  );
}
