import clsx from "clsx";
import { FC, ReactNode } from "react";

const Button: FC<{ href: string; primary?: boolean; children: ReactNode }> = ({
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
