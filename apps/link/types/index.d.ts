import { WithId } from "mongodb";

type __JoulevLink = {
  slug: string;
  url: string;
};

type ServerBody<T> = {
  post: T;
  put: WithId<Partial<T>>;
  delete: WithId<{}>;
};

export type JoulevLink = ServerBody<__JoulevLink>;

export type LinkDocument = JoulevLinkPostBody & {
  updated: number;
  isJoulev: boolean;
};
