import type { MergeDeep } from "type-fest";
import type { Database as DBGenerated } from "./database.types";
export type LyricData = {
  time: number;
  line: string;
}[];

// Define the standard media item (Artist, Album, Playlist)
export type listInfo = {
  id: string;
  name: string;
  cover_url: string | null;
  related_id: string;
  related_name: string;
  type: MediaItemType;
  flag?: MediaItemFlag;
  play_count?: number;
  played_at?: string;
  is_official?: boolean;
};

export interface listSongsSection extends listInfo {
  songs: SongInfo[];
}

export interface Artist {
  id: string;
  name: string;
  role: "main" | "feat";
}

export interface Album {
  id: string;
  name: string;
}

export interface SongInfo {
  id: string;
  song_id: string;
  name: string;
  url: string;
  duration: number;
  is_lyric: boolean;
  type: "track";
  play_count?: number;
  artists: Artist[];
  album: Album;
  cover_url: string;
}

export type AllMediaItems = {
  recentlyPlayed: listInfo[];
  trendingSongs: SongInfo[];
  topMix: listInfo[];
  topPlaylistWeek: listInfo[];
  topAlbumWeek: listInfo[];
  topArtistWeek: listInfo[];
  artistForYou: listInfo[];
  albumForYou: listInfo[];
  playlistForYou: listInfo[];
};

export type NewlyItems = {
  newlyAddedSongs: SongInfo[];
  newlyAddedArtists: listInfo[];
  newlyAddedAlbums: listInfo[];
  newlyAddedPlaylists: listInfo[];
};

export type LibraryOverview = {
  lastLikedSongs: SongInfo[];
  lastSavedAlbums: listInfo[];
  lastSavedPlaylists: listInfo[];
  lastCreatedPlaylists: listInfo[];
  lastSavedArtists: listInfo[];
  recentlyPlayed: listInfo[];
};

export type LikeSongsList = {
  songs: SongInfo[];
};

export type RecentList = {
  recentlyPlayed: listInfo[];
};

export type LibrarySonglistSectinon = {
  result: listInfo[];
};

export type ListSongs = {
  songs: listSongsSection;
};

export interface ArtistInfo extends ListSongs {
  albums: listInfo[] | null;
}

export type MediaItemType = Enums<"media_item_type">;
export type MediaItemSource = Enums<"media_source_type">;
export type MediaItemFlag = Enums<"media_item_flag">;
export interface UserInfo {
  profile: listInfo;
  playlists: listInfo[];
}

export type SearchSong = SongInfo;
export type SearchItem = Omit<listInfo, "type"> & {
  type: Exclude<listInfo["type"], "track">;
};

export type SearchDropdownResult = {
  // top_result can be a song or any other media item
  top_result: SearchSong | SearchItem | null;
  songs: SearchSong[];
  albums: SearchItem[];
  artists: SearchItem[];
  playlists: SearchItem[];
  profiles: SearchItem[];
};

export type Database = MergeDeep<
  DBGenerated,
  {
    public: {
      Tables: {
        lyric: {
          Row: { lyric_data: LyricData };
          Insert: { lyric_data: LyricData };
          Update: { lyric_data?: LyricData };
        };
      };

      Functions: {
        get_all_media_items: {
          Args: Record<string, never>; // Means 'never' or empty args
          Returns: AllMediaItems; // Overwrite 'Json' with our strict type
        };
        get_newly: {
          Args: Record<string, never>;
          Returns: NewlyItems;
        };
        get_library_overview: {
          Args: Record<string, never>;
          Returns: LibraryOverview;
        };

        get_recent_list: {
          Args: Record<string, never>;
          Returns: RecentList;
        };
        get_last_liked_songs: {
          Args: { like_title: string };
          Returns: ListSongs;
        };
        get_last_saved_albums: {
          Args: Record<string, never>;
          Returns: LibrarySonglistSectinon;
        };
        get_last_saved_playlists: {
          Args: Record<string, never>;
          Returns: LibrarySonglistSectinon;
        };
        get_last_created_playlists: {
          Args: Record<string, never>;
          Returns: LibrarySonglistSectinon;
        };
        get_last_saved_artists: {
          Args: Record<string, never>;
          Returns: LibrarySonglistSectinon;
        };
        get_recently_played: {
          Args: Record<string, never>;
          Returns: LibrarySonglistSectinon;
        };
        get_user_playlist_profile: {
          Args: { p_user_id: string };
          Returns: LibrarySonglistSectinon;
        };
        search_dropdown: {
          Args: { query: string };
          Returns: SearchDropdownResult;
        };
        get_playlist_page: {
          Args: { p_id: string };
          Returns: ListSongs;
        };
        get_song_track: {
          Args: { p_song_id: string };
          Returns: ListSongs;
        };
        get_album_page: {
          Args: { p_album_id: string };
          Returns: ListSongs;
        };
        get_artist_page: {
          Args: { p_artist_id: string };
          Returns: ArtistInfo;
        };
        get_user_page: {
          Args: { p_user_id: string };
          Returns: UserInfo;
        };
        get_playlist_songs_queue: {
          Args: { p_id: string };
          Returns: SongInfo[];
        };
        get_album_songs_queue: {
          Args: { p_album_id: string };
          Returns: SongInfo[];
        };
        get_artist_songs_queue: {
          Args: { p_artist_id: string };
          Returns: SongInfo[];
        };
        get_playlist_direct: {
          Args: { p_id: string };
          Returns: ListSongs;
        };
        get_album_direct: {
          Args: { p_album_id: string };
          Returns: ListSongs;
        };
        get_artist_direct: {
          Args: { p_artist_id: string };
          Returns: ListSongs;
        };
        get_similar_songs: {
          Args: { input_song_id: string; similarity_threshold: number };
          Returns: SongInfo[];
        };
        add_recently_played: {
          Args: {
            p_item_id: string;
            p_type: Database["public"]["Enums"]["media_item_type"];
          };
          Returns: RecentList;
        };
        add_playlist_song: {
          Args: {
            p_id: string;
            s_id: string;
          };
          Returns: ListSongs;
        };
        delete_playlist_song: {
          Args: { p_id: string; target_id: string };
          Returns: ListSongs;
        };
      };
    };
  }
>;

// Re-export Helper Types
// This ensures that when  use Tables<'lyric'> it uses the fixed version.

export type Tables<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Row"];

export type TablesInsert<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Insert"];

export type TablesUpdate<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Update"];

export type Enums<EnumName extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][EnumName];
