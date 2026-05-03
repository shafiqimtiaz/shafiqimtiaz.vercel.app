import { useState, useEffect } from 'react';

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);

      // Check from top to bottom - first section whose top is past the fold wins
      const sectionOrder = ['hero', 'projects', 'about', 'contact'];
      const headerBuffer = 120; // Distance from top of viewport to consider section "entered"

      let active = 'hero';
      for (const id of sectionOrder) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // When section's top is past the header buffer zone, it's now active
          if (rect.top <= headerBuffer) {
            active = id;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, activeSection };
}