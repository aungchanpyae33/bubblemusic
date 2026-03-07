import { getPlaylistSongs } from "@/database/data";
import ConditonalRenderPlaylist from "@/ui/playlist/ConditonalRenderPlaylist";
import OwnEdit from "@/ui/playlist/OwnEdit";
import View from "@/ui/playlist/View";
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
      OwnEdit={
        <OwnEdit
          queryClient={queryClient}
          songs={songs}
          id={params.slug}
          description={"playlist"}
        />
      }
      View={<View songs={songs} />}
    />
  );
}

export default page;
