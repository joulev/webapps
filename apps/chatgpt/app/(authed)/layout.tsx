import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "~/env.mjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  if (cookies().get("secret")?.value !== env.JOULEV_PASSWORD) redirect("/forbidden");
  return <>{children}</>;
}

// https://stackoverflow.com/a/46254706
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};
