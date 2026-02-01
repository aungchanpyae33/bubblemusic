import {
  addSongsToPlaylist,
  addSongsToPlaylistProps,
  songExistAction,
  songsToPlaylist,
  useAddSongsToPlaylist,
  useIsExistSongs,
} from "@/lib/zustand";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  checkSongsBeforeAddClient,
  getUserLibClient,
} from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";

function AddSongItem({
  playlistSongs,
}: {
  playlistSongs: {
    id: string;
    name: string;
  };
}) {
  const playlistId = playlistSongs.id;
  const setIsSongExist = useIsExistSongs(
    (state: songExistAction) => state.setIsSongExist,
  );
  const { songId, cover_url } = useAddSongsToPlaylist(
    (state: songsToPlaylist) => state.songsToPlaylist,
  ) as addSongsToPlaylistProps;
  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist,
  );
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });

  const userLib = queryError ? undefined : queryData?.data?.userLib;
  const playlist = userLib?.byId[playlistId];

  const isListCover = playlist?.cover_url;
  const noExistCover = isListCover ? null : cover_url;

  const mutation = useAddSongMutate(playlistId, noExistCover);

  async function handleAdd() {
    addSongsToPlaylist({});
    const { exists, error } = await checkSongsBeforeAddClient({
      playlistId: playlistId,
      songId: songId,
    });
    if (error) return;
    if (!exists && !error) {
      mutation.mutate({
        playlistId: playlistId,
        songId: songId,
      });
    } else {
      setIsSongExist({ playlistId: playlistId, songId: songId });
    }
  }
  return (
    <div className=" p-1 ">
      <button onClick={handleAdd}>{playlistSongs.name}</button>
    </div>
  );
}

export default AddSongItem;
