import type { listSongsSection, SongInfo } from "../../database.types-fest";
import type { NormalizedById } from "./returnById";

export interface excludeCurrentSongsList extends Omit<
  listSongsSection,
  "songs"
> {
  songs: NormalizedById<SongInfo>;
}
const excludeCurrentSongs = (
  ListSong: excludeCurrentSongsList,
  currentIndex: number,
) => {
  return [
    ...ListSong.songs.idArray.slice(0, currentIndex),
    ...ListSong.songs.idArray.slice(currentIndex + 1),
  ];
};
export default excludeCurrentSongs;
