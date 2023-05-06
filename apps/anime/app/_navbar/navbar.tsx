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
  const lists = await getLists();
  return [
    { content: "Watching", icon: PlayCircle, slug: "/watching", count: lists.watching.length },
    { content: "Rewatching", icon: Repeat, slug: "/rewatching", count: lists.rewatching.length },
    { content: "Completed TV", icon: Tv2, slug: "/completed/tv", count: lists.completedTV.length },
    {
      content: "Completed Movies",
      icon: Film,
      slug: "/completed/movies",
      count: lists.completedMovies.length,
    },
    {
      content: "Completed (others)",
      icon: CheckCircle,
      slug: "/completed/others",
      count: lists.completedOthers.length,
    },
    { content: "Paused", icon: PauseCircle, slug: "/paused", count: lists.paused.length },
    { content: "Dropped", icon: XCircle, slug: "/dropped", count: lists.dropped.length },
    { content: "Planning", icon: Calendar, slug: "/planning", count: lists.planning.length },
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
