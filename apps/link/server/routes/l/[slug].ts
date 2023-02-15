import { client } from "~/server/lib/mongo";
import { LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  const slug = event.context.params?.slug;
  if (!slug) return;
  try {
    const collection = client.db("link").collection<LinkDocument>("links");
    const entry = await collection.findOne({ slug });
    if (!entry) return;
    event.node.res.statusCode = 308;
    event.node.res.setHeader("Location", entry.url);
    event.node.res.end();
  } catch (err: any) {
    console.log(err);
    throw createError({ statusCode: 500, statusMessage: "Internal error", cause: err });
  }
});
