import { Photo as _Photo } from "@prisma/client";

export type Photo = Omit<_Photo, "date"> & {
  dateAgo: string;
};
