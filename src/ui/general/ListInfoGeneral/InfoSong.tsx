import UnderLineLinkHover from "@/ui/general/UnderLineLinkHover";
import type { SongInfo } from "../../../../database.types-fest";

function InfoSong({ songInfo }: { songInfo: SongInfo }) {
  const artists = songInfo.artists;
  return (
    <>
      &bull;
      {artists.map((item, index) => (
        <span key={item.id} className="inline">
          <UnderLineLinkHover
            href={`/artist/${item.id}`}
            prefetch={false}
            className="ml-1 text-lg inline font-black"
          >
            {item.name}
          </UnderLineLinkHover>
          {index < artists.length - 1 && ","}
        </span>
      ))}
    </>
  );
}

export default InfoSong;
