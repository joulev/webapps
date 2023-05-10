import clsx from "clsx";
import Image from "next/image";

import { Item } from "~/lib/get-lists";
import { getTitle } from "~/lib/utils";
import { CardVariant } from "./card";

export default function Base({
  item,
  variant,
  topRight,
  children,
}: React.PropsWithChildren<{ item: Item; variant: CardVariant; topRight?: React.ReactNode }>) {
  return (
    <div className="card flex flex-col relative">
      {topRight}
      <div className="p-6 flex flex-row gap-6">
        {item.media?.coverImage?.medium ? (
          <div className="hidden sm:block w-18 min-h-[96px] rounded shrink-0 overflow-hidden relative">
            <Image src={item.media.coverImage.medium} alt="cover" fill className="object-cover" />
          </div>
        ) : (
          <div className="hidden sm:block w-18 min-h-[96px] rounded shrink-0 bg-daw-main-200" />
        )}
        <div
          className={clsx(
            "flex-1 flex min-w-0 flex-col justify-between gap-6",
            item.score && "sm:gap-1.5",
          )}
        >
          <div className="flex flex-col">
            <div className="text-lg">
              <a className="anchor" href={`https://anilist.co/anime/${item.mediaId}`}>
                {getTitle(item.media?.title)}
              </a>
            </div>
            <div className="help-text">{item.media?.title?.native ?? "Japanese title N/A"}</div>
          </div>
          {children}
        </div>
      </div>
      {variant !== "planning" && variant !== "completed" && variant !== "completed-others" && (
        <div
          className={clsx(
            "h-1 rounded-r",
            variant === "watching" && "bg-green",
            variant === "rewatching" && "bg-blue",
            variant === "paused" && "bg-yellow",
            variant === "dropped" && "bg-red",
          )}
          style={{
            width: `${
              (100 * (item.progress ?? 0)) / (item.media?.episodes ?? item.progress ?? 1)
            }%`,
          }}
        />
      )}
    </div>
  );
}
