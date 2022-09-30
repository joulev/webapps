import clsx from "clsx";
import { FC, ReactNode } from "react";

const Button: FC<{ href: string; primary?: boolean; children: ReactNode }> = ({
  href,
  primary,
  children,
}) => (
  <a
    href={href}
    className={clsx(
      "inline-block px-4 py-1.5 rounded-full transition",
      primary
        ? "bg-c-700 dark:bg-c-300 hover:bg-c-600 dark:hover:bg-c-400 text-c-100 dark:text-c-900"
        : "border border-c-300 dark:border-c-700 hover:border-c-600 dark:hover:border-c-400 hover:text-c-900 dark:hover:text-c-100",
    )}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default Button;
