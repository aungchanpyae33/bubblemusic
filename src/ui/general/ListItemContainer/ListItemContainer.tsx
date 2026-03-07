import type { SongInfo } from "../../../../database.types-fest";
import SongListItem from "./SongListItem";
import type { GetAllMediaItems } from "@/database/data-types-return";

function ListItemContainer({
  songs,
}: {
  songs: GetAllMediaItems["trendingSongs"];
}) {
  if (!songs || songs.idArray.length === 0) return;
  return (
    <div className="h-full grid grid-cols-4 shrink-0 gap-4   justify-between">
      {songs.idArray.map((id) => {
        const item = songs.byId[id] as SongInfo;
        return <SongListItem song={item} key={id} />;
      })}
    </div>
  );
}

export default ListItemContainer;
