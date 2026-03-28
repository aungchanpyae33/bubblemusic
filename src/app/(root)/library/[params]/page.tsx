import LikeSongSection from "@/ui/LibraryPage/LibPagesUI/LikeSongSection";
import ListSongsUpFaceSection from "@/ui/LibraryPage/LibPagesUI/ListSongsUpFaceSection";
import OverViewSection from "@/ui/LibraryPage/LibPagesUI/OverViewSection";

const routeMap: Record<LibRoute, React.ReactNode> = {
  overview: <OverViewSection />,
  playlist: <ListSongsUpFaceSection route="playlist" />,
  "create-playlist": <ListSongsUpFaceSection route="create-playlist" />,
  artist: <ListSongsUpFaceSection route="artist" />,
  album: <ListSongsUpFaceSection route="album" />,
  "liked-songs": <LikeSongSection />,
  recently: <ListSongsUpFaceSection route="recently" />,
};

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
async function page(props: { params: Promise<{ params: string }> }) {
  // todo protectde page route
  const params = (await props.params).params;
  if (!SUPPORTED_ROUTE.includes(params as LibRoute)) {
    // todo not found page
    return null;
  }
  const route = params as LibRoute;
  return <div className="space-y-3">{routeMap[route]}</div>;
}

export default page;
