"use client";

import { useEffect, useState } from "react";

export default function ShowTime({ buildTime }: { buildTime: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Alt") setShow(true);
    }
    function onKeyUp(event: KeyboardEvent) {
      if (event.key === "Alt") setShow(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);
  if (!show) return null;
  return <div className="fixed bottom-6 left-6 card text-sm p-3">{buildTime}</div>;
}
