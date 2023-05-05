import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (params.type === "tv") return { name: "Completed TV" };
  if (params.type === "movies") return { name: "Completed Movie" };
  if (params.type === "others") return { name: "Completed others" };
  throw error(404, "Not found");
};
