// @ts-nocheck
"use client";

import ReactDOM from "react-dom";

export function Preload() {
  ReactDOM.prefetchDNS("https://static.joulev.dev");
  ReactDOM.preconnect("https://static.joulev.dev", { crossOrigin: "anonymous" });
  ReactDOM.preload("https://static.joulev.dev/fonts/Synonym-Variable.woff2", {
    as: "font",
    crossOrigin: "anonymous",
    type: "font/woff2",
  });
  return null;
}
