"use client";

import useSWR from "swr";
import Link from "~/components/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());

type YTMusicData = {
  videoId: string;
  title: string;
  artists: { name: string; id: string | null }[];
};

export default function MusicData() {
  const { data } = useSWR<YTMusicData>("/api/ytmusic", fetcher);
  if (!data) return <>loading&hellip;</>;
  return (
    <>
      <strong className="font-normal">
        <Link href={`https://music.youtube.com/watch?v=${data.videoId}`}>{data.title}</Link>
      </strong>{" "}
      by{" "}
      {data.artists.map((artist, i, arr) => (
        <span key={artist.id}>
          {i > 0 && i < arr.length - 1 && ", "}
          {i > 0 && i === arr.length - 1 && " & "}
          {artist.id ? (
            <Link href={`https://music.youtube.com/channel/${artist.id}`}>{artist.name}</Link>
          ) : (
            artist.name
          )}
        </span>
      ))}
    </>
  );
}
