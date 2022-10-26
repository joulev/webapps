type Props = React.PropsWithChildren<{ href: string }>;
export default function Link({ href, children }: Props) {
  return (
    <a href={href} className="anchor" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
