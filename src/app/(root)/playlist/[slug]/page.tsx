import { getPlaylistSongs } from "@/database/data";
import ConditonalRenderPlaylist from "@/ui/EditablePlaylist/ConditonalRenderPlaylist";
import OwnEditable from "@/ui/EditablePlaylist/OwnEditable";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import { QueryClient } from "@tanstack/react-query";

async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const { data, error } = await queryClient.fetchQuery({
    queryKey: ["playlist", params.slug],
    queryFn: () => getPlaylistSongs(params.slug),
  });

  if (!data || error) return null;
  const { songs } = data;
  if (!songs) return;
  return (
    <ConditonalRenderPlaylist
      id={params.slug}
      OwnEditable={
        <OwnEditable
          queryClient={queryClient}
          songs={songs}
          id={params.slug}
          description={"playlist"}
        />
      }
      ViewAsOther={
        <ListPageView songs={songs}>
          <PageTrackItemContainer description="playlist" listSong={songs} />
        </ListPageView>
      }
    />
  );
}

export default page;
