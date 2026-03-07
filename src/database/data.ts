import { createClient } from "./server";

import { normalizeById } from "@/lib/returnById";
import type { Database } from "../../database.types-fest";
import {
  ArtistPageReturn,
  FetchSongsReturn,
  GetAllMediaItemsReturn,
  GetLikedIdReturn,
  GetRecentReturn,
  GetSearchPageReturn,
  ListSongsReturn,
  UserLibReturn,
  UserPageReturn,
} from "./data-types-return";
export interface Movie {
  id: number;
  name: string;
}
export interface MovieRe {
  title: string;
}

export const getLikedId = async (): Promise<GetLikedIdReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("getlikedid");
    if (error) throw error;
    if (!data) throw new Error("not found");

    const userLike = {
      userLike: normalizeById(data),
    };

    return { data: userLike, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const get = async (): Promise<GetAllMediaItemsReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_all_media_items");
    if (error) throw error;
    if (!data) throw new Error("not found");

    const mapItem = {
      recentlyPlayed: normalizeById(data.recentlyPlayed),
      trendingSongs: normalizeById(data.trendingSongs),
      topMix: normalizeById(data.topMix),
      topPlaylistWeek: normalizeById(data.topPlaylistWeek),
      topAlbumWeek: normalizeById(data.topAlbumWeek),
      topArtistWeek: normalizeById(data.topArtistWeek),
      artistForYou: normalizeById(data.artistForYou),
      albumForYou: normalizeById(data.albumForYou),
      playlistForYou: normalizeById(data.playlistForYou),
    };

    return { data: mapItem, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getRecent = async (): Promise<GetRecentReturn> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_recent_list");
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = normalizeById(data.recentlyPlayed);
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserLib = async (): Promise<UserLibReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_user_library");
    if (error) throw error;
    if (!data) throw new Error("not found");
    const userLib = {
      userLib: normalizeById(data),
    };
    return { data: userLib, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSearchPage = async (
  query: string,
): Promise<GetSearchPageReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_dropdown", {
      query,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");

    // leave top result
    const mappedData = {
      ...data,
      songs: normalizeById(data.songs),
      albums: normalizeById(data.albums),
      artists: normalizeById(data.artists),
      playlists: normalizeById(data.playlists),
      profiles: normalizeById(data.profiles),
    };
    return { data: mappedData, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const getPlaylistSongs = async (
  playlistId: string,
): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_playlist_page", {
      p_id: playlistId,
    });

    if (error) throw error;
    if (!data) throw new Error("not found");

    const mappedData = {
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSongTrack = async (
  songId: string,
): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_song_track", {
      p_song_id: songId,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getAlbumSongs = async (
  albumId: string,
): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_album_page", {
      p_album_id: albumId,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getArtistPage = async (
  artistId: string,
): Promise<ArtistPageReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_artist_page", {
      p_artist_id: artistId,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      albums: normalizeById(data.albums),
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getData = async (query: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_all", {
      query,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserPage = async (userId: string): Promise<UserPageReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_user_page", {
      p_user_id: userId,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = { ...data, playlists: normalizeById(data.playlists) };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

const fetchSongListByType = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
) => {
  try {
    const supabase = await createClient();
    if (type === "playlist") {
      return await supabase.rpc("get_playlist_songs_queue", {
        p_id: id,
      });
    } else if (type === "album") {
      return await supabase.rpc("get_album_songs_queue", {
        p_album_id: id,
      });
    } else if (type === "artist") {
      return await supabase.rpc("get_artist_songs_queue", {
        p_artist_id: id,
      });
    } else {
      return { data: null, error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const getSongList = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
): Promise<FetchSongsReturn> => {
  try {
    const { data, error } = await fetchSongListByType(id, type);
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      songs: normalizeById(data),
    };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

const fetchListDirectByType = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
) => {
  try {
    const supabase = await createClient();
    if (type === "playlist") {
      return await supabase.rpc("get_playlist_direct", {
        p_id: id,
      });
    } else if (type === "album") {
      return await supabase.rpc("get_album_direct", {
        p_album_id: id,
      });
    } else if (type === "artist") {
      return await supabase.rpc("get_artist_direct", {
        p_artist_id: id,
      });
    } else {
      return { data: null, error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const getListDirect = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
): Promise<ListSongsReturn> => {
  try {
    const { data, error } = await fetchListDirectByType(id, type);

    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkSongsBeforeAdd = async (
  playlistId: string,
  songId: string,
) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("playlist_songs")
      .select("id")
      .eq("playlist_id", playlistId)
      .eq("song_id", songId);
    if (error) throw error;
    if (data && data.length > 0) {
      // true if song already in playlist
      return { exists: true, error: null };
    }
    return { exists: false, error: null };
  } catch (error) {
    return { exists: false, error };
  }
};

export const getSimilarSongQueue = async (
  id: string,
): Promise<FetchSongsReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_similar_songs", {
      input_song_id: id,
      similarity_threshold: 0.3,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      songs: normalizeById(data),
    };

    return { data: mappedData, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const getLyric = async (songId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lyric")
      .select("*")
      .eq("song_id", songId)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new Error("not found");
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
