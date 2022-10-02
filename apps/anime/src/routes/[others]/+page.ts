import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (["watching", "rewatching", "paused", "dropped", "planning"].includes(params.others))
    return { path: params.others } as {
      path: "watching" | "rewatching" | "paused" | "dropped" | "planning";
    };
  throw error(404, "Not found");
};
