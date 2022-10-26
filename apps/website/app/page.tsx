import PageClient from "./page-client";

export default function Home() {
  const updated = new Date().toISOString();
  return <PageClient updated={updated} />;
}
