import { notFound } from "next/navigation";

import { Item, getLists } from "~/lib/get-lists";
import { getTitle } from "~/lib/utils";
import Card, { CardVariant } from "~/app/_card/card";

import EmptyState from "./empty-state";

type Params = { status: string[] };
type AllowedStatus =
  | "watching"
  | "rewatching"
  | "completed/tv"
  | "completed/movies"
  | "completed/others"
  | "paused"
  | "dropped"
  | "planning";

function sortList(list: (Item | null)[], type: "planning" | "completed" | "others") {
  if (type === "planning")
    return [...list].sort((a, b) =>
      getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title)),
    );
  if (type === "completed")
    return [...list].sort((a, b) => {
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
  return [...list].sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0));
}

async function getList(status: AllowedStatus): Promise<[(Item | null)[], CardVariant]> {
  const lists = await getLists();
  switch (status) {
    case "watching":
      return [lists.watching, "watching"];
    case "rewatching":
      return [lists.rewatching, "rewatching"];
    case "completed/tv":
      return [lists.completedTV, "completed"];
    case "completed/movies":
      return [lists.completedMovies, "completed"];
    case "completed/others":
      return [lists.completedOthers, "completed-others"];
    case "paused":
      return [lists.paused, "paused"];
    case "dropped":
      return [lists.dropped, "dropped"];
    case "planning":
      return [lists.planning, "planning"];
    default:
      throw new Error("invariant: getList in [...status]/page.tsx");
  }
}

export default async function Page({ params }: { params: Params }) {
  const status = params.status.join("/");
  if (
    status !== "watching" &&
    status !== "rewatching" &&
    status !== "completed/tv" &&
    status !== "completed/movies" &&
    status !== "completed/others" &&
    status !== "paused" &&
    status !== "dropped" &&
    status !== "planning"
  )
    notFound();
  const [list, variant] = await getList(status);
  if (list.length === 0) return <EmptyState />;
  return sortList(
    list,
    variant === "planning" ? "planning" : variant.includes("completed") ? "completed" : "others",
  ).map(item => (item ? <Card item={item} variant={variant} key={item.mediaId} /> : null));
}

export const dynamic = "force-dynamic";
