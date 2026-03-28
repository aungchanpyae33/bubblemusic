import { checkExist } from "@/database/data";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ genre: string }>;
}) {
  const params = await props.params;
  const { exists } = await checkExist("genres", params.genre);
  if (!exists) notFound();

  return <div>My Post:{params.genre}</div>;
}
