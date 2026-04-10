import { getGenre, getMood, getNewly } from "@/database/data";
import ListItemUpFaceContainer from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceContainer";
import ListItemUpFaceGroup from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceGroup";
import GenreContainer from "@/ui/CategoryContainer/GenreContainer";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import MoodContainer from "@/ui/CategoryContainer/MoodContainer";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { outputBaseUrl } from "@/lib/outputBaseUrl";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [meta, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  return {
    title: meta("explorePage.title"),
    description: meta("explorePage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: "/explore",
    },
  };
}

async function page() {
  const [getNewlyData, getGenreData, getMoodData] = await Promise.all([
    getNewly(),
    getGenre(),
    getMood(),
  ]);
  const { data: newlyData, error: newlyError } = getNewlyData;
  const { data: genreData, error: genreError } = getGenreData;
  const { data: moodData, error: moodError } = getMoodData;
  if (
    !newlyData ||
    newlyError ||
    !genreData ||
    genreError ||
    !moodData ||
    moodError
  ) {
    throw new Error("page-load-error");
  }

  return (
    <div className=" space-y-3">
      <ListItemUpFaceGroup description="genre">
        <GenreContainer genreList={genreData} />
      </ListItemUpFaceGroup>
      <ListItemUpFaceGroup description="mood">
        <MoodContainer moodList={moodData} />
      </ListItemUpFaceGroup>
      {(Object.keys(newlyData) as (keyof typeof newlyData)[]).map((itemKey) => {
        if (!newlyData[itemKey]) return null;
        if (newlyData[itemKey] && newlyData[itemKey].idArray.length === 0)
          return null;

        if (itemKey === "newlyAddedSongs") {
          return (
            <ListItemUpFaceGroup description={itemKey} key={itemKey}>
              <ListItemUpFaceContainer songs={newlyData[itemKey]} />
            </ListItemUpFaceGroup>
          );
        }
        return (
          <ListUpFaceGroup
            key={itemKey}
            list={newlyData[itemKey]}
            description={itemKey}
          />
        );
      })}
    </div>
  );
}

export default page;
