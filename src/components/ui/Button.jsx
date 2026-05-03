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
    'font-headline inline-flex items-center justify-center gap-3 font-bold uppercase transition-all duration-200';

  const variants = {
    primary: 'on-primary-text bg-[var(--theme-primary)] hover:-translate-y-px hover:brightness-105',
    secondary:
      'border border-[var(--theme-secondary)] bg-transparent text-[var(--theme-secondary)] hover:-translate-y-px hover:bg-[var(--theme-secondary)] hover:text-[var(--theme-on-secondary)]',
    orange:
      'bg-[var(--theme-tertiary)] text-[var(--theme-on-tertiary)] hover:-translate-y-px hover:brightness-105',
    ghost:
      'border border-[rgba(73,72,71,0.22)] bg-[var(--theme-surface-low)] text-[var(--theme-text-muted)] hover:-translate-y-px hover:border-[var(--theme-secondary)] hover:text-[var(--theme-secondary)]',
    info: 'bg-[var(--theme-secondary)] text-[#111111] hover:-translate-y-px hover:brightness-105',
  };

  const sizing = className.includes('min-h-')
    ? ''
    : 'min-h-12 px-5 text-[0.64rem] tracking-[0.18em]';
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
