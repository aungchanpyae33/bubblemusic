import { checkExistGenresAndMoods, getGenresPage } from "@/database/data";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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
    getGenresPage(params.genre),
  ]);
  const { data, error } = genresPage;

  if (!data || error) {
    {
      throw new Error("page-load-error");
    }
  }
  const allEmpty = Object.values(data).every(
    (v) => v && v.idArray.length === 0,
  );
  if (allEmpty) return <EmptyGeneral />;
  //  to do
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
