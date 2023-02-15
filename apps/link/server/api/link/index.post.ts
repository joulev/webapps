import { nanoid } from "nanoid";
import { client } from "~/server/lib/mongo";
import { isSlug, isURL } from "~/lib/validator";
import { PublicLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  try {
    const { slug: rawSlug, url } = await readBody<PublicLink["post"]>(event);
    if (rawSlug === "" || (rawSlug && !isSlug(rawSlug)) || !isURL(url))
      throw createError({ statusCode: 400, statusMessage: "Invalid slug or URL" });
    const collection = client.db("link").collection<LinkDocument>("links");
    if (rawSlug && (await collection.findOne({ slug: rawSlug })))
      throw createError({ statusCode: 409, statusMessage: "Slug already exists" });
    let slug = rawSlug || nanoid(6);
    while (await collection.findOne({ slug })) slug = nanoid(6);
    await collection.insertOne({ slug, url, updated: Date.now(), isJoulev: false });
    return { success: true, slug };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: "Internal error", cause: err });
  }
});
