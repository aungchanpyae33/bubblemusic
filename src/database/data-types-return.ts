import type { PostgrestError } from "@supabase/supabase-js";
import type {
  AllMediaItems,
  Database,
  listInfo,
  listSongsSection,
  SearchDropdownResult,
  SearchItem,
  SearchSong,
  SongInfo,
  Tables,
} from "../../database.types-fest";
import type { NormalizedById } from "@/lib/returnById";

export interface ErrorResponse {
  error: PostgrestError | null | unknown;
}

export interface GetLyricReturn {
  data: Tables<"lyric"> | null;
  error: ErrorResponse["error"];
}
export type UserLike = {
  userLike: NormalizedById<{ id: string }> | null;
};

export interface GetLikedIdReturn {
  data: UserLike | null;
  error: ErrorResponse["error"];
}

export type GetAllMediaItems = {
  [K in keyof AllMediaItems]: NormalizedById<listInfo | SongInfo> | null;
};

export interface GetAllMediaItemsReturn {
  data: GetAllMediaItems | null;
  error: ErrorResponse["error"];
}
export type GetRecent = NormalizedById<listInfo>;
export interface GetRecentReturn {
  data: GetRecent | null;
  error: ErrorResponse["error"];
}

export interface listInfoUserLib extends listInfo {
  source: Database["public"]["Enums"]["media_source_type"];
}

export interface NavbarList extends listInfoUserLib {
  is_public: boolean;
}
export interface UserLib {
  userLib: NormalizedById<NavbarList> | null;
}

export interface UserLibReturn {
  data: UserLib | null;
  error: ErrorResponse["error"];
}

export type GetSearchPage = {
  [K in Exclude<
    keyof SearchDropdownResult,
    "top_result" | "songs"
  >]: NormalizedById<SearchItem> | null;
} & {
  songs: NormalizedById<SearchSong> | null;
  top_result: SearchSong | SearchItem | null;
};

export interface GetSearchPageReturn {
  data: GetSearchPage | null;
  error: ErrorResponse["error"];
}

export interface ListSongPage extends Omit<listSongsSection, "songs"> {
  songs: NormalizedById<SongInfo> | null;
}

export interface ListSongsReturn {
  data: { songs: ListSongPage } | null;
  error: ErrorResponse["error"];
}

export interface ArtistPage {
  songs: ListSongPage;
  albums: NormalizedById<listInfo> | null;
}

export interface ArtistPageReturn {
  data: ArtistPage | null;
  error: ErrorResponse["error"];
}

export interface UserPage {
  profile: listInfo;
  playlists: NormalizedById<listInfo> | null;
}

export interface UserPageReturn {
  data: UserPage | null;
  error: ErrorResponse["error"];
}

export interface FetchSongs {
  songs: NormalizedById<SongInfo> | null;
}

export interface FetchSongsReturn {
  data: FetchSongs | null;
  error: ErrorResponse["error"];
}
