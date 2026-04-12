import { getSearchPage } from "@/database/data";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import { searchGuard } from "@/lib/searchGuard";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import SearchKeywordInfo from "@/ui/searchPage/SearchKeywordInfo";
import SearchSection from "@/ui/searchPage/SearchSection";
import SearchSongSection from "@/ui/searchPage/SearchSongSection";
import TopResult from "@/ui/searchPage/topResult/TopResult";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
type Props = {
  searchParams?: Promise<{
    query?: string;
  }>;
};
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await searchParams;
  const rawQuery = params?.query;
  const query = searchGuard(rawQuery) ? "" : rawQuery;
  const [meta, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  const title = meta("searchPage.title", { query: `'${query}'` });
  return {
    title: title,
    description: meta("searchPage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: `/search?query=${encodeURIComponent(query ?? "")}`,
    },
  };
}

async function page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  if (!query) return <EmptyGeneral />;
  if (searchGuard(query)) {
    return <EmptyGeneral />;
  }

  const { data, error } = await getSearchPage(query);

  if (!data || error) throw new Error("page-load-error");
  const { top_result, songs, albums, artists, playlists, profiles } = data;

  return (
    <div className="  space-y-5">
      <SearchKeywordInfo query={query} />

      {/* show empty ui when no results are found */}
      {!top_result && <EmptyGeneral />}

      {top_result && <TopResult topResult={top_result} />}
      {songs && songs.idArray.length > 0 && (
        <SearchSongSection songs={songs} title="track" />
      )}
      <SearchSection title="artist" list={artists} />
      <SearchSection title="album" list={albums} />
      <SearchSection title="playlist" list={playlists} />
      <SearchSection title="profile" list={profiles} />
    </div>
  );
}
export default page;
