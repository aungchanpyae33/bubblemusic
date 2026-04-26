import type {
  AllMediaItems,
  CategorySection,
  DiscoverMediaItems,
  LibraryOverview,
  listInfo,
  listSongsSection,
  MediaItemSource,
  NewlyItems,
  SearchDropdownResult,
  SearchItem,
  SearchSong,
  SongInfo,
  Tables,
} from "../../database.types-fest";
import type { NormalizedById, NormalizedByIdOnly } from "@/lib/returnById";

type Error = {
  name: string;
  message: string;
};
export interface ErrorResponse {
  error: Error | null;
}

export interface GetLyricReturn {
  data: Tables<"lyric"> | null;
  error: ErrorResponse["error"];
}
export type UserLike = {
  userLike: NormalizedByIdOnly<{ id: string }> | null;
};

export interface GetLikedIdReturn {
  data: UserLike | null;
  error: ErrorResponse["error"];
}

export type GetAllMediaItems = {
  [K in Exclude<
    keyof AllMediaItems,
    "trendingSongs" | "trendingSongsWeek" | "songForYou"
  >]: NormalizedById<listInfo> | null;
} & {
  trendingSongs: NormalizedById<SongInfo> | null;
  trendingSongsWeek: NormalizedById<SongInfo> | null;
  songForYou: NormalizedById<SongInfo> | null;
};

export type GetUnAuthRootPage = {
  [K in Exclude<
    keyof DiscoverMediaItems,
    "trendingSongs" | "trendingSongsWeek"
  >]: NormalizedById<listInfo> | null;
} & {
  trendingSongs: NormalizedById<SongInfo> | null;
  trendingSongsWeek: NormalizedById<SongInfo> | null;
};

export interface GetAllMediaItemsReturn {
  data: GetAllMediaItems | null;
  error: ErrorResponse["error"];
}

export interface GetUnAuthRootPageReturn {
  data: GetUnAuthRootPage | null;
  error: ErrorResponse["error"];
}

export type GetRecent = NormalizedById<listInfo>;
export interface GetRecentReturn {
  data: GetRecent | null;
  error: ErrorResponse["error"];
}

export type GetNewlyItems = {
  [k in Exclude<
    keyof NewlyItems,
    "newlyAddedSongs"
  >]: NormalizedById<listInfo> | null;
} & {
  newlyAddedSongs: NormalizedById<SongInfo> | null;
};

export interface GetNewlyItemsReturn {
  data: GetNewlyItems | null;
  error: ErrorResponse["error"];
}

export type GetSpecificCategoryPage = {
  [k in keyof CategorySection]: NormalizedById<listInfo> | null;
};

export interface GetSpecificCategoryPageReturn {
  data: GetSpecificCategoryPage | null;
  error: ErrorResponse["error"];
}

export type GetLibraryOverview = {
  [k in Exclude<
    keyof LibraryOverview,
    "lastLikedSongs"
  >]: NormalizedById<listInfo> | null;
} & {
  lastLikedSongs: NormalizedById<SongInfo> | null;
};

export interface GetLibraryOverviewReturn {
  data: GetLibraryOverview | null;
  error: ErrorResponse["error"];
}

export type GetLikeSong = {
  result: NormalizedById<SongInfo> | null;
};

export interface GetLikeSongReturn {
  data: GetLikeSong | null;
  error: ErrorResponse["error"];
}

export interface listInfoUserLib extends listInfo {
  source: MediaItemSource;
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

export type LibrarySongListSectionPage = {
  result: NormalizedById<listInfo> | null;
};

export interface LibrarySongListSectionPageReturn {
  data: LibrarySongListSectionPage | null;
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
