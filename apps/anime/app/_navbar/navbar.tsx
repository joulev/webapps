import {
  PlayCircle,
  Repeat,
  Tv2,
  Film,
  CheckCircle,
  PauseCircle,
  XCircle,
  Calendar,
} from "lucide-react";

import { getLists } from "~/lib/get-lists";

import NavbarLink from "./navbar-link";
import NavbarStructure from "./navbar-structure";

async function getNavItems() {
  const data = await getLists();
  const lists = data?.MediaListCollection?.lists ?? [];
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
  return [
    { content: "Watching", icon: PlayCircle, slug: "/watching", count: watching },
    { content: "Rewatching", icon: Repeat, slug: "/rewatching", count: rewatching },
    { content: "Completed TV", icon: Tv2, slug: "/completed/tv", count: completedTV },
    { content: "Completed Movies", icon: Film, slug: "/completed/movies", count: completedMovies },
    {
      content: "Completed (others)",
      icon: CheckCircle,
      slug: "/completed/others",
      count: completedOthers,
    },
    { content: "Paused", icon: PauseCircle, slug: "/paused", count: paused },
    { content: "Dropped", icon: XCircle, slug: "/dropped", count: dropped },
    { content: "Planning", icon: Calendar, slug: "/planning", count: planning },
  ];
}

export default async function Navbar() {
  const items = await getNavItems();
  return (
    <NavbarStructure>
      {items.map(({ slug, icon: Icon, content, count }) => (
        <NavbarLink key={slug} href={slug}>
          <div className="flex flex-row gap-6 items-center">
            <Icon strokeWidth={1} />
            {content}
          </div>
          <div>{count}</div>
        </NavbarLink>
      ))}
    </NavbarStructure>
  );
}
