import "./styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-daw-main-100 text-daw-main-900 font-mono text-sm">
        <div className="container max-w-screen-md py-12">{children}</div>
      </body>
    </html>
  );
}
