import Image from "next/image";
import { Photo } from "~/types";

export default function TweetPhoto({ url, width, height, tweetUrl, author, dateAgo }: Photo) {
  return (
    <div className="relative group rounded overflow-hidden">
      <Image src={url} alt={`Illustration at ${url}`} width={width} height={height} />
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-b from-main-900/20 to-main-900/90 opacity-0 group-hover:opacity-100 transition"
      >
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col">
            <div>{author.name}</div>
            <div className="text-daw-main-500">@{author.handle}</div>
          </div>
          <div className="help-text">{dateAgo}</div>
        </div>
      </a>
    </div>
  );
}
