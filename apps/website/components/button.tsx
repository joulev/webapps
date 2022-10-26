import clsx from "clsx";

type Props = React.PropsWithChildren<{ href: string; primary?: boolean }>;
export default function Button({ href, primary, children }: Props) {
  return (
    <a
      href={href}
      className={clsx("btn", primary ? "btn-primary" : "btn-secondary")}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
