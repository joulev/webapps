import { client } from "~/server/lib/mongo";
import { isSlug, isURL } from "~/lib/validator";
import { JoulevLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  try {
    const { slug, url } = await readBody<JoulevLink["post"]>(event);
    if (!isSlug(slug) || !isURL(url))
      throw createError({ statusCode: 400, statusMessage: "Invalid slug or URL" });
    const collection = client.db("link").collection<LinkDocument>("links");
    const link = await collection.findOne({ slug });
    if (link) throw createError({ statusCode: 409, statusMessage: "Slug already exists" });
    await collection.insertOne({ slug, url, updated: Date.now(), isJoulev: true });
    return { success: true };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: "Internal error", cause: err });
  }
});
