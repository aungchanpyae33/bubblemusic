import { checkExistGenresAndMoods } from "@/database/data";
import {
  cacheCheckExistGenresAndMoods,
  cacheGetGenresPage,
} from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(
  props: {
    params: Promise<{ genre: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [meta, ge, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    getTranslations("Genre"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  const params = await props.params;
  const {
    exists,
    data: checkExistData,
    error: checkExistError,
  } = await cacheCheckExistGenresAndMoods("genres", params.genre);
  if (checkExistError) throw new Error("page-load-error");
  if (!exists || !checkExistData) notFound();
  const { data, error } = await cacheGetGenresPage(params.genre);
  if (!data || error) throw new Error("page-load-error");

  return {
    title: meta("genrePage.title", { genre: ge(checkExistData.name) }),
    description: meta("genrePage.description", {
      genre: ge(checkExistData.name),
    }),

    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: `/genre/${checkExistData.id}`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ genre: string }>;
}) {
  const params = await props.params;
  const {
    exists,
    data: checkExistData,
    error: checkExistError,
  } = await checkExistGenresAndMoods("genres", params.genre);
  if (checkExistError) throw new Error("page-load-error");
  if (!exists || !checkExistData) notFound();

  const [l, genresPage] = await Promise.all([
    getTranslations("Genre"),
    cacheGetGenresPage(params.genre),
  ]);
  const { data, error } = genresPage;

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
