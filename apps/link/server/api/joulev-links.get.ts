import { client } from "~/server/lib/mongo";
import { hash } from "~/server/lib/utils";

import { LinkDocument } from "~/types";

export default defineEventHandler(async event => {
  try {
    const token = getCookie(event, "token") || "";
    if (token !== hash(process.env.JOULEV_PASSWORD ?? "")) {
      event.res.statusCode = 401;
      return { error: "Unauthorized" };
    }

    const collection = client.db("link").collection<LinkDocument>("joulevLinks");
    const entries = await collection.find().toArray();
    return { entries };
  } catch (err: any) {
    event.res.statusCode = 500;
    return { error: String(err.message) };
  }
});
