import { LibRoute, SUPPORTED_ROUTE } from "@/lib/libRoute";
import { userFetch } from "@/lib/UserInfoFetch";
import LikeSongSection from "@/ui/LibraryPage/LibPagesUI/LikeSongSection";
import ListSongsUpFaceSection from "@/ui/LibraryPage/LibPagesUI/ListSongsUpFaceSection";
import OverViewSection from "@/ui/LibraryPage/LibPagesUI/OverViewSection";
import { notFound, unauthorized } from "next/navigation";

const routeMap: Record<LibRoute, React.ReactNode> = {
  overview: <OverViewSection />,
  playlist: <ListSongsUpFaceSection route="playlist" />,
  "create-playlist": <ListSongsUpFaceSection route="create-playlist" />,
  artist: <ListSongsUpFaceSection route="artist" />,
  album: <ListSongsUpFaceSection route="album" />,
  "liked-songs": <LikeSongSection />,
  recently: <ListSongsUpFaceSection route="recently" />,
};

async function page(props: { params: Promise<{ params: string }> }) {
  const user = await userFetch();
  if (!user) {
    unauthorized();
  }

  const params = (await props.params).params;
  if (!SUPPORTED_ROUTE.includes(params as LibRoute)) {
    notFound();
  }
  const route = params as LibRoute;
  return <div className="space-y-3">{routeMap[route]}</div>;
}

export default page;
