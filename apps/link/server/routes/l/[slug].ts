import { client } from "~/server/lib/mongo";
import { LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  const slug = event.context.params?.slug;
  if (!slug) return;
  try {
    const collection = client.db("link").collection<LinkDocument>("links");
    const entry = await collection.findOne({ slug });
    if (!entry) return;
    event.res.statusCode = 308;
    event.res.setHeader("Location", entry.url);
    event.res.end();
  } catch (err: any) {
    event.res.statusCode = 500;
    return { error: String(err.message) };
  }
});
