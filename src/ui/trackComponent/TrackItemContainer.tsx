"use client";
import AddSongButton from "./AddSongButton";
import RemoveSongButton from "./RemoveSongButton";
import ToggleHeartContent from "./ToggleHeartContent";
import GoToAlbum from "../general/optionBox/GoToAlbum";
import OptionContainer from "../general/optionBox/OptionContainer";
import PlayNextQueue from "../general/optionBox/PlayNextQueue";
import AddToQueue from "../general/optionBox/AddToQueeue";
import ShareSong from "../general/shareButton/ShareSong";
import GoToRelative from "../general/optionBox/GoToRelative";

function TrackItemContainer() {
  return (
    <OptionContainer>
      <AddSongButton />
      <PlayNextQueue />
      <AddToQueue />
      <RemoveSongButton />
      <ToggleHeartContent />
      <GoToRelative />
      <GoToAlbum />
      <ShareSong />
    </OptionContainer>
  );
}

export default TrackItemContainer;
