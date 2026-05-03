import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';
import useScrollProgress from '../hooks/useScrollProgress';

const navSections = [
  { id: 'hero', label: 'HOME', to: '/' },
  { id: 'projects', label: 'PROJECTS', to: '/#projects' },
  { id: 'about', label: 'ABOUT', to: '/#about' },
  { id: 'contact', label: 'CONTACT', to: '/#contact' },
];

const navLinkBase =
  'font-headline relative text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-muted)] transition-colors hover:text-[var(--theme-primary)]';
const mobileLinkBase =
  'font-headline text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-muted)] transition-colors hover:text-[var(--theme-primary)]';

function isActiveSection(activeSection, sectionId) {
  return activeSection === sectionId;
}

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, activeSection } = useScrollProgress();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* Progress bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--theme-surface-high)]">
        <div
          className="h-full bg-[var(--theme-primary)] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Nav background */}
      <div className="border-b border-[rgba(73,72,71,0.5)] bg-[var(--theme-surface-low)]/95 shadow-[var(--shadow-primary)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[var(--header-height)] w-[min(100%-2rem,var(--container-width))] items-center gap-5">
          <Link
            className="font-headline text-lg font-bold tracking-[-0.05em] text-[var(--theme-primary)]"
            to="/"
            onClick={(e) => scrollToSection(e, 'hero')}
          >
            SHAFIQ_IMTIAZ
          </Link>

          <nav className="ml-auto hidden items-center gap-6 md:flex" aria-label="Primary navigation">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={`${navLinkBase} ${
                  isActiveSection(activeSection, section.id)
                    ? 'text-[var(--theme-primary)] after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:bg-[var(--theme-primary)]'
                    : ''
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--theme-outline-variant)] bg-[var(--theme-surface)] text-[var(--theme-primary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--theme-primary)] hover:bg-[var(--theme-surface-high)] md:hidden"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        <div
          className={`${menuOpen ? 'grid' : 'hidden'} border-t border-[rgba(73,72,71,0.35)] bg-[var(--theme-surface-low)] md:hidden`}
          id="mobile-navigation"
        >
          <div className="mx-auto grid w-[min(100%-2rem,var(--container-width))] gap-4 py-4">
            <nav
              className="grid gap-3 border border-[rgba(73,72,71,0.35)] bg-[var(--theme-surface)] p-4"
              aria-label="Mobile navigation"
            >
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className={`${mobileLinkBase} ${
                    isActiveSection(activeSection, section.id) ? 'text-[var(--theme-primary)]' : ''
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
