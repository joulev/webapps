import { getToken } from "~/lib/auth";
import { Item } from "~/lib/get-lists";
import PublicCard from "./public-card";
import PrivateCard from "./private-card";

export type CardVariant =
  | "watching"
  | "rewatching"
  | "completed"
  | "completed-others"
  | "paused"
  | "dropped"
  | "planning";

export default function Card({ item, variant }: { item: Item; variant: CardVariant }) {
  const token = getToken();
  const Component = token ? PrivateCard : PublicCard;
  return <Component item={item} variant={variant} />;
}
