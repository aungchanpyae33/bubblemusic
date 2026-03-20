"use client";

import AddSonglistToQueue from "../general/optionBox/AddSonglistToQueue";
import AddToLibrary from "../general/optionBox/AddToLibrary";
import GoToRelative from "../general/optionBox/GoToRelative";
import OptionContainer from "../general/optionBox/OptionContainer";
import PlayNextQueueSongList from "../general/optionBox/PlayNextQueueSongList";
import ShareList from "../general/shareButton/ShareList";
import RemoveFromLibrary from "../playlist/playlistOption/RemoveFromLibrary";

function AlbumContainerOption() {
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

export default AlbumContainerOption;
