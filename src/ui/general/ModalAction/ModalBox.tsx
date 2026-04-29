import AddSongToPlaylistBox from "./AddSongToPlaylist/AddSongToPlaylistBox";
import ConfirmAddSongBox from "./ConfirmAddSong/ConfirmAddSongBox";
import CreatePlaylistBox from "./CreatePlaylist/CreatePlaylistBox";
import EditPlaylistBox from "./EditPlaylist/EditPlaylistBox";
import InfoNoticeBox from "./InfoNotice/InfoNoticeBox";
import SignInBox from "./SignIn/SignInBox";

function ModalBox() {
  return (
    <>
      <ConfirmAddSongBox />
      <AddSongToPlaylistBox />
      <EditPlaylistBox />
      <CreatePlaylistBox />
      <InfoNoticeBox />
      <SignInBox />
    </>
  );
}

export default ModalBox;
