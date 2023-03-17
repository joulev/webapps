"use client";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import A from "./anchor";
import { Photo } from "~/types";

function Image(props: React.ComponentProps<"img">) {
  const { ref, inView } = useInView();
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);

  const dataUrl = useMemo(() => {
    if (!arrayBuffer) return null;
    const blob = new Blob([arrayBuffer]);
    return URL.createObjectURL(blob);
  }, [arrayBuffer]);

  useEffect(() => {
    // This is *not* run twice in dev+strict mode whenever inView changes. Guess why?
    if (!inView || !props.src || dataUrl) return;
    const controller = new AbortController();
    fetch(props.src, { signal: controller.signal })
      .then(res => res.arrayBuffer())
      .then(setArrayBuffer)
      .catch(err => (err.name === "AbortError" ? null : console.error(err)));
    return () => controller.abort();
  }, [inView, props.src, dataUrl]);

  return (
    <div ref={ref}>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        src={dataUrl || undefined}
        {...props}
        className={clsx(
          "duration-500 transition",
          dataUrl ? "opacity-100" : "opacity-0",
          props.className,
        )}
      />
    </div>
  );
}

export default function TweetPhoto({ url, width, height, tweetUrl, author, dateAgo }: Photo) {
  return (
    <div className="relative group rounded overflow-hidden">
      <Image src={url} alt={`Illustration at ${url}`} width={width} height={height} />
      <A
        href={tweetUrl}
        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-b from-main-900/20 to-main-900/90 opacity-0 group-hover:opacity-100 transition"
      >
        <div className="flex flex-col justify-end">
          <div className="text-main-100">{author.name}</div>
          <div className="flex flex-row justify-between">
            <div className="help-text">@{author.handle}</div>
            <div className="help-text">{dateAgo}</div>
          </div>
        </div>
      </A>
    </div>
  );
}
