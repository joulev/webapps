import { Item } from "~/lib/get-lists";
import { CardVariant } from "./card";
import PrivateCardClient from "./private-card.client";

export default function PrivateCard({ item, variant }: { item: Item; variant: CardVariant }) {
  return <PrivateCardClient item={item} variant={variant} />;
}
