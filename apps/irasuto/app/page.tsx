import { prisma } from "~/lib/db";

export default async function Page() {
  const illustrations = (await prisma.illustration.findMany()).map(i => i.url);
  return <pre className="text-sm">{JSON.stringify(illustrations, null, 2)}</pre>;
}
