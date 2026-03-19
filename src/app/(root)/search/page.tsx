import { getSearchPage } from "@/database/data";
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
  console.log(error);
  if (!data || error) return null;
  const { top_result, songs, albums, artists, playlists, profiles } = data;
  return (
    <div className="  space-y-5">
      <SearchKeywordInfo query={query} />
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
