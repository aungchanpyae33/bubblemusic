import AddSonglistToQueue from "../OptionItems/AddSonglistToQueue";
import AddToLibrary from "../OptionItems/AddToLibrary";
import GoToRelative from "../OptionItems/GoToRelative";
import PlayNextQueueSongList from "../OptionItems/PlayNextQueueSongList";
import RemoveFromLibrary from "../OptionItems/RemoveFromLibrary";
import ShareList from "../OptionItems/ShareList";
import OptionContainer from "../OptionUI/OptionContainer";

function ArtistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <GoToRelative />
      <ShareList />
    </OptionContainer>
  );
}

export default ArtistContainerOption;
