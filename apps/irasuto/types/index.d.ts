import { Tweet } from "next-tweet/api/index";

export type TweetWithPhoto = Tweet & {
  photos: NonNullable<Tweet["photos"]>;
};

export type TweetPhotoProps = {
  tweet: TweetWithPhoto;
  url: string;
  width: number;
  height: number;
};
