import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import Logo from "~/components/logo";

async function fetchFont() {
  const getURL = (w: "Light" | "Medium") => `https://static.joulev.dev/fonts/Sunflower-${w}.woff`;
  const getFont = (w: "Light" | "Medium") => fetch(getURL(w)).then(res => res.arrayBuffer());
  const [lightFont, mediumFont] = await Promise.all([getFont("Light"), getFont("Medium")]);
  return { lightFont, mediumFont };
}

type MainProps = { base: number; title: string | null; subtitle: string; isDark: boolean };
function Main({ base, title, subtitle, isDark }: MainProps) {
  return (
    <div tw="absolute inset-0 flex flex-col items-center justify-center">
      <div tw="flex flex-row items-center">
        <Logo height={base} dark={isDark} />
        {title && (
          <div tw="flex flex-col h-full justify-between" style={{ marginLeft: (base * 18) / 48 }}>
            <div
              style={{ fontWeight: 500, fontSize: (base * 5) / 8 }}
              tw={isDark ? "text-zinc-100" : "text-zinc-900"}
            >
              {title}
            </div>
            <div style={{ fontWeight: 300, fontSize: (base * 3) / 8 }} tw="text-zinc-500">
              {subtitle}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type CircleProps = { radius: number; opacity: number; angle: number; isDark: boolean };
function Circle({ radius, opacity, angle, isDark }: CircleProps) {
  const smallR = 12;
  const size = radius * 2 + smallR * 2;
  const viewBox = `${-size / 2} ${-size / 2} ${size} ${size}`;

  const rad = (angle / 180) * Math.PI;
  const x = radius * Math.cos(rad);
  const y = -radius * Math.sin(rad);

  const fillColour = isDark ? "#1c1917" : "#fafaf9";
  return (
    <div tw="absolute inset-0 flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={viewBox}>
        <circle opacity={opacity} r={radius} stroke="#78716c" strokeWidth="2" fill="none" />
        <circle cx={x} cy={y} r={smallR - 2} stroke="#78716c" strokeWidth="2" fill={fillColour} />
      </svg>
    </div>
  );
}

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const isLight = searchParams.get("light") === "1";

  const { lightFont, mediumFont } = await fetchFont();
  const options: ConstructorParameters<typeof ImageResponse>[1] = {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Sunflower", data: lightFont, style: "normal", weight: 300 },
      { name: "Sunflower", data: mediumFont, style: "normal", weight: 500 },
    ],
  };

  const base = 150;

  return new ImageResponse(
    (
      <div
        tw={`h-full w-full flex relative ${isLight ? "bg-zinc-100" : "bg-zinc-900"}`}
        style={{ fontFamily: "Sunflower", lineHeight: 1 }}
      >
        <Circle isDark={!isLight} radius={180} opacity={1} angle={-130} />
        <Circle isDark={!isLight} radius={360} opacity={0.7} angle={40} />
        <Circle isDark={!isLight} radius={570} opacity={0.4} angle={170} />
        <Main base={base} title={title} subtitle={subtitle ?? "at joulev.dev"} isDark={!isLight} />
      </div>
    ),
    options,
  );
}

export const runtime = "experimental-edge";
