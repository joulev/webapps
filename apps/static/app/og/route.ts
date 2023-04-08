import { NextRequest } from "next/server";
import generateImage from "~/app/og/generate";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const isLight = searchParams.get("light") === "1";
  return await generateImage(title, subtitle, isLight);
}
