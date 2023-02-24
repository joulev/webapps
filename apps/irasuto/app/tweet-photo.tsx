import Image from "next/image";
import { TweetPhotoProps } from "~/types";

export default function TweetPhoto({ url, width, height, tweet }: TweetPhotoProps) {
  return <Image src={url} alt={`Illustration at ${url}`} width={width} height={height} />;
}
