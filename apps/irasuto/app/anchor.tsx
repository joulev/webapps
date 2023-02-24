export default function A({
  href,
  className,
  children,
}: React.PropsWithChildren<{ href: string; className?: string }>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
