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

  function outputShuffle() {
    if (!isShuffle) {
      if (!listProp.songs) return previousPlayListArray;
      const shuffleData = {
        ...listProp,
        songs: {
          byId: listProp.songs.byId,
          idArray: [currentSongs, ...newCopyArray],
        },
      };
      return shuffleData;
    }
    return previousPlayListArray;
  }
  return outputShuffle();
};
export default shufflePlaylist;
