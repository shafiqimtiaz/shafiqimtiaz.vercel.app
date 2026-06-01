import { Link } from 'react-router';

export default function Button({
  variant = 'primary',
  href,
  to,
  className = '',
  children,
  ...props
}) {
  const baseStyles =
    'font-body group/btn relative inline-flex items-center justify-center gap-2.5 rounded-md font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:-translate-y-0.5';

  const variants = {
    primary:
      'on-primary-text bg-[var(--theme-primary)] hover:shadow-[var(--glow-primary)] hover:brightness-105',
    secondary:
      'border border-[var(--theme-outline-variant)] bg-transparent text-[var(--theme-text)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]',
    orange: 'bg-[var(--theme-tertiary)] text-[var(--theme-on-tertiary)] hover:brightness-105',
    ghost:
      'border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)] text-[var(--theme-text-muted)] hover:border-[var(--theme-secondary)] hover:text-[var(--theme-secondary)]',
    info: 'bg-[var(--theme-secondary)] text-[var(--theme-on-secondary)] hover:brightness-105',
  };

  const sizing = className.includes('min-h-') ? '' : 'min-h-12 px-5 text-[0.66rem]';
  const classes = [baseStyles, variants[variant], sizing, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
