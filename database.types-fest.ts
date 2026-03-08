import type { MergeDeep } from "type-fest";
import type { Database as DBGenerated } from "./database.types"; // Import your raw supabase file

// 1. Define your Custom Types here
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
  type: Database["public"]["Enums"]["media_item_type"];
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
  sege: number;
  duration: number;
  is_lyric: boolean;
  type: "track";
  song_time_stamp: number[];
  play_count?: number;
  artists: Artist[];
  album: Album;
  cover_url: string;
}

// The final object returned by get_all_media_items()
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

export type RecentList = {
  recentlyPlayed: listInfo[];
};

export type ListSongs = {
  songs: listSongsSection;
};

export interface ArtistInfo extends ListSongs {
  albums: listInfo[] | null;
}

export interface UserInfo {
  profile: listInfo;
  playlists: listInfo[];
}
// Add priority to your existing types for search results
export type SearchSong = SongInfo & { priority: number };
export type SearchItem = listInfo & { priority: number };

export type SearchDropdownResult = {
  // top_result can be a song or any other media item
  top_result: SearchSong | SearchItem | null;
  songs: SearchSong[];
  albums: SearchItem[];
  artists: SearchItem[];
  playlists: SearchItem[];
  profiles: SearchItem[];
};

// 2. Override the Database Type
// We use MergeDeep to "patch" the specific fields we want to change
// while keeping everything else exactly as Supabase generated it.
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
      // ADD THIS SECTION 👇
      Functions: {
        get_all_media_items: {
          Args: Record<string, never>; // Means 'never' or empty args
          Returns: AllMediaItems; // Overwrite 'Json' with our strict type
        };
        // ADD THIS SECTION 👇
        get_recent_list: {
          Args: Record<string, never>;
          Returns: RecentList; // Overwrites 'Json' with our strict type
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

// 3. Re-export Helper Types (Typed with YOUR new Database)
// This ensures that when you use Tables<'lyric'> it uses the fixed version.

export type Tables<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Row"];

export type TablesInsert<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Insert"];

export type TablesUpdate<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Update"];

export type Enums<EnumName extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][EnumName];
