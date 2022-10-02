import type { GetAnimeQuery } from "$lib/gql/graphql";
import type { SvelteComponent as __Component } from "svelte";

// someone helps me
export type ListItem = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<GetAnimeQuery["MediaListCollection"]>["lists"]>[number]
    >["entries"]
  >[number]
>;

export type CardVariant =
  | "watching"
  | "rewatching"
  | "completed"
  | "completed-others"
  | "paused"
  | "dropped"
  | "planning";

// Why do I have to write this myself...
export type SvelteComponent<P = Record<string, never>> = new (_: {
  target: Element | ShadowRoot;
  props?: P;
}) => __Component<P>;
