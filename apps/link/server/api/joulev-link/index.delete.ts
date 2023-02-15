import { ObjectId } from "mongodb";
import { client } from "~/server/lib/mongo";
import { JoulevLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  try {
    const _id = await readBody<JoulevLink["delete"]>(event).then(({ _id }) => new ObjectId(_id));
    const collection = client.db("link").collection<LinkDocument>("links");
    const link = await collection.findOne({ _id });
    if (!link) throw createError({ statusCode: 404, statusMessage: "Link ID not found" });
    await collection.deleteOne({ _id });
    return { success: true };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: "Internal error", cause: err });
  }
});
