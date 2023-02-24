import clsx from "clsx";
import Link from "./link";

type Props = React.PropsWithChildren<{
  href: string;
  primary?: boolean;
  className?: string;
  disablePrefetch?: boolean;
  isExternal?: boolean;
}>;
export default function Button({
  href,
  primary,
  className,
  isExternal,
  disablePrefetch,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={clsx("btn", primary ? "btn-primary" : "btn-secondary", className)}
      isExternal={isExternal}
      isButton
      disablePrefetch={disablePrefetch}
    >
      {children}
    </Link>
  );
}
