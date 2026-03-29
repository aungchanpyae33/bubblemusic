import { getLibraryOverview } from "@/database/data";
import ListItemUpFaceContainer from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceContainer";
import ListItemUpFaceGroup from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceGroup";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";

const routeHrefGrop = {
  lastSavedAlbums: "album",
  lastSavedPlaylists: "playlist",
  lastCreatedPlaylists: "create-playlist",
  lastSavedArtists: "artist",
  recentlyPlayed: "recently",
};

async function OverViewSection() {
  const { data, error } = await getLibraryOverview();
  if (!data || error) throw new Error("page-load-error");
  if (Object.keys(data).length === 0) return <EmptyGeneral />;
  return (
    <>
      {(Object.keys(data) as (keyof typeof data)[]).map((itemKey) => {
        if (!data[itemKey]) return null;
        if (data[itemKey] && data[itemKey].idArray.length === 0) return null;

        if (itemKey === "lastLikedSongs") {
          return (
            <ListItemUpFaceGroup description={itemKey} key={itemKey}>
              <ListItemUpFaceContainer songs={data[itemKey]} />
            </ListItemUpFaceGroup>
          );
        }
        const route = routeHrefGrop[itemKey as keyof typeof routeHrefGrop];
        return (
          <ListUpFaceGroup
            showMore={true}
            href={`/library/${route}`}
            key={itemKey}
            list={data[itemKey]}
            description={itemKey}
          />
        );
      })}
    </>
  );
}

export default OverViewSection;
