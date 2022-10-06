import { client } from "~/server/lib/mongo";
import { LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev) {
    event.res.statusCode = 401;
    return { error: "Unauthorized" };
  }
  try {
    const collection = client.db("link").collection<LinkDocument>("links");
    const entries = await collection.find({ isJoulev: true }).toArray();
    return { entries };
  } catch (err: any) {
    event.res.statusCode = 500;
    return { error: String(err.message) };
  }
});
