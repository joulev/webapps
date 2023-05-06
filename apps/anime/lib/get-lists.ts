import { cache } from "react";
import { getClient } from "~/lib/apollo";
import { GET_ANIME, MediaListStatus } from "~/lib/queries";
import { getTitle } from "~/lib/utils";

export type Item = NonNullable<Awaited<ReturnType<typeof getLists>>["watching"][number]>;

// function sortFunc(type: "planning" | "completed" | "others"): (a: Item, b: Item) => number {
//   if (type === "planning")
//     return (a: Item, b: Item) => getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title));
//   if (type === "others") return (a: Item, b: Item) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0);

//   return (a: Item, b: Item) => {
//     const aScore = a?.score ?? 0;
//     const bScore = b?.score ?? 0;
//     const titleCompare = getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title));

//     // if an entry is not scored yet, push it to the top
//     if (aScore === 0 && bScore === 0) return titleCompare;
//     if (aScore === 0) return -1;
//     if (bScore === 0) return 1;

//     // if both entries are scored, sort by score, from main score to each subscore
//     let cur_comp = bScore - aScore;
//     if (cur_comp !== 0) return cur_comp;
//     for (const key of Object.keys(a?.advancedScores ?? {})) {
//       cur_comp = (b?.advancedScores?.[key] ?? 0) - (a?.advancedScores?.[key] ?? 0);
//       if (cur_comp !== 0) return cur_comp;
//     }

//     // all are equal, break tie by title
//     return titleCompare;
//   };
// }

export const getLists = cache(async (status?: MediaListStatus) => {
  const client = getClient();
  const { data } = await client.query({ query: GET_ANIME, variables: { status } });
  const lists = data?.MediaListCollection?.lists ?? [];
  return {
    watching: lists.find(list => list?.name === "Watching")?.entries ?? [],
    rewatching: lists.find(list => list?.name === "Rewatching")?.entries ?? [],
    paused: lists.find(list => list?.name === "Paused")?.entries ?? [],
    dropped: lists.find(list => list?.name === "Dropped")?.entries ?? [],
    planning: lists.find(list => list?.name === "Planning")?.entries ?? [],
    completedTV: lists.find(list => list?.name === "Completed TV")?.entries ?? [],
    completedMovies: lists.find(list => list?.name === "Completed Movie")?.entries ?? [],
    completedOthers: lists
      .filter(
        list =>
          list?.name?.toLowerCase().includes("completed") &&
          !list?.name?.includes("TV") &&
          !list?.name?.includes("Movie"),
      )
      .flatMap(list => list?.entries ?? []),
  };
});
