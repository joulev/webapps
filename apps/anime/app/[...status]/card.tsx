import Image from "next/image";

import { Item } from "~/lib/get-lists";
import { getTitle } from "~/lib/utils";

export default function Card({ item, children }: React.PropsWithChildren<{ item: Item }>) {
  return (
    <div className="card flex flex-col relative">
      {/* <div className="absolute top-6 right-6 flex flex-row gap-1.5">
    Top right buttons for mutations
  </div> */}
      <div className="p-6 flex flex-row gap-6">
        {item.media?.coverImage?.medium ? (
          <div className="hidden sm:block w-18 min-h-[96px] rounded shrink-0 overflow-hidden relative">
            <Image src={item.media.coverImage.medium} alt="cover" fill className="object-cover" />
          </div>
        ) : (
          <div className="hidden sm:block w-18 min-h-[96px] rounded shrink-0 bg-daw-main-200" />
        )}
        <div className="flex-1 flex min-w-0 flex-col justify-between gap-6 {item.score && 'sm:gap-1.5'}">
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
      {/* {#if variant !== "planning" && variant !== "completed" && variant !== "completed-others"}
    <div
      class="h-1 rounded-r"
      class:bg-green={variant === "watching"}
      class:bg-blue={variant === "rewatching"}
      class:bg-yellow={variant === "paused"}
      class:bg-red={variant === "dropped"}
      style="width: {$progressPercentage}%;"
    />
  {/if} */}
    </div>
  );
}
