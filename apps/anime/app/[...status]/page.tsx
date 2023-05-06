import { getLists } from "~/lib/get-lists";

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
  }
}

export default async function Page({ params }: { params: Params }) {
  const list = await getList(params.status);
  return <pre>{JSON.stringify(list, null, 2)}</pre>;
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
