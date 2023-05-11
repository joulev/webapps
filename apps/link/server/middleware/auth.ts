import { env } from "~/env";
import { hash } from "~/server/lib/utils";

export default defineEventHandler(event => {
  const token = getCookie(event, "token") || "";
  if (token === hash(env.JOULEV_PASSWORD)) event.context.isJoulev = true;
});
