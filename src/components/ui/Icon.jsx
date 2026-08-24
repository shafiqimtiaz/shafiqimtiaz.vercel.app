import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiBrain01Icon,
  ArrowUpRight01Icon,
  BrowserIcon,
  Certificate01Icon,
  CloudIcon,
  CodeIcon,
  Database01Icon,
  FactoryIcon,
  FileTextIcon,
  GraduationCapIcon,
  MailAtSign01Icon,
  Maximize01Icon,
  MenuIcon,
  Minimize01Icon,
  NetworkIcon,
  Rocket01Icon,
  SendIcon,
  ServerStack01Icon,
  SparklesIcon,
  TerminalIcon,
  UserGroupIcon,
  XIcon,
} from '@hugeicons/core-free-icons';

// Maps string icon names (used in src/data + JSX) to HugeIcons free components.
const iconMap = {
  arrow_outward: ArrowUpRight01Icon,
  send: SendIcon,
  description: FileTextIcon,
  code: CodeIcon,
  menu: MenuIcon,
  maximize: Maximize01Icon,
  minimize: Minimize01Icon,
  close: XIcon,
  alternate_email: MailAtSign01Icon,
  hub: NetworkIcon,
  terminal: TerminalIcon,
  smart_toy: AiBrain01Icon,
  sparkle: SparklesIcon,
  dns: ServerStack01Icon,
  web: BrowserIcon,
  database: Database01Icon,
  cloud: CloudIcon,
  workspace_premium: Certificate01Icon,
  rocket_launch: Rocket01Icon,
  factory: FactoryIcon,
  school: GraduationCapIcon,
  groups: UserGroupIcon,
};

export default function Icon({ name, size = 24, strokeWidth = 1.5, className = '', ...props }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return (
    <HugeiconsIcon
      icon={Component}
      size={size}
      color="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
}
