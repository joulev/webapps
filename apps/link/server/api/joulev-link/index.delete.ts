import { ObjectId } from "mongodb";
import { client } from "~/server/lib/mongo";
import { JoulevLink, LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev) {
    event.res.statusCode = 401;
    return { error: "Unauthorized" };
  }
  try {
    const _id = await readBody<JoulevLink["delete"]>(event).then(({ _id }) => new ObjectId(_id));
    const collection = client.db("link").collection<LinkDocument>("links");
    const link = await collection.findOne({ _id });
    if (!link) {
      event.res.statusCode = 404;
      return { error: "Link ID not found" };
    }
    await collection.deleteOne({ _id });
    return { success: true };
  } catch (err: any) {
    event.res.statusCode = 500;
    return { error: String(err.message) };
  }
});
