import { NextRequest } from "next/server";

function isCorrectUser(token: string) {
  // https://stackoverflow.com/a/38552302
  function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }

  const payload = parseJwt(token);
  const subject = Object.hasOwn(payload, "sub") ? payload.sub : "";
  const expire = Object.hasOwn(payload, "exp") ? payload.exp : 0;
  return subject === "858763" && expire > Date.now() / 1000;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const res = await fetch("https://anilist.co/api/v2/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: `${process.env.ORIGIN}/auth/callback`,
      code,
    }),
  });
  const json = await res.json();
  const token = json.access_token;
  const expires = json.expires_in;
  if (!token) return new Response("Access token not found.", { status: 400 });
  if (!isCorrectUser(token)) return new Response("Invalid user.", { status: 403 });

  return new Response(null, {
    headers: {
      "Set-Cookie": `token=${token}; Max-Age=${expires}; Secure; HttpOnly; SameSite=Strict; Path=/`,
      Location: "/watching",
    },
    status: 302,
  });
}
