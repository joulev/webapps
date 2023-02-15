import { hash } from "~/server/lib/utils";

export default defineEventHandler(async event => {
  function redirectOnSuccess() {
    event.node.res.statusCode = 302;
    event.node.res.setHeader("Location", "/joulev");
    event.node.res.end();
  }

  if (event.context.isJoulev) return redirectOnSuccess();
  const basicAuth = event.node.req.headers.authorization;
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const pwd = atob(authValue).split(":")[1];
    if (pwd === process.env.JOULEV_PASSWORD) {
      setCookie(event, "token", hash(process.env.JOULEV_PASSWORD ?? ""), {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return redirectOnSuccess();
    }
  }
  event.node.res.statusCode = 401;
  event.node.res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  return { error: "Unauthorized" };
});
