"use client";

import ReactDOM from "react-dom";

export function Preload() {
  // @ts-expect-error
  ReactDOM.prefetchDNS("https://static.joulev.dev");
  // @ts-expect-error
  ReactDOM.preconnect("https://static.joulev.dev", { crossOrigin: "anonymous" });
  // @ts-expect-error
  ReactDOM.preload("https://static.joulev.dev/fonts/Synonym-Variable.woff2", {
    as: "font",
    crossOrigin: "anonymous",
    type: "font/woff2",
  });
  return null;
}
