import { useDataContext } from "@/lib/MediaSource/ContextMedia";
import {
  currentSongPlaylist,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import VerticalThreeDots from "@/ui/general/ThreeDot/VerticalThreeDots";
import ListRowTrackOptionAndLike from "@/ui/general/ListRow/ListRowTrackOptionAndLike";
import QueueItemContainer from "@/ui/Queue/QueueItemContainer";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";

function FullThreeDots() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || [],
  );
  const { id } = useDataContext();
  if (!playListArray || !playListArray.songs) return null;
  const currentSong = playListArray.songs.byId[id];
  return (
    <ListRowTrackOptionAndLike song={currentSong}>
      <div className="flex items-center  justify-center">
        <MoreOptionContext
          relative={currentSong.artists}
          type={currentSong.type}
        >
          <MoreOption
            targetElement={<QueueItemContainer />}
            triggerEl={
              <div className="transition-colors  duration-200 bg-surface-1 hover:bg-surface-2 p-1 rounded-full flex items-center justify-center">
                <VerticalThreeDots className="" size="medium" />
              </div>
            }
          />
        </MoreOptionContext>
      </div>
    </ListRowTrackOptionAndLike>
  );
}

export default FullThreeDots;
