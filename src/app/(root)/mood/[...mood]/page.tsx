import { checkExist } from "@/database/data";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ mood: string }>;
}) {
  const params = await props.params;
  const { exists } = await checkExist("profile", params.mood);
  if (!exists) notFound();

  return <div>My Post{params.mood}</div>;
}
