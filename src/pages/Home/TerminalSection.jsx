import { TerminalPanel } from '../../components/ui';
import TerminalPlayback from '../../components/ui/TerminalPlayback';
import { HOME_TERMINAL_PLAYBACK } from '../../data/terminalPlayback';

export default function TerminalSection() {
  return (
    <div className="min-w-0">
      <TerminalPanel
        title="shafiq@flexspring: ~/whoami"
        bodyClassName="grid gap-0 p-5 text-[0.92rem] md:p-6"
      >
        <TerminalPlayback sessionConfig={HOME_TERMINAL_PLAYBACK} />
      </TerminalPanel>
    </div>
  );
}
