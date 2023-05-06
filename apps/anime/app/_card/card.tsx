import { Item } from "~/lib/get-lists";
import PublicCard from "./public-card";

export type CardVariant =
  | "watching"
  | "rewatching"
  | "completed"
  | "completed-others"
  | "paused"
  | "dropped"
  | "planning";

export default function Card({ item, variant }: { item: Item; variant: CardVariant }) {
  return <PublicCard item={item} variant={variant} />;
}
