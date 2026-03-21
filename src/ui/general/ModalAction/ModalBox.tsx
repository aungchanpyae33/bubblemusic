import AddSongToPlaylistBox from "./AddSongToPlaylist/AddSongToPlaylistBox";
import ConfirmAddSongBox from "./ConfirmAddSong/ConfirmAddSongBox";
import EditPlaylistBox from "./EditPlaylist/EditPlaylistBox";

function ModalBox() {
  return (
    <>
      <ConfirmAddSongBox />
      <AddSongToPlaylistBox />
      <EditPlaylistBox />
    </>
  );
}

export default ModalBox;
