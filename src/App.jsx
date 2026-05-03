import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  useEffect(() => {
    // Handle hash navigation on initial load
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Run on mount if there's a hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
