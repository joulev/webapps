import { PlayCircle, MapPin } from "lucide-react";
import MusicData from "~/components/music-data";
import LastUpdated from "~/components/last-updated";
import Motion from "~/components/motion";

export default function Footer({ updated }: { updated: Date }) {
  return (
    <Motion as="footer" className="flex flex-col text-sm border-t border-daw-main-300 py-9 gap-3">
      <div className="flex flex-row items-baseline gap-3">
        <div className="relative w-6 shrink-0 pointer-events-none">
          &#x200B; {/* zero width space, to force the container to have same line height as text */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <PlayCircle size={18} width={24} strokeWidth={4 / 3} />
          </div>
        </div>
        <span>
          Last played: <MusicData />
        </span>
      </div>
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-3 justify-between sm:items-center">
        <div className="flex flex-row items-center gap-3">
          <MapPin size={18} width={24} strokeWidth={4 / 3} />
          <span>Singapore</span>
        </div>
        <LastUpdated updated={updated.toISOString()} />
      </div>
    </Motion>
  );
}
