"use client";

import A from "~/app/anchor";
import LazyImage from "~/app/lazy-image";
import { convertUrlToPhotoId } from "~/lib/utils";
import { Photo } from "~/types";

export default function TweetPhoto({ url, width, height, tweetUrl, author, dateAgo }: Photo) {
  const photoId = convertUrlToPhotoId(url);
  return (
    <div className="relative group rounded overflow-hidden">
      <LazyImage
        src={`https://r2.irasuto.joulev.dev/irasuto/${photoId}`}
        alt={`Illustration by ${author.name}`}
        width={width}
        height={height}
      />
      <A
        href={tweetUrl}
        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-b from-main-950/20 to-main-950/90 opacity-0 group-hover:opacity-100 transition"
      >
        <div className="flex flex-col justify-end">
          <div className="text-main-50">{author.name}</div>
          <div className="flex flex-row justify-between">
            <div className="help-text">@{author.handle}</div>
            <div className="help-text">{dateAgo}</div>
          </div>
        </div>
      </A>
    </div>
  );
}
