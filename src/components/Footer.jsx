import { footerLinks } from '../data/links';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)]">
      <div className="mx-auto grid w-[min(100%-2rem,var(--container-width))] gap-6 py-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="font-body text-center text-[0.66rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase md:text-left">
          © 2026 Shafiq Imtiaz
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="font-body text-[0.66rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase transition-colors hover:text-[var(--theme-primary)]"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="font-body inline-flex items-center justify-center gap-2 text-[0.66rem] tracking-[0.16em] text-[var(--theme-text-muted)] uppercase md:justify-end">
          <span className="h-2 w-2 rounded-full bg-[var(--theme-primary)]"></span>
          Available · Ottawa, ON
        </div>
      </div>
    </footer>
  );
}
