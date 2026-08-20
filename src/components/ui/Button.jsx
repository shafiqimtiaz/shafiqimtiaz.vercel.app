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
    'font-body relative inline-flex items-center justify-center gap-2.5 rounded-md font-bold uppercase tracking-[0.14em] transition-[color,background-color,border-color,box-shadow,filter] duration-200';

  const variants = {
    primary:
      'on-primary-text bg-[var(--theme-primary)] hover:shadow-[var(--glow-primary)] hover:brightness-105',
    secondary:
      'border border-[var(--theme-outline-variant)] bg-transparent text-[var(--theme-text)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] hover:shadow-[0_0_28px_color-mix(in_srgb,var(--theme-primary)_16%,transparent)]',
    orange:
      'bg-[var(--theme-tertiary)] text-[var(--theme-on-tertiary)] hover:brightness-105 hover:shadow-[0_0_28px_color-mix(in_srgb,var(--theme-tertiary)_28%,transparent)]',
    ghost:
      'border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-low)] text-[var(--theme-text-muted)] hover:border-[var(--theme-secondary)] hover:text-[var(--theme-secondary)] hover:shadow-[0_0_28px_color-mix(in_srgb,var(--theme-secondary)_14%,transparent)]',
    info: 'bg-[var(--theme-secondary)] text-[var(--theme-on-secondary)] hover:brightness-105 hover:shadow-[0_0_28px_color-mix(in_srgb,var(--theme-secondary)_30%,transparent)]',
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
