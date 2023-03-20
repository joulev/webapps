import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (cookies().get("secret")?.value !== process.env.JOULEV_PASSWORD) redirect("/forbidden");
  return <>{children}</>;
}
