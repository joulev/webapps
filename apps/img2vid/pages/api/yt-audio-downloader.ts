import { NextApiHandler } from "next";
import ytdl from "ytdl-core";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const url = req.body.url;
  if (typeof url !== "string") return res.status(400).end();
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { filter: "audioonly", quality: "highestaudio" });
  if (!format) return res.status(404).end();
  ytdl(url, { format }).pipe(res);
};

export default handler;
