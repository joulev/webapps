export default function A({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <a
      href={href}
      className="btn btn-tertiary btn-nopadding"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
