import clsx from "clsx";
import Image from "next/image";

import { getToken } from "~/lib/auth";
import { getClient } from "~/lib/apollo";
import { SEARCH_ANIME } from "~/lib/queries";
import { getLists } from "~/lib/get-lists";
import { convertSeason, getTitle } from "~/lib/utils";
import Score from "~/app/_card/score";
import EmptyState from "~/app/[...status]/empty-state";

import Input from "./input";

export default async function Page({ searchParams }: { searchParams: { s: string | undefined } }) {
  const token = getToken();
  if (!token) return <p>You are not authenticated.</p>;

  const client = getClient();
  const { lists } = await getLists();
  const allIds = lists
    .map(list => list?.entries)
    .flat()
    .map(entry => entry?.mediaId ?? 0);

  const { data } = await client.query({
    query: SEARCH_ANIME,
    variables: { search: searchParams.s ?? "", idNotIn: allIds },
  });
  const items = data?.Page?.media ?? [];

  return (
    <>
      <Input query={searchParams.s} />
      <div className="flex flex-col gap-6">
        {items.map(item =>
          item ? (
            <div className="card flex flex-col relative" key={item.id}>
              <div className="absolute top-5 right-5 flex flex-row gap-1.5 p-1 rounded bg-daw-main-100">
                <button className="btn btn-sm btn-secondary">Add to PTW</button>
              </div>
              <div className="p-6 flex flex-row gap-6">
                {item.coverImage?.medium ? (
                  <div className="hidden sm:block w-18 min-h-[96px] rounded shrink-0 overflow-hidden relative">
                    <Image src={item.coverImage.medium} alt="cover" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="hidden sm:block w-18 min-h-[96px] rounded shrink-0 bg-daw-main-200" />
                )}
                <div
                  className={clsx(
                    "flex-1 flex min-w-0 flex-col justify-between gap-6",
                    item.meanScore && "sm:gap-1.5",
                  )}
                >
                  <div className="flex flex-col">
                    <div className="text-lg">
                      <a className="anchor" href={`https://anilist.co/anime/${item.id}`}>
                        {getTitle(item.title)}
                      </a>
                    </div>
                    <div className="help-text">{item.title?.native ?? "Japanese title N/A"}</div>
                  </div>
                  <div className="flex flex-row justify-between items-end">
                    <div className="help-text">
                      {item.genres && item.genres.length > 0 ? (
                        <>{item.genres.slice(0, 3).join(", ")}</>
                      ) : item.season && item.seasonYear ? (
                        `${convertSeason(item.season)} ${item.seasonYear}`
                      ) : (
                        "Season N/A"
                      )}
                    </div>
                    {item.meanScore && (
                      <div className="flex flex-row gap-3 items-center">
                        <Score score={item.meanScore / 10} />
                        <div>{item.meanScore / 10}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
      {searchParams.s && items.length === 0 && <EmptyState />}
    </>
  );
}

export const dynamic = "force-dynamic";
