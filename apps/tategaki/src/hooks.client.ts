import type { HandleServerError } from "@sveltejs/kit";

export const handleError = (({ event }) => {
  return { message: event.route ? "Internal Error" : "Not Found" };
}) satisfies HandleServerError;
