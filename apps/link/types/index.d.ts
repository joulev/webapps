import { WithId } from "mongodb";

type __JoulevLink = {
  slug: string;
  url: string;
};
type __PublicLink = {
  slug?: string;
  url: string;
};

type ServerBody<T> = {
  post: T;
  put: WithId<Partial<T>>;
  delete: WithId<{}>;
};

export type JoulevLink = ServerBody<__JoulevLink>;
export type PublicLink = Omit<ServerBody<__PublicLink>, "put" | "delete">;

export type LinkDocument = JoulevLink["post"] & {
  updated: number;
  isJoulev: boolean;
};
