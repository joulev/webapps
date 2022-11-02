export default function A({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <a
      href={href}
      className="btn btn-tertiary btn-nopadding text-daw-main-900 hover:text-daw-main-600 transition"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
