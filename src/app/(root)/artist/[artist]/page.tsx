import { cacheCheckExist, cacheGetArtistPage } from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ artist: string }>;
}): Promise<Metadata> {
  const meta = await getTranslations("MetaData");

  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "artist",
    params.artist,
  );

  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetArtistPage(params.artist);

  if (!data || error) throw new Error("page-load-error");
  const { songs, albums } = data;
  if (!songs && !albums) throw new Error("page-load-error");

  return {
    title: meta("artistPage.title", { name: songs.name }),
    description: meta("artistPage.description", {
      name: data.songs.name,
    }),
    metadataBase: outputBaseUrl(),
    openGraph: {
      url: `/artist/${params.artist}`,
      type: "profile",
    },
  };
}

async function page(props: { params: Promise<{ artist: string }> }) {
  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "artist",
    params.artist,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetArtistPage(params.artist);

  if (!data || error) throw new Error("page-load-error");
  const { songs, albums } = data;
  if (!songs && !albums) throw new Error("page-load-error");
  if (!songs || songs.songs?.idArray.length === 0) return <EmptyGeneral />;
  return (
    <ListPageView songs={songs}>
      <div className=" space-y-3">
        {songs && (
          <PageTrackItemContainer
            description="topSongsArtist"
            listSong={songs}
          />
        )}
        {albums && <ListUpFaceGroup list={albums} description="album" />}
      </div>
    </ListPageView>
  );
}

export default page;
