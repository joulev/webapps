import { hash } from "~/server/lib/utils";

export default defineEventHandler(async event => {
  const basicAuth = event.req.headers.authorization;
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
      return { success: true };
    }
  }
  event.res.statusCode = 401;
  event.res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  return { error: "Unauthorized" };
});
