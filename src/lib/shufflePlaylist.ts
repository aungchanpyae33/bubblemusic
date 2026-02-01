import type { ListSongPage } from "@/database/data-types-return";

const shufflePlaylist = (
  array: string[],
  isShuffle: boolean,
  listProp: ListSongPage,
  currentSongs: string,
  previousPlayListArray: ListSongPage,
) => {
  const newCopyArray = array.slice();
  for (let i = newCopyArray.length - 1; i > 0; i--) {
    const n = Math.floor(Math.random() * (i + 1));
    [newCopyArray[i], newCopyArray[n]] = [newCopyArray[n], newCopyArray[i]];
  }
  return !isShuffle
    ? {
        ...listProp,
        idArray: [currentSongs, ...newCopyArray],
      }
    : previousPlayListArray;
};
export default shufflePlaylist;
