import { ObjectId } from "mongodb";
import { client } from "~/server/lib/mongo";
import { isSlug, isURL } from "~/lib/validator";
import { JoulevLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev) {
    event.res.statusCode = 401;
    return { error: "Unauthorized" };
  }
  try {
    const { _id: id, ...body } = await useBody<JoulevLink["put"]>(event);
    if (
      body.slug === "" ||
      body.url === "" ||
      (body.slug && !isSlug(body.slug)) ||
      (body.url && !isURL(body.url))
    ) {
      event.res.statusCode = 400;
      return { error: "Invalid slug or URL" };
    }
    const _id = new ObjectId(id);
    const collection = client.db("link").collection<LinkDocument>("links");
    const link = await collection.findOne({ _id });
    if (!link) {
      event.res.statusCode = 404;
      return { error: "Link ID not found" };
    }
    await collection.updateOne({ _id }, { $set: { ...body, updated: Date.now() } });
    return { success: true };
  } catch (err: any) {
    event.res.statusCode = 500;
    return { error: String(err.message) };
  }
});
