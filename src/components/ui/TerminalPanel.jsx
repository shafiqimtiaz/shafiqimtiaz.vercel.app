export default function TerminalPanel({
  title = 'shafiq@flexspring: ~',
  className = '',
  bodyClassName = '',
  children,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[var(--theme-outline-variant)] bg-[var(--theme-surface-lowest)] shadow-[var(--shadow-soft)] ${className}`}
    >
      <div className="crt-overlay pointer-events-none absolute inset-0 z-10"></div>

      <div className="relative z-20 flex items-center justify-between gap-4 border-b border-[var(--theme-outline-variant)] bg-[var(--theme-surface-high)] px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[var(--theme-error-dim)]"></span>
          <span className="h-3 w-3 rounded-full bg-[var(--theme-tertiary-dim)]"></span>
          <span className="h-3 w-3 rounded-full bg-[var(--theme-primary-dim)]"></span>
        </div>
        <div className="font-body text-[0.7rem] tracking-[0.08em] text-[var(--theme-text-muted)] lowercase">
          {title}
        </div>
        <span className="h-3 w-3" aria-hidden="true"></span>
      </div>

      <div
        className={`font-body relative z-20 ${bodyClassName || 'grid gap-5 p-6 text-sm md:text-base'}`}
      >
        {children}
      </div>
    </div>
  );
}
