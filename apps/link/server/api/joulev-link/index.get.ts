import { client } from "~/server/lib/mongo";
import { LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  if (!event.context.isJoulev)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  try {
    const collection = client.db("link").collection<LinkDocument>("links");
    const entries = await collection.find({ isJoulev: true }).toArray();
    return { entries };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: "Internal error", cause: err });
  }
});
