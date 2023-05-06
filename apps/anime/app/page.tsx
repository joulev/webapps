import { getClient } from "~/lib/apollo";
import { GET_ANIME, MediaListStatus } from "~/lib/queries";

export default async function Page() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_ANIME,
    variables: { status: MediaListStatus.Completed },
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
