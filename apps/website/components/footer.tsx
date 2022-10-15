import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import Link from "~/components/link";
import { Clock, Pin, Play } from "~/components/icons";
import animate from "~/lib/motion";

const fetcher = (url: string) => fetch(url).then(res => res.json());
type YTMusicData = {
  videoId: string;
  title: string;
  artists: { name: string; id: string | null }[];
};

const MusicData: FC = () => {
  const { data } = useSWR<YTMusicData>("/api/ytmusic", fetcher);
  if (!data) return <>loading&hellip;</>;
  return (
    <>
      <strong className="font-normal">
        <Link href={`https://music.youtube.com/watch?v=${data.videoId}`}>{data.title}</Link>
      </strong>{" "}
      by{" "}
      {data.artists
        .filter(x => x.id)
        .map((artist, i, arr) => (
          <span key={artist.id}>
            {i > 0 && i < arr.length - 1 && ", "}
            {i > 0 && i === arr.length - 1 && " & "}
            <Link href={`https://music.youtube.com/channel/${artist.id}`}>{artist.name}</Link>
          </span>
        ))}
    </>
  );
};

const Footer: FC<{ updated: string }> = ({ updated }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const date = new Date(updated);
  return (
    <motion.footer
      className="flex flex-col text-sm border-t border-daw-main-300 py-9 gap-3"
      variants={animate}
      custom={false}
    >
      <div className="flex flex-row items-baseline gap-3">
        <div className="relative w-6 shrink-0 pointer-events-none">
          &#x200B; {/* zero width space, to force the container to have same line height as text */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Play />
          </div>
        </div>
        <span>
          Last played: <MusicData />
        </span>
      </div>
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-3 justify-between sm:items-center">
        <div className="flex flex-row items-center gap-3">
          <Pin />
          <span>Singapore</span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Clock hour={mounted ? date.getHours() : 4} minute={mounted ? date.getMinutes() : 0} />
          <span>
            Updated:{" "}
            <time title={updated}>{mounted ? date.toLocaleDateString("en-SG") : "loading"}</time>
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
