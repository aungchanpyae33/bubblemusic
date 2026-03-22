import AddSongToPlaylistBox from "./AddSongToPlaylist/AddSongToPlaylistBox";
import ConfirmAddSongBox from "./ConfirmAddSong/ConfirmAddSongBox";
import CreatePlaylistBox from "./CreatePlaylist/CreatePlaylistBox";
import EditPlaylistBox from "./EditPlaylist/EditPlaylistBox";

function ModalBox() {
  return (
    <>
      <ConfirmAddSongBox />
      <AddSongToPlaylistBox />
      <EditPlaylistBox />
      <CreatePlaylistBox />
    </>
  );
}

export default ModalBox;
