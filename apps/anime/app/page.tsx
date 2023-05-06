import { getClient } from "~/lib/apollo";
import { GET_ANIME } from "~/lib/queries";

export default async function Page() {
  const client = getClient();
  const { data } = await client.query({ query: GET_ANIME });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
