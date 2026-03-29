import { checkExist } from "@/database/data";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ mood: string }>;
}) {
  const params = await props.params;
  const { exists, error: checkExistError } = await checkExist(
    "profile",
    params.mood,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();
  //  to do
  return <div>My Post{params.mood}</div>;
}
