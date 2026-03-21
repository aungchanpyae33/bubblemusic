import { ComponentProps } from "react";
import type { SongInfo } from "../../../database.types-fest";
import ImageBox from "../general/ListRow/ImageBox";
import ListRowItemInfo from "../general/ListRow/ListRowItemInfo";
import ToggleWithoutList from "../general/TogglePlayButton/ToggleWithoutList";
import SingleItemRow from "../general/SingleItemRow/SingleItemRow";
import ListRowTrackOptionAndLike from "../general/ListRow/ListRowTrackOptionAndLike";
import VerticalThreeDots from "../general/ThreeDot/VerticalThreeDots";
import ContextMoreOption from "@/Context/ContextMoreOption";
import QueueItemContainer from "../Option/QueuOption/QueueItemContainer";
import MoreOption from "../general/MoreOption/MoreOption";

interface QueueItemSongProps extends ComponentProps<"div"> {
  song: SongInfo;
}

function QueueItemSong({ song, ...props }: QueueItemSongProps) {
  return (
    <SingleItemRow {...props}>
      <ImageBox name={song.name} cover_url={song.cover_url} type={song.type}>
        <ToggleWithoutList song={song} />
      </ImageBox>

      <ListRowItemInfo
        name={song.name}
        type={song.type}
        artists={song.artists}
      />
      <ListRowTrackOptionAndLike song={song}>
        <div className="flex items-center  justify-center">
          <ContextMoreOption relative={song.artists} type={song.type}>
            <MoreOption
              targetElement={<QueueItemContainer />}
              triggerEl={<VerticalThreeDots />}
            />
          </ContextMoreOption>
        </div>
      </ListRowTrackOptionAndLike>
    </SingleItemRow>
  );
}

export default QueueItemSong;
