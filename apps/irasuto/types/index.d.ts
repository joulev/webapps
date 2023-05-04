import { Tweet } from "next-tweet/api/index";

export type TweetWithPhoto = Tweet & {
  photos: NonNullable<Tweet["photos"]>;
  addedDate: Date;
};

export type Photo = {
  url: string;
  width: number;
  height: number;
  tweetUrl: string;
  author: {
    name: string;
    handle: string;
  };
  addedDate: Date;
  dateAgo: string;
};
