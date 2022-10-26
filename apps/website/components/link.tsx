import { FC, PropsWithChildren } from "react";

const Link: FC<PropsWithChildren<{ href: string }>> = ({ href, children }) => (
  <a href={href} className="anchor" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default Link;
