import { ListSongPage } from "@/database/data-types-return";

const excludeCurrentSongs = (ListSong: ListSongPage, currentIndex: number) => {
  if (!ListSong.songs) return;
  return [
    ...ListSong.songs.idArray.slice(0, currentIndex),
    ...ListSong.songs.idArray.slice(currentIndex + 1),
  ];
};
export default excludeCurrentSongs;
