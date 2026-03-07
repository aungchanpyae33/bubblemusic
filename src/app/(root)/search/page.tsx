import { getSearchPage } from "@/database/data";
import SearchAlbum from "@/ui/searchPage/SearchAlbum";
import SearchArtist from "@/ui/searchPage/SearchArtist";
import SearchKeywordInfo from "@/ui/searchPage/SearchKeywordInfo";
import SearchPlaylist from "@/ui/searchPage/SearchPlaylist";
import SearchProfile from "@/ui/searchPage/SearchProfile";
import SearchSongs from "@/ui/searchPage/SearchSongs";
import TopResult from "@/ui/searchPage/topResult/TopResult";

async function page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const { data, error } = await getSearchPage(query);

  if (!data || error) return null;
  const { top_result, songs, albums, artists, playlists, profiles } = data;

  return (
    <div className="  space-y-5">
      <SearchKeywordInfo query={query} />
      {top_result && <TopResult topResult={top_result} />}
      {songs && songs.idArray.length > 0 && (
        <SearchSongs songs={songs} title="track" />
      )}

      {artists && artists.idArray.length > 0 && (
        <SearchArtist title="artist" artists={artists} />
      )}
      {albums && albums.idArray.length > 0 && (
        <SearchAlbum title="album" albums={albums} />
      )}
      {playlists && playlists.idArray.length > 0 && (
        <SearchPlaylist title="playlist" playlists={playlists} />
      )}

      {profiles && profiles.idArray.length > 0 && (
        <SearchProfile title="profile" profiles={profiles} />
      )}
    </div>
  );
}
export default page;
