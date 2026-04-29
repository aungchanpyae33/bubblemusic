import AddSongToPlaylistBox from "./AddSongToPlaylist/AddSongToPlaylistBox";
import ConfirmAddSongBox from "./ConfirmAddSong/ConfirmAddSongBox";
import CreatePlaylistBox from "./CreatePlaylist/CreatePlaylistBox";
import EditPlaylistBox from "./EditPlaylist/EditPlaylistBox";
import SignInBox from "./SignIn/SignInBox";

function ModalBox() {
  return (
    <>
      <ConfirmAddSongBox />
      <AddSongToPlaylistBox />
      <EditPlaylistBox />
      <CreatePlaylistBox />
      <SignInBox />
    </>
  );
}

export default ModalBox;
