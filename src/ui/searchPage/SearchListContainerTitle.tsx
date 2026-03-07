import { getTranslations } from "next-intl/server";

async function SearchListContainerTitle({ title }: { title: string }) {
  const l = await getTranslations("ListTitle");
  return <h3 className=" text-xl p-2 px-4">{l(title)}</h3>;
}

export default SearchListContainerTitle;
