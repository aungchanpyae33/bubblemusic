import { cache } from "react";
import {
  checkExist,
  checkExistGenresAndMoods,
  fetchCheckType,
  GenresAndMoodsType,
  getAlbumSongs,
  getArtistPage,
  getGenresPage,
  getMoodPage,
  getPlaylistSongs,
  getSongTrack,
  getUserFullPlaylist,
  getUserPage,
} from "./data";

export const cacheCheckExistGenresAndMoods = cache(
  async (type: GenresAndMoodsType, id: string) => {
    const { exists, data, error } = await checkExistGenresAndMoods(type, id);
    return { exists, data, error };
  },
);

export const cacheCheckExist = cache(
  async (type: fetchCheckType, id: string) => {
    const { exists, error } = await checkExist(type, id);
    return { exists, error };
  },
);

export const cacheGetAlbumSongs = cache(async (albumId: string) => {
  const { data, error } = await getAlbumSongs(albumId);
  return { data, error };
});

export const cacheGetSongTrack = cache(async (songId: string) => {
  const { data, error } = await getSongTrack(songId);
  return { data, error };
});

export const cacheGetPlaylistSongs = cache(async (playlistId: string) => {
  const { data, error } = await getPlaylistSongs(playlistId);
  return { data, error };
});

export const cacheGetUserFullPlaylist = cache(async (p_user_id: string) => {
  const { data, error } = await getUserFullPlaylist(p_user_id);
  return { data, error };
});

export const cacheGetUserPage = cache(async (userId: string) => {
  const { data, error } = await getUserPage(userId);
  return { data, error };
});

export const cacheGetGenresPage = cache(async (genre_id: string) => {
  const { data, error } = await getGenresPage(genre_id);
  return { data, error };
});

export const cacheGetMoodPage = cache(async (mood_id: string) => {
  const { data, error } = await getMoodPage(mood_id);
  return { data, error };
});

export const cacheGetArtistPage = cache(async (artistId: string) => {
  const { data, error } = await getArtistPage(artistId);
  return { data, error };
});
