import { getPlaylistSongs } from "@/database/data";
import ConditonalRenderPlaylist from "@/ui/playlist/ConditonalRenderPlaylist";
import OwnEditable from "@/ui/playlist/OwnEditable";
import ViewAsOther from "@/ui/playlist/ViewAsOther";
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
      ViewAsOther={<ViewAsOther songs={songs} />}
    />
  );
}

export default page;
