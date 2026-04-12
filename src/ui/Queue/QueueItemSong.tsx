import { ComponentProps } from "react";
import type { SongInfo } from "../../../database.types-fest";
import ImageBox from "../general/ListRow/ImageBox";
import ListRowItemInfo from "../general/ListRow/ListRowItemInfo";
import SingleItemRow from "../general/SingleItemRow/SingleItemRow";
import ListRowTrackOptionAndLike from "../general/ListRow/ListRowTrackOptionAndLike";
import VerticalThreeDots from "../general/ThreeDot/VerticalThreeDots";
import ContextMoreOption from "@/Context/ContextMoreOption";
import QueueItemContainer from "../Option/QueuOption/QueueItemContainer";
import MoreOption from "../general/MoreOption/MoreOption";
import ToggleWithList from "../general/TogglePlayButton/ToggleWithList";
import { ListSongPage } from "@/database/data-types-return";

interface QueueItemSongProps extends ComponentProps<"div"> {
  song: SongInfo;
  listSong: ListSongPage;
}

function QueueItemSong({ listSong, song, ...props }: QueueItemSongProps) {
  return (
    <SingleItemRow {...props}>
      <ImageBox name={song.name} cover_url={song.cover_url} type={song.type}>
        <ToggleWithList listSong={listSong} song={song} />
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
