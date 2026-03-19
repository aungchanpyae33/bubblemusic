import type { ListSongPage } from "@/database/data-types-return";
import type { SongInfo } from "../../../database.types-fest";
import ImageBox from "../general/ListRow/ImageBox";
import ListRowItemInfo from "../general/ListRow/ListRowItemInfo";
import ListRowAlbumInfo from "../general/ListRow/ListRowAlbumInfo";
import ListRowTimeInfo from "../general/ListRow/ListRowTimeInfo";
import ToggleWithList from "../general/TogglePlayButton/ToggleWithList";
import SingleItemRow from "../general/SingleItemRow/SingleItemRow";
import ListRowTrackOptionAndLike from "../general/ListRow/ListRowTrackOptionAndLike";
import ToggleHeartButton from "./ToggleHeartButton";
import MoreOptionContext from "./MoreOptionContext";
import MoreOption from "./MoreOption";
import TrackItemContainer from "./TrackItemContainer";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";
interface TrackProps {
  listSong: ListSongPage;
  song: SongInfo;
}
function Track({ listSong, song }: TrackProps) {
  return (
    <SingleItemRow className="md:gap-2 lg:gap-3 lg:grid-cols-[64px_1fr_1fr_64px_1fr_40px]  sm:grid-cols-[64px_3fr_1fr_40px_40px] grid-cols-[64px_1fr_40px_40px]">
      <ImageBox name={song.name} type={song.type} cover_url={song.cover_url}>
        <ToggleWithList listSong={listSong} song={song} />
      </ImageBox>

      <ListRowItemInfo
        name={song.name}
        type={song.type}
        artists={song.artists}
      />
      <ListRowAlbumInfo id={song.album.id} name={song.album.name} />
      <ListRowTimeInfo duration={song.duration} />

      <ListRowTrackOptionAndLike
        listSongId={listSong.id}
        song={song}
        inPage={true}
      >
        <div className="flex items-center justify-center lg:justify-end pr-0 lg:pr-4 md:pr-3">
          <ToggleHeartButton songId={song.song_id} />
        </div>
        <div className="flex items-center justify-center">
          <MoreOptionContext relative={song.artists}>
            <MoreOption
              targetElement={<TrackItemContainer />}
              triggerEl={<VerticalThreeDots />}
            />
          </MoreOptionContext>
        </div>
      </ListRowTrackOptionAndLike>
    </SingleItemRow>
  );
}

export default Track;
