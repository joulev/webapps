import { cache } from "react";
import { getClient } from "~/lib/apollo";
import { GET_ANIME, MediaListStatus } from "~/lib/queries";

export const getLists = cache(async (status?: MediaListStatus) => {
  const client = getClient();
  const { data } = await client.query({ query: GET_ANIME, variables: { status } });
  return data;
});
