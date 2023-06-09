export default function Section({
  left,
  children,
}: {
  left: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row">
      <div className="w-18 shrink-0">
        <div className="sticky top-6">{left}</div>
      </div>
      <div>{children}</div>
    </section>
  );
}
