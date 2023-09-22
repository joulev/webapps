"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LazyImage({
  src,
  className,
  ...props
}: React.ComponentProps<"img"> & { width: number; height: number }) {
  const { ref, inView } = useInView();
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // This is *not* run twice in dev+strict mode whenever inView changes. Guess why?
    if (!inView || !src || dataUrl) return;
    const controller = new AbortController();
    const timeout = setTimeout(
      () =>
        fetch(src, { signal: controller.signal })
          .then(res => res.arrayBuffer())
          .then(arrayBuffer => setDataUrl(URL.createObjectURL(new Blob([arrayBuffer]))))
          .catch(err => (err.name === "AbortError" ? null : console.error(err))),
      100,
    );
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [inView, src, dataUrl]);

  return (
    <div ref={ref} className="bg-daw-main-100">
      <img
        src={
          dataUrl ||
          `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${props.width} ${props.height}'%3e%3c/svg%3e`
        }
        {...props}
        className={clsx(
          "duration-500 transition",
          dataUrl ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}
