"use server";

import { revalidatePath } from "next/cache";

import { getClient as _getClient } from "~/lib/apollo";
import { getToken } from "~/lib/auth";
import { Item } from "~/lib/get-lists";
import { MediaListStatus } from "~/lib/queries";
import {
  ADD_ANIME,
  DELETE_ANIME,
  UPDATE_PROGRESS,
  UPDATE_REPEAT,
  UPDATE_SCORE,
  UPDATE_STATUS,
} from "~/lib/mutations";
import { getAccumulatedScore } from "~/lib/utils";

function getClient() {
  const token = getToken();
  if (!token) throw new Error("not authenticated");
  return _getClient(token);
}

const client = getClient();

function revalidateEverything() {
  revalidatePath("/watching");
  revalidatePath("/rewatching");
  revalidatePath("/completed/tv");
  revalidatePath("/completed/movies");
  revalidatePath("/completed/others");
  revalidatePath("/paused");
  revalidatePath("/dropped");
  revalidatePath("/planning");
}

export async function incrementProgress(item: Item) {
  await client.mutate({
    mutation: UPDATE_PROGRESS,
    variables: { id: item.id, progress: (item?.progress ?? 0) + 1 },
  });
  revalidateEverything();
}

export async function updateStatus(item: Item, status: MediaListStatus) {
  await client.mutate({
    mutation: UPDATE_STATUS,
    variables: { id: item.id, status },
  });
  revalidateEverything();
}

export async function cancelRewatch(item: Item) {
  await Promise.allSettled([
    client.mutate({
      mutation: UPDATE_STATUS,
      variables: { id: item.id, status: MediaListStatus.Completed },
    }),
    client.mutate({
      mutation: UPDATE_REPEAT,
      variables: { id: item.id, repeat: item.repeat ?? 0, progress: item.media?.episodes ?? 0 },
    }),
  ]);
  revalidateEverything();
}

export async function updateScore(item: Item, scores: number[]) {
  const accumulate = getAccumulatedScore(scores);
  await client.mutate({
    mutation: UPDATE_SCORE,
    variables: { id: item.id, score: accumulate, advanced: scores },
  });
  revalidateEverything();
}

export async function removeFromList(item: Item) {
  await client.mutate({ mutation: DELETE_ANIME, variables: { id: item.id } });
  revalidateEverything();
}

export async function addToPTW(itemId: number) {
  await client.mutate({ mutation: ADD_ANIME, variables: { mediaId: itemId } });
  revalidateEverything();
}
