import { getLists } from "~/lib/get-lists";
import Card from "~/app/[...status]/card";
import EmptyState from "~/app/[...status]/empty-state";

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

async function getList(status: Params["status"]) {
  const lists = await getLists();
  switch (status.join("/")) {
    case "watching":
      return lists.watching;
    case "rewatching":
      return lists.rewatching;
    case "completed/tv":
      return lists.completedTV;
    case "completed/movies":
      return lists.completedMovies;
    case "completed/others":
      return lists.completedOthers;
    case "paused":
      return lists.paused;
    case "dropped":
      return lists.dropped;
    case "planning":
      return lists.planning;
    default:
      throw new Error("invariant: getList in [...status]/page.tsx");
  }
}

export default async function Page({ params }: { params: Params }) {
  const list = await getList(params.status);
  if (list.length === 0) return <EmptyState />;
  return list.map(item => (item ? <Card item={item} key={item.mediaId} /> : null));
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
