import { ObjectId } from "mongodb";
import { client } from "~/server/lib/mongo";
import { isSlug, isURL } from "~/lib/validator";
import { JoulevLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  try {
    const { _id: id, ...body } = await readBody<JoulevLink["put"]>(event);
    if (
      body.slug === "" ||
      body.url === "" ||
      (body.slug && !isSlug(body.slug)) ||
      (body.url && !isURL(body.url))
    )
      throw createError({ statusCode: 400, statusMessage: "Invalid slug or URL" });
    const _id = new ObjectId(id);
    const collection = client.db("link").collection<LinkDocument>("links");
    const link = await collection.findOne({ _id });
    if (!link) throw createError({ statusCode: 404, statusMessage: "Not found" });
    await collection.updateOne({ _id }, { $set: { ...body, updated: Date.now() } });
    return { success: true };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: "Internal error", cause: err });
  }
});
