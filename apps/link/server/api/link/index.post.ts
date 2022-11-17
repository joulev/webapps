import { nanoid } from "nanoid";
import { client } from "~/server/lib/mongo";
import { isSlug, isURL } from "~/lib/validator";
import { PublicLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  try {
    const { slug: rawSlug, url } = await readBody<PublicLink["post"]>(event);
    if (rawSlug === "" || (rawSlug && !isSlug(rawSlug)) || !isURL(url)) {
      event.res.statusCode = 400;
      return { error: "Invalid slug or URL" };
    }
    const collection = client.db("link").collection<LinkDocument>("links");
    if (rawSlug && (await collection.findOne({ slug: rawSlug }))) {
      event.res.statusCode = 409;
      return { error: "Slug already exists" };
    }
    let slug = rawSlug || nanoid(6);
    while (await collection.findOne({ slug })) slug = nanoid(6);
    await collection.insertOne({ slug, url, updated: Date.now(), isJoulev: false });
    return { success: true, slug };
  } catch (err: any) {
    event.res.statusCode = err.code ?? 500;
    return { error: String(err.message) };
  }
});
