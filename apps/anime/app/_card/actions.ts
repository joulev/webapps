"use server";

import { revalidateTag } from "next/cache";

import { getClient as _getClient } from "~/lib/apollo";
import { getToken } from "~/lib/auth";
import { Item } from "~/lib/get-lists";
import { UPDATE_PROGRESS } from "~/lib/mutations";

function getClient() {
  const token = getToken();
  if (!token) throw new Error("not authenticated");
  return _getClient(token);
}

const client = getClient();

export async function incrementProgress(item: Item) {
  await client.mutate({
    mutation: UPDATE_PROGRESS,
    variables: { id: item.id, progress: (item?.progress ?? 0) + 1 },
  });
  revalidateTag("lists");
}
