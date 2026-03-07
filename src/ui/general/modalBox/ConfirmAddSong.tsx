"use client";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  addSongsToPlaylistProps,
  isSongExist,
  songExist,
  songExistAction,
  songsToPlaylist,
  useAddSongsToPlaylist,
  useIsExistSongs,
} from "@/lib/zustand";
import NotiBox from "../NotiBox/NotiBox";
import { useTranslations } from "next-intl";

function ConfirmAddSong() {
  const w = useTranslations("Warning");
  const { playlistId, songId } = useIsExistSongs(
    (state: isSongExist) => state.isSongExist,
  ) as songExist;
  const { cover_url } = useAddSongsToPlaylist(
    (state: songsToPlaylist) => state.songsToPlaylist,
  ) as addSongsToPlaylistProps;
  const setIsSongExist = useIsExistSongs(
    (state: songExistAction) => state.setIsSongExist,
  );
  const mutation = useAddSongMutate(playlistId, cover_url);
  function handleAdd() {
    mutation.mutate({
      playlistId,
      songId,
    });
  }
  return (
    <NotiBox>
      <p>{w("songAlreadyExist")}</p>

      <div className=" w-full flex justify-end gap-3">
        <button
          className="bg-surface-1 p-2 rounded-lg"
          onClick={() => setIsSongExist({})}
        >
          {" "}
          {w("cancel")}
        </button>
        <button className="bg-surface-1 p-2 rounded-lg" onClick={handleAdd}>
          {w("add")}
        </button>
      </div>
    </NotiBox>
  );
}

export default ConfirmAddSong;
