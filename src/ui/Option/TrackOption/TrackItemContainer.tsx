"use client";

import AddSongButton from "../OptionItems/AddSongButton";
import AddToQueue from "../OptionItems/AddToQueeue";
import GoToAlbum from "../OptionItems/GoToAlbum";
import GoToRelative from "../OptionItems/GoToRelative";
import PlayNextQueue from "../OptionItems/PlayNextQueue";
import RemoveSongButton from "../OptionItems/RemoveSongButton";
import ShareSong from "../OptionItems/ShareSong";
import ToggleHeartContent from "../OptionItems/ToggleHeartContent";
import OptionContainer from "../OptionUI/OptionContainer";

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
