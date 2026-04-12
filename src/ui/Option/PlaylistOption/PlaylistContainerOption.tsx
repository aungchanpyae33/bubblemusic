import AddSonglistToQueue from "../OptionItems/AddSonglistToQueue";
import AddToLibrary from "../OptionItems/AddToLibrary";
import EditToPlaylist from "../OptionItems/EditToPlaylist";
import GoToRelative from "../OptionItems/GoToRelative";
import PlayNextQueueSongList from "../OptionItems/PlayNextQueueSongList";
import RemoveFromLibrary from "../OptionItems/RemoveFromLibrary";
import ShareList from "../OptionItems/ShareList";
import OptionContainer from "../OptionUI/OptionContainer";

function PlaylistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <EditToPlaylist />
      <GoToRelative />
      <ShareList />
    </OptionContainer>
  );
}

export default PlaylistContainerOption;
