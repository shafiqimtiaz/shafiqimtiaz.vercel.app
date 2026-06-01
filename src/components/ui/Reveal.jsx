import useInView from '../../hooks/useInView';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
