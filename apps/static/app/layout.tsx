import "./styles.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body className="bg-daw-main-100">{children}</body>
    </html>
  );
}
