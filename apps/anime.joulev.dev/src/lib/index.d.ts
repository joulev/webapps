import type { GetAnimeQuery } from "$lib/gql/graphql";

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
