import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

const Button: FC<PropsWithChildren<{ href: string; primary?: boolean }>> = ({
  href,
  primary,
  children,
}) => (
  <a
    href={href}
    className={clsx("btn", primary ? "btn-primary" : "btn-secondary")}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default Button;
