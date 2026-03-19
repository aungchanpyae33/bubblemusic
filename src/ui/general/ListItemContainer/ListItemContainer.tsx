import type { SongInfo } from "../../../../database.types-fest";
import SingleItemSong from "../SingleItemRow/SingleItemSong";
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
        return (
          <div
            className="border border-borderFull rounded-md shrink-0  w-[300px] md:w-[350px] lg:w-[380px]"
            key={id}
          >
            <SingleItemSong song={item} />
          </div>
        );
      })}
    </div>
  );
}

export default ListItemContainer;
