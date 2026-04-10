import {
  cacheCheckExistGenresAndMoods,
  cacheGetMoodPage,
} from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(
  props: {
    params: Promise<{ mood: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [meta, mo, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    getTranslations("Mood"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  const params = await props.params;
  const {
    exists,
    data: checkExistData,
    error: checkExistError,
  } = await cacheCheckExistGenresAndMoods("moods", params.mood);
  if (checkExistError) throw new Error("page-load-error");
  if (!exists || !checkExistData) notFound();
  const { data, error } = await cacheGetMoodPage(params.mood);
  if (!data || error) throw new Error("page-load-error");
  return {
    title: meta("moodPage.title", { mood: mo(checkExistData.name) }),
    description: meta("moodPage.description", {
      mood: mo(checkExistData.name),
    }),
    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: `/mood/${checkExistData.id}`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ mood: string }>;
}) {
  const params = await props.params;
  const {
    exists,
    data: checkExistData,
    error: checkExistError,
  } = await cacheCheckExistGenresAndMoods("moods", params.mood);
  if (checkExistError) throw new Error("page-load-error");
  if (!exists || !checkExistData) notFound();

  const [l, moodsPage] = await Promise.all([
    getTranslations("Mood"),
    cacheGetMoodPage(params.mood),
  ]);
  const { data, error } = moodsPage;

  if (!data || error) throw new Error("page-load-error");

  const allEmpty = Object.values(data).every(
    (v) => v && v.idArray.length === 0,
  );
  if (allEmpty) return <EmptyGeneral />;
  return (
    <div className="space-y-3">
      {(Object.keys(data) as (keyof typeof data)[]).map((itemKey) => {
        if (!data[itemKey]) return;
        if (data[itemKey] && data[itemKey].idArray.length === 0) return;
        const insertDescription = { name: l(checkExistData.name) };
        return (
          <ListUpFaceGroup
            key={itemKey}
            list={data[itemKey]}
            description={itemKey}
            insertDescription={insertDescription}
          />
        );
      })}
    </div>
  );
}
