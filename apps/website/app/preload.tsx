"use client";

import ReactDOM from "react-dom";

export function Preload() {
  // @ts-expect-error
  ReactDOM.preload("https://static.joulev.dev/fonts/Synonym-Variable.woff2", {
    as: "font",
    type: "font/woff2",
  });
  return null;
}
