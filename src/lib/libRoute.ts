export const LIB_SONGLIST_ROUTE = [
  "playlist",
  "create-playlist",
  "artist",
  "album",
  "recently",
] as const;

export const SUPPORTED_ROUTE = [
  "overview",
  "liked-songs",
  ...LIB_SONGLIST_ROUTE,
] as const;

export type LibRoute = (typeof SUPPORTED_ROUTE)[number];
export type LibSonglistRoute = (typeof LIB_SONGLIST_ROUTE)[number];
