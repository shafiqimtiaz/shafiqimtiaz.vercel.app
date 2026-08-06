import { Link } from 'react-router';
import ScrambleOnHover from './ScrambleOnHover';

export default function SectionHeader({ label, title, description, actionLink, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-4 pb-6 ${actionLink ? 'border-b border-[rgba(73,72,71,0.25)] md:flex-row md:items-end md:justify-between' : ''} ${className}`}
    >
      <div className="grid max-w-[56rem] gap-4">
        {label && (
          <div className="font-headline inline-flex w-fit items-center border-l-4 border-[var(--theme-primary)] bg-[var(--theme-surface)] px-4 py-2 text-[0.72rem] tracking-[0.18em] text-[var(--theme-primary)] uppercase">
            {label}
          </div>
        )}

        {title && (
          <ScrambleOnHover
            as="h2"
            reserveWidth
            className="font-headline text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.92] font-bold tracking-[-0.05em] text-[var(--theme-text)] uppercase"
          >
            {title}
          </ScrambleOnHover>
        )}

        {description && (
          <p className="mt-2 max-w-[46rem] text-lg text-[var(--theme-text-muted)]">{description}</p>
        )}
      </div>

      {actionLink && (
        <div className="mt-2 whitespace-nowrap md:mt-0">
          {actionLink.href ? (
            <a
              href={actionLink.href}
              className="font-headline text-[0.72rem] tracking-[0.18em] text-[var(--theme-secondary)] uppercase transition-colors hover:text-[var(--theme-primary)]"
              target="_blank"
              rel="noreferrer"
            >
              {actionLink.label}
            </a>
          ) : (
            <Link
              to={actionLink.to}
              className="font-headline text-[0.72rem] tracking-[0.18em] text-[var(--theme-secondary)] uppercase transition-colors hover:text-[var(--theme-primary)]"
            >
              {actionLink.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
