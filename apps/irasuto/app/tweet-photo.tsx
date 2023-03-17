import Image from "next/image";
import A from "./anchor";
import { Photo } from "~/types";

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
