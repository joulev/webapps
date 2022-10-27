import clsx from "clsx";

type Props = React.PropsWithChildren<{ href: string; primary?: boolean; className?: string }>;
export default function Button({ href, primary, className, children }: Props) {
  return (
    <a
      href={href}
      className={clsx("btn", primary ? "btn-primary" : "btn-secondary", className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
