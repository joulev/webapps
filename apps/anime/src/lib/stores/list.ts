import { derived, writable } from "svelte/store";
import { query } from "svelte-apollo";
import { getTitle } from "$lib/utils";

import { GET_ANIME, type GetAnime } from "$lib/queries";

// Special store to trigger a refetch of the anime list
export const refetchAnime = writable(false);

function getAnime() {
  return query<GetAnime>(GET_ANIME);
}

export function getLoadingState() {
  return derived(getAnime(), $store => $store.loading);
}

export function getListCount() {
  return derived(getAnime(), $store => {
    const lists = $store.data?.MediaListCollection?.lists ?? [];
    const watching = lists.find(list => list?.name === "Watching")?.entries?.length ?? 0;
    const rewatching = lists.find(list => list?.name === "Rewatching")?.entries?.length ?? 0;
    const paused = lists.find(list => list?.name === "Paused")?.entries?.length ?? 0;
    const dropped = lists.find(list => list?.name === "Dropped")?.entries?.length ?? 0;
    const planning = lists.find(list => list?.name === "Planning")?.entries?.length ?? 0;
    const completedTV = lists.find(list => list?.name === "Completed TV")?.entries?.length ?? 0;
    const completedMovies =
      lists.find(list => list?.name === "Completed Movie")?.entries?.length ?? 0;
    const completedOthers = lists
      .filter(
        list =>
          list?.name?.toLowerCase().includes("completed") &&
          !list?.name?.includes("TV") &&
          !list?.name?.includes("Movie"),
      )
      .reduce((acc, list) => acc + (list?.entries?.length ?? 0), 0);
    return {
      watching,
      rewatching,
      paused,
      dropped,
      planning,
      completedTV,
      completedMovies,
      completedOthers,
    };
  });
}

export function getCompletedOthers() {
  return derived(
    getAnime(),
    $store =>
      $store.data?.MediaListCollection?.lists
        ?.filter(
          list =>
            list?.name?.toLowerCase().includes("completed") &&
            !list?.name?.includes("TV") &&
            !list?.name?.includes("Movie"),
        )
        ?.map(list => list?.entries)
        ?.flat()
        ?.sort((a, b) => getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title))) ?? [],
  );
}

export function getList(name: string) {
  return derived(getAnime(), $store => {
    const entries =
      $store.data?.MediaListCollection?.lists?.filter(list => list?.name === name)[0]?.entries ??
      [];
    if (name === "Planning")
      return [...entries].sort((a, b) =>
        getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title)),
      );
    if (name.toLowerCase().includes("completed"))
      return [...entries].sort((a, b) => {
        const aScore = a?.score ?? 0;
        const bScore = b?.score ?? 0;
        const titleCompare = getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title));

        // if an entry is not scored yet, push it to the top
        if (aScore === 0 && bScore === 0) return titleCompare;
        if (aScore === 0) return -1;
        if (bScore === 0) return 1;

        // if both entries are scored, sort by score, from main score to each subscore
        let cur_comp = bScore - aScore;
        if (cur_comp !== 0) return cur_comp;
        for (const key of Object.keys(a?.advancedScores ?? {})) {
          cur_comp = (b?.advancedScores?.[key] ?? 0) - (a?.advancedScores?.[key] ?? 0);
          if (cur_comp !== 0) return cur_comp;
        }

        // all are equal, break tie by title
        return titleCompare;
      });
    return [...entries].sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0));
  });
}

export function getAllAnimeIds() {
  return derived(getAnime(), $store => {
    const lists = $store.data?.MediaListCollection?.lists ?? [];
    const ids = lists
      .map(list => list?.entries)
      .flat()
      .map(entry => entry?.mediaId ?? 0);
    return ids;
  });
}
