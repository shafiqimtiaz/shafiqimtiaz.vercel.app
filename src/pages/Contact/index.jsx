import { PageShell } from '../../components/layout';
import ContactFormSection from './ContactFormSection';
import { ExternalNodeSection, StatusSection, InfoColumnsSection } from './StatusSection';
import { contactPageText } from '../../data/links';

export default function Contact() {
  return (
    <PageShell>
      <section className="grid gap-6 py-12">
        <div className="font-headline inline-flex w-fit items-center border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface)] px-4 py-2 text-[0.72rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
          {contactPageText.badge}
        </div>
        <h1 className="font-headline text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.07em] text-[var(--theme-text)] uppercase">
          {contactPageText.title.replace(contactPageText.highlight, '')}
          <span className="text-[var(--theme-primary)]">{contactPageText.highlight}</span>_
        </h1>
        <p className="max-w-[38rem] text-lg text-[var(--theme-text-muted)]">
          {contactPageText.description}
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-stretch">
        <ContactFormSection />
        <div className="flex h-full flex-col justify-between gap-6">
          <ExternalNodeSection />
          <StatusSection />
        </div>
      </section>

      <section className="mt-8 pb-24">
        <InfoColumnsSection />
      </section>
    </PageShell>
  );
}
