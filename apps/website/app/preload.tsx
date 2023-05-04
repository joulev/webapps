"use client";

import ReactDOM from "react-dom";

export function Preload() {
  ReactDOM.preload("https://static.joulev.dev/fonts/Synonym-Variable.woff2", {
    as: "font",
    crossOrigin: "",
    // @ts-expect-error
    type: "font/woff2",
  });
  return null;
}
