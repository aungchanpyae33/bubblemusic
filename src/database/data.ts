import { createClient } from "./server";
export type Supabase = Awaited<ReturnType<typeof createClient>>;
import { normalizeById, normalizeByIdOnly } from "@/lib/returnById";
import type { MediaItemType } from "../../database.types-fest";
import {
  ArtistPageReturn,
  FetchSongsReturn,
  GetAllMediaItemsReturn,
  GetLibraryOverviewReturn,
  GetLikedIdReturn,
  GetNewlyItemsReturn,
  GetRecentReturn,
  GetSearchPageReturn,
  GetSpecificCategoryPageReturn,
  GetUnAuthRootPageReturn,
  LibrarySongListSectionPageReturn,
  ListSongsReturn,
  UserLibReturn,
  UserPageReturn,
} from "./data-types-return";
import { checkUserExist } from "@/lib/checkUserExist";
import { LibSonglistRoute } from "@/lib/libRoute";
import { searchGuard } from "@/lib/searchGuard";
import { returnErrorResponse } from "@/lib/returnErrorResponse";

export const getLikedId = async (): Promise<GetLikedIdReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("getlikedid");
    if (error) throw error;
    if (!data) throw new Error("not found");
    const userLike = {
      userLike: normalizeByIdOnly(data),
    };

    return { data: userLike, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getGenre = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("genres").select("*");
    if (error) throw error;
    if (!data) throw new Error("not found");
    return { data, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getMood = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("moods").select("*");
    if (error) throw error;
    if (!data) throw new Error("not found");
    return { data, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getNewly = async (): Promise<GetNewlyItemsReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_newly");
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mapItem = {
      newlyAddedSongs: normalizeById(data.newlyAddedSongs),
      newlyAddedAlbums: normalizeById(data.newlyAddedAlbums),
      newlyAddedPlaylists: normalizeById(data.newlyAddedPlaylists),
      newlyAddedArtists: normalizeById(data.newlyAddedArtists),
    };
    return { data: mapItem, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getLibraryOverview =
  async (): Promise<GetLibraryOverviewReturn> => {
    try {
      const supabase = await createClient();
      await checkUserExist(supabase);
      const { data, error } = await supabase.rpc("get_library_overview");
      if (error) throw error;
      if (!data) throw new Error("not found");
      const mapItem = {
        lastLikedSongs: normalizeById(data.lastLikedSongs),
        lastSavedAlbums: normalizeById(data.lastSavedAlbums),
        lastSavedPlaylists: normalizeById(data.lastSavedPlaylists),
        lastCreatedPlaylists: normalizeById(data.lastCreatedPlaylists),
        lastSavedArtists: normalizeById(data.lastSavedArtists),
        recentlyPlayed: normalizeById(data.recentlyPlayed),
      };

      return { data: mapItem, error };
    } catch (error) {
      return returnErrorResponse(error);
    }
  };

export const getLikeSongs = async (
  like_title: string,
): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("get_last_liked_songs", {
      like_title,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getGenresPage = async (
  genre_id: string,
): Promise<GetSpecificCategoryPageReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_genre_page", {
      p_genre_id: genre_id,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedItem = {
      recommended: normalizeById(data.recommended),
      popular: normalizeById(data.popular),
      recent: normalizeById(data.recent),
    };
    return { data: mappedItem, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getMoodPage = async (
  mood_id: string,
): Promise<GetSpecificCategoryPageReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_mood_page", {
      p_mood_id: mood_id,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedItem = {
      recommended: normalizeById(data.recommended),
      popular: normalizeById(data.popular),
      recent: normalizeById(data.recent),
    };
    return { data: mappedItem, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getPersonalized = async () => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("get_personalized_media_items");
    if (error) throw error;
    if (!data) throw new Error("not found");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDiscover = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_discover_media_items");
    if (error) throw error;
    if (!data) throw new Error("not found");
    return data;
  } catch (error) {
    throw error;
  }
};
export const get = async (): Promise<GetAllMediaItemsReturn> => {
  try {
    const [discover, personalized] = await Promise.all([
      getDiscover(),
      getPersonalized(),
    ]);
    if (!discover || !personalized) throw new Error("not found");

    const data = {
      ...discover,
      ...personalized,
    };

    const mapItem = {
      recentlyPlayed: normalizeById(data.recentlyPlayed),
      trendingSongs: normalizeById(data.trendingSongs),
      topMix: normalizeById(data.topMix),
      trendingSongsWeek: normalizeById(data.trendingSongsWeek),
      topOfficialPlaylistWeek: normalizeById(data.topOfficialPlaylistWeek),
      topCommunityPlaylistWeek: normalizeById(data.topCommunityPlaylistWeek),
      topAlbumWeek: normalizeById(data.topAlbumWeek),
      topArtistWeek: normalizeById(data.topArtistWeek),
      artistForYou: normalizeById(data.artistForYou),
      albumForYou: normalizeById(data.albumForYou),
      playlistForYou: normalizeById(data.playlistForYou),
    };

    return { data: mapItem, error: null };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getUnAuthRoot = async (): Promise<GetUnAuthRootPageReturn> => {
  try {
    const discover = await getDiscover();
    if (!discover) throw new Error("not found");

    const mapItem = {
      trendingSongs: normalizeById(discover.trendingSongs),
      topMix: normalizeById(discover.topMix),
      trendingSongsWeek: normalizeById(discover.trendingSongsWeek),
      topOfficialPlaylistWeek: normalizeById(discover.topOfficialPlaylistWeek),
      topCommunityPlaylistWeek: normalizeById(
        discover.topCommunityPlaylistWeek,
      ),
      topAlbumWeek: normalizeById(discover.topAlbumWeek),
      topArtistWeek: normalizeById(discover.topArtistWeek),
    };
    return { data: mapItem, error: null };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getRecent = async (): Promise<GetRecentReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("get_recent_list");
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = normalizeById(data.recentlyPlayed);
    return { data: mappedData, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getUserLib = async (): Promise<UserLibReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("get_user_library");
    if (error) throw error;
    if (!data) throw new Error("not found");
    const userLib = {
      userLib: normalizeById(data),
    };
    return { data: userLib, error };
  } catch (error) {
    return returnErrorResponse(error);
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
  } catch (error) {
    return returnErrorResponse(error);
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
    return returnErrorResponse(error);
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
    return returnErrorResponse(error);
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
    return returnErrorResponse(error);
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
    return returnErrorResponse(error);
  }
};

export const getData = async (query: string) => {
  try {
    if (searchGuard(query)) return { data: [], error: null };
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_all", {
      query,
    });
    if (error) throw error;
    return { data, error };
  } catch (error) {
    return returnErrorResponse(error);
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
    return returnErrorResponse(error);
  }
};

const fetchSongListByType = async (id: string, type: MediaItemType) => {
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
    return returnErrorResponse(error);
  }
};

const fetchLibrarySectionByRoute = async (route: LibSonglistRoute) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    if (route === "album") {
      return await supabase.rpc("get_last_saved_albums");
    }
    if (route === "playlist") {
      return await supabase.rpc("get_last_saved_playlists");
    }
    if (route === "create-playlist") {
      return await supabase.rpc("get_last_created_playlists");
    }
    if (route === "artist") {
      return await supabase.rpc("get_last_saved_artists");
    }
    if (route === "recently") {
      return await supabase.rpc("get_recently_played");
    }
    return { data: null, error: null };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getUserFullPlaylist = async (
  p_user_id: string,
): Promise<LibrarySongListSectionPageReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_user_playlist_profile", {
      p_user_id,
    });
    if (error) throw error;
    if (!data) throw new Error("not found");

    const mappedData = {
      result: normalizeById(data.result),
    };
    return { data: mappedData, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getLibSectionList = async (
  route: LibSonglistRoute,
): Promise<LibrarySongListSectionPageReturn> => {
  try {
    const { data, error } = await fetchLibrarySectionByRoute(route);
    if (error) throw error;
    if (!data) throw new Error("not found");
    const mappedData = {
      result: normalizeById(data.result),
    };
    return { data: mappedData, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};

export const getSongList = async (
  id: string,
  type: MediaItemType,
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
    return returnErrorResponse(error);
  }
};

const fetchListDirectByType = async (id: string, type: MediaItemType) => {
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
    return returnErrorResponse(error);
  }
};

export const getListDirect = async (
  id: string,
  type: MediaItemType,
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
    return returnErrorResponse(error);
  }
};

export const checkSongsBeforeAdd = async (
  playlistId: string,
  songId: string,
) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
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
  } catch (error) {
    return returnErrorResponse(error);
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
    return returnErrorResponse(error);
  }
};

//  check exist first
export type fetchCheckType = MediaItemType;
export const fetchCheckExistByType = async (
  type: fetchCheckType,
  id: string,
) => {
  try {
    const supabase = await createClient();

    if (type === "playlist") {
      return supabase.from("playlist").select("id").eq("id", id).maybeSingle();
    }
    if (type === "album") {
      return supabase.from("album").select("id").eq("id", id).maybeSingle();
    }
    if (type === "artist") {
      return supabase.from("artist").select("id").eq("id", id).maybeSingle();
    }
    if (type === "profile") {
      return supabase
        .from("users")
        .select("id")
        .eq("user_id", id)
        .maybeSingle();
    }
    if (type === "track") {
      return supabase.from("song").select("id").eq("id", id).maybeSingle();
    }
    if (type === "genres") {
      return supabase.from("genres").select("id").eq("id", id).maybeSingle();
    }
    if (type === "moods") {
      return supabase.from("moods").select("id").eq("id", id).maybeSingle();
    }

    return { data: null, error: "error" };
  } catch (error) {
    throw error;
  }
};

export const checkExist = async (type: fetchCheckType, id: string) => {
  try {
    const { data, error } = await fetchCheckExistByType(type, id);
    if (error) throw error;
    return { exists: !!data, error };
  } catch (error) {
    return { exists: false, error };
  }
};

export type GenresAndMoodsType = "genres" | "moods";
export const fetchCheckExistGenresAndMoodsById = async (
  type: GenresAndMoodsType,
  id: string,
) => {
  try {
    const supabase = await createClient();
    if (type === "genres") {
      return supabase.from("genres").select("*").eq("id", id).maybeSingle();
    }
    if (type === "moods") {
      return supabase.from("moods").select("*").eq("id", id).maybeSingle();
    }

    return { data: null, error: "error" };
  } catch (error) {
    throw error;
  }
};

export const checkExistGenresAndMoods = async (
  type: GenresAndMoodsType,
  id: string,
) => {
  try {
    const { data, error } = await fetchCheckExistGenresAndMoodsById(type, id);
    if (error) throw error;
    return { exists: !!data, data, error };
  } catch (error) {
    return { exists: false, data: null, error };
  }
};
