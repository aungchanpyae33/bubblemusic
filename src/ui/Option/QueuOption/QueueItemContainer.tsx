import AddSongButton from "../OptionItems/AddSongButton";
import AddToQueue from "../OptionItems/AddToQueeue";
import GoToAlbum from "../OptionItems/GoToAlbum";
import GoToRelative from "../OptionItems/GoToRelative";
import PlayNextQueue from "../OptionItems/PlayNextQueue";
import RemoveFromQueue from "../OptionItems/RemoveFromQueue";
import ShareSong from "../OptionItems/ShareSong";
import ToggleHeartContent from "../OptionItems/ToggleHeartContent";
import OptionContainer from "../OptionUI/OptionContainer";

function QueueItemContainer() {
  return (
    <OptionContainer>
      <AddSongButton />
      <PlayNextQueue />
      <AddToQueue />
      <RemoveFromQueue />
      <ToggleHeartContent />
      <GoToRelative />
      <GoToAlbum />
      <ShareSong />
    </OptionContainer>
  );
}

export default QueueItemContainer;
