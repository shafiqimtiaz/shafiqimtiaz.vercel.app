import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AssistantChat from './components/AssistantChat';
import Portfolio from './pages/Portfolio';

export default function App() {
  return (
    <>
      <Portfolio />
      <AssistantChat />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
