import __Link from "next/link";

type Props = React.PropsWithChildren<{
  href: string;
  className?: string;
  isExternal?: boolean;
  isButton?: boolean;
}>;
export default function Link({
  href,
  className = "anchor",
  isExternal: ext,
  isButton,
  children,
}: Props) {
  const isExternal = href.startsWith("http") || ext;
  const extProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <__Link href={href} className={className} role={isButton ? "button" : undefined} {...extProps}>
      {children}
    </__Link>
  );
}
