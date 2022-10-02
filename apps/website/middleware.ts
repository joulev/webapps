import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (["/cv.pdf", "/cv", "/resume"].includes(req.nextUrl.pathname)) {
    if (!process.env.RESUME_URL) {
      const url = req.nextUrl.clone();
      url.pathname = "/404";
      return NextResponse.rewrite(url);
    }
    return NextResponse.rewrite(process.env.RESUME_URL);
  }
  return NextResponse.next();
}
