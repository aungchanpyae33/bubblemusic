import ToggleHeartButton from "@/ui/trackComponent/ToggleHeartButton";
import type { SongInfo } from "../../../../database.types-fest";
import ImageBox from "../ListRow/ImageBox";
import ListRowItemInfo from "../ListRow/ListRowItemInfo";
import ListRowTrackOptionAndLike from "../ListRow/ListRowTrackOptionAndLike";
import ToggleWithoutList from "../TogglePlayButton/ToggleWithoutList";
import SingleItemRow from "./SingleItemRow";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import MoreOption from "@/ui/trackComponent/MoreOption";
import TrackItemContainer from "@/ui/trackComponent/TrackItemContainer";
import VerticalThreeDots from "../icon/VerticalThreeDots";

function SingleItemSong({ song }: { song: SongInfo }) {
  return (
    <SingleItemRow className="grid-cols-[64px_1fr_40px_40px]">
      <ImageBox name={song.name} cover_url={song.cover_url} type={song.type}>
        <ToggleWithoutList song={song} />
      </ImageBox>

      <ListRowItemInfo
        name={song.name}
        type={song.type}
        artists={song.artists}
      />
      <ListRowTrackOptionAndLike song={song}>
        <div className="flex items-center justify-center">
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

export default SingleItemSong;
