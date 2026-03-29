import { getSearchPage } from "@/database/data";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import SearchKeywordInfo from "@/ui/searchPage/SearchKeywordInfo";
import SearchSection from "@/ui/searchPage/SearchSection";
import SearchSongSection from "@/ui/searchPage/SearchSongSection";
import TopResult from "@/ui/searchPage/topResult/TopResult";

async function page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const { data, error } = await getSearchPage(query);

  if (!data || error) throw new Error("page-load-error");
  const { top_result, songs, albums, artists, playlists, profiles } = data;

  return (
    <div className="  space-y-5">
      <SearchKeywordInfo query={query} />
      {/* show empty ui when no results are found */}
      {!top_result &&
        (!songs || songs.idArray.length === 0) &&
        (!albums || albums.idArray.length === 0) &&
        (!artists || artists.idArray.length === 0) &&
        (!playlists || playlists.idArray.length === 0) &&
        (!profiles || profiles.idArray.length === 0) && <EmptyGeneral />}

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
