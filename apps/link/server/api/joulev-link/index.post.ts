import { client } from "~/server/lib/mongo";
import { isSlug, isURL } from "~/lib/validator";
import { JoulevLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev) {
    event.res.statusCode = 401;
    return { error: "Unauthorized" };
  }
  try {
    const { slug, url } = await useBody<JoulevLink["post"]>(event);
    if (!isSlug(slug) || !isURL(url)) {
      event.res.statusCode = 400;
      return { error: "Invalid slug or URL" };
    }
    const collection = client.db("link").collection<LinkDocument>("links");
    const link = await collection.findOne({ slug });
    if (link) {
      event.res.statusCode = 409;
      return { error: "Slug already exists" };
    }
    await collection.insertOne({ slug, url, updated: Date.now(), isJoulev: true });
    return { success: true };
  } catch (err: any) {
    event.res.statusCode = 500;
    return { error: String(err.message) };
  }
});
