import { Item, getLists } from "~/lib/get-lists";
import Card, { CardVariant } from "~/app/_card/card";

import EmptyState from "./empty-state";

type Params = {
  status:
    | ["watching"]
    | ["rewatching"]
    | ["completed", "tv"]
    | ["completed", "movies"]
    | ["completed", "others"]
    | ["paused"]
    | ["dropped"]
    | ["planning"];
};

async function getList(status: Params["status"]): Promise<[(Item | null)[], CardVariant]> {
  const lists = await getLists();
  switch (status.join("/")) {
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
  const [list, variant] = await getList(params.status);
  if (list.length === 0) return <EmptyState />;
  return list.map(item =>
    item ? <Card item={item} variant={variant} key={item.mediaId} /> : null,
  );
}

export function generateStaticParams(): Params[] {
  return [
    { status: ["watching"] },
    { status: ["rewatching"] },
    { status: ["completed", "tv"] },
    { status: ["completed", "movies"] },
    { status: ["completed", "others"] },
    { status: ["paused"] },
    { status: ["dropped"] },
    { status: ["planning"] },
  ];
}

export const dynamicParams = false;
