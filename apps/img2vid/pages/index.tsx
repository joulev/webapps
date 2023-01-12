import { createFFmpeg, FFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useCallback, useEffect, useRef, useState } from "react";

function useFFmpeg() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const ffmpeg = useRef<FFmpeg | null>(null);
  useEffect(() => {
    (async () => {
      ffmpeg.current = createFFmpeg({
        log: true,
        corePath: `${window.location.origin}/dist/ffmpeg-core.js`,
      });
      ffmpeg.current.setProgress(p => setProgress(p["time" as keyof typeof p] ?? 0));
      await ffmpeg.current.load();
      setLoading(false);
    })();
  }, []);
  return loading
    ? { ffmpeg: null, loading, progress }
    : { ffmpeg: ffmpeg.current!, loading, progress };
}

function getAudioDuration(blob: Blob) {
  return new Promise<number>((resolve, reject) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    audio.onloadedmetadata = () => {
      resolve(audio.duration);
      URL.revokeObjectURL(audio.src);
    };
    audio.onerror = reject;
  });
}

function App({ ffmpeg, progress }: { ffmpeg: FFmpeg; progress: number }) {
  const [ytLink, setYtLink] = useState("");
  const [length, setLength] = useState(0);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!imgFile || !ytLink) return;
      const audioFile = await fetch("/api/yt-audio-downloader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: ytLink }),
      }).then(r => r.blob());
      setLength(await getAudioDuration(audioFile));
      const audioFileName = `audio.${audioFile.type.split("/")[1]}`;
      ffmpeg.FS("writeFile", audioFileName, await fetchFile(audioFile));
      const imgFileName = `img.${imgFile.type.split("/")[1]}`;
      ffmpeg.FS("writeFile", imgFileName, await fetchFile(imgFile));
      await ffmpeg.run(
        "-loop",
        "1",
        "-i",
        imgFileName,
        "-i",
        audioFileName,
        "-c:v",
        "libx264",
        "-tune",
        "stillimage",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-pix_fmt",
        "yuv420p",
        "-shortest",
        "output.mp4",
      );
      const data = ffmpeg.FS("readFile", "output.mp4");
      const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.mp4";
      a.click();
      URL.revokeObjectURL(url);
    },
    [ytLink, imgFile, ffmpeg],
  );
  return (
    <div className="max-w-prose m-6">
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <input
          placeholder="YouTube link"
          type="url"
          value={ytLink}
          onChange={e => setYtLink(e.target.value)}
          className="input"
          required
        />
        <input
          placeholder="Image file"
          type="file"
          onChange={e => setImgFile(e.target.files?.[0] ?? null)}
          className="input"
          accept="image/*"
          required
        />
        <button className="btn btn-primary">Create video</button>
        {length !== 0 && <div>Done {(progress * 100) / length} percent</div>}
      </form>
    </div>
  );
}

export default function Page() {
  const { ffmpeg, loading, progress } = useFFmpeg();
  if (loading)
    return <main className="fixed inset-0 grid place-items-center">Loading assets&hellip;</main>;
  return <App ffmpeg={ffmpeg} progress={progress} />;
}
