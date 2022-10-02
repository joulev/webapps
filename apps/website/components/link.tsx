import { FC } from "react";

const Link: FC<{ href: string; children: string }> = ({ href, children }) => (
  <a href={href} className="anchor" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default Link;
