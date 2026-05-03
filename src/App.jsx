import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
