import Image from "next/image";
import { Photo } from "~/types";

export default function TweetPhoto({ url, width, height, tweet }: Photo) {
  return <Image src={url} alt={`Illustration at ${url}`} width={width} height={height} />;
}
